import { ReactNode } from "react";

export default function Conditional({
  condition,
  children,
}: {
  condition: boolean;
  children: ReactNode;
}) {
  return condition ? children : <></>;
}

export function ConditionalParent({
  condition,
  parent,
  children,
}: {
  condition: boolean;
  children: ReactNode;
  parent: (children: ReactNode) => ReactNode;
}) {
  return condition ? parent(children) : children;
}
