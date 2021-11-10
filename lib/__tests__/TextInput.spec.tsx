import { TextInput } from "../src/TextInput";
import { render } from "solid-testing-library";
import { fireEvent } from "@testing-library/dom";
import { settings } from "carbon-components";
import {
  createComponent,
  createEffect,
  createSignal,
  mergeProps,
} from "solid-js";

const { prefix } = settings;

const getContainer = (props: () => { [key: string]: any } = () => ({})) =>
  render(() => {
    return createComponent(
      TextInput,
      mergeProps(
        {
          id: "test",
          class: "extra-class",
          helperText: "testHelper",
          labelText: "testlabel",
        },
        props
      )
    );
  }).container;

describe("TextInput", () => {
  describe("renders as expected", () => {
    const getTextInput = (props: () => { [key: string]: any } = () => ({})) =>
      getContainer(props).querySelector("input")!;

    describe("input", () => {
      let container: HTMLElement | null;

      afterEach(() => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }
        container = null;
      });

      it("renders as expected", () => {
        const textInput = getTextInput();
        expect(textInput.parentElement!.children.length).toBe(1);
      });

      it("should accept refs", () => {
        class MyComponent {
          public textInput!: HTMLInputElement;
          public focus = () => {
            this.textInput.focus();
          };
          render = () => {
            return (
              <TextInput id="test" labelText="testlabel" ref={this.textInput} />
            );
          };
        }
        container = document.createElement("div");
        container.id = "container";
        document.body.appendChild(container);
        const comp = new MyComponent();
        render(() => <comp.render />, {
          container: document.querySelector("#container") as HTMLElement,
        });
        expect(
          (document.activeElement as HTMLInputElement).type
        ).toBeUndefined();
        comp.focus();
        expect((document.activeElement as HTMLInputElement).type).toEqual(
          "text"
        );
      });

      it("has the expected classes", () => {
        const textInput = getTextInput();
        expect(textInput.classList.contains(`${prefix}--text-input`)).toEqual(
          true
        );
      });

      it("should add extra classes that are passed via className", () => {
        const textInput = getTextInput();
        expect(textInput.classList.contains("extra-class")).toEqual(true);
      });

      it("has the expected classes for light", () => {
        const textInput = getTextInput(() => ({ light: true }));
        expect(
          textInput.classList.contains(`${prefix}--text-input--light`)
        ).toEqual(true);
      });

      it("should set type as expected", () => {
        const [inputType, setInputType] = createSignal<string | undefined>(
          undefined
        );
        const container = getContainer(() => ({ type: inputType() }));
        const input = container.querySelector("input")!;
        expect(input.type).toEqual("text");
        setInputType("email");
        expect(input.type).toEqual("email");
      });

      /*it("should set value as expected", () => {
        expect(textInput().props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: "test" });
        expect(textInput().props().defaultValue).toEqual("test");
      });*/

      it("should set disabled as expected", () => {
        const [disabled, setDisabled] = createSignal<boolean | undefined>(
          undefined
        );
        const container = getContainer(() => ({ disabled: disabled() }));
        expect(container.querySelector("input")!.disabled).toEqual(false);
        setDisabled(true);
        expect(container.querySelector("input")!.disabled).toEqual(true);
      });

      it("should set placeholder as expected", () => {
        const [placeholder, setPlaceholder] = createSignal<string | undefined>(
          undefined
        );
        const container = getContainer(() => ({ placeholder: placeholder() }));
        expect(container.querySelector("input")!.placeholder).toEqual("");
        setPlaceholder("Enter text");
        expect(container.querySelector("input")!.placeholder).toEqual(
          "Enter text"
        );
      });
    });

    describe("label", () => {
      const labelGetContainer = () =>
        getContainer(() => ({ labelText: "Email Input" }));
      it("renders a label", () => {
        const container = labelGetContainer();
        expect(container.querySelector("label")).not.toBeFalsy();
      });

      it("has the expected classes", () => {
        const container = labelGetContainer();
        expect(
          container
            .querySelector("label")!
            .classList.contains(`${prefix}--label`)
        ).toEqual(true);
      });

      it("should set label as expected", () => {
        const container = labelGetContainer();
        expect(container.querySelector("label")!.textContent).toEqual(
          "Email Input"
        );
      });
    });

    describe("helper", () => {
      it("renders a helper", () => {
        const container = getContainer();
        const renderedHelper = container.querySelector(
          `.${prefix}--form__helper-text`
        )!;
        expect(renderedHelper).not.toBeFalsy();
      });

      it("renders children as expected", () => {
        const container = getContainer(() => ({
          helperText: <span>This is helper text.</span>,
        }));
        const renderedHelper = container.querySelector(
          `.${prefix}--form__helper-text`
        )!;
        expect(renderedHelper.firstElementChild).toEqual(
          <span>This is helper text.</span>
        );
      });

      it("should set helper text as expected", () => {
        const container = getContainer(() => ({ helperText: "Helper text" }));
        const renderedHelper = container.querySelector(
          `.${prefix}--form__helper-text`
        ) as HTMLElement;
        expect(renderedHelper.textContent).toEqual("Helper text");
      });
    });
  });

  describe("events", () => {
    describe("disabled textinput", () => {
      const onClick = jest.fn();
      const onInput = jest.fn();

      const getTextInput = () =>
        getContainer(() => ({
          onInput,
          onClick,
          disabled: true,
        })).querySelector("input")!;

      it("should not invoke onClick", () => {
        const input = getTextInput();
        fireEvent.click(input);
        expect(onClick).not.toHaveBeenCalled();
      });

      it("should not invoke onInput", () => {
        const input = getTextInput();
        fireEvent.input(input);
        expect(onInput).not.toHaveBeenCalled();
      });
    });

    describe("enabled textinput", () => {
      const onClick = jest.fn();
      const onInput = jest.fn();

      const getTextInput = () =>
        getContainer(() => ({ onInput, onClick })).querySelector("input")!;

      const eventObject = {
        target: {
          value: "test",
        },
      };

      it("should invoke onClick when input is clicked", () => {
        const input = getTextInput();
        fireEvent.click(input);
        expect(onClick).toHaveBeenCalled();
      });

      it("should invoke onInput when input value is changed", () => {
        const input = getTextInput();
        fireEvent.input(input, eventObject);
        expect(onInput.mock.calls[0][0].target.value).toEqual("test");
      });
    });
  });
});
