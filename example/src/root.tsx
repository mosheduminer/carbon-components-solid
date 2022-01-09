// @refresh reload
import { useNavigate } from "solid-app-router";
import { Links, Meta, Outlet, Scripts } from "solid-start/components";
import Selector from "~/components/Selector";
import "./styles.css";

const components = [
  "Accordion",
  "Breadcrumb",
  "Button",
  "Checkbox",
  "ComposedModal",
  "Pagination",
  "PaginationNav",
  "ProgressBar",
  "Select",
  "StructuredList",
  "Tabs",
  "Tag",
  // "UIShell",
];

const Page = () => {
  const navigator = useNavigate();
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Selector
          list={components}
          callback={(data) => navigator(data.name)}
        />
        <div style="display: flex; justify-content: center;">
          <div style="width: 80%; padding-top: 24px;">
            <Outlet />
            <Scripts />
          </div>
        </div>
      </body>
    </html>
  );
};

export default function Root({ Start }) {
  return (
    <Start>
      <Page />
    </Start>
  );
}
