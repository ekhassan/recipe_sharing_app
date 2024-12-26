const Recipe = require("../models/recipe.model");


const getAllRecipes = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const recipes = await Recipe.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalRecipes = await Recipe.countDocuments();

        return res.status(200).json({
            message: "Recipe fetched successfully",
            recipes,
            total: totalRecipes,
            page: Number(page),
            totalPages: Math.ceil(totalRecipes / limit),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

const addRecipe = async (req, res) => {
    try {
        const userId = req.userId
        const { image, videoUrl, title, notes, details, ingredients, directions, tags, ratings, under30min } = req.body;

        const recipe = await Recipe.create({ image, videoUrl, title, ingredients, details, notes, directions, under30min, tags, ratings, userId });

        return res.status(201).json({ message: "Recipe Created Successfully", recipe })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

const getRecipe = async (req, res) => {
    try {
        const { id } = req.params

        const recipe = await Recipe.findById(id).populate('userId', "username displayPicture");

        if (!recipe) {
            return res.status(404).json({ message: "No Recipe Found" })
        }
        return res.status(200).json({ message: "Recipe fetched Successfully", recipe })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: "No Recipe Found" });
        }
        if (req.userId.toString() !== recipe.userId.toString()) {
            return res.status(403).json({ message: "Only Owner Can Update the Recipe" });
        }

        await Recipe.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).json({ message: "Recipe Updated Successfully", recipe });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;


        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ message: "No Recipe Found" });
        }

        if (req.userId.toString() !== recipe.userId.toString()) {
            return res.status(403).json({ message: "Only Owner Can Delete the Recipe" });
        }

        await Recipe.findByIdAndDelete(id);

        return res.status(200).json({ message: "Recipe Deleted Successfully", recipe });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}


module.exports = {
    getAllRecipes,
    addRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe
}