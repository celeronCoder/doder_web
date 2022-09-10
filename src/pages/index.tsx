import type { NextPage } from "next";
import { AddTodo, TodoList, Wrapper } from "../components";
import { Todo } from "../types/models";

const todos: Todo[] = [
  {
    id: "asdasdadsad",
    title: "Buy milk",
    description: "But the blue one!",
  },
  {
    id: "asdasdadsad",
    title: "Buy milk",
    dueDate: new Date(),
  },
  {
    id: "asdasdadsad",
    title: "Buy milk",
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
    dueDate: new Date(),
    description: "But the blue one!",
  },
];

const Home: NextPage = () => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-2 items-center justify-center min-h-screen w-full">
        <AddTodo />
        <TodoList todos={todos} />
      </div>
    </Wrapper>
  );
};

export default Home;
