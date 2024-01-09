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
import { adminAuthenticate, authenticateToken } from '../util/authentication.js';

router.get("/", getAllUsers);
router.get("/", getUser);
router.delete("/", authenticateToken, deleteUser);
router.patch("/basic-information", authenticateToken, updateBasicInformation);
router.patch("/partner-expectation", authenticateToken, updatePartnerExpectation);
router.patch("/family-information", authenticateToken, updateFamilyInformation);
router.patch("/physical-attributes", authenticateToken, updatePhysicalAttributes);
router.patch("/address", authenticateToken, updateAddress);
router.post("/education", authenticateToken, addEducation);
router.patch("/education/:educationID", authenticateToken, updateEducation);
router.delete("/education/:educationID", authenticateToken, deleteEducation);
router.patch("/hobbies", authenticateToken, updateHobbies);
router.patch("/languages", authenticateToken, updateLanguages);
router.post("/career", authenticateToken, addCareer);
router.patch("/career/:careerID", authenticateToken, updateCareer);
router.delete("/career/:careerID", authenticateToken, deleteCareer);
router.patch("/lifestyle", authenticateToken, updateLifestyle);
router.patch("/personal-attitude", authenticateToken, updatePersonalAttitude);
router.patch("/spiritual-social-bg", authenticateToken, updateSpiritualSocialBg);
router.get("/shortlist", authenticateToken, getShortlistedUsers);
router.patch("/shortlist", authenticateToken, shortlistUser);
router.patch("/remove-from-shortlist", authenticateToken, removeUserFromShortlist);
router.get("/interest", authenticateToken, getMyInterestUsers);
router.patch("/interest", authenticateToken, addInterestedUser);
router.patch("/remove-from-interest", authenticateToken, removeUserFromMyInterest);
// this will be done by admin
router.patch("/account-type", adminAuthenticate, updateAccountType);



export { router as userRoutes }