import { type ReactNode } from "react";

type PageHeaderProps = {
  id?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
};

const PageHeader = ({ id, title, lede, children }: PageHeaderProps) => {
  return (
    <header className="h-page-header h-reveal">
      <h1 id={id} className="h-page-title">
        {title}
      </h1>
      {lede ? <p className="h-page-lede">{lede}</p> : null}
      {children}
    </header>
  );
};

export default PageHeader;
