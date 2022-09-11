import { Priority } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

export const AddTodo: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("None");
  const [isEdit, setIsEdit] = useState(false);

  const cancel = () => {
    setTitle("");
    setDescription("");
    setPriority("None");
  };

  const createMutation = trpc.useMutation("todo.create");

  const create = async () => {
    await createMutation.mutateAsync({
      title,
      description,
      dueDate: new Date(),
      priority,
    });
    cancel();
  };

  useEffect(() => {
    title === "" ? setIsEdit(false) : setIsEdit(true);
  }, [title]);

  return (
    <div className="input-container flex items-center justify-center gap-5 p-10 w-2/4 min-w-max">
      {/* input box */}
      <div className="max-w-2xl w-full flex flex-col gap-2">
        <div className="border-2 border-primary px-3 py-4 rounded-lg w-full">
          {/* title input */}
          <input
            value={title!}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="block w-full font-bold placeholder:textslate-400 text-slate-300 focus-within:outline-none mb-1 bg-transparent"
          />
          {/* description textarea */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            style={{ resize: "none" }}
            className="w-full block text-sm placeholder:text-slate-600 text-slate-500 focus-within:outline-none bg-transparent"
          />
          <div className="flex items-center justify-between w-full">
            {/* Due Date */}
            <div className="text-sm border-[1px] border-slate-600 text-slate-400 rounded-md px-2 py-1 flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <p>Due Date</p>
            </div>
            {/* priority */}
            <div className="btn-group">
              <button
                className={`btn btn-xs ${
                  priority === Priority.P1 && "btn-active"
                }`}
                onClick={() => setPriority("P1")}
              >
                p1
              </button>
              <button
                className={`btn btn-xs ${
                  priority === Priority.P2 && "btn-active"
                }`}
                onClick={() => setPriority("P2")}
              >
                p2
              </button>
              <button
                className={`btn btn-xs ${
                  priority === Priority.P3 && "btn-active"
                }`}
                onClick={() => setPriority("P3")}
              >
                p3
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-end w-full">
          <button className="btn btn-outline btn-sm" onClick={cancel}>
            Cancel
          </button>
          <button
            className={`btn btn-primary btn-sm ${
              !isEdit ? "btn-disabled" : "btn-active"
            }`}
            onClick={create}
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  );
};
