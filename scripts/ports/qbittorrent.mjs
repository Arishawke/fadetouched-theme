export const label = "qBittorrent";

export default function render(ctx) {
  const { meta, sem, accent } = ctx;

  const colors = {
    "Palette.Window": sem.bg,
    "Palette.WindowText": sem.text,
    "Palette.Base": sem["bg-dim"],
    "Palette.AlternateBase": sem.surface,
    "Palette.Text": sem.text,
    "Palette.ToolTipBase": sem.popover,
    "Palette.ToolTipText": sem.text,
    "Palette.BrightText": sem.text,
    "Palette.Highlight": sem["border-strong"],
    "Palette.HighlightedText": sem.text,
    "Palette.Button": sem.surface,
    "Palette.ButtonText": sem.text,
    "Palette.Link": sem.link,
    "Palette.LinkVisited": sem["link-visited"],
    "Palette.Light": sem["surface-active"],
    "Palette.Midlight": sem["surface-hover"],
    "Palette.Mid": sem.border,
    "Palette.Dark": sem["bg-dim"],
    "Palette.Shadow": sem["bg-sunken"],
    "Palette.WindowTextDisabled": sem["text-faint"],
    "Palette.TextDisabled": sem["text-faint"],
    "Palette.ToolTipTextDisabled": sem["text-faint"],
    "Palette.BrightTextDisabled": sem["text-faint"],
    "Palette.HighlightedTextDisabled": sem["text-subtle"],
    "Palette.ButtonTextDisabled": sem["text-faint"],

    "Log.Time": sem["text-subtle"],
    "Log.Normal": sem.text,
    "Log.Info": sem.info,
    "Log.Warning": sem.warning,
    "Log.Critical": sem.error,
    "Log.BannedPeer": sem.error,

    "TransferList.Downloading": sem.success,
    "TransferList.StalledDownloading": sem["text-muted"],
    "TransferList.DownloadingMetadata": sem.info,
    "TransferList.ForcedDownloading": sem.success,
    "TransferList.Allocating": sem["text-muted"],
    "TransferList.Uploading": accent.blue,
    "TransferList.StalledUploading": sem["text-muted"],
    "TransferList.ForcedUploading": accent.blue,
    "TransferList.QueuedDownloading": sem["text-subtle"],
    "TransferList.QueuedUploading": sem["text-subtle"],
    "TransferList.CheckingDownloading": sem.warning,
    "TransferList.CheckingUploading": sem.warning,
    "TransferList.CheckingResumeData": sem.warning,
    "TransferList.PausedDownloading": sem["text-faint"],
    "TransferList.PausedUploading": sem["text-faint"],
    "TransferList.Moving": accent.purple,
    "TransferList.MissingFiles": sem.error,
    "TransferList.Error": sem.error,
  };

  const config = JSON.stringify({ colors }, null, 2) + "\n";

  const qss = [
    `/* ${meta.name}. Generated from ${meta.source}. Do not edit by hand. */`,
    `QWidget { background-color: ${sem.bg}; color: ${sem.text}; }`,
    `QMenuBar, QToolBar, QStatusBar { background-color: ${sem["bg-dim"]}; border: none; }`,
    `QMenu { background-color: ${sem.popover}; border: 1px solid ${sem.border}; }`,
    `QMenu::item:selected { background-color: ${sem["surface-hover"]}; }`,
    `QHeaderView::section { background-color: ${sem.surface}; color: ${sem["text-muted"]}; border: none; padding: 4px; }`,
    `QLineEdit, QComboBox, QAbstractSpinBox, QPlainTextEdit, QTextEdit {`,
    `  background-color: ${sem["bg-dim"]}; color: ${sem.text}; border: 1px solid ${sem.border}; }`,
    `QPushButton { background-color: ${sem.surface}; color: ${sem.text}; border: 1px solid ${sem.border}; padding: 4px 12px; }`,
    `QPushButton:hover { background-color: ${sem["surface-hover"]}; }`,
    `QPushButton:pressed { background-color: ${sem["surface-active"]}; }`,
    `QTabBar::tab { background-color: ${sem.bg}; color: ${sem["text-muted"]}; padding: 5px 10px; }`,
    `QTabBar::tab:selected { background-color: ${sem.surface}; color: ${sem.text}; }`,
    `QScrollBar:vertical, QScrollBar:horizontal { background-color: ${sem["bg-dim"]}; border: none; }`,
    `QScrollBar::handle { background-color: ${sem.border}; border-radius: 3px; }`,
    `QScrollBar::handle:hover { background-color: ${sem["border-strong"]}; }`,
    ``,
  ].join("\n");

  const qrc = [
    `<!DOCTYPE RCC>`,
    `<RCC version="1.0">`,
    `  <qresource>`,
    `    <file alias="stylesheet.qss">stylesheet.qss</file>`,
    `    <file alias="config.json">config.json</file>`,
    `  </qresource>`,
    `</RCC>`,
    ``,
  ].join("\n");

  return [
    { path: "ports/qbittorrent/config.json", content: config },
    { path: "ports/qbittorrent/stylesheet.qss", content: qss },
    { path: "ports/qbittorrent/resources.qrc", content: qrc },
  ];
}
