const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token || (req.headers.Authorization || req.headers.authorization)?.split(" ")[1];

    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized request"});
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({success: false, message: "Unauthorized Access: Invalid Token"});
            }
            req.id = decoded.id;
            next();
        });
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }


}

module.exports = verifyToken;