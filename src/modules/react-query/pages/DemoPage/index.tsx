import TodoCard from "@modules/react-query/components/TodoCard";
import { Todo } from "@modules/react-query/models/todo.model";
import ContentLayout from "@shared/components/ContentLayout";
import { useQuery } from "@tanstack/react-query";
import { queryConfigs } from "@utilities/api/react-query";
import { useCallback, useState } from "react";

const DemoPage = () => {
    const { endpoint, key } = queryConfigs.todoList();
    const { data } = useQuery(key, endpoint, {
        select: (data) => data.data ?? [],
    });

    const [copyList, setList] = useState<Todo[]>([]);
    // eslint-disable-next-line no-console
    const onBatchUpdate = useCallback(() => console.log(copyList), [copyList]);

    return (
        <ContentLayout testId="DemoPage">
            <button onClick={onBatchUpdate}>批量更新</button>
            <ul className="d-flex flex-column gap-2 list-unstyled">
                {data?.length &&
                    copyList.map((todo) => (
                        <li key={todo.id}>
                            <TodoCard
                                detail={{ isCopy: true, model: todo }}
                                handleOnCopy={(todo) =>
                                    setList([
                                        ...copyList,
                                        new Todo({ ...todo, ...{ id: data.length + copyList.length + 1 } }),
                                    ])
                                }
                            />
                        </li>
                    ))}
                {data?.map(({ id }) => (
                    <li key={id}>
                        <TodoCard
                            detail={{ isCopy: false, id }}
                            handleOnCopy={(todo) =>
                                setList([
                                    ...copyList,
                                    new Todo({
                                        ...todo,
                                        ...{
                                            id: data.length + copyList.length + 1,
                                            title: `${todo.title} copy`,
                                        },
                                    }),
                                ])
                            }
                        />
                    </li>
                ))}
            </ul>
        </ContentLayout>
    );
};
export default DemoPage;
