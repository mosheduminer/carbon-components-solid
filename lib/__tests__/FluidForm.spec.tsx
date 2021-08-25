import { FluidForm } from "../src/FluidForm";
import { render, fireEvent } from "solid-testing-library";

describe("FluidForm", () => {
  describe("Renders as expected", () => {
    it("renders children as expected", () => {
      const { container } = render(() => <FluidForm class="extra-class" />);
      expect(container.querySelectorAll(".child").length).toBe(0);
    });
    it("renders wrapper as expected", () => {
      const { container } = render(() => <FluidForm class="extra-class" />);
      expect(container.children.length).toBe(1);
    });
    it("renders extra classes passed in via class", () => {
      const { container } = render(() => <FluidForm class="extra-class" />);
      expect(
        container.firstElementChild!.classList.contains("extra-class")
      ).toEqual(true);
    });

    it("should render wrapper as expected", () => {
      const { container: form } = render(() => (
        <FluidForm>
          <div class="test-child1" />
          <div class="test-child2" />
        </FluidForm>
      ));
      expect(form.children.length).toEqual(1);
    });
    it("should render children as expected", () => {
      const { container: form1 } = render(() => (
        <FluidForm>
          <div class="test-child" />
          <div class="test-child" />
        </FluidForm>
      ));
      expect(form1.querySelectorAll(".test-child").length).toBe(2);
    });

    it("should handle submit events", () => {
      const onSubmit = jest.fn();
      const { container: form1 } = render(() => (
        <FluidForm>
          <button className="button" type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </FluidForm>
      ));
      const btn = form1.querySelector("button");
      fireEvent.submit(btn!);
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
