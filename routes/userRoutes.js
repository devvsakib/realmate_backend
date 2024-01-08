import express from 'express';

const router = express.Router();

import {
    getAllUsers,
    getUser,
    deleteUser,
    updateBasicInformation,
    updatePartnerExpectation,
    updateFamilyInformation,
    updatePhysicalAttributes,
    updateAddress,
    addEducation,
    updateEducation,
    deleteEducation,
    updateHobbies,
    updateLanguages,
    addCareer,
    updateCareer,
    deleteCareer,
    updateLifestyle,
    updatePersonalAttitude,
    updateSpiritualSocialBg,
    getShortlistedUsers,
    shortlistUser,
    removeUserFromShortlist,
    updateAccountType,
    getMyInterestUsers,
    addInterestedUser,
    removeUserFromMyInterest

} from '../controllers/userController.js';
import { authenticateToken } from '../util/authentication.js';

router.get("/", getAllUsers);
router.get("/:userID", getUser);
router.delete("/:userID", authenticateToken, deleteUser);
router.patch("/:userID/basic-information", authenticateToken, updateBasicInformation);
router.patch("/:userID/partner-expectation", authenticateToken, updatePartnerExpectation);
router.patch("/:userID/family-information", authenticateToken, updateFamilyInformation);
router.patch("/:userID/physical-attributes", authenticateToken, updatePhysicalAttributes);
router.patch("/:userID/address", authenticateToken, updateAddress);
router.post("/:userID/education", authenticateToken, addEducation);
router.patch("/:userID/education/:educationID", authenticateToken, updateEducation);
router.delete("/:userID/education/:educationID", authenticateToken, deleteEducation);
router.patch("/:userID/hobbies", authenticateToken, updateHobbies);
router.patch("/:userID/languages", authenticateToken, updateLanguages);
router.post("/:userID/career", authenticateToken, addCareer);
router.patch("/:userID/career/:careerID", authenticateToken, updateCareer);
router.delete("/:userID/career/:careerID", authenticateToken, deleteCareer);
router.patch("/:userID/lifestyle", authenticateToken, updateLifestyle);
router.patch("/:userID/personal-attitude", authenticateToken, updatePersonalAttitude);
router.patch("/:userID/spiritual-social-bg", authenticateToken, updateSpiritualSocialBg);
router.get("/:userID/shortlist", authenticateToken, getShortlistedUsers);
router.patch("/:userID/shortlist", authenticateToken, shortlistUser);
router.patch("/:userID/remove-from-shortlist", authenticateToken, removeUserFromShortlist);
router.get("/:userID/interest", authenticateToken, getMyInterestUsers);
router.patch("/:userID/interest", authenticateToken, addInterestedUser);
router.patch("/:userID/remove-from-interest", authenticateToken, removeUserFromMyInterest);
// this will be done by admin
router.patch("/:userID/account-type", authenticateToken, updateAccountType);



export { router as userRoutes }