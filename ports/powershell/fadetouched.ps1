# Fadetouched for PowerShell (PSReadLine). Generated from palette.json. Do not edit by hand.
# Dot-source from your $PROFILE:  . /path/to/fadetouched.ps1
if (Get-Module -ListAvailable -Name PSReadLine) {
    Set-PSReadLineOption -Colors @{
        Default          = '#dee1df'
        Comment          = '#666f6b'
        Keyword          = '#af90c3'
        String           = '#96bb93'
        Number           = '#d7a176'
        Command          = '#7daacf'
        Parameter        = '#bc836c'
        Variable         = '#81b8a8'
        Member           = '#7daacf'
        Type             = '#d7be86'
        Operator         = '#99c9c9'
        Emphasis         = '#d7be86'
        Error            = '#c87a75'
        Selection        = "$([char]0x1b)[48;2;62;73;69m"
        InlinePrediction = '#666f6b'
    }
}
