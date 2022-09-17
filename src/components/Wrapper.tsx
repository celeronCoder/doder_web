import React from "react";
import { Header } from "./Header";

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="select-none min-h-screen felx items-center justify-center w-full">
      <Header />
      {/* {children} */}
    </div>
  );
};
