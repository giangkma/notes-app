import { Response } from 'express';
import { RequestUser } from '../domain/common.domain';
import { ITask } from '../domain/task.domain';
import { responseAuthError, responseSuccess } from '../helpers/response';
import taskService from '../service/task.service';

const create = async (req: RequestUser, res: Response): Promise<Response> => {
    try {
        const { _id } = req.userInfo;
        const task: ITask = await taskService.create({
            ...req.body,
            user: _id,
        });

        return responseSuccess(res, task);
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

const getAll = async (req: RequestUser, res: Response): Promise<Response> => {
    try {
        const { _id } = req.userInfo;
        const tasks: ITask[] = await taskService.getAll(_id);
        return responseSuccess(res, tasks);
    } catch (error) {
        return responseAuthError(res, error.message ?? error);
    }
};

export default {
    create,
    getAll,
};
