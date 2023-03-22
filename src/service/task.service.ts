import { ICreateTask, ITask } from '../domain/task.domain';
import Task from '../models/task.model';

const create = async (payload: ICreateTask): Promise<ITask> => {
    const result = Task.create(payload);
    return result;
};

const getAll = async (user: string): Promise<ITask[]> => {
    const result = Task.find({ user }).populate('user');
    return result;
};

const getById = async (user: string, id: string): Promise<ITask> => {
    const result = Task.findOne({ user, id }).populate('user');
    return result;
};

export default {
    create,
    getAll,
    getById,
};
