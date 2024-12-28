const router = require('express').Router()
const { getAllRecipes, addRecipe, getRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipe.controller")

const { recipeValidationRules, validateRecipe } = require('../utils/validations')
const { authMiddleware } = require("../middleware/authMiddleware")
const Recipe = require("../models/recipe.model")

router.get('/', getAllRecipes);
router.get('/:id', getRecipe);
router.put('/:id', recipeValidationRules(), validateRecipe, authMiddleware, updateRecipe);
router.post('/addRecipe', recipeValidationRules(), validateRecipe, authMiddleware, addRecipe);
router.delete('/:id', authMiddleware, deleteRecipe)

router.post('/deleteAll', async (req, res) => {
    try {
        const result = await Recipe.deleteMany({});
        res.json({ message: `Deleted ${result.deletedCount} recipes` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router 