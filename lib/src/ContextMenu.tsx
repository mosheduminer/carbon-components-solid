import { createEffect, createSignal, onCleanup } from "solid-js";

/**
 * @param {Element|Document|Window} [trigger=document] The element which should trigger the Menu on right-click
 * @returns {object} Props object to pass onto Menu component
 */
export function useContextMenu(trigger: Node = document): {
  open: () => boolean,
  position: () => [number, number],
  autoclose: () => boolean,
  onClose: () => any,
} {
  const [open, setOpen] = createSignal(false);
  const [canBeClosed, setCanBeClosed] = createSignal(false);
  const [position, setPosition] = createSignal<[number, number]>([0, 0]);

  function openContextMenu(e: Event) {
    e.preventDefault();

    const { x, y } = e as MouseEvent;

    setPosition([x, y]);
    setOpen(true);

    // Safari emits the click event when preventDefault was called on
    // the contextmenu event. This is registered by the ClickListener
    // component and would lead to immediate closing when a user is
    // triggering the menu with ctrl+click. To prevent this, we only
    // allow the menu to be closed after the click event was received.
    // Since other browsers don't emit this event, it's also reset with
    // a 50ms delay after mouseup event was called.

    document.addEventListener(
      'mouseup',
      () => {
        setTimeout(() => {
          setCanBeClosed(true);
        }, 50);
      },
      { once: true }
    );

    document.addEventListener(
      'click',
      () => {
        setCanBeClosed(true);
      },
      { once: true }
    );
  }

  function onClose() {
    setOpen(false);
  }

  createEffect(() => {
    if (
      (trigger && trigger instanceof Element) ||
      trigger instanceof Document ||
      trigger instanceof Window
    ) {
      trigger.addEventListener('contextmenu', openContextMenu);

      onCleanup(() => {
        return () => {
          trigger.removeEventListener('contextmenu', openContextMenu);
        };
      })
    }
  })
  return {
    open,
    position,
    autoclose: canBeClosed,
    onClose,
  };
}
