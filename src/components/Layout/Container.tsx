import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="max-w-133 mx-auto px-4 w-full">
      {children}
    </div>
  );
}