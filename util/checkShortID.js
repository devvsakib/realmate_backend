import short from 'short-uuid';
import User from '../models/User.js';

const checkShortID = async () => {
    const translator = short('0123456789');
    const shortID = translator.new().slice(0, 6);
    const findUserID = await User.findOne({ userID: shortID })
    if (findUserID) {
        checkShortID();
    }
    return shortID;
}

export default checkShortID;