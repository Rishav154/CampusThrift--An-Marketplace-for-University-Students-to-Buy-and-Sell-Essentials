const User = require('../models/User');

const changePassword = async (req, res) => {
    try {
        const {emailOrPhone, previousPassword, newPassword} = req.body;

        if (!previousPassword || !newPassword) {
            return res.status(400).json({success: false, message: 'Password is required'});

        }

        let user;
        if (!isNaN(emailOrPhone)) {
            user = await User.findOne({phone: Number(emailOrPhone)}).select('+password');
        } else {
            user = await User.findOne({email: emailOrPhone}).select('+password');
        }

        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        const isMatch = await user.comparePassword(previousPassword);

        if (!isMatch) {
            return res.status(400).json({success: false, message: 'Invalid Password'});
        }

        const newPasswordHashed = await User.hashPassword(newPassword);

        user.password = newPasswordHashed;
        await user.save();
        return res.status(200).json({success: true, message: 'Password changed successfully'});

    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

const changePhone = async (req, res) => {
    try {
        const {email, password, newPhone} = req.body;

        // Validate inputs
        if (!email || !password || !newPhone) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and new phone number are required'
            });
        }

        // Validate phone number format (must be a number)
        if (isNaN(Number(newPhone))) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must contain only digits'
            });
        }

        // Find the user by email with password included
        const user = await User.findOne({email}).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }


        // Verify password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Check if the new phone number is already in use
        const phoneExists = await User.findOne({phone: Number(newPhone)});

        if (phoneExists && phoneExists._id.toString() !== user._id.toString()) {
            return res.status(409).json({
                success: false,
                message: 'Phone number already in use'
            });
        }

        // Update phone number
        user.phone = Number(newPhone);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Phone number updated successfully'
        });

    } catch (err) {
        console.error('Error changing phone number:', err);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

module.exports = {changePassword, changePhone};