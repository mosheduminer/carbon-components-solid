import { render, cleanup, fireEvent } from "solid-testing-library";
import { getByText } from "../test-utils/dom";
import { FileUploaderButton } from "../src";
import { uploadFiles } from "../test-utils/upload-files";

describe("FileUploaderButton", () => {
  afterEach(cleanup);

  describe("automated accessibility tests", () => {
    it("should have no axe violations", async () => {
      const { container } = render(() => <FileUploaderButton name="test" />);
      await expect(container)
        //@ts-ignore
        .toHaveNoAxeViolations();
    });
  });

  it("should support a custom class name on the root element", () => {
    const { container } = render(() => <FileUploaderButton class="test" />);
    expect(
      (container.firstChild as HTMLElement).classList.contains("test")
    ).toBe(true);
  });

  it("should call `onClick` if the label is clicked", () => {
    const onClick = jest.fn();
    const { container } = render(() => (
      <FileUploaderButton labelText="test" onClick={onClick} />
    ));
    const label = getByText(container, "test")!;
    fireEvent.click(label);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should call `onChange` if the value of the input changes", () => {
    const onChange = jest.fn();
    const { container } = render(() => (
      <FileUploaderButton onChange={onChange} accept={[".png"]} />
    ));
    const input = container.querySelector("input")!;
    const file = new File(["test"], "test.png", { type: "image/png" });
    uploadFiles(input, file);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should not support multiple files by default", () => {
    const { container } = render(() => <FileUploaderButton />);
    const input = container.querySelector("input")!;
    expect(input.getAttribute("multiple")).toBeFalsy();
  });

  it("should have a unique id", () => {
    const { container } = render(() => (
      <>
        <FileUploaderButton />
        <FileUploaderButton />
      </>
    ));
    const inputs = container.querySelectorAll("input");
    expect(inputs[0].getAttribute("id")).not.toBe(inputs[1].getAttribute("id"));
  });

  it("should reset the input value when the label is clicked", () => {
    const { container } = render(() => (
      <FileUploaderButton accept={[".png"]} labelText="test" />
    ));
    const input = container.querySelector("input") as HTMLInputElement;

    const filename = "test.png";
    const file = new File(["test"], filename, { type: "image/png" });
    uploadFiles(input, [file]);

    expect(input.files!.length).toBe(1);
    fireEvent.click(input);
    expect(input.files!.length).toBe(0);
  });

  it("should update the label text if it receives a new value from props", () => {
    const container = document.createElement("div");
    render(() => <FileUploaderButton labelText="test" />, { container });
    expect(getByText(container, "test")).toBeInstanceOf(HTMLElement);

    render(() => <FileUploaderButton labelText="tester" />, { container });
    expect(getByText(container, "tester")).toBeInstanceOf(HTMLElement);
  });

  describe("FileUploaderButton label", () => {
    it("should update the label when a file is selected", () => {
      const { container } = render(() => (
        <FileUploaderButton accept={[".png"]} labelText="test" />
      ));
      const input = container.querySelector("input")!;
      const label = getByText(container, "test");
      expect(label).toBeInstanceOf(HTMLElement);

      const filename = "test.png";
      const file = new File(["test"], filename, { type: "image/png" });
      uploadFiles(input, [file]);

      expect(getByText(container, filename)).toBeInstanceOf(HTMLElement);
    });

    it("should update the label when multiple files are selected", () => {
      const { container } = render(() => (
        <FileUploaderButton accept={[".png"]} labelText="test" multiple />
      ));
      const input = container.querySelector("input")!;
      const label = getByText(container, "test");
      expect(label).toBeInstanceOf(HTMLElement);

      const files = [
        new File(["test-1"], "test-1.png", { type: "image/png" }),
        new File(["test-2"], "test-1.png", { type: "image/png" }),
        new File(["test-3"], "test-1.png", { type: "image/png" }),
      ];

      uploadFiles(input, files);
      expect(getByText(container, `${files.length} files`)).toBeInstanceOf(
        HTMLElement
      );
    });

    it("should not update the label when files are selected but `disableLabelChanges` is false", () => {
      const { container } = render(() => (
        <FileUploaderButton
          accept={[".png"]}
          labelText="test"
          disableLabelChanges
        />
      ));
      const input = container.querySelector("input")!;
      const label = getByText(container, "test");
      expect(label).toBeInstanceOf(HTMLElement);

      const filename = "test.png";
      const file = new File(["test"], filename, { type: "image/png" });
      uploadFiles(input, [file]);

      expect(getByText(container, "test")).toBeInstanceOf(HTMLElement);
    });
  });
});
