import User from "../models/User.js";
import responseMessage from "../util/responseMessage.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Get a single user by userID
export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userID }).select("-password");
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }
        // remove the password from the response
        const { password, ...data } = user._doc;
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error", error));
    }
};

// Delete a user by userID
export const deleteUser = async (req, res) => {
    try {
        console.log(req.params.userID)
        const user = await User.findOneAndDelete({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }
        res.json(responseMessage("User deleted successfully", user));
    } catch (error) {
        res.status(500).json(responseMessage(error.message));
    }
};

// Update user's  Basic Information
export const updateBasicInformation = async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        user.basicInformation = updatedInfo;
        await user.save();

        res.status(200).json(user.basicInformation);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update user's  Partner Expectation
export const updatePartnerExpectation = async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        user.partnerExpectation = updatedInfo;
        await user.save();

        res.status(200).json(user.partnerExpectation);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update user's  Family Information
export const updateFamilyInformation = async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        user.familyInformation = updatedInfo;
        await user.save();

        res.status(200).json(user.familyInformation);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update user's  Physical Attributes
export const updatePhysicalAttributes = async (req, res) => {
    try {
        const updatedInfo = req.body;

        if (!updatedInfo) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        user.physicalAttributes = updatedInfo;
        await user.save();

        res.status(200).json(user.physicalAttributes);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update user's address
export const updateAddress = async (req, res) => {
    try {
        const { userID } = req.params;
        const { addressType, updatedAddress } = req.body;

        if (!addressType || !updatedAddress) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: userID });

        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }
        if (addressType === "presentAddress") user.presentAddress = updatedAddress;
        else user.permanentAddress = updatedAddress;

        await user.save();
        res.status(200).json(user[addressType]);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Add education information
export const addEducation = async (req, res) => {
    try {
        const { degree, institution, start, end, status } = req.body;

        if (!degree || !institution || !start || !end || !status) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        user.education.push({ degree, institution, start, end, status });
        await user.save();

        res.status(201).json(user.education);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update education information
export const updateEducation = async (req, res) => {
    try {
        const { degree, institution, start, end, status } = req.body;

        if (!degree || !institution || !start || !end || !status) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        const educationIndex = user.education.findIndex(edu => edu._id.toString() === req.params.educationID);
        if (educationIndex === -1) {
            return res.status(404).json(responseMessage("Education not found"));
        }

        user.education[educationIndex] = {
            _id: user.education[educationIndex]._id,
            degree,
            institution,
            start,
            end,
            status
        };

        res.status(200).json(user.education);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Delete education information
export const deleteEducation = async (req, res) => {
    try {
        const { educationID } = req.params;

        if (!educationID) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });

        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Find the index of the education object with the specified _id
        const educationIndex = user.education.findIndex(edu => edu._id.toString() === educationID);

        // If the education with the specified _id is not found, return an error
        if (educationIndex === -1) {
            return res.status(404).json(responseMessage("Education not found"));
        }

        // return res.json(user.education.splice(educationIndex, 1));
        // Remove the education object with the specified _id
        user.education.splice(educationIndex, 1);

        await user.save();

        res.status(200).json(responseMessage("Education information deleted successfully", user.education));

    }
    catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update user's hobbies
export const updateHobbies = async (req, res) => {
    try {
        const { hobbies, interests, music, books, movies, tvShows, sports, fitnessActivities, cuisines, dressStyles } = req.body;

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Check and update individual fields
        if (hobbies !== undefined) user.hobbies.hobbies = hobbies;
        if (interests !== undefined) user.hobbies.interests = interests;
        if (music !== undefined) user.hobbies.music = music;
        if (books !== undefined) user.hobbies.books = books;
        if (movies !== undefined) user.hobbies.movies = movies;
        if (tvShows !== undefined) user.hobbies.tvShows = tvShows;
        if (sports !== undefined) user.hobbies.sports = sports;
        if (fitnessActivities !== undefined) user.hobbies.fitnessActivities = fitnessActivities;
        if (cuisines !== undefined) user.hobbies.cuisines = cuisines;
        if (dressStyles !== undefined) user.hobbies.dressStyles = dressStyles;

        await user.save();

        res.status(200).json(responseMessage("Hobbies updated successfully", user.hobbies));

    } catch (error) {
        console.error(error);
        res.status(500).json(responseMessage("Internal server error"));
    }
};

//  Update user's languages
export const updateLanguages = async (req, res) => {
    try {
        const { languages } = req.body;

        if (!languages) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }
        user.languages = languages;
        await user.save();

        res.status(200).json(user.languages);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};


// Add a new career entry for the user
export const addCareer = async (req, res) => {
    try {
        const { designation, company, start, end, status } = req.body;

        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Ensure that user.career is always an array
        user.career = user.career || [];

        // Add a new career entry
        const newCareerEntry = {
            designation: designation || "",
            company: company || "",
            start: start || null,
            end: end || null,
            status: status || ""
        };

        user.career.push(newCareerEntry);

        await user.save();

        res.status(200).json(responseMessage("Career information added successfully", user.career));

    } catch (error) {
        console.error(error);
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update user's career information
export const updateCareer = async (req, res) => {
    try {
        const { designation, company, start, end, status } = req.body;

        const user = await User.findOne({ userID: req.params.userID });
        const { careerID } = req.params;
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Find the index of the career object with the specified _id
        const careerIndex = user.career.findIndex(career => career._id.toString() === careerID);

        // If the career with the specified _id is not found, return an error
        if (careerIndex === -1) {
            return res.status(404).json(responseMessage("Career not found"));
        }

        // Update the career object with the specified _id
        user.career[careerIndex] = {
            _id: user.career[careerIndex]._id,
            designation: designation || "",
            company: company || "",
            start: start || null,
            end: end || null,
            status: status || ""
        };

        await user.save();

        res.status(200).json(responseMessage("Career information updated successfully", user.career));

    } catch (error) {
        console.error(error);
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Delete career information
export const deleteCareer = async (req, res) => {
    try {
        const { careerID } = req.params;

        if (!careerID) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });

        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Find the index of the career object with the specified _id
        const careerIndex = user.career.findIndex(career => career._id.toString() === careerID);

        // If the career with the specified _id is not found, return an error
        if (careerIndex === -1) {
            return res.status(404).json(responseMessage("Career not found"));
        }

        // Remove the career object with the specified _id
        user.career.splice(careerIndex, 1);

        await user.save();

        res.status(200).json(responseMessage("Career information deleted successfully", user.career));

    }
    catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update lifestyle information
export const updateLifestyle = async (req, res) => {
    try {
        const { diet, drink, smoke, livingWith } = req.body;
        if (!diet || !drink || !smoke || !livingWith) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }
        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        if (diet !== undefined) user.lifestyle.diet = diet;
        if (drink !== undefined) user.lifestyle.drink = drink;
        if (smoke !== undefined) user.lifestyle.smoke = smoke;
        if (livingWith !== undefined) user.lifestyle.livingWith = livingWith;

        await user.save();

        res.status(200).json(user.lifestyle);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Update personalAttitude
export const updatePersonalAttitude = async (req, res) => {
    try {
        const { politicalViews, religiousService } = req.body;
        if (!politicalViews || !religiousService) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }
        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        if (politicalViews !== undefined) user.personalAttitude.politicalViews = politicalViews;
        if (religiousService !== undefined) user.personalAttitude.religiousService = religiousService;

        await user.save();

        res.status(200).json(user.personalAttitude);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
}

// Update spiritualSocialBg
export const updateSpiritualSocialBg = async (req, res) => {
    try {
        const { religion, caste, ethnicity } = req.body;
        const user = await User.findOne({ userID: req.params.userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        if (religion !== undefined) user.spiritualSocialBg.religion = religion;
        if (caste !== undefined) user.spiritualSocialBg.caste = caste;
        if (ethnicity !== undefined) user.spiritualSocialBg.ethnicity = ethnicity;

        await user.save();

        res.status(200).json(user.spiritualSocialBg);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Shortlist a user
export const shortlistUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const { shortlistedUserID } = req.body;

        if (!shortlistedUserID) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Ensure that user.shortlist is always an array
        user.shortlist = user.shortlist || [];

        // Add the shortlisted user to the shortlist array
        user.shortlist.push(shortlistedUserID);

        await user.save();

        res.status(200).json(responseMessage("User shortlisted successfully", user.shortlist));

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Remove a user from shortlist
export const removeUserFromShortlist = async (req, res) => {
    try {
        const { shortlistedUserID } = req.body;

        if (!shortlistedUserID) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });

        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Find the index of the shortlisted user
        const shortlistedUserIndex = user.shortlist.findIndex(id => id === shortlistedUserID);

        // If the shortlisted user is not found, return an error
        if (shortlistedUserIndex === -1) {
            return res.status(404).json(responseMessage("User not found in shortlist"));
        }

        // Remove the shortlisted user
        user.shortlist.splice(shortlistedUserIndex, 1);

        await user.save();

        res.status(200).json(responseMessage("User removed from shortlist successfully", user.shortlist));

    }
    catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Get shortlisted users
export const getShortlistedUsers = async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userID }).select("shortlist");
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        const shortlistedUsers = await User.find({ userID: { $in: user.shortlist } }).select("-password");

        res.status(200).json(shortlistedUsers);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
}

// Add a user to myInterest
export const addInterestedUser = async (req, res) => {
    try {
        const { userID } = req.params;
        const { interestedUserID } = req.body;

        if (!interestedUserID) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: userID });
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Ensure that user.myInterest is always an array
        user.myInterest = user.myInterest || [];

        // Add the interested user to the myInterest array
        user.myInterest.push(interestedUserID);

        await user.save();

        res.status(200).json(responseMessage("User added to myInterest successfully", user.myInterest));

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Remove a user from myInterest
export const removeUserFromMyInterest = async (req, res) => {
    try {
        const { interestedUserID } = req.body;

        if (!interestedUserID) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });

        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        // Find the index of the interested user
        const interestedUserIndex = user.myInterest.findIndex(id => id === interestedUserID);

        // If the interested user is not found, return an error
        if (interestedUserIndex === -1) {
            return res.status(404).json(responseMessage("User not found in myInterest"));
        }

        // Remove the interested user
        user.myInterest.splice(interestedUserIndex, 1);

        await user.save();

        res.status(200).json(responseMessage("User removed from myInterest successfully", user.myInterest));

    }
    catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};

// Get myInterest users
export const getMyInterestUsers = async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userID }).select("myInterest");
        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        const myInterestUsers = await User.find({ userID: { $in: user.myInterest } }).select("-password");

        res.status(200).json(myInterestUsers);

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
}

// Update user's account type
export const updateAccountType = async (req, res) => {
    try {
        const { isPremium } = req.body;

        if (isPremium === undefined) {
            return res.status(400).json(responseMessage("Missing required fields!"));
        }

        const user = await User.findOne({ userID: req.params.userID });

        if (!user) {
            return res.status(404).json(responseMessage("User not found"));
        }

        user.isPremium = isPremium;

        await user.save();

        res.status(200).json(responseMessage("Account type updated successfully", user.isPremium));

    } catch (error) {
        res.status(500).json(responseMessage("Internal server error"));
    }
};