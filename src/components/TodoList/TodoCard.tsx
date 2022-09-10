import { Todo } from "../../types/models";

export const TodoCard: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <div className="rounded-lg flex items-start justify-start shadow-md gap-3 w-full border-2 border-base-content bg-base-100 p-5">
      <input
        type="checkbox"
        className="checkbox checkbox-primary mt-[0.35rem]"
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
