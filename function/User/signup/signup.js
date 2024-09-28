const { db } = require("../../../services/database/db");
const {v4: uuidv4} = require('uuid');
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const httpErrorHandler = require("@middy/http-error-handler");
const {hashedPassword} = require("../../../utils/bcrypt/Password");
const sendResponse = require("../../../responses/responses");
const sendError = require("../../../responses/responses");

const signup = async (event) => {
/*     const { username, password } = JSON.parse(event.body);
 */    
const {username,password} = event.body;

    if(!username || !password) {
        return sendError(400, "username and password are required");
    };
}


try {
//HASH PASSWORD
const hashPassword = await hashedPassword(password);
    const userId = uuidv4();
        // Define DynamoDB parameters

const params = {
    TableName: process.env.USERS_TABLE,
    Item: { userId, 
        username,
        password: 
        hashPassword},
        createdAt: new Date().toISOString()
};
await db.put(params);

return sendResponse({ success: true, message: 'user created' });

} catch (error) {
    console.error('Signup error:', error);
    return sendError(500, "could not create user");
    
};

module.exports.handler = middy(signup).use(jsonBodyParser()).use(httpErrorHandler());