import { render } from "solid-testing-library";
import { Header } from "../../src/UIShell";

describe("Header", () => {
  it("should render", () => {
    const { container } = render(() => (
      <Header aria-label="label" class="custom-class" />
    ));
    expect(container).toMatchSnapshot();
  });
});
