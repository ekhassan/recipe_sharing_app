const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedToken._id;

        next();

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", err });
    }
}

module.exports = { authMiddleware };