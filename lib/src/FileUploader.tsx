import { settings } from "carbon-components";
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  JSX,
  mergeProps,
  splitProps,
  Switch,
  Match,
  For,
  onMount,
} from "solid-js";
import { CloseFilled, WarningFilled, CheckmarkFilled } from "./icons/16";
import { Loading } from "./Loading";
import { createId, uniqueId } from "./internal/id";
import keys from "./internal/keyboard/keys";
import { matches } from "./internal/keyboard/match";
import { ButtonKindsType } from "./types";

const { prefix } = settings;

export type FileUploaderDropContainerProps = {
  accept?: string[];
  class?: string;
  disabled?: boolean;
  id?: string;
  labelText?: string;
  multiple?: boolean;
  name?: string;
  onAddFiles?: (
    event: (DragEvent | InputEvent) & {
      currentTarget: HTMLInputElement;
      target: Element;
    },
    obj: { addedFiles: File[] }
  ) => any;
  role?: string;
  size?: "sm" | "md" | "lg";
  tabIndex?: number;
} & JSX.HTMLAttributes<HTMLLabelElement>;

export const FileUploaderDropContainer: Component<FileUploaderDropContainerProps> =
  (props) => {
    let rest: JSX.HTMLAttributes<HTMLLabelElement>;
    [props, rest] = splitProps(props, [
      "accept",
      "children",
      "class",
      "id",
      "labelText",
      "multiple",
      "name",
      "onAddFiles",
      "role",
      "tabIndex",
    ]);
    props = mergeProps(
      {
        tabIndex: 0,
        labelText: "Add file",
        multiple: false,
        onAddFile: () => {},
        accept: [],
      },
      props
    );
    let inputRef!: HTMLInputElement;
    const uid = createMemo(() => props.id || createId());
    const [isActive, setActive] = createSignal(false);
    function validateFiles(
      event:
        | DragEvent
        | (InputEvent & { currentTarget: HTMLInputElement; target: Element })
    ): (File & { invalidFileType?: boolean })[] {
      const transferredFiles =
        event.type === "drop"
          ? [...(event as DragEvent).dataTransfer!.files]
          : [...((event.currentTarget as HTMLInputElement).files as FileList)];
      if (!props.accept?.length) {
        return transferredFiles;
      }
      const acceptedTypes = new Set(props.accept);
      return transferredFiles.reduce((acc, curr) => {
        const { name, type: mimeType = "" } = curr;
        const fileExtensionRegExp = new RegExp(/\.[0-9a-z]+$/, "i");
        const hasFileExtension = fileExtensionRegExp.test(name);
        if (!hasFileExtension) {
          return acc;
        }
        const [fileExtension] = name.match(fileExtensionRegExp) || [];
        if (acceptedTypes.has(mimeType) || acceptedTypes.has(fileExtension)) {
          return acc.concat([curr]);
        }
        (curr as File & { invalidFileType?: boolean }).invalidFileType = true;
        return acc.concat([curr]);
      }, [] as (File & { invalidFileType?: boolean })[]);
    }

    const handleInput: JSX.EventHandler<
      HTMLInputElement,
      InputEvent | DragEvent
    > = (event) => {
      const addedFiles = validateFiles(event);
      return props.onAddFiles?.(event, { addedFiles });
    };
    return (
      <div
        class={`${prefix}--file`}
        onDragOver={(evt) => {
          evt.stopPropagation();
          evt.preventDefault();
          if (props.disabled) {
            return;
          }
          setActive(true);
          evt.dataTransfer!.dropEffect = "copy";
        }}
        onDragLeave={(evt) => {
          evt.stopPropagation();
          evt.preventDefault();
          if (props.disabled) {
            return;
          }
          setActive(false);
          evt.dataTransfer!.dropEffect = "move";
        }}
        onDrop={(evt) => {
          evt.stopPropagation();
          evt.preventDefault();
          if (props.disabled) {
            return;
          }
          setActive(false);
          //@ts-ignore
          handleInput(evt);
        }}
      >
        <label
          classList={{
            [`${prefix}--file-browse-btn--disabled`]: props.disabled,
            [props.class!]: !!props.class,
          }}
          class={`${prefix}--file__drop-container`}
          for={uid()}
          tabIndex={props.tabIndex || 0}
          onKeyDown={(evt) => {
            if (matches(evt, [keys.Enter, keys.Space])) {
              inputRef.click();
            }
          }}
          {...rest}
        >
          <div
            class={`${prefix}--file__drop-container`}
            classList={{
              [`${prefix}--file__drop-container--drag-over`]: isActive(),
              [props.class!]: !!props.class,
            }}
            role={props.role || "button"}
          >
            {props.labelText}
          </div>
          <input
            type="file"
            id={uid()}
            className={`${prefix}--file-input`}
            ref={inputRef}
            tabIndex="-1"
            disabled={props.disabled}
            accept={props.accept?.join(",")}
            name={props.name}
            multiple={props.multiple}
            onInput={handleInput}
            onClick={(evt) => {
              //@ts-ignore
              evt.currentTarget.value = null;
            }}
          />
        </label>
      </div>
    );
  };

