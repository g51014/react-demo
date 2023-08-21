import { Status } from "@shared/enums/common.enum";
import { IApiTodo } from "@utilities/api/schema/todo.schema";
import { IApiUser } from "@utilities/api/schema/user.schema";

interface ITodo {
    status: Status;
    title: string;
    id: number;
    creator: string;
}

type StatusConfig = {
    theme: string;
    text: string;
};

/**
 * @description explan what this model doing here
 * @implements ITodo
 */
export class Todo implements ITodo {
    public status: Status = Status.Unknow;
    public title!: string;
    public id!: number;
    public creator!: string;
    constructor(exist: ITodo);
    constructor(todo: IApiTodo, user: IApiUser);
    constructor(...args: any[]) {
        if (args.length > 1) {
            const [{ completed, ...todoInfo }, { username: creator }] = args as [IApiTodo, IApiUser];
            Object.assign(this, { ...todoInfo, creator });
            this.status = completed ? Status.Complete : Status.Pending;
        } else {
            Object.assign(this, args[0] as ITodo);
        }
    }

    public getStatusConfig(): StatusConfig {
        switch (this.status) {
            case Status.Complete:
                return {
                    theme: "success",
                    text: "已完成",
                };
            case Status.Pending:
                return {
                    theme: "danger",
                    text: "未完成",
                };
            default:
                return {
                    theme: "warning",
                    text: "異常",
                };
        }
    }
}
