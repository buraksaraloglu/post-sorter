import type { ReactChild } from 'react';

const Card = ({ children, ...props }: { children: ReactChild | ReactChild[] }) => {
  return (
    <div className="flex gap-4 justify-between items-center p-4 my-4 w-full bg-slate-100 rounded-2xl" {...props}>
      {children}
    </div>
  );
};

export default Card;
