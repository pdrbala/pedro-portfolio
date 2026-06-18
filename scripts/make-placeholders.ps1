Add-Type -AssemblyName System.Drawing

$out = Join-Path $PSScriptRoot "..\public\work"
New-Item -ItemType Directory -Force $out | Out-Null

$ink    = [System.Drawing.ColorTranslator]::FromHtml("#161412")
$paper  = [System.Drawing.ColorTranslator]::FromHtml("#F2EFE9")
$accent = [System.Drawing.ColorTranslator]::FromHtml("#E10600")

function Save-Jpg([System.Drawing.Bitmap]$bmp, [string]$path) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
  $bmp.Save($path, $codec, $params)
}

function New-Canvas([System.Drawing.Color]$bg, [int]$w, [int]$h) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
  $g.Clear($bg)
  return @($bmp, $g)
}

function Draw-Meta([System.Drawing.Graphics]$g, [System.Drawing.Color]$fg, [string]$num, [string]$label, [int]$w, [int]$h) {
  $brush = New-Object System.Drawing.SolidBrush($fg)
  $fBig  = New-Object System.Drawing.Font("Arial", 220, [System.Drawing.FontStyle]::Bold)
  $fSm   = New-Object System.Drawing.Font("Consolas", 34, [System.Drawing.FontStyle]::Regular)
  $g.DrawString($num, $fBig, $brush, 60, ($h - 380))
  $g.DrawString($label.ToUpper(), $fSm, $brush, 70, 70)
  $fBig.Dispose(); $fSm.Dispose(); $brush.Dispose()
}

$w = 1600; $h = 2000

# 01 - GAO Contabeis: ink bg, paper circle, accent square
$c = New-Canvas $ink $w $h; $bmp = $c[0]; $g = $c[1]
$pb = New-Object System.Drawing.SolidBrush($paper)
$ab = New-Object System.Drawing.SolidBrush($accent)
$g.FillEllipse($pb, 520, 360, 980, 980)
$g.FillRectangle($ab, 220, 1180, 260, 260)
$pen = New-Object System.Drawing.Pen($paper, 3)
for ($i = 0; $i -lt 6; $i++) { $g.DrawLine($pen, 0, (300 + $i * 280), $w, (300 + $i * 280)) }
Draw-Meta $g $paper "01" "Social / Visual system" $w $h
Save-Jpg $bmp (Join-Path $out "project-01.jpg"); $g.Dispose(); $bmp.Dispose()

# 02 - Food Campaign: accent bg, ink half circle, paper dots
$c = New-Canvas $accent $w $h; $bmp = $c[0]; $g = $c[1]
$ib = New-Object System.Drawing.SolidBrush($ink)
$g.FillEllipse($ib, -400, 1100, 2400, 2400)
$pb2 = New-Object System.Drawing.SolidBrush($paper)
for ($r = 0; $r -lt 4; $r++) { for ($col = 0; $col -lt 7; $col++) { $g.FillEllipse($pb2, (140 + $col * 200), (420 + $r * 160), 56, 56) } }
Draw-Meta $g $ink "02" "Food / Social content" $w $h
$mb = New-Object System.Drawing.SolidBrush($paper)
$fBig = New-Object System.Drawing.Font("Arial", 220, [System.Drawing.FontStyle]::Bold)
$g.DrawString("02", $fBig, $mb, 60, ($h - 380))
Save-Jpg $bmp (Join-Path $out "project-02.jpg"); $g.Dispose(); $bmp.Dispose()

# 03 - Motion Experiments: paper bg, ink concentric rings, accent dot
$c = New-Canvas $paper $w $h; $bmp = $c[0]; $g = $c[1]
for ($i = 0; $i -lt 9; $i++) {
  $pen2 = New-Object System.Drawing.Pen($ink, 10)
  $s = 140 + $i * 160
  $g.DrawEllipse($pen2, (800 - $s / 2), (900 - $s / 2), $s, $s)
  $pen2.Dispose()
}
$ab2 = New-Object System.Drawing.SolidBrush($accent)
$g.FillEllipse($ab2, 760, 860, 80, 80)
Draw-Meta $g $ink "03" "Motion / Interaction" $w $h
Save-Jpg $bmp (Join-Path $out "project-03.jpg"); $g.Dispose(); $bmp.Dispose()

# 04 - Brand Systems: ink bg, paper vertical bars, accent circle
$c = New-Canvas $ink $w $h; $bmp = $c[0]; $g = $c[1]
$pb3 = New-Object System.Drawing.SolidBrush($paper)
for ($i = 0; $i -lt 5; $i++) { $g.FillRectangle($pb3, (180 + $i * 280), 320, 120, 1200) }
$ab3 = New-Object System.Drawing.SolidBrush($accent)
$g.FillEllipse($ab3, 1080, 1280, 340, 340)
Draw-Meta $g $paper "04" "Identity / Visual language" $w $h
Save-Jpg $bmp (Join-Path $out "project-04.jpg"); $g.Dispose(); $bmp.Dispose()

# Wall tiles 05-08: simpler swapped-palette variants
$tiles = @(
  @{ bg = $paper; fg = $ink;   num = "05" },
  @{ bg = $ink;   fg = $accent; num = "06" },
  @{ bg = $accent; fg = $paper; num = "07" },
  @{ bg = $paper; fg = $ink;   num = "08" }
)
$ti = 0
foreach ($t in $tiles) {
  $c = New-Canvas $t.bg $w $h; $bmp = $c[0]; $g = $c[1]
  $fb = New-Object System.Drawing.SolidBrush($t.fg)
  switch ($ti) {
    0 { $g.FillPolygon($fb, @( (New-Object System.Drawing.Point(200, 1700)), (New-Object System.Drawing.Point(800, 300)), (New-Object System.Drawing.Point(1400, 1700)) )) }
    1 { for ($i = 0; $i -lt 7; $i++) { $g.FillRectangle($fb, 200, (300 + $i * 220), 1200, 90) } }
    2 { $g.FillEllipse($fb, 300, 500, 1000, 1000) }
    3 { $g.FillRectangle($fb, 250, 250, 1100, 1100); $bb = New-Object System.Drawing.SolidBrush($t.bg); $g.FillEllipse($bb, 450, 450, 700, 700) }
  }
  $fBig2 = New-Object System.Drawing.Font("Arial", 160, [System.Drawing.FontStyle]::Bold)
  $g.DrawString($t.num, $fBig2, $fb, 60, ($h - 300))
  Save-Jpg $bmp (Join-Path $out ("wall-0" + ($ti + 1) + ".jpg")); $g.Dispose(); $bmp.Dispose()
  $ti++
}

Write-Output "done"
Get-ChildItem $out | Select-Object Name, Length
