import { Button, ButtonProps } from "./Button";

export const DangerButton = (props: ButtonProps) => (
  <Button kind="danger" {...props} />
);

export default DangerButton;
