import { HASH_ROUNDS } from '../config';
import { IUpdateProfile, IUser } from '../domain/auth.domain';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const getUserByUsername = async (username: string): Promise<IUser> => {
    const result = await User.findOne({ username });

    if (!result) {
        throw 'Người dùng không tồn tại !';
    }
    return result;
};

const checkDuplicatedUsername = async (username: string): Promise<boolean> => {
    const result = await User.findOne({ username });
    return !!result;
};

const getUserById = async (id: string): Promise<IUser> => {
    const result = await User.findOne({ _id: id });
    if (!result) {
        throw 'Người dùng không tồn tại !';
    }
    return result;
};

const updateProfile = async (
    userId: string,
    data: IUpdateProfile,
): Promise<IUser> => {
    const dataForm: IUpdateProfile = {};

    if (data.avatar) {
        dataForm.avatar = data.avatar;
    }
    if (data.displayName) {
        dataForm.displayName = data.displayName;
    }
    if (data.email) {
        dataForm.email = data.email;
    }
    if (data.phone) {
        dataForm.phone = data.phone;
    }
    if (data.password) {
        dataForm.password = await bcrypt.hash(data.password, HASH_ROUNDS);
    }
    const result = await User.findByIdAndUpdate(userId, dataForm, {
        new: true,
    });

    return result;
};

export default {
    getUserByUsername,
    checkDuplicatedUsername,
    getUserById,
    updateProfile,
};
