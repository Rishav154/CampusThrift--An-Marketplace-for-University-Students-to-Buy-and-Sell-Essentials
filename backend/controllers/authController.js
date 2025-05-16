const User = require("../models/User");
const passport = require("passport");

const signup = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        university,
        course,
        yearOfGrad,
        password
    } = req.body;

    try {
        let user = await User.findOne({$or: [{email}, {phone}]});

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists with given email or phone."
            });
        }

        const hashedPassword = await User.hashPassword(password);

        const newUser = new User({
            fullname: {firstname, lastname},
            email,
            phone,
            university,
            course,
            yearOfGrad,
            password: hashedPassword,
            isProfileComplete: true,
        });

        await newUser.save();

        return res
            .status(201)
            .json({success: true, message: "User registered successfully."});
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
};

const login = async (req, res) => {

    const {emailOrPhone, password} = req.body;

    try {
        if (!emailOrPhone || !password) {
            return res.status(400).json({message: "Email/Phone and password are required."});
        }

        let user;

        if (isNaN(emailOrPhone)) {
            user = await User
                .findOne({email: emailOrPhone.toLowerCase()})
                .select("+password");
        } else {
            user = await User
                .findOne({phone: Number(emailOrPhone)})
                .select("+password");
        }

        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials."});
        }

        const token = user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "Login Successful.",
            token,
            user: {
                id: user._id,
                name: `${user.fullname.firstname} ${user.fullname.lastname || ""}`,
                email: user.email,
                phone: user.phone,
                course: user.course,
                university: user.university,
                yearOfGrad: user.yearOfGrad,
                createdAt: user.createdAt,
            },
        });


    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({success: false, message: error.message});
    }
}

const completeProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        // If it's a GET request, return the user profile
        if (req.method === 'GET') {
            const user = await User.findById(userId).select("-password");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: true,
                user: {
                    id: user._id,
                    name: `${user.fullname.firstname} ${user.fullname.lastname || ""}`,
                    email: user.email,
                    phone: user.phone,
                    course: user.course,
                    university: user.university,
                    yearOfGrad: user.yearOfGrad,
                    createdAt: user.createdAt,
                    isProfileComplete: user.isProfileComplete,
                }
            });

        }

        // If it's a POST/PUT request, update the profile
        const {phone, university, course, yearOfGrad} = req.body;

        if (!phone || !university || !course || !yearOfGrad) {
            return res.status(400).json({message: "All fields are required."});
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.phone = phone;
        user.university = university;
        user.course = course;
        user.yearOfGrad = yearOfGrad;
        user.isProfileComplete = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile completed.",
            token: req.token,
            user: {
                id: user._id,
                name: `${user.fullname.firstname} ${user.fullname.lastname || ""}`,
                email: user.email,
                phone: user.phone,
                course: user.course,
                university: user.university,
                yearOfGrad: user.yearOfGrad,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        console.error("Profile operation error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error processing request"
        });
    }
}

const googleOAuthStart = passport.authenticate("google", {
    scope: ["profile", "email"]
});


const googleOAuthCallback = [
    passport.authenticate("google", {
        failureRedirect: "/login",
        session: false
    }),
    (req, res) => {
        const token = req.user.generateAuthToken();
        res.redirect(`${process.env.CLIENT_URL}/google-success?token=${token}`);
    }
];

module.exports = {signup, login, completeProfile, googleOAuthStart, googleOAuthCallback};