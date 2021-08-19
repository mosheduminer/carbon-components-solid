import { getByText } from '../utils/dom';
import { fireEvent, render } from 'solid-testing-library';
import { AccordionItem } from '../src/AccordionItem';
import { settings } from 'carbon-components';


const { prefix } = settings;

describe('AccordionItem', () => {
  it('should render', () => {
    const wrapper = render(() =>
      <AccordionItem title="A heading" class="extra-class">
        Lorem ipsum.
      </AccordionItem>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the item open state when the `open` prop changes', () => {
    const wrapper = render(() =>
      <AccordionItem title="A heading" open>
        Lorem ipsum.
      </AccordionItem>
    );

    expect(
      (wrapper
        .find(`.${prefix}--accordion__item`) as HTMLElement)
        .classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(true);

    wrapper.setProps({ open: false });

    expect(
      (wrapper
        .find(`.${prefix}--accordion__item`) as HTMLElement)
        .classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(false);
  });

  it('should call `onClick` when the accordion list item is clicked', () => {
    const title = 'test title';
    const onClick = jest.fn();
    const { container } = render(() =>
      <AccordionItem title={title} open onClick={onClick}>
        Lorem ipsum.
      </AccordionItem>
    );

    fireEvent.click(getByText(container, title));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call `onHeadingClick` when the accordion header is clicked', () => {
    const onHeadingClick = jest.fn();
    const wrapper = render(() =>
      <AccordionItem title="A heading" open onHeadingClick={onHeadingClick}>
        Lorem ipsum.
      </AccordionItem>
    );
    (wrapper.find('button') as HTMLElement).click();
    expect(onHeadingClick).toHaveBeenCalledTimes(1);
  });

  it('should close an open AccordionItem panel when the Esc key is pressed', () => {
    const wrapper = render(() =>
      <AccordionItem title="A heading" open>
        Lorem ipsum.
      </AccordionItem>
    );
    (wrapper.find('button') as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    }));
    expect(
      (wrapper
        .find(`.${prefix}--accordion__item`) as HTMLElement)
        .classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(false);
  });

  it('should not close an open AccordionItem panel if the Esc key is pressed in the panel', () => {
    const wrapper = render(() =>
      <AccordionItem title="A heading" open>
        <input data-test-id="input" />
      </AccordionItem>
    );
    (wrapper.find('[data-test-id="input"]') as HTMLElement).dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    }));
    expect(
      (wrapper
        .find(`.${prefix}--accordion__item`) as HTMLElement)
        .classList.contains(`${prefix}--accordion__item--active`)
    ).toBe(true);
  });
});