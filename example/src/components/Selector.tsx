import { Component, For } from "solid-js";
import {
  ContentSwitch,
  ContentSwitcher,
  ContentSwitcherOnChangeArgs,
} from "carbon-components-solid"

const Selector: Component<{
  list: string[];
  callback: (arg: ContentSwitcherOnChangeArgs) => any;
}> = (props) => {
  return (
    <ContentSwitcher onChange={props.callback}>
      <For each={props.list}>
        {(item) => {
          return <ContentSwitch name={item} text={item} />;
        }}
      </For>
    </ContentSwitcher>
  );
};

export default Selector;
