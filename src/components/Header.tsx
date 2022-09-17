import { Avatar } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export const Header: React.FC = () => {
  const session = useSession();

  useEffect(() => {
    console.log(session.data?.user?.image);
  }, []);

  if (!session) return null;
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl font-heading">Doder</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <Avatar src={session.data?.user?.image} />
      </div>
    </div>
  );
};
