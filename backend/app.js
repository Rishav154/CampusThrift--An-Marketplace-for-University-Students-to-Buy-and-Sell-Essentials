const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db');
const {readdirSync} = require("fs");
const session = require("express-session");
const passport = require("passport");
require("./passport");

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Session and Passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
connectToDB();

// Health check
app.get("/health", (req, res) => {
    res.send("The server is running!");
});

readdirSync("./routes").forEach((route) => {
    app.use("/api", require(`./routes/${route}`));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
