# Fadetouched for bat

Copy `Fadetouched.tmTheme` into bat's theme directory and rebuild its cache:

```sh
mkdir -p "$(bat --config-dir)/themes"
cp Fadetouched.tmTheme "$(bat --config-dir)/themes/"
bat cache --build
```

Add `--theme=Fadetouched` to the file printed by `bat --config-file`, or set `BAT_THEME=Fadetouched`.
