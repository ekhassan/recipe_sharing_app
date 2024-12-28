const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    displayPicture: {
        type: String,
        default: 'default-profile-pic.png',
    }
}, { timestamps: true });


userSchema.statics.generateAuthToken = function (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
