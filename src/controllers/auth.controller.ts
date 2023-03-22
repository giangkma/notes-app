import { Request, Response } from 'express';
import { IUser } from '../domain/auth.domain';
import { RequestUser } from '../domain/common.domain';
import { generateToken } from '../helpers/jwt';
import { responseAuthError, responseSuccess } from '../helpers/response';
import authService from '../service/auth.service';
import userService from '../service/user.service';

const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body;
        const user: any = await userService.getUserByUsername(username);

        if (!user) throw new Error('Sai tên đăng nhập !');
        if (!(await user.isPasswordMatch(password))) {
            throw new Error('Mật khẩu không đúng !');
        }
        const accessToken = await generateToken(user);
        return responseSuccess(res, {
            accessToken,
        });
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: IUser = await authService.register(req.body);
        const accessToken = await generateToken(user);

        return responseSuccess(res, {
            accessToken,
        });
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const getProfile = async (
    req: RequestUser,
    res: Response,
): Promise<Response> => {
    try {
        const { _id } = req.userInfo;
        const user: IUser = await userService.getUserById(_id);
        return responseSuccess(res, user);
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const updateProfile = async (
    req: RequestUser,
    res: Response,
): Promise<Response> => {
    try {
        const { _id } = req.userInfo;
        const user: IUser = await userService.updateProfile(_id, req.body);
        return responseSuccess(res, user);
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

export default {
    login,
    register,
    getProfile,
    updateProfile,
};
