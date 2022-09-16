import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";

export const TodoCard: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const trpcCtx = trpc.useContext();
  const completeMutation = trpc.useMutation(["todo.toggleComplete"], {
    onSuccess() {
      trpcCtx.invalidateQueries("todo.getAll");
    },
  });

  // setState functions don't take effect immediately and are asynchronous, they usually dispatch a trigger or action.
  // more info [here](https://reactjs.org/docs/hooks-reference.html#usestate:~:text=The%20setState%20function%20is%20used%20to%20update%20the%20state.%20It%20accepts%20a%20new%20state%20value%20and%20enqueues%20a%20re%2Drender%20of%20the%20component.).
  const complete = async () => {
    setCompleted(!completed);
    await completeMutation.mutateAsync({
      id: todo.id,
      completed: !completed,
    });
  };

  useEffect(() => {
    console.log("todo", todo);
    console.log("completed on startup", completed);
  }, []);

  useEffect(() => {
    console.log("completed", completed);
  }, [completed]);

  return (
    <div className="min-w-max rounded-lg flex items-start justify-start shadow-md gap-3 w-full border-2 border-base-content bg-base-100 p-5">
      <input
        type="checkbox"
        className="checkbox checkbox-primary mt-[0.35rem]"
        checked={completed}
        onChange={complete}
      />
      <div className="w-full flex flex-col items-start justify-start gap-1">
        <p className="text-2xl text-primary-focus">{todo.title}</p>
        <div className="w-full flex items-center justify-between">
          <p className="justify-start text-sm text-neutral-content">
            {todo.description}
          </p>
          {todo.dueDate && (
            <p
              className={`text-xs  ${
                todo.dueDate < new Date()
                  ? "text-warning"
                  : "text-neutral-content"
              } justify-end text-right`}
            >
              Due by: {todo.dueDate.toLocaleDateString("en-in")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