export type FileUploaderButtonProps = {
  accept?: string[];
  buttonKind?: ButtonKindsType;
  class?: string;
  disableLabelChanges?: boolean;
  disabled?: boolean;
  id?: string;
  labelText: JSX.Element;
  listFiles?: boolean;
  multiple?: boolean;
  name?: string;
  onInput: (e: InputEvent) => any;
  onClick?: JSX.BoundEventHandler<HTMLLabelElement, MouseEvent>;
  role?: string;
  size?: "default" | "sm" | "md" | "lg";
  tabIndex?: number;
} & JSX.HTMLAttributes<HTMLLabelElement>;

export const FileUploaderButton: Component<FileUploaderButtonProps> = (
  props
) => {
  let rest!: JSX.HTMLAttributes<HTMLLabelElement>;
  splitProps(props, [
    "accept",
    "buttonKind",
    "children",
    "class",
    "disableLabelChanges",
    "disabled",
    "id",
    "labelText",
    "listFiles",
    "multiple",
    "name",
    "onClick",
    "onInput",
    "role",
    "size",
    "tabIndex",
  ]);
  props = mergeProps(
    {
      buttonKind: "primary",
      disabled: false,
      disableLabelChanges: false,
      labelText: "Add file",
      multiple: false,
      onInput: () => {},
      role: "button",
      tabIndex: 0,
    },
    props
  );
  const [labelText, setLabelText] = createSignal(props.labelText);
  const [prevOwnerLabelText, setPrevOwnerLabelText] = createSignal(
    props.labelText
  );
  createEffect(() => {
    if (props.labelText !== prevOwnerLabelText) {
      setLabelText(props.labelText);
      setPrevOwnerLabelText(props.labelText);
    }
  });
  const inputId = createMemo(() => props.id || createId());
  let inputRef!: HTMLInputElement;

  function onClick(event: MouseEvent) {
    (event.target as HTMLInputElement).value = "";
  }

  function onKeyDown(event: KeyboardEvent) {
    if (matches(event, [keys.Enter, keys.Space])) {
      inputRef.click();
    }
  }

  function handleOnInput(
    event: InputEvent & { currentTarget: HTMLInputElement; target: Element }
  ) {
    const files = (event.currentTarget as HTMLInputElement)?.files;
    const length = (event.currentTarget as HTMLInputElement)?.files!.length;
    if (files && !props.disableLabelChanges) {
      if (length > 1) {
        setLabelText(`${length} files`);
      } else if (length === 1) {
        setLabelText(files[0].name);
      }
    }
    props.onInput(event);
  }

  return (
    <>
      <label
        tabIndex={props.disabled ? -1 : props.tabIndex || 0}
        classList={{
          [`${prefix}--btn--${props.buttonKind}`]: !!props.buttonKind,
          [`${prefix}--btn--disabled`]: props.disabled,
          // V11: remove field, small
          [`${prefix}--btn--md`]: props.size === "md",
          [`${prefix}--btn--sm`]: props.size === "sm",
        }}
        onKeyDown={onKeyDown}
        for={inputId()}
        onClick={props.onClick}
        {...rest}
      >
        <span role={props.role} aria-disabled={props.disabled}>
          {labelText()}
        </span>
      </label>
      <input
        className={`${prefix}--visually-hidden`}
        ref={inputRef}
        id={inputId()}
        disabled={props.disabled}
        type="file"
        tabIndex="-1"
        multiple={props.multiple}
        accept={props.accept?.join(",")}
        name={props.name}
        onInput={handleOnInput}
        onClick={onClick}
      />
    </>
  );
};

