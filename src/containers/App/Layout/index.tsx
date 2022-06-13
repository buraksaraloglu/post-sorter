import type { ReactChild } from 'react';

const Layout = ({ children }: { children: ReactChild | ReactChild[] }) => {
  return <main className="flex flex-col w-full md:flex-row lg:mx-auto lg:max-w-screen-xl">{children}</main>;
};
export default Layout;
