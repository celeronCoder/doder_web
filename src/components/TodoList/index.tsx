import { Todo } from "@prisma/client";
import { TodoCard } from "./TodoCard";

export const TodoList: React.FC<{ todos?: Todo[] }> = ({ todos }) => {
  if (!todos) return null;
  return (
    <div className="flex flex-col gap-5 p-10 w-2/4">
      {todos.map((todo, idx) => (
        <TodoCard key={idx} todo={todo} />
      ))}
    </div>
  );
};