export type FilenameProps = {
  iconDescription?: string;
  invalid?: boolean;
  status?: "edit" | "complete" | "uploading";
  tabIndex?: number | string;
} & (JSX.HTMLAttributes<HTMLButtonElement> | JSX.HTMLAttributes<SVGSVGElement>);

export const Filename: Component<FilenameProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLElement> | JSX.HTMLAttributes<SVGSVGElement>;
  //@ts-ignore
  [props, rest] = splitProps(props, [
    "iconDescription",
    "status",
    "invalid",
    "tabIndex",
  ]);
  props = mergeProps(
    { iconDescription: "Uploading file", status: "uploading", tabIndex: 0 },
    props
  );
  return (
    <Switch>
      <Match when={props.status === "uploading"}>
        <Loading
          description={props.iconDescription}
          small
          withOverlay={false}
        />
      </Match>
      <Match when={props.status === "edit"}>
        <>
          {props.invalid && (
            <WarningFilled className={`${prefix}--file-invalid`} />
          )}
          {/**
           @ts-ignore */}
          <button
            aria-label={props.iconDescription}
            className={`${prefix}--file-close`}
            type="button"
            {...rest}
          >
            <CloseFilled />
          </button>
        </>
      </Match>
      <Match when={props.status === "complete"}>
        {/**
         @ts-ignore */}
        <CheckmarkFilled
          aria-label={props.iconDescription}
          class={`${prefix}--file-complete`}
          {...rest}
        >
          {props.iconDescription && <title>{props.iconDescription}</title>}
        </CheckmarkFilled>
      </Match>
    </Switch>
  );
};

export type FileUploaderItemProps = {
  errorBody?: string;
  errorSubject?: string;
  iconDescription?: string;
  invalid?: boolean;
  name: string;
  onDelete?: (
    event: JSX.EventHandler<HTMLButtonElement, Event>,
    details: { uuid: string }
  ) => any;
  size?: "sm" | "md" | "lg";
  status?: "uploading" | "edit" | "complete";
  uuid?: string;
} & JSX.HTMLAttributes<HTMLSpanElement>;

export const FileUploaderItem: Component<FileUploaderItemProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLSpanElement>;
  [props, rest] = splitProps(props, [
    "errorBody",
    "errorSubject",
    "iconDescription",
    "invalid",
    "name",
    "onDelete",
    "size",
    "status",
    "uuid",
  ]);
  props = mergeProps({ status: "uploading", onDelete: () => {} }, props);
  const id = props.uuid || uniqueId();
  return (
    <span
      class={`${prefix}--file__selected-file`}
      classList={{
        [`${prefix}--file__selected-file--invalid`]: props.invalid,
        [`${prefix}--file__selected-file--md`]: props.size === "md",
        [`${prefix}--file__selected-file--sm`]: props.size === "sm",
      }}
      {...rest}
    >
      <p className={`${prefix}--file-filename`} title={props.name}>
        {props.name}
      </p>
      <span className={`${prefix}--file__state-container`}>
        <Filename
          iconDescription={props.iconDescription}
          status={props.status}
          invalid={props.invalid}
          onKeyDown={
            //@ts-ignore
            (evt) => {
              if (matches(evt, [keys.Enter, keys.Space])) {
                if (status === "edit") {
                  props.onDelete && props.onDelete(evt, { uuid: id });
                }
              }
            }
          }
          onClick={
            //@ts-ignore
            (evt) => {
              if (status === "edit") {
                props.onDelete && props.onDelete(evt, { uuid: id });
              }
            }
          }
        />
      </span>
      {props.invalid && props.errorSubject && (
        <div class={`${prefix}--form-requirement`}>
          <div class={`${prefix}--form-requirement__title`}>
            {props.errorSubject}
          </div>
          {props.errorBody && (
            <p className={`${prefix}--form-requirement__supplement`}>
              {props.errorBody}
            </p>
          )}
        </div>
      )}
    </span>
  );
};

