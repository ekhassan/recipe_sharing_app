const router = require("express").Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { followUser, unfollowUser } = require("../controllers/follow.controller");

router.post("/follow/:followUserId", authMiddleware, followUser);
router.post("/unfollow/:followUserId", authMiddleware, unfollowUser);

module.exports = router