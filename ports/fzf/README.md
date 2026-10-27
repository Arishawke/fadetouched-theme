# Fadetouched for fzf

Copy `fadetouched.fzfrc` somewhere stable and point `FZF_DEFAULT_OPTS_FILE` to it.

For bash or zsh, add this to the shell configuration:

```sh
export FZF_DEFAULT_OPTS_FILE="$HOME/.config/fzf/fadetouched.fzfrc"
```

For PowerShell, add this to `$PROFILE`:

```powershell
$env:FZF_DEFAULT_OPTS_FILE = "$HOME\.config\fzf\fadetouched.fzfrc"
```

Options in `FZF_DEFAULT_OPTS` still apply after this file and can override individual colors.
