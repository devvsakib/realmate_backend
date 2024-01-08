import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkShortID from "../util/checkShortID.js";
import { addTokenToBlacklist } from "../util/tokenBlacklist.js";
import responseMessage from "../util/responseMessage.js";

export const registerUser = async (req, res) => {
    const user = req.body;
    if (!user.password || !user.basicInformation.email) return res.status(400).json({ error: "Missing required fields!" });
    try {
        // check email and phone number
        const findUser = await User.findOne({ $or: [{ "basicInformation.email": user.basicInformation.email }, { "basicInformation.phone": user.basicInformation.phone }] })

        if (findUser) {
            let errorMessage = "User with ";

            // Check if the email matches
            if (findUser.basicInformation.email == user.basicInformation.email) {
                errorMessage += "this email already exists.";
                return res.status(400).json({ error: errorMessage });
            }

            // Check if the phone number matches
            if (findUser.basicInformation.phone == user.basicInformation.phone) {
                errorMessage += "this phone number already exists.";
                return res.status(400).json({ error: errorMessage });
            }

        }

        user.userID = await checkShortID();

        const hashedPassword = await bcrypt.hash(user.password, 10)

        const savedUser = await new User({ ...user, password: hashedPassword }).save();
        if (!savedUser) return res.status(400).json({ error: "User not Registered!" });

        return res.status(201).json(responseMessage("User created successfully", savedUser));
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            // MongoDB dup key error (code 11000)
            return res.status(400).json(responseMessage("User already exists", error));
        } else {
            console.error(error);
            res.status(500).json(responseMessage("Internal server error", error));
        }
    }

};

export const loginUser = async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        // Find user by email or phone number
        const user = await User.findOne({ $or: [{ "basicInformation.email": email }, { "basicInformation.phone": phone }] });

        // check if user does not exists
        if (!user) {
            if (email) {
                return res.status(404).json(responseMessage('User with this email does not exist.'));
            } else if (phone) {
                return res.status(404).json(responseMessage('User with this phone number does not exist.'));
            }
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json(responseMessage('Password does not match.'));
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userID, email: user.basicInformation.email }, user.userID, {
            expiresIn: '1h',
        });

        // Return the token
        res.status(200).json(responseMessage('Login successful', { token }));

    } catch (error) {
        console.error(error);
        res.status(500).json(responseMessage('Internal server error'));
    }
};

export const logoutUser = async (req, res) => {
    const token = req.headers.authorization;

    try {
        if (!token) {
            return res.status(401).json(responseMessage('Unauthorized'));
        }

        addTokenToBlacklist(token);

        res.status(200).json(responseMessage('Logout successful'));
    } catch (error) {
        console.error(error);
        res.status(500).json(responseMessage('Internal server error'));
    }
};
