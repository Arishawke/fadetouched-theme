const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export const label = "Preview SVG";

function panel(ctx) {
  const { meta, n, accent, sem, syn } = ctx;

  const color = {
    kw: syn.keyword,
    str: syn.string,
    fn: syn.function,
    ty: syn.type,
    num: syn.number,
    op: syn.operator,
    param: syn.parameter,
    punct: syn.punctuation,
    comment: syn.comment,
    text: sem.text,
  };

  const lines = [
    [
      { t: "import ", c: "kw" }, { t: "{ ", c: "punct" }, { t: "veil", c: "text" },
      { t: " } ", c: "punct" }, { t: "from ", c: "kw" }, { t: '"./fade"', c: "str" },
      { t: ";", c: "punct" },
    ],
    [],
    [{ t: "// muted, earthy, teal-green", c: "comment", i: true }],
    [
      { t: "export ", c: "kw" }, { t: "function ", c: "kw" }, { t: "touch", c: "fn" },
      { t: "(", c: "punct" }, { t: "n", c: "param" }, { t: ": ", c: "punct" },
      { t: "number", c: "ty" }, { t: ")", c: "punct" }, { t: ": ", c: "punct" },
      { t: "string", c: "ty" }, { t: " {", c: "punct" },
    ],
    [
      { t: "  const ", c: "kw" }, { t: "glow ", c: "text" }, { t: "= ", c: "op" },
      { t: "n ", c: "text" }, { t: "* ", c: "op" }, { t: "1.07", c: "num" },
      { t: ";", c: "punct" },
    ],
    [
      { t: "  return ", c: "kw" }, { t: "`fade ${", c: "str" }, { t: "glow", c: "text" },
      { t: "}`", c: "str" }, { t: ";", c: "punct" },
    ],
    [{ t: "}", c: "punct" }],
  ];

  const W = 720;
  const titleH = 36;
  const codeX = 56;
  const firstBaseline = titleH + 26;
  const lineH = 22;
  const activeLine = 4;
  const codeBottom = firstBaseline + (lines.length - 1) * lineH + 12;

  const swatchY1 = codeBottom + 24;
  const swatchY2 = swatchY1 + 28;
  const swSize = 20;
  const swGap = 4;
  const swStart = 24;
  const swStep = (W - swStart * 2 + swGap) / 12;
  const H = swatchY2 + swSize + 20;

  const body = [];
  body.push(`<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="${sem.bg}" stroke="${sem.border}"/>`);
  body.push(`<path d="M0 ${titleH} h${W}" stroke="${sem.border}"/>`);
  body.push(`<rect width="${W}" height="${titleH}" rx="10" fill="${n.n1}"/>`);
  body.push(`<rect y="18" width="${W}" height="18" fill="${n.n1}"/>`);
  body.push(`<circle cx="22" cy="18" r="5" fill="${accent.red}"/>`);
  body.push(`<circle cx="40" cy="18" r="5" fill="${accent.yellow}"/>`);
  body.push(`<circle cx="58" cy="18" r="5" fill="${accent.green}"/>`);
  body.push(`<text x="${W / 2}" y="23" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${sem["text-subtle"]}">${meta.slug}.ts</text>`);

  const alY = firstBaseline + activeLine * lineH - 15;
  body.push(`<rect x="44" y="${alY}" width="${W - 56}" height="${lineH}" fill="${sem.text}" fill-opacity="0.05"/>`);

  lines.forEach((tokens, i) => {
    const y = firstBaseline + i * lineH;
    body.push(`<text x="36" y="${y}" text-anchor="end" font-family="${MONO}" font-size="13" fill="${sem["text-faint"]}">${i + 1}</text>`);
    if (tokens.length === 0) return;
    const spans = tokens
      .map((tok) => {
        const style = tok.i ? ` font-style="italic"` : "";
        return `<tspan fill="${color[tok.c]}"${style}>${esc(tok.t)}</tspan>`;
      })
      .join("");
    body.push(`<text x="${codeX}" y="${y}" font-family="${MONO}" font-size="14" xml:space="preserve">${spans}</text>`);
  });

  const swatchRow = (values, y) =>
    values.forEach((hex, i) => {
      const x = swStart + i * swStep;
      body.push(`<rect x="${x.toFixed(1)}" y="${y}" width="${swSize}" height="${swSize}" rx="4" fill="${hex}" stroke="${sem.border}" stroke-opacity="0.4"/>`);
    });
  swatchRow(Object.values(n), swatchY1);
  swatchRow(Object.values(accent), swatchY2);

  return { W, H, body };
}

export default function render(ctx) {
  const { meta } = ctx;
  const { W, H, body } = panel(ctx);
  const content = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${meta.name} theme preview">`,
    ...body,
    `</svg>`,
    "",
  ].join("\n");
  return { path: `assets/${meta.slug}-preview.svg`, content };
}