export type FileUploaderProps = {
  accept?: string[];
  buttonKind?: ButtonKindsType;
  buttonLabel?: string;
  class?: string;
  filenameStatus: "edit" | "complete" | "uploading";
  iconDescription?: string;
  labelDescription?: string;
  labelTitle?: string;
  multiple?: boolean;
  name?: string;
  onInput?: (event: Event) => any;
  onClick?: (event: Event) => any;
  onDelete?: (event: Event) => any;
  size?: "sm" | "md" | "lg";
} & JSX.HTMLAttributes<HTMLElement>;

export const FileUploader: Component<FileUploaderProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLElement>;
  [props, rest] = splitProps(props, [
    "accept",
    "buttonKind",
    "buttonLabel",
    "class",
    "filenameStatus",
    "filenameStatus",
    "iconDescription",
    "labelDescription",
    "labelTitle",
    "multiple",
    "name",
    "onInput",
    "onClick",
    "onDelete",
    "size",
  ]);
  props = mergeProps(
    {
      iconDescription: "Provide icon description",
      filenameStatus: "uploading",
      buttonLabel: "",
      buttonKind: "primary",
      multiple: false,
      onClick: () => {},
      accept: [],
    },
    props
  );
  const nodes: HTMLSpanElement[] = [];
  const [filenames, setFilenames] = createSignal<string[]>([]);
  const [prevFilenameStatus, setPrevFilenameStatus] =
    createSignal<string | undefined>(undefined);
  const [filenameStatus, setFilenameStatus] =
    createSignal<"edit" | "complete" | "uploading" | undefined>(undefined);
  onMount(() => {
    if (prevFilenameStatus() !== props.filenameStatus) {
      setFilenameStatus(props.filenameStatus);
      setPrevFilenameStatus(filenameStatus());
    }
  });
  const handleChange = (evt: InputEvent) => {
    evt.stopPropagation();
    const filenames = Array.prototype.map.call(
      (evt.target as HTMLInputElement).files,
      (file) => file.name
    ) as string[];
    if (props.multiple) {
      setFilenames((l) => l.concat(filenames));
    } else {
      setFilenames(filenames);
    }
    if (props.onInput) {
      props.onInput(evt);
    }
  };

  const handleClick = (
    evt: Event,
    {
      index,
      filenameStatus,
    }: {
      index: number;
      filenameStatus: "edit" | "complete" | "uploading" | undefined;
    }
  ) => {
    if (filenameStatus === "edit") {
      evt.stopPropagation();
      setFilenames((filenames) =>
        filenames.filter(
          (filename) => filename !== nodes[index].innerText.trim()
        )
      );
      if (props.onDelete) {
        props.onDelete(evt);
      }
      if (props.onClick) {
        props.onClick(evt);
      }
    }
  };

  return (
    //@ts-ignore
    <div
      class={`${prefix}--form-item`}
      classList={{
        [props.class!]: !!props.class,
      }}
      {...rest}
    >
      <p className={`${prefix}--file--label`}>{props.labelTitle}</p>
      <p className={`${prefix}--label-description`}>{props.labelDescription}</p>
      <FileUploaderButton
        labelText={props.buttonLabel}
        multiple={props.multiple}
        buttonKind={props.buttonKind}
        onInput={handleChange}
        disableLabelChanges
        accept={props.accept}
        name={props.name}
        size={props.size}
      />
      <div className={`${prefix}--file-container`}>
        <For each={filenames()}>
          {(name, index) => (
            <span
              class={`${prefix}--file__selected-file`}
              classList={{
                [`${prefix}--file__selected-file--md`]: props.size === "md",
                [`${prefix}--file__selected-file--sm`]: props.size === "sm",
              }}
              ref={nodes[index()]}
              {...rest}
            >
              <p className={`${prefix}--file-filename`}>{name}</p>
              <span className={`${prefix}--file__state-container`}>
                <Filename
                  iconDescription={props.iconDescription}
                  status={filenameStatus()}
                  onKeyDown={(evt: KeyboardEvent) => {
                    if (matches(evt, [keys.Enter, keys.Space])) {
                      handleClick(evt, {
                        index: index(),
                        filenameStatus: filenameStatus(),
                      });
                    }
                  }}
                  onClick={(evt: MouseEvent) =>
                    handleClick(evt, {
                      index: index(),
                      filenameStatus: filenameStatus(),
                    })
                  }
                />
              </span>
            </span>
          )}
        </For>
      </div>
    </div>
  );
};
