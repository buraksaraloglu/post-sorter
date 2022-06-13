import type { ReactChild } from 'react';

const Layout = ({ children }: { children: ReactChild | ReactChild[] }) => {
  return <main className="flex flex-col w-full md:flex-row">{children}</main>;
};
export default Layout;
