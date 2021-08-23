import { fireEvent, render, cleanup } from "solid-testing-library";
import { getByLabel, getByText } from "../test-utils/dom";
import { FileUploaderItem } from "../src";
import keys from "../src/internal/keyboard/keys";

const statuses = ["uploading", "edit", "complete"];

describe("FileUploaderItem", () => {
  afterEach(cleanup);

  describe("automated accessibility tests", () => {
    it.each(statuses)(
      "should have no axe violations with status %s",
      async (status) => {
        const { container } = render(() => (
          //@ts-ignore
          <FileUploaderItem uuid="test" name="test" status={status} />
        ));
        await expect(container)
          //@ts-ignore
          .toHaveNoAxeViolations();
      }
    );
  });

  it("should support calling `onDelete` if the user interacts with the filename during editing", () => {
    const onDelete = jest.fn();
    const description = "test-description";
    const edit = render(() => (
      <FileUploaderItem
        uuid="edit"
        name="edit"
        iconDescription={description}
        status="edit"
        onDelete={onDelete}
      />
    ));

    let removeFile = getByLabel(edit.container, description)!;
    fireEvent.click(removeFile);
    expect(onDelete).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(removeFile, keys.Enter);
    expect(onDelete).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(removeFile, keys.Space);
    expect(onDelete).toHaveBeenCalledTimes(3);

    onDelete.mockReset();

    const uploading = render(() => (
      <FileUploaderItem
        uuid="uploading"
        name="uploading"
        iconDescription={description}
        status="uploading"
        onDelete={onDelete}
      />
    ));
    removeFile = getByText(uploading.container, description)!;

    fireEvent.click(removeFile);
    expect(onDelete).not.toHaveBeenCalled();

    fireEvent.keyDown(removeFile, keys.Enter);
    expect(onDelete).not.toHaveBeenCalled();

    fireEvent.keyDown(removeFile, keys.Space);
    expect(onDelete).not.toHaveBeenCalled();
  });
});
