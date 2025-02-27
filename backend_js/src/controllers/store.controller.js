const User = require('../models/user.model');
const UserData = require('../models/userData.model');

const storeUserMentalData = async (req, res) => {
    try {
        const { mood, stressLevel } = req.body;
        const { id } = req.params;

        // Check if the user exists
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(400).json({ success: false, message: `User not found.` });
        }

        // Find or create the UserData entry
        let userData = await UserData.findOne({ mysqlID: id });

        if (!userData) {
            userData = new UserData({
                mysqlID: id,
                history: [
                    {
                        mood,
                        stressLevel,
                        last_analysed: new Date(),
                    },
                ],
            });
        } else {
            userData.history.push({
                mood,
                stressLevel,
                last_analysed: new Date(),
            });
        }

        await userData.save();

        return res.status(200).json({ success: true, message: "Mental data stored successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = storeUserMentalData;
