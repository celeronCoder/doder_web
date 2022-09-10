import { Todo } from "../../types/models";
import { TodoCard } from "./TodoCard";

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <div className="flex flex-col gap-5 p-10 w-2/4">
      {todos.map((todo, idx) => (
        <TodoCard key={idx} todo={todo} />
      ))}
    </div>
  );
};
