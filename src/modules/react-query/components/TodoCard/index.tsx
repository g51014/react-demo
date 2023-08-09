import { Todo } from "@modules/react-query/models/todo.model";
import { useQuery } from "@tanstack/react-query";
import { queryConfigs } from "@utilities/api/react-query";
import { useMemo } from "react";

interface Props {
  id: number;
}
const TodoCard = ({ id }: Props) => {
  const { endpoint, key } = queryConfigs.todoDetail(id);
  const { data: todoDetail } = useQuery(key, () => endpoint(id), {
    select: (data) => data.data ?? undefined,
  });

  const { endpoint: userEndpoint, key: userKey } = queryConfigs.userDetail(
    todoDetail?.userId
  );
  const { data: userDetail } = useQuery(
    userKey,
    () => userEndpoint(todoDetail!.userId),
    {
      select: (data) => data.data ?? undefined,
      enabled: !!todoDetail?.userId,
    }
  );

  const model = useMemo(
    () =>
      todoDetail && userDetail ? new Todo(todoDetail, userDetail) : undefined,
    [todoDetail, userDetail]
  );
  return (
    <>
      {model && (
        <table className="border w-100">
          <tbody>
            <tr>
              <th className="p-2" style={{ width: 120 }}>
                主題
              </th>
              <td className="p-2">{model.title}</td>
            </tr>
            <tr>
              <th className="p-2" style={{ width: 120 }}>
                創建人
              </th>
              <td className="p-2">{model.creator}</td>
            </tr>
            <tr>
              <th className="p-2" style={{ width: 120 }}>
                狀態
              </th>
              <td className="p-2">
                <small
                  style={{ borderRadius: "0.5rem" }}
                  className={`px-2 py-1 fs-sm border border-${
                    model.getStatusConfig().theme
                  }`}
                >
                  {model.getStatusConfig().text}
                </small>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export default TodoCard;
