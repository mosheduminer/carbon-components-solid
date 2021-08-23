import { getByLabel, getByText } from "../test-utils/dom";
import { render, cleanup } from "solid-testing-library";
import { FileUploader } from "../src";
import { uploadFiles } from "../test-utils/upload-files";
import { createSignal } from "solid-js";

describe("FileUploader", () => {
  afterEach(cleanup);

  describe("automated accessibility tests", () => {
    it.skip("should have no axe violations", async () => {
      const { container } = render(() => <FileUploader />);
      await expect(container)
        //@ts-ignore
        .toHaveNoAxeViolations();
    });

    it.skip("should have no AC violations", async () => {
      const { container } = render(() => <FileUploader />);
      await expect(container)
        //@ts-ignore
        .toHaveNoACViolations("FileUploader");
    });
  });

  it("should support a custom class name on the root element", () => {
    const { container } = render(() => <FileUploader class="test" />);
    expect(
      (container.firstChild as HTMLElement).classList.contains("test")
    ).toBe(true);
  });

  it("should not update the label by default when selecting files", () => {
    const { container } = render(() => <FileUploader buttonLabel="upload" />);
    const input = container.querySelector("input")!;
    const label = getByText(container, "upload");

    expect(label).toBeInstanceOf(HTMLElement);
    uploadFiles(input, [new File(["test"], "test.png", { type: "image/png" })]);
    expect(getByText(container, "upload")).toBeInstanceOf(HTMLElement);
  });

  it("should clear all uploaded files when `clearFiles` is called", () => {
    let clearFiles!: () => any;
    const { container } = render(() => (
      <FileUploader clearFiles={(func) => (clearFiles = func)} />
    ));
    const input = container.querySelector("input")!;

    const filename = "test.png";
    uploadFiles(input, [new File(["test"], filename, { type: "image/png" })]);

    expect(getByText(container, filename)).toBeInstanceOf(HTMLElement);
    clearFiles();
    expect(getByText(container, filename)).not.toBeInstanceOf(HTMLElement);
  });

  it("should synchronize the filename status state when its prop changes", () => {
    const container = document.createElement("div");
    const description = "test";
    const [status, setStatus] = createSignal<"edit" | "complete" | "uploading" | undefined>("edit");
    render(
      () => (
        <FileUploader filenameStatus={status()} iconDescription={description} />
      ),
      {
        container,
      }
    );

    const input = container.querySelector("input")!;
    uploadFiles(input, [new File(["test"], "test.png", { type: "image/png" })]);

    const edit = getByLabel(container, description)!;

    setStatus("complete")

    const complete = getByLabel(container, description)!;
    expect(edit.parentNode).not.toEqual(complete.parentNode);
  });
});
