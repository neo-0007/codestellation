const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user.model");
// const { generateTokens, storeRefreshToken } = require("../utils/jwtToken");
dotenv.config();

const register = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "User registered successfully.", body: req.body });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res, next) => {
    try {
        res.status(200).json({ success: true, message: "User logged in successfully.", body: req.body });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
        }
};

module.exports = { register, login }