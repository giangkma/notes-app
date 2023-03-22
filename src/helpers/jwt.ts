import jwt from 'jsonwebtoken';
import { IUser } from '../domain/auth.domain';

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '3d';

const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || 'access-token-secret-!@#$';

/**
 * private function generateToken
 * @param user
 */
export const generateToken = (user: IUser): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        const userData = {
            _id: user._id,
            username: user.username,
        };
        jwt.sign(
            { data: userData },
            accessTokenSecret,
            {
                algorithm: 'HS256',
                expiresIn: accessTokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            },
        );
    });
};

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
export const verifyToken = (
    token: string,
    secretKey: string,
): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded: any) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded.data);
        });
    });
};
