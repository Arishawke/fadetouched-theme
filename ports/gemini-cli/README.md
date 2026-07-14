# Fadetouched for Gemini CLI

## Install

1. Copy [`fadetouched.json`](fadetouched.json) somewhere inside your home
   directory.
2. Open `~/.gemini/settings.json` and set `ui.theme` to the full path of the
   copied file:

```json
{
  "ui": {
    "theme": "/path/inside/your/home/fadetouched.json"
  }
}
```

3. Restart Gemini CLI.

Gemini CLI will not load theme files stored outside your home directory.
