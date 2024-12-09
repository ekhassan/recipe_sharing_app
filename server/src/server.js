// env Config
require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require("./db/db");

const authRoutes = require("./routes/auth.route");


connectDB();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["*"],
    credentials: true
}))
app.use(cookieParser());
app.use(morgan('dev'));

// Test Route
app.get("/", (req, res) => {
    res.send("Hello World");
})

// Routes
app.use('/api/auth', authRoutes);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})