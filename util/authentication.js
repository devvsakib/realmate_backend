import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "./tokenBlacklist.js";

export function authenticateToken(req, res, next) {
    return next();
    let token = req.headers.authorization;
    let userID = req.headers.userid;
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized. Login please.' });
        }

        // Check if the token is blacklisted
        if (isTokenBlacklisted(token)) {
            return res.status(401).json({ message: 'Token is blacklisted. Unauthorized' });
        }
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token
        jwt.verify(token, userID, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Couldn\'t verify. Plese login' });
            }

            req.user = user;
            next();
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
