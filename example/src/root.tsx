// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { useNavigate } from "solid-app-router";
import Selector from "~/components/Selector";
import "./styles.css";

const components = [
  "Accordion",
  // "Breadcrumb",
  "Button",
  "Checkbox",
  "ComposedModal",
  "DataTable",
  "Pagination",
  "PaginationNav",
  "ProgressBar",
  "Select",
  "StructuredList",
  // "Tabs",
  "Tag",
  "UIShell",
];

export default function Root() {
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
        <Selector list={components} callback={(data) => navigator(data.name)} />
        <ErrorBoundary>
          <div style="display: flex; justify-content: center;">
            <div style="width: 80%; padding-top: 24px;">
              <Routes />
              <Scripts />
            </div>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
