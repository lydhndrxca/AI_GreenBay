# run.ps1 — Launch or refresh Green Bay Explorer
$ErrorActionPreference = 'SilentlyContinue'

$htmlFile = Join-Path $PSScriptRoot "Green Bay Explorer.html"
$windowTitle = "Green Bay Explorer"

Add-Type -AssemblyName System.Windows.Forms
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinAPI {
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@

$found = $false
$browsers = Get-Process -Name chrome, msedge, firefox, brave, opera -ErrorAction SilentlyContinue |
    Where-Object { $_.MainWindowTitle -like "*$windowTitle*" }

if ($browsers) {
    $proc = $browsers | Select-Object -First 1
    $hwnd = $proc.MainWindowHandle
    if ($hwnd -ne [IntPtr]::Zero) {
        [WinAPI]::ShowWindow($hwnd, 9) | Out-Null
        [WinAPI]::SetForegroundWindow($hwnd) | Out-Null
        Start-Sleep -Milliseconds 300
        [System.Windows.Forms.SendKeys]::SendWait("^+r")
        $found = $true
        Write-Host "Refreshed existing browser window." -ForegroundColor Green
    }
}

if (-not $found) {
    Start-Process $htmlFile
    Write-Host "Opened Green Bay Explorer in default browser." -ForegroundColor Green
}
