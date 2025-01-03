// env Config
require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require("./db/db");

const authRoutes = require("./routes/auth.route");
const recipeRoutes = require("./routes/recipe.route");
const commentRoutes = require("./routes/comment.route");
const followeRoutes = require("./routes/follow.route");


connectDB();
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.10.5:5173", "https://freshlyy.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


// Test Route
app.get("/", (_, res) => {
    res.json({ message: "Hello from the back-end of freshly!" });
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/', followeRoutes);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})