import { FormGroup } from "../src/FormGroup";
import { render } from "solid-testing-library";
import { settings } from "carbon-components";

const { prefix } = settings;

describe("FormGroup", () => {
  describe("Renders as expected", () => {
    it("renders children as expected", () => {
      const { container } = render(() => (
        <FormGroup class="extra-class" legendText="legendtest" />
      ));
      expect(container.querySelectorAll(".child").length).toBe(0);
    });
    it("renders wrapper as expected", () => {
      const { container } = render(() => (
        <FormGroup class="extra-class" legendText="legendtest" />
      ));
      expect(container.children.length).toBe(1);
    });
    it("has the expected classes", () => {
      const { container } = render(() => (
        <FormGroup class="extra-class" legendText="legendtest" />
      ));
      expect(
        container.firstElementChild?.classList.contains(`${prefix}--fieldset`)
      ).toEqual(true);
    });
    it("renders extra classes passed in via className", () => {
      const { container } = render(() => (
        <FormGroup class="extra-class" legendText="legendtest" />
      ));
      expect(
        container.querySelector("legend")?.classList.contains("extra-class")
      ).toEqual(true);
    });
    it("should not render the data-invalid property by default", () => {
      const { container } = render(() => (
        <FormGroup class="extra-class" legendText="legendtest" />
      ));
      expect(container.firstElementChild?.getAttribute("data-invalid")).toBe(
        null
      );
    });
    it("should render the data-invalid attribute when invalid is set", () => {
      const { container } = render(() => (
        <FormGroup legendText="legendtest" invalid />
      ));
      expect(container.firstElementChild?.getAttribute("data-invalid")).toBe(
        ""
      );
    });
    it("should render wrapper as expected", () => {
      const { container } = render(() => (
        <FormGroup legendText="legendtest">
          <div class="test-child1" />
          <div class="test-child2" />
        </FormGroup>
      ));
      expect(container.children.length).toEqual(1);
    });
    it("should render children as expected", () => {
      const { container } = render(() => (
        <FormGroup legendText="legendtest">
          <div class="test-child" />
          <div class="test-child" />
        </FormGroup>
      ));
      expect(container.querySelectorAll(".test-child").length).toBe(2);
    });
  });
});
