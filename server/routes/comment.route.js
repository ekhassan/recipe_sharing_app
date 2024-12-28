const router = require('express').Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getComment, postComment } = require('../controllers/comment.controller')

router.get('/:recipeId', getComment)
router.post('/:recipeId', authMiddleware, postComment)

module.exports = router