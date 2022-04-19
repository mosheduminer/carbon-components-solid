import { Form } from "../src/Form";
import { render, fireEvent } from "solid-testing-library";

const prefix = "cds";

describe("Form", () => {
  describe("Renders as expected", () => {
    it("renders children as expected", () => {
      const { container } = render(() => <Form class="extra-class" />);
      expect(container.querySelectorAll(".child").length).toBe(0);
    });
    it("renders wrapper as expected", () => {
      const { container } = render(() => <Form class="extra-class" />);
      expect(container.children.length).toBe(1);
    });
    it("has the expected classes", () => {
      const { container } = render(() => <Form class="extra-class" />);
      expect(
        container.firstElementChild!.classList.contains(`${prefix}--form`)
      ).toEqual(true);
    });

    it("renders extra classes passed in via className", () => {
      const { container } = render(() => <Form class="extra-class" />);
      expect(
        container.firstElementChild!.classList.contains("extra-class")
      ).toEqual(true);
    });

    it("should render wrapper as expected", () => {
      const { container: form } = render(() => (
        <Form>
          <div class="test-child1" />
          <div class="test-child2" />
        </Form>
      ));
      expect(form.children.length).toEqual(1);
    });
    it("should render children as expected", () => {
      const { container } = render(() => (
        <Form>
          <div class="test-child" />
          <div class="test-child" />
        </Form>
      ));
      expect(container.querySelectorAll(".test-child").length).toBe(2);
    });

    it("should handle submit events", () => {
      const onSubmit = jest.fn();
      const { container: form1 } = render(() => (
        <Form>
          <button class="button" type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </Form>
      ));
      const btn = form1.querySelector("button");
      fireEvent.submit(btn!);
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
