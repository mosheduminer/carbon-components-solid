import { Accordion, AccordionItem } from '../src';
import { fireEvent } from '@testing-library/dom';
import userEvent from "@testing-library/user-event"
import { cleanup, render, screen } from 'solid-testing-library';

describe('Accordion', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { container } = render(() =>
      <Accordion class="extra-class">
        <AccordionItem class="child" title="Heading A">
          Panel A
        </AccordionItem>
        <AccordionItem class="child" title="Heading B">
          Panel B
        </AccordionItem>
        <AccordionItem class="child" title="Heading C">
          Panel C
        </AccordionItem>
      </Accordion>
    );

    expect(container).toMatchSnapshot();
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      render(() =>
        <Accordion class="extra-class">
          <AccordionItem class="child" title="Heading A">
            Panel A
          </AccordionItem>
          <AccordionItem class="child" title="Heading B">
            Panel B
          </AccordionItem>
          <AccordionItem class="child" title="Heading C">
            Panel C
          </AccordionItem>
        </Accordion>
      );

      await expect(screen.getByText('Heading A'))
        //@ts-ignore
        .toHaveNoAxeViolations();

      // click to open
      fireEvent.click(screen.getByText('Heading A'));

      // test when open
      await expect(screen.getByText('Heading A'))
        //@ts-ignore
        .toHaveNoAxeViolations();
    });

    it('should have no Accessibility Checker violations', async () => {
      render(() =>
        <main>
          <Accordion class="extra-class">
            <AccordionItem class="child" title="Heading A">
              Panel A
            </AccordionItem>
            <AccordionItem class="child" title="Heading B">
              Panel B
            </AccordionItem>
            <AccordionItem class="child" title="Heading C">
              Panel C
            </AccordionItem>
          </Accordion>
        </main>
      );

      await expect(screen.getByText('Heading A'))
        //@ts-ignore
        .toHaveNoACViolations(
          'Accordion'
        );

      // click to open
      fireEvent.click(screen.getByText('Heading A'));

      // test when open
      await expect(screen.getByText('Heading A'))
        //@ts-ignore
        .toHaveNoACViolations(
          'Opened Accordion'
        );
    });
  });

  describe('basic keyboard accessibility testing', () => {
    it('should receive focus', async () => {
      render(() =>
        <Accordion class="extra-class">
          <AccordionItem class="child" title="Heading A">
            Panel A
          </AccordionItem>
          <AccordionItem class="child" title="Heading B">
            Panel B
          </AccordionItem>
          <AccordionItem class="child" title="Heading C">
            Panel C
          </AccordionItem>
        </Accordion>
      );

      userEvent.tab();
      await expect(document.getElementsByTagName('button')[0]).toHaveFocus();
    });

    it('should open with enter', async () => {
      render(() =>
        <Accordion class="extra-class">
          <AccordionItem class="child" title="Heading A">
            Panel A
          </AccordionItem>
          <AccordionItem class="child" title="Heading B">
            Panel B
          </AccordionItem>
          <AccordionItem class="child" title="Heading C">
            Panel C
          </AccordionItem>
        </Accordion>
      );

      // userEvent.type clicks the element passed before typing without skipClick option
      // see: https://github.com/testing-library/user-event#typeelement-text-options
      userEvent.type(screen.getByText('Heading A'), '{enter}', {
        skipClick: true,
      });

      expect(screen.getByText('Panel A')).toBeDefined();
    });

    it('should open with spacebar', async () => {
      render(() =>
        <Accordion class="extra-class">
          <AccordionItem class="child" title="Heading A">
            Panel A
          </AccordionItem>
          <AccordionItem class="child" title="Heading B">
            Panel B
          </AccordionItem>
          <AccordionItem class="child" title="Heading C">
            Panel C
          </AccordionItem>
        </Accordion>
      );

      // userEvent.type clicks the element passed before typing without skipClick option
      // see: https://github.com/testing-library/user-event#typeelement-text-options
      userEvent.type(screen.getByText('Heading A'), '{space}', {
        skipClick: true,
      });

      expect(screen.getByText('Panel A')).toBeDefined();
    });
  });
});