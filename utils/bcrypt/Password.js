const bcrypt = require("bcryptjs");

const saltRounds = 10;

const hashedPassword = async (password) => {
    return await bcrypt.hash(password,saltRounds);
};

const comparePassword = async ( password, hasch) => {
    return await bcrypt.compare(password, hasch);
}; 

module.exports = { hashedPassword,comparePassword};