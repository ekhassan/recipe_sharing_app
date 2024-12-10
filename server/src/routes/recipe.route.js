const router = require('express').Router()
const { getAllRecipes, addRecipe, getRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipe.controller")

const { recipeValidationRules, validateRecipe } = require('../utils/validations')
const { authMiddleware } = require("../middleware/authMiddleware")

router.get('/', getAllRecipes);
router.get('/:id', getRecipe);
router.put('/:id', recipeValidationRules(), validateRecipe, authMiddleware, updateRecipe);
router.post('/addRecipe', recipeValidationRules(), validateRecipe, authMiddleware, addRecipe);
router.delete('/:id', authMiddleware, deleteRecipe)

module.exports = router 