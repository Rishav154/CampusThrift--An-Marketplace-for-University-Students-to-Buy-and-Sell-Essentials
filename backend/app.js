const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db');
const {readdirSync} = require("fs")
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

connectToDB();

app.get("/health", (req, res) => {
    res.send("The server is running!");
});

//dynamically load all routes
readdirSync("./routes").map((route) => {
    app.use("/api", require(`./routes/${route}`));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
