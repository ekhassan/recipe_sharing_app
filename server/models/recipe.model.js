const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    notes: {
        type: String,
    },
    details: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    directions: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    under30min: {
        type: Boolean,
        required: true,
        default: false,
    }
    ,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        ratingValue: {
            type: Number,
            min: 1,
            max: 5
        }
    }]
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;