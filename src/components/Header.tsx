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
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={session.data?.user?.image as string}
                  alt={session.data?.user?.name!}
                  layout="fill"
                  className="rounded-full w-10"
                />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={() => signOut()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
