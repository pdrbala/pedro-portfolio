# Redeploy to GitHub Pages (gh-pages branch).
# Usage:  powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1
# Requires: gh authenticated (gh auth status) with `repo` scope.

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$repoUrl = "https://github.com/pdrbala/pedro-portfolio.git"

Set-Location $root
Write-Host "Building static export (basePath /pedro-portfolio)..." -ForegroundColor Cyan
$env:GITHUB_PAGES = "true"
npm run build
Remove-Item Env:\GITHUB_PAGES

Write-Host "Publishing out/ to gh-pages..." -ForegroundColor Cyan
Set-Location (Join-Path $root "out")
git init -b gh-pages -q
git config commit.gpgsign false
git add -A
git -c commit.gpgsign=false commit -q -m ("Deploy " + (Get-Date -Format "yyyy-MM-dd HH:mm"))
git remote remove origin 2>$null
git remote add origin $repoUrl
git push -f origin gh-pages
Set-Location $root
Write-Host "Done -> https://pdrbala.github.io/pedro-portfolio/" -ForegroundColor Green
