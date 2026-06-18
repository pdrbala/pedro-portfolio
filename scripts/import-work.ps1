Add-Type -AssemblyName System.Drawing

$out = "C:\pedro-portfolio\public\work"
New-Item -ItemType Directory -Force $out | Out-Null

function Save-Resized([string]$src, [string]$destName, [int]$maxW) {
  if (-not (Test-Path $src)) { Write-Output "MISSING: $src"; return }
  $img = [System.Drawing.Image]::FromFile($src)
  $w = $img.Width; $h = $img.Height
  $scale = [Math]::Min(1.0, $maxW / $w)
  $nw = [int][Math]::Round($w * $scale)
  $nh = [int][Math]::Round($h * $scale)
  $bmp = New-Object System.Drawing.Bitmap($nw, $nh)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $nw, $nh)
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $ps = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ps.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]86)
  $bmp.Save((Join-Path $out $destName), $codec, $ps)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Output ("{0} = {1}x{2}" -f $destName, $nw, $nh)
}

$dl = "C:\Users\Balla\Downloads"
$eric = "C:\Users\Balla\Documents\Eric"
$gi = "C:\Users\Balla\Documents\Giselle"

Save-Resized (Join-Path $dl "Página Um.png")    "jornal-01.jpg" 1200
Save-Resized (Join-Path $dl "Página Dois.png")  "jornal-02.jpg" 1200
Save-Resized (Join-Path $dl "Página Três.png")  "jornal-03.jpg" 1200
Save-Resized (Join-Path $eric "Brand_Kit.png")  "eric-01.jpg" 1600
Save-Resized (Join-Path $eric "Apresentação.png") "eric-02.jpg" 1100
Save-Resized (Join-Path $gi "Mockup1.png")      "costa-01.jpg" 1600
Save-Resized (Join-Path $gi "Mockup2.png")      "costa-02.jpg" 1600
Save-Resized (Join-Path $gi "Mockup3.png")      "costa-03.jpg" 1600
Write-Output "done"
