# Fadetouched for bash

This GNU `dircolors` database sets `LS_COLORS` with the Fadetouched palette. It requires a truecolor terminal.

Copy `fadetouched.dircolors` somewhere stable, then add this to `~/.bashrc`:

```sh
eval "$(dircolors -b /path/to/fadetouched.dircolors)"
alias ls='ls --color=auto'
```
