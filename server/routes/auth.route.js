const router = require('express').Router();

const { authMiddleware } = require("../middleware/authMiddleware")

const {
    validateUser,
    userValidationRules,
} = require("../utils/validations")

const { signIn, signUp, getProfile, updateProfile, getProfileWithRecipes } = require("../controllers/auth.controller")



router.post('/signin', signIn);
router.post('/signup', userValidationRules(), validateUser, signUp);
router.get('/profile', authMiddleware, getProfile);
router.put('/update-profile', authMiddleware, updateProfile);
router.get('/:username', getProfileWithRecipes)




module.exports = router