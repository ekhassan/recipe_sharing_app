const User = require('../models/user.model');
const Recipe = require("../models/recipe.model")
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {

    const { name, username, email, password, displayPicture } = req.body;

    try {

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } else {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await User.create({ name, username, email, password: hashPassword, displayPicture });

            return res.status(201).json({ message: "User created successfully", user });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }

}


const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else {
            const isMatch = await user.comparePassword(password);

            if (isMatch) {
                const token = await User.generateAuthToken(user);

                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 7 * 60 * 60 * 1000,
                    sameSite: 'Strict',
                    secure: process.env.NODE_ENV === 'production',
                });

                return res.status(200).json({ message: "Login Successful", token });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User found", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getProfileWithRecipes = async (req, res) => {
    try {

        const { username } = req.params

        const user = await User.findOne({ username }).select('-password');
        const recipes = await Recipe.find({ userId: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User found", user, recipes });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error", err });
    }
}

module.exports = {
    signUp,
    signIn,
    getProfile,
    getProfileWithRecipes
}