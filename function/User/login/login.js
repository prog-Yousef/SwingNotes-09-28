const { default: jsonBodyParser } = require("@middy/http-json-body-parser");
const {db} = require("../../../services/database/db");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const httpErrorHandler = require("@middy/http-error-handler");
const sendResponse = require("../../../responses/responses");
const sendError = require("../../../responses/responses");
const{  comparePassword } = require("../../../utils/bcrypt/Password");
const { generateToken } = require("../../../utils/jwt/jwt");

const login = async (event) => {
    const {username, password} = event.body;

    const params = {
        TableName: process.env.Users
    }



}
