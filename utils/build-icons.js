/// Adapted from https://github.com/amoutonbrady/solid-heroicons/blob/master/scripts/fetchIcons.ts

const { join } = require("path");
const { outputFile } = require("fs-extra");

const BASE_OUTPUT = "../lib/src/icons";

const icons = require("@carbon/icons");

const buildAttrs = (attrs) => {
  const buffer = [];
  Object.entries(attrs).forEach(([name, data]) => {
    if (typeof data !== undefined) {
      buffer.push(`${name}="${data}"`);
    }
  });
  return buffer;
};

const buildClosedElemWithAttrs = (elem, attrs) => {
  const buffer = [`<${elem}`];
  buffer.push(...buildAttrs(attrs));
  buffer.push("/>");
  return buffer.join(" ");
};

const buildSVG = (iconData, name) => {
  let buffer = [
    `import type { JSX } from "solid-js";\nexport const ${name} = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <${iconData.elem} {...props} aria-label={props.description}`,
  ];
  buffer.push(buildAttrs(iconData.attrs).join(" "));
  buffer.push(">");
  buffer = [buffer.join(""), '<title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title>'];
  iconData.content.forEach((content) =>
    buffer.push(buildClosedElemWithAttrs(content.elem, content.attrs))
  );
  buffer.push(`</${iconData.elem}>\n`);
  return buffer.join("");
};

async function build() {
  const builtIcons = {};
  for ([name, iconData] of Object.entries(icons)) {
    builtIcons[name] = buildSVG(iconData, name);
  }
  for ([name, codeString] of Object.entries(builtIcons)) {
    await outputFile(
      join(process.cwd(), BASE_OUTPUT, "icons", `${name}.tsx`),
      codeString,
      {
        encoding: "utf-8",
      }
    );
  }
  const buffer = [];
  for (name in icons) {
    buffer.push(`export {${name}} from "./icons/${name}"`);
  }
  await outputFile(
    join(process.cwd(), BASE_OUTPUT, "index.ts"),
    buffer.join("\n"),
    {
      encoding: "utf-8",
    }
  );
}

// Start the whole machinery
build().catch((e) => {
  console.error(e);
  process.exit(1);
});
