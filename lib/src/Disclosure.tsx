import { createSignal } from "solid-js";

export const useDisclosure = (id: string) => {
  const [open, setOpen] = createSignal(false);

  const buttonProps = {
    "aria-controls": id,
    "aria-expanded": open,
    onClick() {
      setOpen(!open);
    },
  };
  const contentProps = {
    id,
  };

  return {
    buttonProps,
    contentProps,
    open,
  };
};
