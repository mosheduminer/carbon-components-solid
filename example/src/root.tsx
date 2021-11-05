// @refresh reload
import { useNavigate } from "solid-app-router";
import { Links, Meta, Outlet, Scripts } from "solid-start/components";
import Selector from "~/components/Selector";
import "./styles.scss";

const components = [
  "Accordion",
  "Breadcrumb",
  "Button",
  "Checkbox",
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
        <Selector list={components} callback={(data) => navigator(data.name)} />
        <Outlet></Outlet>
        <Scripts />
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
