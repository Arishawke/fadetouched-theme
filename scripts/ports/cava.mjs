export const label = "Cava";

export default function render(ctx) {
  const { meta, sem, accent } = ctx;
  const gradient = [accent.blue, accent.teal, accent.green, accent.yellow, accent.orange, accent.red];
  const lines = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    `[color]`,
    `background = '${sem.bg}'`,
    `foreground = '${sem.accent}'`,
    `gradient = 1`,
    ...gradient.map((color, index) => `gradient_color_${index + 1} = '${color}'`),
    ``,
  ];

  return [{ path: `ports/cava/${meta.slug}`, content: lines.join("\n") }];
}
