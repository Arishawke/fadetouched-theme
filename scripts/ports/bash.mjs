export const label = "bash";

export default function render(ctx) {
  const { meta, accent } = ctx;
  const sgr = (hex, bold = false) => {
    const rgb = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
    return `${bold ? "01;" : ""}38;2;${rgb.join(";")}`;
  };

  const groups = [
    [["DIR"], accent.blue, true],
    [["LINK"], accent.teal],
    [["MULTIHARDLINK"], accent.cyan],
    [["FIFO", "BLK", "CHR"], accent.yellow],
    [["SOCK", "DOOR"], accent.magenta],
    [["ORPHAN", "MISSING"], accent.red, true],
    [["SETUID", "SETGID"], accent.orange, true],
    [["STICKY_OTHER_WRITABLE", "OTHER_WRITABLE", "STICKY"], accent.rust],
    [["EXEC"], accent.green, true],
    [[".tar", ".tgz", ".arc", ".arj", ".taz", ".lha", ".lz4", ".lzh", ".lzma", ".tlz", ".txz", ".tzo", ".t7z", ".zip", ".z", ".dz", ".gz", ".lrz", ".lz", ".lzo", ".xz", ".zst", ".tzst", ".bz2", ".bz", ".tbz", ".tbz2", ".tz", ".deb", ".rpm", ".jar", ".war", ".ear", ".sar", ".rar", ".alz", ".ace", ".zoo", ".cpio", ".7z", ".rz", ".cab", ".wim", ".swm", ".dwm", ".esd"], accent.red],
    [[".jpg", ".jpeg", ".mjpg", ".mjpeg", ".gif", ".bmp", ".pbm", ".pgm", ".ppm", ".tga", ".xbm", ".xpm", ".tif", ".tiff", ".png", ".svg", ".svgz", ".webp", ".ico", ".avif", ".jxl"], accent.magenta],
    [[".mp4", ".m4v", ".mkv", ".webm", ".mov", ".avi", ".wmv", ".flv", ".mpeg", ".mpg"], accent.purple],
    [[".aac", ".au", ".flac", ".m4a", ".mid", ".midi", ".mka", ".mp3", ".mpc", ".ogg", ".opus", ".ra", ".wav"], accent.cyan],
    [[".pdf", ".doc", ".docx", ".odt", ".rtf", ".epub", ".md", ".txt"], accent.yellow],
  ];

  const lines = [
    `# ${meta.name}. Generated from ${meta.source}. Do not edit by hand.`,
    `TERM *color*`,
    `TERM alacritty`,
    `TERM cygwin`,
    `TERM foot*`,
    `TERM ghostty`,
    `TERM kitty`,
    `TERM linux`,
    `TERM rio`,
    `TERM screen*`,
    `TERM tmux*`,
    `TERM wezterm`,
    `TERM xterm*`,
    `RESET 0`,
    `NORMAL 00`,
    `FILE 00`,
    ...groups.flatMap(([keys, color, bold]) => keys.map((key) => `${key} ${sgr(color, bold)}`)),
    ``,
  ];

  return [{ path: `ports/bash/${meta.slug}.dircolors`, content: lines.join("\n") }];
}
