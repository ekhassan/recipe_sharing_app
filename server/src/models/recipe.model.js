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
    ingredients: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
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