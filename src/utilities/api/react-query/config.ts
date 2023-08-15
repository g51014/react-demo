import { fetchTodoById, fetchTodoList, fetchUserDetail, fetchUserList } from "@utilities/api/endpoint";

enum QueryName {
    TodoList = "todoList",
    TodoDetail = "todoDetail",
    UserList = "userList",
    UserDetail = "userDetail",
}

export const queryConfigs = {
    [QueryName.TodoList]: () => ({
        endpoint: fetchTodoList,
        key: ["todo", "list"],
    }),
    [QueryName.TodoDetail]: (id?: number) => ({
        endpoint: fetchTodoById,
        key: ["todo", id],
    }),
    [QueryName.UserList]: () => ({
        endpoint: fetchUserList,
        key: ["user", "list"],
    }),
    [QueryName.UserDetail]: (id?: number) => ({
        endpoint: fetchUserDetail,
        key: ["user", id],
    }),
};
