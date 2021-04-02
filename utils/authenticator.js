import jwt  from 'jsonwebtoken';
// const config = from 'app/config');
// const { client: redisClient } = from 'app/libs/redis');
const secretKey = "heo";

const jwtOptions = {
    expiresIn: '1h'
};

module.exports = {
    getToken: (userId) => {
        const token = jwt.sign({ userId }, secretKey, jwtOptions);
        return token;
    },
    verifyToken: async(token) => {
        try {
            const { userId } = jwt.verify(token, secretKey);
            return userId;
        } catch (error) {
            throw error;
        }
    },
    // expiryToken: async(token) => {
    //     await redisClient.setAsync(token, 'logouted', 'EX', config.jwt.expiry);
    //     return;
    // }
}; 