import TodoCard from "@modules/react-query/components/TodoCard";
import ContentLayout from "@shared/components/ContentLayout";
import { useQuery } from "@tanstack/react-query";
import { queryConfigs } from "@utilities/api/react-query";

const DemoPage = () => {
  const { endpoint, key } = queryConfigs.todoList();
  const { data } = useQuery(key, endpoint, {
    select: (data) => data.data ?? [],
  });

  return (
    <ContentLayout testId="DemoPage">
      <ul className="d-flex flex-column gap-2 list-unstyled">
        {data?.map(({ id }) => (
          <li key={id}>
            <TodoCard id={id} />
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
};
export default DemoPage;
