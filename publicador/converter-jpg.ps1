# Converte as artes PNG de ../saida em JPEG (formato exigido pela API do Instagram).
# Uso: powershell -ExecutionPolicy Bypass -File publicador\converter-jpg.ps1

Add-Type -AssemblyName System.Drawing

$raiz = Split-Path -Parent $PSScriptRoot
$origem = Join-Path $raiz 'saida'
$destino = Join-Path $PSScriptRoot 'jpg'
New-Item -ItemType Directory -Force $destino | Out-Null

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]92)

Get-ChildItem $origem -Filter '*.png' | Where-Object { $_.Name -match '^(\d+)-' } | ForEach-Object {
  $numero = $Matches[1]
  $png = [System.Drawing.Image]::FromFile($_.FullName)
  # Fundo branco para eliminar qualquer transparência
  $bmp = New-Object System.Drawing.Bitmap $png.Width, $png.Height
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($png, 0, 0, $png.Width, $png.Height)
  $saida = Join-Path $destino "$numero.jpg"
  $bmp.Save($saida, $codec, $params)
  $g.Dispose(); $bmp.Dispose(); $png.Dispose()
  Write-Output "$numero.jpg"
}
