// Purpose: Build script for the icons package.

import { ComponentDirectory, RichComponentDirectory, RichIconsSVGsDirectory, SVGsDirectory } from "./constants.ts";
import { fetchSvgs } from "./fetchSvgs.ts";
import { generateComponents } from "./generateComponents.ts";
import { generateIndex } from "./generateIndex.ts";

console.log("⚙️ Fetching SVGs...\n");
const multiSourceIcons = fetchSvgs(SVGsDirectory);
const multiSourceRichIcons = fetchSvgs(RichIconsSVGsDirectory);

console.log("⚙️ Generating react components...\n");
generateComponents(ComponentDirectory, multiSourceIcons, false);
generateComponents(RichComponentDirectory, multiSourceRichIcons, true);

console.log("📋 List of icons generation...\n");
generateIndex(ComponentDirectory, multiSourceIcons, false);
generateIndex(RichComponentDirectory, multiSourceRichIcons, true);

console.log("✨ Build completed!\n");
