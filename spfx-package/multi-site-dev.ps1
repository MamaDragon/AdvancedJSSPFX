# Multi-Site Development Script
# Run this to quickly switch between different SharePoint sites for testing

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("marketing", "hr", "projects", "intranet", "custom")]
    [string]$Site,
    
    [Parameter(Mandatory=$false)]
    [string]$TenantName = "yourtenant",
    
    [Parameter(Mandatory=$false)]
    [string]$CustomSiteName = ""
)

# Predefined site configurations
$siteConfigs = @{
    "marketing" = @{
        "siteName" = "marketing"
        "description" = "Marketing Team Site"
    }
    "hr" = @{
        "siteName" = "hr" 
        "description" = "Human Resources Site"
    }
    "projects" = @{
        "siteName" = "projects"
        "description" = "Project Management Site"
    }
    "intranet" = @{
        "siteName" = "intranet"
        "description" = "Company Intranet"
    }
    "custom" = @{
        "siteName" = $CustomSiteName
        "description" = "Custom Site"
    }
}

if ($Site -eq "custom" -and [string]::IsNullOrEmpty($CustomSiteName)) {
    Write-Host "❌ Custom site name required when using -Site custom" -ForegroundColor Red
    Write-Host "Usage: .\multi-site-dev.ps1 -Site custom -CustomSiteName 'mysite'" -ForegroundColor Yellow
    exit 1
}

$config = $siteConfigs[$Site]
$siteName = $config.siteName
$description = $config.description

Write-Host "🚀 Configuring SPFx for $description..." -ForegroundColor Green
Write-Host "Tenant: $TenantName" -ForegroundColor Yellow
Write-Host "Site: $siteName" -ForegroundColor Yellow

# Build URLs
$SharePointUrl = "https://$TenantName.sharepoint.com/sites/$siteName"
$WorkbenchUrl = "$SharePointUrl/_layouts/15/workbench.aspx"

Write-Host "Workbench URL: $WorkbenchUrl" -ForegroundColor Cyan

# Update serve.json
$serveJsonPath = "config/serve.json"
if (Test-Path $serveJsonPath) {
    Write-Host "📝 Updating serve.json for $description..." -ForegroundColor Blue
    
    $serveJson = Get-Content $serveJsonPath -Raw | ConvertFrom-Json
    $serveJson.initialPage = $WorkbenchUrl
    
    # Update all configurations
    foreach ($configKey in $serveJson.serveConfigurations.PSObject.Properties.Name) {
        $serveJson.serveConfigurations.$configKey.pageUrl = $WorkbenchUrl
    }
    
    $serveJson | ConvertTo-Json -Depth 10 | Set-Content $serveJsonPath -Encoding UTF8
    Write-Host "✅ Configuration updated successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ serve.json not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Ready for development on $description!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. npm install (if not done)" -ForegroundColor White
Write-Host "  2. npm run serve" -ForegroundColor White
Write-Host "  3. Browser will open: $WorkbenchUrl" -ForegroundColor White
Write-Host ""
Write-Host "💡 Pro Tip: Your web part will work on ANY SharePoint site once deployed to tenant app catalog!" -ForegroundColor Yellow
