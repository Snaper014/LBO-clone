import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className={`w-full min-[1425px]:w-[1422px] relative flex flex-col items-center`}
    >
      {children}
    </div>
  );
};
