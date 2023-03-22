import { IUser } from '../domain/auth.domain';
import User from '../models/user.model';
import userService from './user.service';

const register = async (payload: IUser): Promise<IUser> => {
    const { username } = payload;
    const isDuplicated = await userService.checkDuplicatedUsername(
        payload.username,
    );
    if (isDuplicated) {
        throw `Tên người dùng '${username}' đã có người sử dụng !`;
    }
    const result = User.create(payload);
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

export default {
    register,
};
