const jwt = require("jsonwebtoken");


const generateNewToken = (userId) => {
    return jwt.sign({userId},process.env.JWT_KEY,{expiresIn:"1d"}) 
};

module.exports = generateNewToken