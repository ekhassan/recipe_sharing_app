const Follow = require("../models/follow.model");
const User = require("../models/user.model");


const followUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { followUserId } = req.params;

        if (userId === followUserId) {
            return res.status(400).json({ message: "You can not follow yourself" })
        }

        const userToFollow = await User.findById(followUserId);
        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingFollow = await Follow.findOne({
            follower: userId,
            following: followUserId
        });
        if (existingFollow) {
            return res.status(400).json({ message: "You are already following this user" });
        }

        const followEntry = new Follow({
            follower: userId,
            following: followUserId
        });
        await followEntry.save();

        return res.status(200).json({ message: "Followed successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};


const unfollowUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { followUserId } = req.params;
        if (userId === followUserId) {
            return res.status(400).json({ message: "You can not Unfollow yourself" })
        }

        const existingFollow = await Follow.findOne({
            follower: userId,
            following: followUserId
        });
        if (!existingFollow) {
            return res.status(404).json({ message: "You are not following this user" });
        }

        await Follow.deleteOne({
            follower: userId,
            following: followUserId
        });

        return res.status(200).json({ message: "Unfollowed successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error", err });
    }
};

module.exports = { followUser, unfollowUser };


module.exports = {
    followUser,
    unfollowUser
}