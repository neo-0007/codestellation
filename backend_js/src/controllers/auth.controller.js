const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user.model");
// const { generateTokens, storeRefreshToken } = require("../utils/jwtToken");
dotenv.config();

const register = async (req, res, next) => {
    try {
        let registerData = req.body;
        
        // Validate required fields
        if (!registerData.name || !registerData.email || !registerData.password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required." });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email: registerData.email });
        if (userExists) {
            return res.status(400).json({ success: false, message: `User with the email "${registerData.email}" already exists.` });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerData.password, salt);

        // Create new user
        const newUser = new User({
            name: registerData.name,  // Ensure this is correctly referenced
            email: registerData.email,
            phone: registerData.phone,
            password: hashedPassword,
            gender: registerData.gender,
            dob: registerData.dob
        });

        // Save user
        const insertedUser = await newUser.save();
        if (!insertedUser) {
            throw new Error("Failed to register user.");
        }

        res.status(200).json({ success: true, message: "User registered successfully.", user: insertedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res, next) => {
    try {
        const registerData = req.body;
        const email = registerData.email;
        const password = registerData.password;
        // Create an empty User instance to use its find method
        const userInstance = new User({});
        const users = await userInstance.find({ email });
        
        // Check if user exists
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: `User not found.` });
        }
        
        const user = users[0];
        
        // Verify password with bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: `Invalid password.` });
        }
        
        // Password is valid, send success response
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(200).json({ 
            success: true, 
            message: "User logged in successfully.", 
            user: userWithoutPassword 
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getUserDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await new User({}).findById(id)
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { register, login }
