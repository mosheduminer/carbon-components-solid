import { render } from "solid-testing-library";
import { FormItem } from '../src/FormItem';

describe('FormItem', () => {
  it('should render', () => {
    const { container } = render(() => <FormItem />);
    expect(container).toMatchSnapshot();
  });
});