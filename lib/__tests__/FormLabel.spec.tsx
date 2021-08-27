import { render } from "solid-testing-library";
import { FormLabel } from '../src/FormLabel';

describe('FormLabel', () => {
  it('should render', () => {
    const { container } = render(() => <FormLabel />);
    expect(container).toMatchSnapshot();
  });
});