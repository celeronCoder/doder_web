import { Button } from "@mantine/core";
import { Priority } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { IconCalendar } from "@tabler/icons";

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

  const trpcCtx = trpc.useContext();
  const createMutation = trpc.useMutation(["todo.create"], {
    onSuccess() {
      trpcCtx.invalidateQueries(["todo.getAll"]);
    },
  });

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
            value={title}
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
            <Button leftIcon={<IconCalendar />}>Due Date</Button>
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
