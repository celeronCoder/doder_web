import { Todo } from "@prisma/client";
import { TodoCard } from "./TodoCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const TodoList: React.FC<{ todos?: Todo[] }> = ({ todos }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>({
    duration: 500,
    easing: "ease-out",
    disrespectUserMotionPreference: true,
  });

  if (!todos) return null;
  return (
    <div ref={parent} className="flex flex-col gap-5 p-10 w-2/4">
      {todos.map((todo, idx) => (
        <TodoCard key={idx} todo={todo} />
      ))}
    </div>
  );
};
