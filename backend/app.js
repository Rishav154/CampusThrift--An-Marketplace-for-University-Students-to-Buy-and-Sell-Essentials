const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db/db');
const userModel = require('./models/user.model');
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

connectToDB();

app.get("/health", (req, res) => {
    res.send("The server is running!");
});

//SIGNUP AND LOGIN ROUTES

app.post("/api/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, phone, university, course, yearOfGrad, password } = req.body;

        if (!firstname || !email || !phone || !university || !course || !yearOfGrad || !password) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        const existingUser = await userModel.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with given email or phone." });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const newUser = new userModel({
            fullname: { firstname, lastname },
            email,
            phone,
            university,
            course,
            yearOfGrad,
            password: hashedPassword,
        });

        await newUser.save();

        const token = newUser.generateAuthToken();

        res.status(201).json({
            message: "User registered successfully.",
            token,
            user: {
                id: newUser._id,
                name: `${firstname} ${lastname}`,
                email,
                phone,
                university,
                course,
                yearOfGrad,
            },
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;

        if (!emailOrPhone || !password) {
            return res.status(400).json({ message: "Email/Phone and password are required." });
        }

        let user;

        if (isNaN(emailOrPhone)) {
            user = await userModel
                .findOne({ email: emailOrPhone.toLowerCase() })
                .select("+password");
        } else {
            user = await userModel
                .findOne({ phone: Number(emailOrPhone) })
                .select("+password");
        }

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = user.generateAuthToken();

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: `${user.fullname.firstname} ${user.fullname.lastname}`,
                email: user.email,
                phone: user.phone,
                course: user.course,
                yearOfGrad: user.yearOfGrad,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
