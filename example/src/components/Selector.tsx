import { Component, createComputed, createSignal, For } from "solid-js";
import {
  ContentSwitch,
  ContentSwitcher,
  ContentSwitcherOnChangeArgs,
} from "carbon-components-solid"
import { useLocation } from "solid-app-router";

const Selector: Component<{
  list: string[];
  callback: (arg: ContentSwitcherOnChangeArgs) => any;
  index?: number;
}> = (props) => {
  const [index, setIndex] = createSignal<number>();
  createComputed(() => {
    const fullpath = useLocation().pathname.split("/").filter(val => val !== "");
    const path = fullpath[(props.index || 0)];
    setIndex(props.list.findIndex(val => val === path));  
  })
  return (
    <ContentSwitcher selectedIndex={index()} onChange={props.callback}>
      <For each={props.list}>
        {(item) => {
          return <ContentSwitch name={item} text={item} />;
        }}
      </For>
    </ContentSwitcher>
  );
};

export default Selector;
