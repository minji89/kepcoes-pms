param(
  [int]$Port = 3000
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$publicRoot = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'public'))
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")

$mimeTypes = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
}

try {
  $listener.Start()
  Write-Host "PMS local server: http://localhost:$Port"
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($requestPath)) { $requestPath = 'pms-data-change-request-detail.html' }
    $filePath = [System.IO.Path]::GetFullPath((Join-Path $publicRoot $requestPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar)))

    if (-not $filePath.StartsWith($publicRoot, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
      $context.Response.StatusCode = 404
      $body = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
    } else {
      $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
      $context.Response.ContentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { 'application/octet-stream' }
      $body = [System.IO.File]::ReadAllBytes($filePath)
      $context.Response.StatusCode = 200
      $context.Response.Headers['Cache-Control'] = 'no-store, no-cache, must-revalidate'
    }

    $context.Response.ContentLength64 = $body.Length
    $context.Response.OutputStream.Write($body, 0, $body.Length)
    $context.Response.OutputStream.Close()
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
