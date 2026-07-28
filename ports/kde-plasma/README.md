# Fadetouched for KDE Plasma 6

This suite includes the Fadetouched color scheme, atmospheric Plasma Style, Plasma 6 Global Theme, Aurorae window decoration, wallpaper package, Kvantum theme, and the existing Fadetouched cursor. It deliberately keeps Breeze Dark icons until a branded icon theme is ready.

## Install

Kvantum with Qt 6 support must be installed first. From the repository root, run:

```sh
sh ports/kde-plasma/install.sh
```

Open System Settings, choose **Colors & Themes > Global Theme > Fadetouched**, and apply it. Open Kvantum Manager separately, select **Fadetouched**, and enable KWin's Blur effect for the intended glass treatment. Restart open Qt applications after changing the Kvantum theme.

The installer writes only to `XDG_DATA_HOME` and `XDG_CONFIG_HOME` user directories. Plasma 6.6 uses Aurorae v2 by default; if that renderer regresses on the target system, the same SVG package can be tested with the legacy `org.kde.kwin.aurorae` engine.
