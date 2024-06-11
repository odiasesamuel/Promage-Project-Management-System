// import React, {ReactNode} from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

const Main: React.FC<MainProps> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

export default Main;
