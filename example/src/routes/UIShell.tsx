import { createSignal } from "solid-js";
import { Button } from "carbon-components-solid";
import {
  Content,
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
} from "carbon-components-solid/UIShell";
import { Search20 } from "carbon-components-solid/icons/Search20";
import { Notification20 } from "carbon-components-solid/icons/Notification20";
import { Fade16 } from "carbon-components-solid/icons/Fade16";
import { Switcher20 } from "carbon-components-solid/icons/Switcher20";

export default function UIShell() {
  return (
    <HeaderContainer
      render={(props) => (
        <>
          <Header aria-label="IBM Platform Name">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={props.onClickSideNavExpand}
              isActive={props.isSideNavExpanded}
            />
            <HeaderName href="#" prefix="IBM">
              [Platform]
            </HeaderName>
            <HeaderNavigation aria-label="IBM [Platform]">
              <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
              <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
              <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
              </HeaderMenu>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search">
                <Search20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Notifications">
                <Notification20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="App Switcher"
                tooltipAlignment="end"
              >
                <Switcher20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav
              aria-label="Side navigation"
              expanded={props.isSideNavExpanded}
            >
              <SideNavItems>
                <HeaderSideNavItems hasDivider={true}>
                  <HeaderMenuItem href="#">Link 1</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                  <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                  <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                    <HeaderMenuItem href="#">Sub-link 1</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Sub-link 3</HeaderMenuItem>
                  </HeaderMenu>
                </HeaderSideNavItems>
                <SideNavMenu renderIcon={Fade16} title="Category title">
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu renderIcon={Fade16} title="Category title">
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu
                  renderIcon={Fade16}
                  title="Category title"
                  isActive={true}
                >
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    aria-current="page"
                    href="javascript:void(0)"
                  >
                    Link
                  </SideNavMenuItem>
                  <SideNavMenuItem href="javascript:void(0)">
                    Link
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Link
                </SideNavLink>
                <SideNavLink renderIcon={Fade16} href="javascript:void(0)">
                  Link
                </SideNavLink>
              </SideNavItems>
            </SideNav>
          </Header>
          <StoryContent />
        </>
      )}
    />
  );
}

const StoryContent = ({ useResponsiveOffset = true }) => {
  const [open, setOpen] = createSignal(false);
  const content = (
    <div class="cds--grid">
      <div class="cds--row">
        <div
          classList={{
            "cds--col-lg-13": true,
            "cds--offset-lg-3": useResponsiveOffset,
          }}
        >
          <h2 style={{ margin: "0 0 30px" }}>Purpose and function</h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with
            <a href="www.carbondesignsystem.com"> Carbon</a>. It contains the
            shared navigation framework for the entire design system and ties
            the products in IBM's portfolio together in a cohesive and elegant
            way. The shell is the home of the topmost navigation, where users
            can quickly and dependably gain their bearings and move between
            pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the shell
            ensures compliance with IBM design standards, simplifies development
            efforts, and provides great user experiences. All IBM products built
            with Carbon are required to use the shell's header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the “shell” of MacOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top of
            the screen, as well as a universal dock along the bottom or side of
            the screen. The Carbon UI shell is roughly analogous in function to
            these parts of the Mac UI. For example, the app switcher portion of
            the shell can be compared to the dock in MacOS.
          </p>
          <h2 style={{ margin: "30px 0" }}>Header responsive behavior</h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            “hamburger” menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2 style={{ margin: "30px 0" }}>Secondary navigation</h2>
          <p>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and category
            lists can be used in the side-nav and may be mixed together. There
            are several configurations of the side-nav, but only one
            configuration should be used per product section. If tabs are needed
            on a page when using a side-nav, then the tabs are secondary in
            hierarchy to the side-nav.
          </p>
          <Button onClick={() => setOpen(true)}>Launch modal</Button>
          {/** 
          <Modal
            modalHeading="Add a custom domain"
            modalLabel="Account resources"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            open={open}
            onRequestClose={() => setOpen(false)}>
            <p style={{ marginBottom: '1rem' }}>
              Custom domains direct requests for your apps in this Cloud Foundry
              organization to a URL that you own. A custom domain can be a
              shared domain, a shared subdomain, or a shared domain and host.
            </p>
          </Modal>
          */}
        </div>
      </div>
    </div>
  );
  const style = {
    height: "100%",
    margin: undefined,
    width: undefined,
  };
  if (useResponsiveOffset) {
    style.margin = "0";
    style.width = "100%";
  }
  return (
    <Content id="main-content" style={style}>
      {content}
    </Content>
  );
};
