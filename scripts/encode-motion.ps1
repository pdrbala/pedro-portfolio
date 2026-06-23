# Optimize downloaded motion clips into web loops + posters in public/work.
# ffmpeg path is read from %TEMP%\ffpath.txt (set by the download step) or PATH.
$ff = (Get-Content "$env:TEMP\ffpath.txt" -ErrorAction SilentlyContinue)
if (-not $ff -or -not (Test-Path $ff)) { $ff = (Get-Command ffmpeg).Source }
$ffprobe = Join-Path (Split-Path $ff) "ffprobe.exe"
$tmp = "$env:TEMP\motion"
$out = "C:\pedro-portfolio\public\work"

foreach ($k in "v1","v2","v3","v4","v5") {
  $in = "$tmp\$k.mp4"
  if (-not (Test-Path $in)) { Write-Output "skip $k (missing)"; continue }
  # cap the long side at 1280, keep aspect, even dims
  $scale = "scale='if(gte(iw,ih),min(1280,iw),-2)':'if(gte(iw,ih),-2,min(1280,ih))'"
  & $ff -y -i $in -vf $scale -c:v libx264 -crf 26 -preset veryfast -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k "$out\motion-$k.mp4" 2>$null
  # poster from ~25% of duration (skips black intros)
  $dur = & $ffprobe -v error -show_entries format=duration -of csv=p=0 $in 2>$null
  $t = 1.0
  if ($dur) { $t = [math]::Max(0.4, [double]$dur * 0.25) }
  & $ff -y -ss $t -i $in -frames:v 1 -vf $scale -q:v 3 "$out\motion-$k.jpg" 2>$null
  $vmb = [math]::Round((Get-Item "$out\motion-$k.mp4").Length/1MB,1)
  Write-Output ("$k -> motion-$k.mp4 ($vmb MB) + poster @ ${t}s")
}
Write-Output "encode done"
