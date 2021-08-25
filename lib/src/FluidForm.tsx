import {
  createContext,
  useContext,
  Component,
  JSX,
  splitProps,
} from "solid-js";
import { Form } from "./Form";

export const FormContext = createContext({
  isFluid: false,
});

export const useFormContext = useContext(FormContext);

export type FluidFormProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export const FluidForm: Component<FluidFormProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLFormElement>;
  [props, rest] = splitProps(props, ["class"]);
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <Form class={props.class} {...rest}>
        {props.children}
      </Form>
    </FormContext.Provider>
  );
};
