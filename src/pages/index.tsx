import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { TodoList, Wrapper } from "../components";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  const { data: todos } = trpc.useQuery(["todo.getAll"]);

  return (
    <Wrapper>
      <div className="flex flex-col gap-2 items-center justify-center min-h-screen w-full">
        {/* <AddTodo /> */}
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
