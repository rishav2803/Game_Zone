import { Fragment, ReactNode } from "react";
//This is like 

interface RenderIfProps {
  children: ReactNode;
  renderIf: boolean;
}

export function RenderIf(props: RenderIfProps) {
  return props.renderIf ? (
    <Fragment>{props.children}</Fragment>
  ) : (
    <Fragment></Fragment>
  );
}
