# SharePoint Site Configuration Script
# Run this in PowerShell to quickly update your SPFx configuration

param(
    [Parameter(Mandatory=$true)]
    [string]$TenantName,
    
    [Parameter(Mandatory=$true)]
    [string]$SiteName,
    
    [Parameter(Mandatory=$false)]
    [string]$DeveloperName = "Your Name",
    
    [Parameter(Mandatory=$false)]
    [string]$WebsiteUrl = ""
)

Write-Host "🚀 Configuring SPFx package for SharePoint site..." -ForegroundColor Green
Write-Host "Tenant: $TenantName" -ForegroundColor Yellow
Write-Host "Site: $SiteName" -ForegroundColor Yellow

# Build the SharePoint URLs
$SharePointUrl = "https://$TenantName.sharepoint.com/sites/$SiteName"
$WorkbenchUrl = "$SharePointUrl/_layouts/15/workbench.aspx"

Write-Host "SharePoint URL: $SharePointUrl" -ForegroundColor Cyan
Write-Host "Workbench URL: $WorkbenchUrl" -ForegroundColor Cyan

# Update serve.json
$serveJsonPath = "config/serve.json"
if (Test-Path $serveJsonPath) {
    Write-Host "📝 Updating serve.json..." -ForegroundColor Blue
    
    $serveJson = Get-Content $serveJsonPath -Raw | ConvertFrom-Json
    $serveJson.initialPage = $WorkbenchUrl
    $serveJson.serveConfigurations.default.pageUrl = $WorkbenchUrl
    $serveJson.serveConfigurations.advancedJsFeatures.pageUrl = $WorkbenchUrl
    
    $serveJson | ConvertTo-Json -Depth 10 | Set-Content $serveJsonPath -Encoding UTF8
    Write-Host "✅ serve.json updated successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ serve.json not found!" -ForegroundColor Red
}

# Update package-solution.json
$packageSolutionPath = "config/package-solution.json"
if (Test-Path $packageSolutionPath) {
    Write-Host "📝 Updating package-solution.json..." -ForegroundColor Blue
    
    $packageJson = Get-Content $packageSolutionPath -Raw | ConvertFrom-Json
    $packageJson.solution.developer.name = $DeveloperName
    if ($WebsiteUrl) {
        $packageJson.solution.developer.websiteUrl = $WebsiteUrl
    }
    
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageSolutionPath -Encoding UTF8
    Write-Host "✅ package-solution.json updated successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ package-solution.json not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Configuration complete!" -ForegroundColor Green
Write-Host "Your SPFx package is now configured for:" -ForegroundColor Yellow
Write-Host "  Site: $SharePointUrl" -ForegroundColor White
Write-Host "  Workbench: $WorkbenchUrl" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Install Node.js 16.x if not already installed" -ForegroundColor White
Write-Host "  2. Run: npm install" -ForegroundColor White
Write-Host "  3. Run: npm run serve" -ForegroundColor White
Write-Host "  4. Open your browser and navigate to the workbench URL" -ForegroundColor White
