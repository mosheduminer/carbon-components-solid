import {
  Accessor,
  Component,
  createContext,
  createMemo,
  mergeProps,
  useContext,
  JSX,
  children,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";

const TextDirectionContext = createContext<
  Accessor<{
    direction?: Directions;
    getTextDirection?: (text: string | string[] | undefined) => Directions;
  }>
>();

export const TextDirection: Component<TextDirectionProps> = (props) => {
  props = mergeProps({ dir: "auto" }, props);
  const value = createMemo(() => {
    return {
      direction: props.dir,
      getTextDirection: props.getTextDirection,
    };
  }, [props.dir]);

  return (
    <TextDirectionContext.Provider value={value}>
      {props.children}
    </TextDirectionContext.Provider>
  );
};

type Directions = "ltr" | "rtl" | "auto";

export type TextDirectionProps = {
  /**
   * Specify the text direction for rendered children
   */
  dir?: Directions;

  /**
   * Optionally provide a custom function to get the text direction for a piece
   * of text. Whatever is returned will become the value of the `dir` attribute
   * on a node of text. Should return one of: 'ltr', 'rtl', or 'auto'
   */
  getTextDirection?: (text: string | string[] | undefined) => Directions;
};

export const Text: Component<TextProps> = (props) => {
  props = mergeProps({ as: "span", dir: "auto" }, props);
  const [, rest] = splitProps(props, ["as", "dir", "children"]);
  const context = useContext(TextDirectionContext);
  const textProps = {} as { dir?: Directions };
  const childs = children(() => props.children);
  const value = () => {
    const value = {
      direction: context?.().direction,
    };

    if (!context) {
      textProps.dir = props.dir;
      value.direction = props.dir;
    } else {
      const { direction: parentDirection, getTextDirection } = context();

      if (getTextDirection) {
        const text = getTextFromChildren(childs());
        const override = getTextDirection(text);

        if (parentDirection !== override) {
          textProps.dir = override;
          value.direction = override;
        } else if (parentDirection === "auto") {
          textProps.dir = override;
        }
      } else if (parentDirection !== props.dir) {
        textProps.dir = props.dir;
        value.direction = props.dir;
      } else if (parentDirection === "auto") {
        textProps.dir = props.dir;
      }
    }
    return value;
  };
  return (
    <TextDirectionContext.Provider value={value}>
      <Dynamic component={props.as} {...rest} {...textProps}>
        {childs()}
      </Dynamic>
    </TextDirectionContext.Provider>
  );
};

export type TextProps = {
  /**
   * Provide a custom element type used to render the outermost node
   */
  as?: Component | string | keyof JSX.IntrinsicElements;

  /**
   * Provide child elements or text to be rendered inside of this component
   */
  children: JSX.Element;

  /**
   * Specify the text direction to be used for this component and any of its
   * children
   */
  dir?: Directions;
} & JSX.HTMLAttributes<HTMLElement>;

function getTextFromChildren(children: JSX.Element) {
  if (
    typeof children === "string" ||
    children === undefined ||
    children === null
  ) {
    return children?.toString();
  }

  if (!Array.isArray(children)) {
    return children.toString();
  }

  const text = children
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }
    })
    .filter((text) => {
      return text !== undefined;
    }) as string[];

  if (text.length === 1) {
    return text[0];
  }

  return text;
}
