import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

const Login: NextPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="login-container rounded-lg border-primary-focus border-2 p-4 w-1/4 h-3/4 min-h-max min-w-max">
        <h1 className="text-2xl text-center font-bold">Doder</h1>
        <div className="divider"></div>
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <p>Sign In to get shit done!</p>
          <button
            className="btn btn-xl btn-primary"
            onClick={() => signIn("google")}
          >
            Sign In
          </button>
          <p
            onClick={() => signIn("google")}
            className="text-primary-focus text-sm text-left mt-5 cursor-pointer hover:underline underline-offset-4"
          >
            Don't have an account? Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  return {
    props: { session },
    redirect:
      session !== null
        ? {
            destination: "/",
            permanent: true,
          }
        : undefined,
  };
};
