import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { HASH_ROUNDS } from '../config';
import { IUser } from '../domain/auth.domain';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            private: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    { versionKey: false },
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password: string) {
    const user = this as IUser;
    return bcrypt.compare(password, user.password);
};

UserSchema.pre('save', async function (next) {
    const user = this as IUser;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, HASH_ROUNDS);
    }
    next();
});

// delete password when return user
UserSchema.set('toJSON', {
    transform: function (_, ret) {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model('User', UserSchema);

export default User;
