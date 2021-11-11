/// Adapted from https://github.com/amoutonbrady/solid-heroicons/blob/master/scripts/fetchIcons.ts

const dd = require("dedent");
const { join, parse } = require("path");
const { pascalCase } = require("change-case");
const { readdir, readFile, outputFile } = require("fs-extra");
const { statSync } = require("fs");

const SRC_OTHER = "../node_modules/@carbon/icons/svg";
const SRC_16 = "../node_modules/@carbon/icons/svg/16";
const SRC_20 = "../node_modules/@carbon/icons/svg/20";
const SRC_24 = "../node_modules/@carbon/icons/svg/24";
const SRC_32 = "../node_modules/@carbon/icons/svg/32";

const SRC_DIRS = [SRC_OTHER, SRC_16, SRC_20, SRC_24, SRC_32];
const NAMES = ["other", "16", "20", "24", "32"];

const BASE_OUTPUT = "../lib/src/icons";

// Start the whole machinery
main().catch((e) => {
  console.error(e);
  process.exit(1);
});

async function main() {
  // Generate the icons in the proper folder
  SRC_DIRS.map((dir, index) =>
    generateIcons({ path: dir, name: NAMES[index], outline: false })
  );
}

async function generateIcons({ path, name, outline }) {
  const icons = await readdir(path);
  const exportedIcons = ['import type { JSX, Component } from "solid-js";'];

  for (const icon of icons) {
    if (statSync(join(path, icon)).isDirectory()) continue;
    let iconName = pascalCase(parse(icon).name);
    // iconName = ["export", "delete", "function", "package"].includes(iconName) ? `_${iconName}` : iconName;
    iconName = Number.isNaN(Number.parseInt(iconName[0]))
      ? iconName
      : `_${iconName}`;
    const iconSVG = await readFile(join(path, icon), { encoding: "utf-8" });

    // Clean the SVG markup
    const cleanedSVG = iconSVG
      .split("\n")
      .filter(Boolean)
      .map((path) => path.replace(/fill="(#\w+)"/g, 'fill="transparent"'))
      .join(" ");

    const [cleanedSVG1, cleanedSVG2] = [
      cleanedSVG.substring(0, 4),
      cleanedSVG.substring(5),
    ];

    const code = [cleanedSVG1, "{...props}", cleanedSVG2].join(" ");
    const iconPathsStr = dd`export const ${iconName}: Component<JSX.HTMLAttributes<SVGSVGElement>> = (props) => ${code};`;
    exportedIcons.push(iconPathsStr);
  }

  const exportedIconsStr = exportedIcons.join("\n");
  await outputFile(
    join(process.cwd(), BASE_OUTPUT, name, "index.tsx"),
    exportedIconsStr,
    {
      encoding: "utf-8",
    }
  );
}
