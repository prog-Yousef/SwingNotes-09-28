const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "1h",
    });
    return token;
};

const validateToken = (token) => { 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch ( error) {
        throw new Error ("wrong token");
    }
};


module.exports = { generateToken, validateToken};





