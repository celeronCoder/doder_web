import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AddTodo, TodoList, Wrapper } from "../components";
import { authOptions } from "./api/auth/[...nextauth]";

const todos: {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
}[] = [
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  // redirect to login if session is null i.e user isn't logged in
  const redirect =
    session === null
      ? {
          destination: "/user/login",
          permanent: false,
        }
      : undefined;
  return {
    props: {
      session,
    },
    redirect,
  };
};
