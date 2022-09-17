import { Todo } from "@prisma/client";
import { TodoCard } from "./TodoCard";
import { Center, Container, Group } from "@mantine/core";

export const TodoList: React.FC<{ todos?: Todo[] }> = ({ todos }) => {
  if (!todos) return null;
  return (
    <Group
      style={{ flexDirection: "column", display: "flex" }}
      className="flex flex-col gap-5 p-10 w-2/4"
    >
      {todos.map((todo, idx) => (
        <TodoCard idx={idx} key={todo.id} todo={todo} />
      ))}
    </Group>
  );
};
