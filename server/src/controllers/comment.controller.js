const Comment = require('../models/comment.model');


const getComment = async (req, res) => {
    try {
        const { recipeId } = req.params

        const comments = await Comment.find({ recipeId }).populate('userId', "username displayPicture");

        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found" })
        }
        const formattedComments = comments.map(comment => ({
            content: comment.content,
            createdAt: comment.createdAt,
            user: {
                username: comment.userId.username,
                displayPicture: comment.userId.displayPicture,
            }
        }));
        return res.status(200).json({ message: "Comments fetched Successfully", formattedComments })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal server error", err })
    }
}

const postComment = async (req, res) => {
    try {
        const { recipeId } = req.params
        const { content } = req.body
        const userId = req.userId

        console.log(content)

        if (!content) {
            return res.status(400).json({ message: "Content is required" })
        }

        const comment = await Comment.create({ recipeId, content, userId })

        return res.status(201).json({ message: "Comment created Successfully", comment })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" }, err)
    }
}

module.exports = {
    getComment,
    postComment
}