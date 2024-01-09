import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    // done
    basicInformation: {
        firstName: String,
        lastName: String,
        gender: String,
        dob: Date,
        createProfileFor: String,
        numberOfChildren: Number,
        photo: String,
        introduction: String,
        firstLanguage: String,
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true,
            unique: true
        },
        age: Number,
        maritalStatus: String,
        religion: String,
        caste: String
    },
    // done
    permanentAddress: {
        sameAsPresentAddress: Boolean,
        country: String,
        state: String,
        postalCode: String,
        city: String,
    },
    presentAddress: {
        country: String,
        state: String,
        postalCode: String,
        city: String,
    },
    addressesAreSame: Boolean,
    // done
    education: [
        {
            degree: String,
            institution: String,
            start: Date,
            end: Date,
            status: String
        }
    ],
    // done
    career: [
        {
            designation: String,
            company: String,
            start: Date,
            end: Date,
            status: String
        }
    ],
    // done
    physicalAttributes: {
        height: String,
        weight: String,
        eyeColor: String,
        hairColor: String,
        complexion: String,
        bloodGroup: String,
        disability: String
    },
    // done
    languages: {
        motherTongue: String,
        knownLanguages: [String]
    },
    // done
    familyInformation: {
        father: Boolean,
        mother: Boolean,
        siblings: Boolean || Number
    },
    // done
    hobbies: {
        hobbies: [String],
        interests: [String],
        music: [String],
        books: [String],
        movies: [String],
        tvShows: [String],
        sports: [String],
        fitnessActivities: [String],
        cuisines: [String],
        dressStyles: [String]
    },
    // done
    lifestyle: {
        diet: String,
        drink: String,
        smoke: String,
        livingWith: String
    },
    // done
    personalAttitude: {
        politicalViews: String,
        religiousService: String
    },
    // done
    spiritualSocialBg: {
        religion: String,
        caste: String,
        ethnicity: String
    },
    // done
    partnerExpectation: {
        generalRequirements: String,
        residenceCountry: String,
        minHeight: Number,
        maxWeight: Number,
        maritalStatus: String,
        childrenAcceptable: Boolean,
        religion: String,
        caste: String,
        language: String,
        education: String,
        profession: String,
        smokingAcceptable: Boolean,
        drinkingAcceptable: Boolean,
        dietAcceptable: Boolean,
        preferredCountry: String,
        preferredState: String,
        complexion: String
    },
    // done
    shortlist: {
        type: Array,
        default: []
    },
    // done
    myInterest: {
        type: Array,
        default: []
    },
    // done
    interestedMembers: {
        type: Array,
        default: []
    },
    // done
    isPremium: {
        type: Boolean,
        default: false
    },
    // done
    password: {
        type: String,
        required: true
    },
    // done
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Users', userSchema);
