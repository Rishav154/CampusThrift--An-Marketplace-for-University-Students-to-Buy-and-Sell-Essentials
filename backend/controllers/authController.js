const User = require("../models/User");

const signup = async (req, res) => {
    const {firstname, lastname, email, phone, university, course, yearOfGrad, password} = req.body;

    try {

        let user = await User.findOne({$or: [{email}, {phone}]});

        if (user) {
            return res.status(409).json({success: false, message: "User already exists with given email or phone."});
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
        });

        await newUser.save();

        return res.status(201).json({success: true, message: "User registered successfully."});

    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }

}

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
            message: "Login successfull.",
            token,
            user: {
                id: user._id,
                name: `${user.fullname.firstname} ${user.fullname.lastname}`,
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

module.exports = {signup, login};