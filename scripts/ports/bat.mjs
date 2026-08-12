import renderYazi from "./yazi.mjs";

export const label = "bat";

export default function render(ctx) {
  const theme = renderYazi(ctx).find(({ path }) => path.endsWith("/tmtheme.xml"));
  return [{ path: `ports/bat/${ctx.meta.name}.tmTheme`, content: theme.content }];
}
