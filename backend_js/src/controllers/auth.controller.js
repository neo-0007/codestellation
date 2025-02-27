const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user.model");
// const { generateTokens, storeRefreshToken } = require("../utils/jwtToken");
dotenv.config();

const register = async (req, res, next) => {
    try {
        const { name, email, phone, password, gender, dob } = req.body;

        // Check if user already exists
        const userExists = await new User({}).find({ email });
        if (userExists.length > 0) {
            return res.status(400).json({ success: false, message: `User with the email "${email}" already exists.` });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            gender,
            dob
        });

        const insertedUser = await newUser.save();
        if (!insertedUser) {
            throw new Error("Failed to register user.");
        }


        res.status(200).json({ success: true, message: "User registered successfully.", body: req.body });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await new User({}).find({ email });
        if (user.length === 0) {
            return res.status(400).json({ success: false, message: `User not found.`});
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: `Invalid password.`});
        }

        res.status(200).json({ success: true, message: "User logged in successfully.", body: req.body });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
        }
};

module.exports = { register, login }