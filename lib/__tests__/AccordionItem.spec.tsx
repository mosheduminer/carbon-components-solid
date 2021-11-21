import { getByText } from "../test-utils/dom";
import { fireEvent, render } from "solid-testing-library";
import { AccordionItem } from "../src/AccordionItem";
import { createSignal } from "solid-js";
import settings from "carbon-components/es/globals/js/settings";

const { prefix } = settings;

describe("AccordionItem", () => {
  it("should render", () => {
    const { container } = render(() => (
      <AccordionItem title="A heading" class="extra-class">
        Lorem ipsum.
      </AccordionItem>
    ));
    expect(container).toMatchSnapshot();
  });

  it("should update the item open state when the `open` prop changes", () => {
    const [open, setOpen] = createSignal(true);
    const { container } = render(() => (
      <AccordionItem title="A heading" open={open()}>
        Lorem ipsum.
      </AccordionItem>
    ));

    expect(
      (
        container.querySelector(`.${prefix}--accordion__item`) as HTMLElement
      ).classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(true);

    setOpen(false);

    expect(
      (
        container.querySelector(`.${prefix}--accordion__item`) as HTMLElement
      ).classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(false);
  });

  it("should call `onClick` when the accordion list item is clicked", () => {
    const title = "test title";
    const onClick = jest.fn();
    const { container } = render(() => (
      <AccordionItem title={title} open onClick={onClick}>
        Lorem ipsum.
      </AccordionItem>
    ));

    fireEvent.click(getByText(container, title)!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should call `onHeadingClick` when the accordion header is clicked", () => {
    const onHeadingClick = jest.fn();
    const { container } = render(() => (
      <AccordionItem title="A heading" open onHeadingClick={onHeadingClick}>
        Lorem ipsum.
      </AccordionItem>
    ));
    fireEvent.click(container.querySelector("button") as HTMLElement);
    expect(onHeadingClick).toHaveBeenCalledTimes(1);
  });

  it("should close an open AccordionItem panel when the Esc key is pressed", () => {
    const { container } = render(() => (
      <AccordionItem title="A heading" open>
        Lorem ipsum.
      </AccordionItem>
    ));
    fireEvent.keyDown(container.querySelector("button") as HTMLElement, {
      key: "Escape",
      keyCode: 27,
      //@ts-ignore
      which: 27,
    });
    expect(
      (
        container.querySelector(`.${prefix}--accordion__item`) as HTMLElement
      ).classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(false);
  });

  it("should not close an open AccordionItem panel if the Esc key is pressed in the panel", () => {
    const { container } = render(() => (
      <AccordionItem title="A heading" open>
        <input data-test-id="input" />
      </AccordionItem>
    ));
    (
      container.querySelector('[data-test-id="input"]') as HTMLElement
    ).dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        keyCode: 27,
      })
    );
    expect(
      (
        container.querySelector(`.${prefix}--accordion__item`) as HTMLElement
      ).classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(true);
  });
});
