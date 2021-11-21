import { Add16 } from "carbon-components-solid/icons/Add16";
import { Button, ButtonSet } from "carbon-components-solid";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";

export default function () {
  const list = [
    Primary,
    Secondary,
    Tertiary,
    Danger,
    Ghost,
    IconButton,
    SetOfButtons,
    ExpressiveButtons,
  ];
  return (
    <For each={list}>
      {(item) => (
        <div style={{margin: "20px"}}>
          <Dynamic component={item} />
        </div>
      )}
    </For>
  );
}

const Primary = () => {
  return <Button>Button</Button>;
};

const Secondary = () => {
  return <Button kind="secondary">Button</Button>;
};

const Tertiary = () => {
  return <Button kind="tertiary">Button</Button>;
};

const Danger = () => {
  return (
    <>
      <Button kind="danger">Button</Button>
      &nbsp;
      <Button kind="danger--tertiary">Tertiary Danger Button</Button>
      &nbsp;
      <Button kind="danger--ghost">Ghost Danger Button</Button>
    </>
  );
};

const Ghost = () => {
  return <Button kind="ghost">Button</Button>;
};

const IconButton = () => (
  <Button
    renderIcon={Add16}
    iconDescription="Icon Description"
    hasIconOnly
  />
);

const SetOfButtons = () => {
  return (
    <ButtonSet>
      <Button kind="secondary">Secondary button</Button>
      <Button kind="primary">Primary button</Button>
    </ButtonSet>
  );
};

const ExpressiveButtons = () => {
  return (
    <>
      <div
        style={{
          margin: "1rem",
        }}
      >
        <Button isExpressive size="default">
          Button
        </Button>
      </div>
      <div
        style={{
          margin: "1rem",
        }}
      >
        <Button isExpressive size="lg">
          Button
        </Button>
      </div>
      <div
        style={{
          margin: "1rem",
        }}
      >
        <Button isExpressive size="xl">
          Button
        </Button>
      </div>
      <div
        style={{
          margin: "1rem",
        }}
      >
        <Button isExpressive size="default" renderIcon={Add16}>
          Button
        </Button>
      </div>
      <div
        style={{
          margin: "1rem",
        }}
      >
        <Button
          isExpressive
          renderIcon={Add16}
          hasIconOnly
          iconDescription="Icon description"
        />
      </div>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <ButtonSet>
          <Button kind="secondary" isExpressive>
            Secondary button
          </Button>
          <Button kind="primary" isExpressive>
            Primary button
          </Button>
        </ButtonSet>
      </div>
    </>
  );
};
