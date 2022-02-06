import {
  Component,
  Switch,
  Match,
  children,
  JSX,
  createEffect,
  splitProps,
  Show,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { settings } from "carbon-components";
import { OverflowMenu } from "./OverflowMenu";
import { Link } from "./Link";
import { OverflowMenuHorizontal16 } from "./icons/icons/OverflowMenuHorizontal16";

const { prefix } = settings;

export type BreadcrumbItemProps = {
  "aria-current"?: string | boolean;
  class?: string;
  href?: string;
  isCurrentPage?: boolean;
  ref?: HTMLLIElement;
} & JSX.HTMLAttributes<HTMLLIElement>;

export const BreadcrumbItem: Component<BreadcrumbItemProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLLIElement>;
  [props, rest] = splitProps(props, [
    "aria-current",
    "children",
    "class",
    "href",
    "isCurrentPage",
    "ref",
  ]);

  const classList = () => ({
    [`${prefix}--breadcrumb-item`]: true,
    [`${prefix}--breadcrumb-item--current`]:
      props.isCurrentPage && props["aria-current"] !== "page",
    [props.class!]: !!props.class,
  });
  const chlds = children(() => props.children) as () => JSX.Element;

  console.log(typeof chlds());

  return (
    <Switch
      fallback={() => {
        createEffect(() => {
          (chlds()! as HTMLElement).classList.add(`${prefix}--link`);
          if (props["aria-current"]) {
            (chlds()! as HTMLElement).setAttribute("aria-current", "true");
          } else {
            (chlds()! as HTMLElement).removeAttribute("aria-current");
          }
        });
        return (
          <li
            classList={classList()}
            //@ts-ignore
            ref={(e) => props.ref && props.ref(e)}
            {...rest}
          >
            {chlds()}
          </li>
        );
      }}
    >
      <Match when={typeof chlds() === "string"}>
        <li
          classList={classList()}
          //@ts-ignore
          ref={(e) => props.ref && props.ref(e)}
          {...rest}
        >
          <Show
            when={props.href}
            fallback={<span class={`${prefix}--link`}>{chlds()}</span>}
          >
            <Link href={props.href!} aria-current={props["aria-current"]}>
              {chlds()}
            </Link>
          </Show>
        </li>
      </Match>
      <Match when={typeof chlds() === "function"}>
        <li classList={classList()} {...rest}>
          <Dynamic
            component={chlds() as typeof OverflowMenu}
            menuOptionsClass={`${prefix}--breadcrumb-menu-options`}
            menuOffset={{ top: 10, left: 59 }}
            renderIcon={(props: JSX.HTMLAttributes<SVGSVGElement>) => (
              <OverflowMenuHorizontal16
                class={`${prefix}--overflow-menu__icon`}
                {...props}
              />
            )}
          />
        </li>
      </Match>
    </Switch>
  );
};
