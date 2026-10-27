# Fadetouched for eza

Copy `theme.yml` to eza's configuration directory. On Linux, the default is `$XDG_CONFIG_HOME/eza/theme.yml`, falling back to `~/.config/eza/theme.yml`.

For PowerShell, keep the file in a stable directory and add this to `$PROFILE`:

```powershell
$env:EZA_CONFIG_DIR = "$HOME\.config\eza"
```

`LS_COLORS` and `EZA_COLORS` take precedence over the native theme when they are set.
