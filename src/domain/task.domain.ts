import { Document, Types } from 'mongoose';

export interface ICreateTask {
    title: string;
    user: Types.ObjectId;
}

export interface ITask extends ICreateTask, Document {
    pinEnable: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    deletedAt?: Date;
    modifiedAt?: Date;
}
