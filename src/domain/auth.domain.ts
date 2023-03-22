import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    displayName: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

export interface IUpdateProfile {
    password?: string;
    avatar?: string;
    email?: string;
    phone?: string;
    displayName?: string;
}
