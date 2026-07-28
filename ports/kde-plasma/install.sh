#!/usr/bin/env sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
DATA_HOME=${XDG_DATA_HOME:-"$HOME/.local/share"}
CONFIG_HOME=${XDG_CONFIG_HOME:-"$HOME/.config"}

install -d "$DATA_HOME/color-schemes" "$DATA_HOME/plasma/desktoptheme/Fadetouched" "$DATA_HOME/plasma/look-and-feel/com.arishawke.fadetouched" "$DATA_HOME/aurorae/themes/Fadetouched" "$DATA_HOME/wallpapers/Fadetouched" "$CONFIG_HOME/Kvantum/Fadetouched" "$DATA_HOME/icons"
install -m 0644 "$ROOT/ports/kde-plasma/Fadetouched.colors" "$DATA_HOME/color-schemes/Fadetouched.colors"
cp -R "$ROOT/ports/kde-plasma/desktoptheme/Fadetouched/." "$DATA_HOME/plasma/desktoptheme/Fadetouched/"
cp -R "$ROOT/ports/kde-plasma/look-and-feel/com.arishawke.fadetouched/." "$DATA_HOME/plasma/look-and-feel/com.arishawke.fadetouched/"
cp -R "$ROOT/ports/kde-plasma/aurorae/Fadetouched/." "$DATA_HOME/aurorae/themes/Fadetouched/"
cp -R "$ROOT/ports/kde-plasma/wallpapers/Fadetouched/." "$DATA_HOME/wallpapers/Fadetouched/"
cp -R "$ROOT/ports/kvantum/Fadetouched/." "$CONFIG_HOME/Kvantum/Fadetouched/"
tar -xzf "$ROOT/ports/cursor/dist/Fadetouched-Modern-XCursor.tar.gz" -C "$DATA_HOME/icons"

printf '%s\n' "Installed Fadetouched. Select it in System Settings, then choose Fadetouched in Kvantum Manager."
