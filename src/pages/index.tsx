import type { NextPage } from "next";

const todos: {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
}[] = [
  {
    id: "asdasdadsad",
    title: "Buy milk",
    description: "But the blue one!",
    dueDate: new Date("9/7/22"),
  },
  {
    id: "asdasdadsad",
    title: "Buy milk",
    description: "But the blue one!",
    dueDate: new Date(),
  },
  {
    id: "asdasdadsad",
    title: "Buy milk",
    description: "But the blue one!",
    dueDate: new Date(),
  },
  {
    id: "asdasdadsad",
    title: "Buy milk",
    description: "But the blue one!",
    dueDate: new Date(),
  },
  {
    id: "asdasdadsad",
    title: "Buy milk",
    description: "But the blue one!",
    dueDate: new Date(),
  },
];

const Home: NextPage = () => {
  return (
    <div className="select-none min-h-screen felx items-center justify-center w-full">
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-full">
        <div className="input-container flex items-center justify-center gap-5 p-10 w-2/4">
          <input
            placeholder="Buy Milk?"
            aria-placeholder="Add Todo"
            className="input input-primary w-full max-w-sm"
          />
          <button className="btn btn-primary">Add</button>
        </div>
        <div className="stack p-10 w-2/4 indicator">
          {todos.map((todo, idx) => (
            <div
              className="rounded-lg flex items-start justify-start shadow-md gap-3 w-full border-2 border-base-content bg-base-100 p-5"
              key={idx}
            >
              {new Date().toLocaleDateString() ===
                todo.dueDate.toLocaleDateString() ||
                (new Date().getDate() > todo.dueDate.getDate() && (
                  <span className="indicator-item badge badge-error">Due</span>
                ))}
              <input
                type="checkbox"
                className="checkbox checkbox-primary mt-[0.35rem]"
              />
              <div className="w-full flex flex-col items-start justify-start gap-1">
                <p className="text-2xl text-primary-focus">{todo.title}</p>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm text-neutral-content">
                    {todo.description}
                  </p>
                  <p
                    className={`text-xs  ${
                      todo.dueDate < new Date()
                        ? "text-secondary-focus"
                        : "text-neutral-content"
                    }`}
                  >
                    Due by: {todo.dueDate.toLocaleDateString("en-in")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
