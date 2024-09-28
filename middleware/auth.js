const middy = require("@middy/core");
const createError = require("http-errors");
const { validateToken } = require("../utils/jwt/jwtUtils");

const authMiddleware = () => {
  return {
    before: async (handler) => {
      const { headers } = handler.event;
      // Case-insensitive header lookup
      const authToken = headers.Authorization || headers.authorization;

      if (!authToken) {
        throw new createError.Unauthorized("Unauthorized");
      }

      try {
        // Assuming the token is in the "Bearer <token>" format
        const token = authToken.split(" ")[1];
        const decoded = validateToken(token);
        handler.event.user = decoded; // Attach the decoded user to the event
      } catch (error) {
        console.error("Token verification failed:", error.message);
        throw new createError.Unauthorized("Unauthorized");
      }
    },
  };
};

module.exports = authMiddleware;




















/* 
const validateToken = {
    before: async (request) => {
        try {
            const token = request.event.headers.authorization.replace('Bearer ', '');

            if (!token) throw new Error();

            const data = jwt.verify(token, 'a1b1c1');
            request.event.id = data.id;
            request.event.username = data.username;

            return request.response;
        } catch (error) {
            request.event.error = '401';
            return request.response;
        }
    },
    onError: async (request) => {
        request.event.error = '401';
        return request.response;
    }
};
 */