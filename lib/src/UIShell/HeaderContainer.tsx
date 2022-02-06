import { Component, createSignal, JSX } from "solid-js";

export type HeaderContainerProps = {
  isSideNavExpanded?: boolean;
  render: Component<{
    isSideNavExpanded: boolean;
    onClickSideNavExpand: () => void;
  }>;
};

export const HeaderContainer: Component<HeaderContainerProps> = (props) => {
  //state for expandable sidenav
  //defaults to undefined (and hence false)
  const [isSideNavExpandedState, setIsSideNavExpandedState] = createSignal(
    props.isSideNavExpanded
  );

  const handleHeaderMenuButtonClick = () => {
    setIsSideNavExpandedState(
      (prevIsSideNavExpanded) => !prevIsSideNavExpanded
    );
  };

  return (
    <props.render
      isSideNavExpanded={!!isSideNavExpandedState()}
      onClickSideNavExpand={handleHeaderMenuButtonClick}
    />
  );
};
