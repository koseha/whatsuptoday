import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function BasicContainer({ children }: Props) {
  return <div className="surface-card p-4 text-center bg-background-container">{children}</div>;
}
