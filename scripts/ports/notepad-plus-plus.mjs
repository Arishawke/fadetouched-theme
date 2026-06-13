export const label = "Notepad++";

export default function render(ctx) {
  const { meta, sem, syn } = ctx;
  const X = (hex) => hex.replace("#", "").toUpperCase();
  const bg = X(sem.bg);

  const col = {
    default: sem.text,
    comment: syn.comment,
    number: syn.number,
    keyword: syn.keyword,
    string: syn.string,
    operator: syn.operator,
    type: syn.type,
    function: syn.function,
    decorator: syn.decorator,
    builtin: syn.builtin,
    escape: syn.escape,
    property: syn.property,
    tag: syn.tag,
    attribute: syn.attribute,
    parameter: syn.parameter,
    error: sem.error,
    added: sem.success,
    deleted: sem.error,
    changed: sem.warning,
  };

  const words = ([id, role]) =>
    `        <WordsStyle name="${role}" styleID="${id}" fgColor="${X(col[role])}" bgColor="${bg}" fontName="" fontStyle="${role === "comment" ? 2 : 0}" fontSize="" />`;

  const lexer = (name, desc, styles) => [
    `    <LexerType name="${name}" desc="${desc}" ext="">`,
    ...styles.map(words),
    `    </LexerType>`,
  ];

  const cFamily = [
    [1, "comment"], [2, "comment"], [3, "comment"], [4, "number"],
    [5, "keyword"], [6, "string"], [7, "string"], [9, "decorator"],
    [10, "operator"], [11, "default"], [13, "string"], [14, "escape"],
    [15, "comment"], [16, "type"], [17, "decorator"], [20, "string"],
  ];

  const lexers = [
    lexer("cpp", "C++", cFamily),
    lexer("c", "C", cFamily),
    lexer("java", "Java", cFamily),
    lexer("javascript.js", "JavaScript", cFamily),
    lexer("javascript", "JavaScript (embedded)", [
      [41, "default"], [42, "comment"], [43, "comment"], [44, "comment"],
      [45, "number"], [46, "default"], [47, "keyword"], [48, "string"],
      [49, "string"], [50, "operator"], [52, "escape"], [53, "string"], [68, "string"],
    ]),
    lexer("python", "Python", [
      [0, "default"], [1, "comment"], [2, "number"], [3, "string"], [4, "string"],
      [5, "keyword"], [6, "string"], [7, "string"], [8, "type"], [9, "function"],
      [10, "operator"], [11, "default"], [12, "comment"], [14, "builtin"],
      [15, "decorator"], [16, "string"], [17, "string"], [18, "string"],
      [19, "string"], [20, "property"],
    ]),
    lexer("html", "HTML", [
      [0, "default"], [1, "tag"], [2, "tag"], [3, "attribute"], [4, "attribute"],
      [5, "number"], [6, "string"], [7, "string"], [9, "comment"], [10, "escape"],
      [11, "tag"], [17, "string"], [19, "string"],
    ]),
    lexer("xml", "XML", [
      [0, "default"], [1, "tag"], [2, "tag"], [3, "attribute"], [4, "attribute"],
      [5, "number"], [6, "string"], [7, "string"], [9, "comment"], [10, "escape"],
      [11, "tag"], [12, "tag"], [13, "tag"], [17, "string"],
    ]),
    lexer("css", "CSS", [
      [0, "default"], [1, "tag"], [2, "type"], [3, "keyword"], [5, "operator"],
      [6, "property"], [8, "string"], [9, "comment"], [10, "type"], [11, "keyword"],
      [12, "decorator"], [13, "string"], [14, "string"], [16, "attribute"],
      [18, "keyword"], [22, "decorator"], [23, "parameter"],
    ]),
    lexer("json", "JSON", [
      [0, "default"], [1, "number"], [2, "string"], [3, "string"], [4, "property"],
      [5, "escape"], [6, "comment"], [7, "comment"], [8, "operator"], [11, "keyword"],
      [13, "error"],
    ]),
    lexer("bash", "Shell", [
      [0, "default"], [1, "error"], [2, "comment"], [3, "number"], [4, "keyword"],
      [5, "string"], [6, "string"], [7, "operator"], [8, "default"], [9, "parameter"],
      [10, "parameter"], [11, "string"], [12, "string"], [13, "string"],
    ]),
    lexer("sql", "SQL", [
      [1, "comment"], [2, "comment"], [3, "comment"], [4, "number"], [5, "keyword"],
      [6, "string"], [7, "string"], [10, "operator"], [16, "type"], [19, "type"],
    ]),
    lexer("yaml", "YAML", [
      [0, "default"], [1, "comment"], [2, "property"], [3, "keyword"], [4, "number"],
      [5, "parameter"], [6, "decorator"], [7, "default"], [8, "error"],
    ]),
    lexer("ini", "MS ini file", [
      [0, "default"], [1, "comment"], [2, "keyword"], [3, "operator"], [4, "string"],
      [5, "property"],
    ]),
    lexer("props", "Properties file", [
      [0, "default"], [1, "comment"], [2, "keyword"], [3, "operator"], [4, "string"],
      [5, "property"],
    ]),
    lexer("toml", "TOML", [
      [0, "default"], [1, "comment"], [2, "default"], [3, "keyword"], [4, "number"],
      [5, "keyword"], [6, "property"], [7, "error"], [8, "operator"], [9, "string"],
      [10, "string"], [11, "string"], [12, "string"], [13, "escape"], [14, "number"],
    ]),
    lexer("makefile", "Makefile", [
      [0, "default"], [1, "comment"], [2, "decorator"], [3, "default"], [4, "operator"],
      [5, "function"], [9, "error"],
    ]),
    lexer("diff", "Diff", [
      [0, "default"], [1, "comment"], [2, "keyword"], [3, "function"], [4, "number"],
      [5, "deleted"], [6, "added"], [7, "changed"],
    ]),
    lexer("searchResult", "Search result", [
      [1, "function"], [2, "keyword"], [3, "number"], [4, "type"],
    ]),
    lexer("powershell", "PowerShell", [
      [0, "default"], [1, "comment"], [2, "string"], [3, "string"], [4, "number"],
      [5, "parameter"], [6, "operator"], [7, "default"], [8, "keyword"], [9, "function"],
      [10, "type"], [11, "function"], [12, "keyword"], [13, "comment"], [14, "string"],
      [15, "string"], [16, "decorator"],
    ]),
    lexer("batch", "MS-DOS Style", [
      [0, "default"], [1, "comment"], [2, "keyword"], [3, "decorator"], [4, "default"],
      [5, "function"], [6, "parameter"], [7, "operator"], [8, "decorator"],
    ]),
  ];

  const widget = (name, styleID, attrs) => {
    const a = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ");
    return `        <WidgetStyle name="${name}" styleID="${styleID}" ${a} />`;
  };

  const globals = [
    widget("Global override", 0, { fgColor: X(sem.text), bgColor: bg, fontName: "", fontStyle: "0", fontSize: "" }),
    widget("Default Style", 32, { fgColor: X(sem.text), bgColor: bg, fontName: "", fontStyle: "0", fontSize: "" }),
    widget("Indent guideline style", 37, { fgColor: X(sem.border), bgColor: bg }),
    widget("Brace highlight style", 34, { fgColor: X(sem.accent), bgColor: bg, fontStyle: "1" }),
    widget("Bad brace colour", 35, { fgColor: X(sem.error), bgColor: bg, fontStyle: "1" }),
    widget("Current line background colour", 0, { bgColor: X(sem.surface) }),
    widget("Selected text colour", 0, { bgColor: X(sem["surface-hover"]) }),
    widget("Caret colour", 2069, { fgColor: X(sem.cursor) }),
    widget("Edge colour", 0, { fgColor: X(sem.border) }),
    widget("Line number margin", 33, { fgColor: X(sem["text-faint"]), bgColor: X(sem["bg-dim"]) }),
    widget("Fold", 0, { fgColor: X(sem["border-strong"]), bgColor: X(sem["bg-dim"]) }),
    widget("Fold active", 0, { fgColor: X(sem.accent) }),
    widget("Fold margin", 0, { fgColor: bg, bgColor: X(sem["bg-dim"]) }),
    widget("White space symbol", 0, { fgColor: X(sem.border) }),
    widget("Smart Highlighting", 29, { bgColor: X(sem["surface-active"]) }),
    widget("Find Mark Style", 31, { bgColor: X(sem["border-strong"]) }),
    widget("URL hovered", 0, { fgColor: X(sem.link) }),
    widget("EOL custom color", 0, { fgColor: X(sem.border) }),
  ];

  const out = [
    `<?xml version="1.0" encoding="UTF-8" ?>`,
    `<!-- ${meta.name}. Generated from palette.json. Do not edit by hand. -->`,
    `<NotepadPlus>`,
    `    <LexerStyles>`,
    ...lexers.flat(),
    `    </LexerStyles>`,
    `    <GlobalStyles>`,
    ...globals,
    `    </GlobalStyles>`,
    `</NotepadPlus>`,
    ``,
  ].join("\n");

  return [{ path: "ports/notepad-plus-plus/Fadetouched.xml", content: out }];
}
