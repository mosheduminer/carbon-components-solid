import { getByText } from "../test-utils/dom";
import { render, cleanup, fireEvent } from "solid-testing-library";
import { Filename } from "../src";

const statuses = ["uploading", "edit", "complete"];

describe("Filename", () => {
  afterEach(cleanup);

  describe.skip("automated accessibility tests", () => {
    it.each(statuses)(
      "should have no axe violations with status %s",
      async (status) => {
        const { container } = render(() => (
          //@ts-ignore
          <Filename iconDescription="test description" status={status} />
        ));
        await expect(container)
          //@ts-ignore
          .toHaveNoAxeViolations();
      }
    );

    it.each(statuses)(
      "should have no AC violations with status %s",
      async (status) => {
        const { container } = render(() => (
          //@ts-ignore
          <Filename iconDescription="test description" status={status} />
        ));
        await expect(container)
          //@ts-ignore
          .toHaveNoACViolations(`Filename-${status}`);
      }
    );
  });

  it("should support events on interactive icons when `edit` or `complete` is the status", () => {
    const onClick = jest.fn();
    const { container: edit } = render(() => (
      <Filename
        iconDescription="test description"
        status="edit"
        onClick={onClick}
      />
    ));

    fireEvent.click(edit.querySelector(`[aria-label="test description"]`)!);
    expect(onClick).toHaveBeenCalledTimes(1);

    onClick.mockReset();

    const { container: complete } = render(() => (
      <Filename
        iconDescription="test description"
        status="complete"
        onClick={onClick}
      />
    ));

    fireEvent.click(complete.querySelector(`[aria-label="test description"]`)!);
    expect(onClick).toHaveBeenCalledTimes(1);

    const { container: uploading } = render(() => (
      <Filename
        iconDescription="test description"
        status="uploading"
        onClick={onClick}
      />
    ));

    onClick.mockReset();

    fireEvent.click(getByText(uploading, "test description")!);
    expect(onClick).not.toHaveBeenCalled();
  });
});
