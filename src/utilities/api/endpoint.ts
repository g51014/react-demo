import { IBaseApiError } from "@shared/interfaces/api.interface";
import httpClient from "@utilities/api/http/http-client";
import { AxiosResponse } from "axios";
import { IApiTodo } from "./schema/todo.schema";
import { IApiUser } from "./schema/user.schema";

/**
 * @description 獲取代辦事項列表
 * @return {IApiTodo[]}
 */
export const fetchTodoList = async (): Promise<
  AxiosResponse<IApiTodo[], IBaseApiError>
> => {
  return httpClient.get<IApiTodo[]>("todos");
};

/**
 * @description 獲取代辦事項詳情
 * @return {IApiTodo}
 */
export const fetchTodoById = async (
  id: number
): Promise<AxiosResponse<IApiTodo, IBaseApiError>> => {
  return httpClient.get<IApiTodo>(`todos/${id}`);
};

/**
 * @description 取得使用者清單
 * @return {IApiUser[]}
 */
export const fetchUserList = async (): Promise<
  AxiosResponse<IApiUser[], IBaseApiError>
> => {
  return httpClient.get<IApiUser[]>(`users`);
};

/**
 * @description 取得使用者資訊
 * @return
 */
export const fetchUserDetail = async (
  id: number
): Promise<AxiosResponse<IApiUser, IBaseApiError>> => {
  return httpClient.get<IApiUser>(`users/${id}`);
};
