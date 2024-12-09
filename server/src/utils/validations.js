const { body, validationResult } = require('express-validator');


const userValidationRules = () => {
    return [
        body("username").isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters long")
            .notEmpty().withMessage("Username is required"),
        body("email").isEmail()
            .withMessage("Must be a valid email address")
            .notEmpty().withMessage("Email is required"),
        body("password").isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
            .notEmpty().withMessage("Password is required")
    ]
}


const recipeValidationRules = () => {
    return [
        body("title").notEmpty().withMessage("Title is required"),
        body("ingredients").isArray({ min: 1 }).notEmpty().withMessage("Ingredients are required"),
        body("instructions").notEmpty().withMessage("Instructions are required"),
        body("category").notEmpty().withMessage("Category is required"),
    ]
}

const validateUser = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({ errors: error.array() });
    }
    next();
}

const validateRecipe = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({ errors: error.array() });
    }
    next();
}

module.exports = {
    validateUser,
    validateRecipe,
    userValidationRules,
    recipeValidationRules,
}