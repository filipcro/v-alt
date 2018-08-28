import * as JWTMiddleware from 'express-jwt';

export const authorize = JWTMiddleware({ 
    secret: process.env.JWT_SECRET 
});