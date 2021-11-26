import { Component, createSignal, JSX, mergeProps, splitProps, Switch, Match } from "solid-js";
import { createId } from "./internal/id";
import { Copy } from "./Copy";
import { CopyButton } from "./CopyButton";
import { Button } from "./Button";
import { ChevronDown16 } from "../icons/icons/ChevronDown16";
import useResizeObserver from "./internal/ResizeObserver";
import copy from "copy-to-clipboard";
import debounce from "lodash.debounce";
import { composeEventHandlers } from "./internal/events";
import { usePrefix } from "./internal/usePrefix";

export type CodeSnippetProps = {
  ariaLabel?: string;
  children: string;
  class?: string;
  copyButtonDescription?: string;
  disabled?: boolean;
  feedback?: string;
  feedbackTimeout?: number;
  hideCopyButton?: boolean;
  light?: boolean;
  maxCollapsedNumberOfRows?: number;
  maxExpandedNumberOfRows?: number;
  minCollapsedNumberOfRows?: number;
  minExpandedNumberOfRows?: number;
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  showLessText?: string;
  showMoreText?: string;
  type?: "single" | "inline" | "multi";
  wrapText?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement | HTMLButtonElement>;

const rowHeightInPixels = 16;
const defaultMaxCollapsedNumberOfRows = 15;
const defaultMaxExpandedNumberOfRows = 0;
const defaultMinCollapsedNumberOfRows = 3;
const defaultMinExpandedNumberOfRows = 16;

const getCodeRefDimensions = (codeRef: HTMLElement) => {
  const {
    clientWidth: codeClientWidth,
    scrollLeft: codeScrollLeft,
    scrollWidth: codeScrollWidth,
  } = codeRef;

  return {
    horizontalOverflow: codeScrollWidth > codeClientWidth,
    codeClientWidth,
    codeScrollWidth,
    codeScrollLeft,
  };
};

/// TODO
export const CodeSnippet: Component<CodeSnippetProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement | HTMLButtonElement>;
  [props, rest] = splitProps(props, [
    "ariaLabel",
    "children",
    "class",
    "copyButtonDescription",
    "disabled",
    "feedback",
    "feedbackTimeout",
    "hideCopyButton",
    "light",
    "maxCollapsedNumberOfRows",
    "maxExpandedNumberOfRows",
    "minCollapsedNumberOfRows",
    "minExpandedNumberOfRows",
    "onClick",
    "showLessText",
    "showMoreText",
    "type",
    "wrapText",
  ]);
  props = mergeProps(
    {
      maxCollapsedNumberOfRows: defaultMaxCollapsedNumberOfRows,
      maxExpandedNumberOfRows: defaultMaxExpandedNumberOfRows,
      minCollapsedNumberOfRows: defaultMinCollapsedNumberOfRows,
      minExpandedNumberOfRows: defaultMinExpandedNumberOfRows,
      type: "single",
      showMoreText: "Show more",
      showLessText: "Show less",
      wrapText: false,
    },
    props
  );
  const [expandedCode, setExpandedCode] = createSignal(false);
  const [shouldShowMoreLessBtn, setShouldShowMoreLessBtn] = createSignal(false);
  const uid = createId();
  let codeContentRef!: HTMLPreElement;
  let codeContainerRef!: HTMLDivElement;
  const [hasLeftOverflow, setHasLeftOverflow] = createSignal(false);
  const [hasRightOverflow, setHasRightOverflow] = createSignal(false);
  const getCodeRef = () => {
    if (props.type === "single") {
      return codeContainerRef;
    }
    if (props.type === "multi") {
      return codeContentRef;
    }
  };

  const handleScroll = () => {
    const type = props.type;
    if (
      type === "inline" ||
      (type === "single" && !codeContainerRef) ||
      (type === "multi" && !codeContentRef)
    ) {
      return;
    }

    const {
      horizontalOverflow,
      codeClientWidth,
      codeScrollWidth,
      codeScrollLeft,
    } = getCodeRefDimensions(getCodeRef()!);

    setHasLeftOverflow(horizontalOverflow && !!codeScrollLeft);
    setHasRightOverflow(
      horizontalOverflow && codeScrollLeft + codeClientWidth !== codeScrollWidth
    );
  };

  handleScroll();

  const ref = useResizeObserver({
    onResize: () => {
      if (codeContentRef && props.type === 'multi') {
        const { height } = codeContentRef.getBoundingClientRect();

        if (
          props.maxCollapsedNumberOfRows! > 0 &&
          (props.maxExpandedNumberOfRows! <= 0 ||
            props.maxExpandedNumberOfRows! > props.maxCollapsedNumberOfRows!) &&
          height > props.maxCollapsedNumberOfRows! * rowHeightInPixels
        ) {
          setShouldShowMoreLessBtn(true);
        } else {
          setShouldShowMoreLessBtn(false);
        }
        if (
          expandedCode() &&
          props.minExpandedNumberOfRows! > 0 &&
          height <= props.minExpandedNumberOfRows! * rowHeightInPixels
        ) {
          setExpandedCode(false);
        }
      }
      if (
        (codeContentRef && props.type === 'multi') ||
        (codeContainerRef && props.type === 'single')
      ) {
        debounce(handleScroll, 200);
      }
    }
  });

  const handleCopyClick = (evt: MouseEvent) => composeEventHandlers([() => copy(props.children), props.onClick]);

  const prefix = usePrefix();

  const classes = () => (
    {
      [props.class!]: !!props.class,
      [`${prefix}--snippet--${props.type}`]: !!props.type,
      [`${prefix}--snippet--disabled`]: props.type !== 'inline' && props.disabled,
      [`${prefix}--snippet--expand`]: expandedCode(),
      [`${prefix}--snippet--light`]: props.light,
      [`${prefix}--snippet--no-copy`]: props.hideCopyButton,
      [`${prefix}--snippet--wraptext`]: props.wrapText,
    }
  );

  const expandCodeBtnText = () => expandedCode() ? props.showLessText : props.showMoreText;

  const styles = () => {
    const styles: { "min-height"?: string; "max-height"?: string } = {};
    if (expandedCode()) {
      if (props.maxExpandedNumberOfRows! > 0) {
        styles["max-height"] = `${props.maxExpandedNumberOfRows! * rowHeightInPixels}px`;
      }
      if (props.minExpandedNumberOfRows! > 0) {
        styles["min-height"] = `${props.minExpandedNumberOfRows! * rowHeightInPixels}px`;
      }
    } else {
      if (props.maxCollapsedNumberOfRows! > 0) {
        styles["max-height"] = `${props.maxCollapsedNumberOfRows! * rowHeightInPixels}px`;
      }
      if (props.minCollapsedNumberOfRows! > 0) {
        styles["min-height"] = `${props.minCollapsedNumberOfRows! * rowHeightInPixels}px`;
      }
    }
    return styles;
  }

  return (
    <Switch fallback={
      <div {...rest as JSX.HTMLAttributes<HTMLDivElement>} class={`${prefix}--snippet`} classList={classes()}>
        <div
          ref={codeContainerRef}
          role={props.type === 'single' ? 'textbox' : undefined}
          tabIndex={props.type === 'single' && !props.disabled ? 0 : undefined}
          class={`${prefix}--snippet-container`}
          aria-label={props.ariaLabel || 'code-snippet'}
          onScroll={(props.type === 'single' && handleScroll) || undefined}
          style={styles()}>
          <pre
            ref={codeContentRef}
            onScroll={(props.type === 'multi' && handleScroll) || undefined}>
            <code>{props.children}</code>
          </pre>
        </div>
        {/**
         * left overflow indicator must come after the snippet due to z-index and
         * snippet focus border overlap
         */}
        {hasLeftOverflow() && (
          <div class={`${prefix}--snippet__overflow-indicator--left`} />
        )}
        {hasRightOverflow() && (
          <div class={`${prefix}--snippet__overflow-indicator--right`} />
        )}
        {!props.hideCopyButton && (
          <CopyButton
            disabled={props.disabled}
            onClick={handleCopyClick}
            feedback={props.feedback}
            feedbackTimeout={props.feedbackTimeout}
            iconDescription={props.copyButtonDescription}
          />
        )}
        {shouldShowMoreLessBtn() && (
          <Button
            kind="ghost"
            size="field"
            class={`${prefix}--snippet-btn--expand`}
            disabled={props.disabled}
            onClick={() => setExpandedCode(!expandedCode)}
          >
            <span class={`${prefix}--snippet-btn--text`}>
              {expandCodeBtnText()}
            </span>
            <ChevronDown16
              aria-label={expandCodeBtnText()}
              class={`${prefix}--icon-chevron--down ${prefix}--snippet__icon`}
              role="img"
            />
          </Button>
        )}
      </div>
    }>
      <Match when={props.type === "inline" && props.hideCopyButton}>
        <span class={`${prefix}--snippet`} classList={classes()}>
          <code id={uid}>{props.children}</code>
        </span>
      </Match>
      <Match when={props.type === "inline"}>
        <Copy
          {...rest as JSX.HTMLAttributes<HTMLButtonElement>}
          onClick={handleCopyClick}
          classList={classes()}
          class={`${prefix}--snippet`}
          aria-label={props.ariaLabel}
          aria-describedby={uid}
          feedback={props.feedback}
          feedbackTimeout={props.feedbackTimeout}
        >
          <code id={uid}>{props.children}</code>
        </Copy>
      </Match>
    </Switch>
  );
};
