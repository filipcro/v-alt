const { sign } = require('jsonwebtoken');

const EXPIRATION_TIME = 60 * 60 * 24 * 10; // 10 days

export const createToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username
    };
    return sign(payload, process.env.JWT_SECRET, {
        expiresIn: EXPIRATION_TIME
    });
};
