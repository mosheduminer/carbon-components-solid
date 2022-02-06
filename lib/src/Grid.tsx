import {
  Component,
  createContext,
  JSX,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js";
import { settings } from "carbon-components";
//import { useFeatureFlag } from '../FeatureFlags';

const useFeatureFlag = (arg: string) => ({ cssGrid: false });

const { prefix } = settings;

const SubgridContext = createContext(false);

export type GridProps = {
  class?: string;
  columns?: number;
  condensed?: boolean;
  fullWidth?: boolean;
  narrow?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Grid: Component<GridProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, [
    "children",
    "class",
    "columns",
    "condensed",
    "fullWidth",
    "narrow",
  ]);
  props = mergeProps(
    { condensed: false, narrow: false, fullWidth: false, columns: 16 },
    props
  );
  const hasCSSGrid = useFeatureFlag("enable-css-grid");
  const isSubgrid = useContext(SubgridContext);

  const cssGridClassNames = () => ({
    [`${prefix}--css-grid`]: !isSubgrid,
    [`${prefix}--css-grid--${props.columns}`]:
      !isSubgrid && props.columns !== 16,
    [`${prefix}--css-grid--condensed`]: props.condensed,
    [`${prefix}--css-grid--narrow`]: props.narrow,
    [`${prefix}--css-grid--full-width`]: props.fullWidth,
    [`${prefix}--subgrid`]: isSubgrid,
    [`${prefix}--col-span-${props.columns}`]:
      (isSubgrid && props.columns !== 16) || props.columns !== 16,
  });

  const flexGridClassNames = () => ({
    [`${prefix}--grid`]: true,
    [`${prefix}--grid--condensed`]: props.condensed,
    [`${prefix}--grid--narrow`]: props.narrow,
    [`${prefix}--grid--full-width`]: props.fullWidth,
  });

  const classes = () =>
    hasCSSGrid.cssGrid ? cssGridClassNames() : flexGridClassNames();

  return (
    <SubgridContext.Provider value={true}>
      <div
        classList={{ [props.class!]: !!props.class, ...classes() }}
        {...rest}
      >
        {props.children}
      </div>
    </SubgridContext.Provider>
  );
};
