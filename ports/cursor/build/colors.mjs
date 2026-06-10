import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const palette = JSON.parse(
  readFileSync(fileURLToPath(new URL("../../../palette.json", import.meta.url)), "utf8")
);

export const colors = {
  body: palette.base,
  outline: palette.neutrals.n11,
  cautionAccent: palette.accents.red,
  badgeGreen: "#7ea886",
  track: "#2c463f",
  arcHead: "#6fd08e",
  arcTip: "#d4f5d9",
  bloom: "111,208,142",
};

export const cbmpColors = { bc: colors.body, oc: colors.outline, wc: colors.body };

export const recolorMap = [
  ["#06B231", colors.badgeGreen],
  ["#606060", colors.badgeGreen],
  ["#179DD8", colors.badgeGreen],
  ["#5F3BE4", colors.badgeGreen],
  ["#0A6857", colors.badgeGreen],
  ["#4FADDF", colors.badgeGreen],
  ["#F1613A", colors.badgeGreen],
  ["#96C865", colors.badgeGreen],
  ["#FDBE2A", colors.badgeGreen],
  ["#FE0000", colors.cautionAccent],
  ["#F27400", colors.cautionAccent],
];

export const FRAMES = 36;
