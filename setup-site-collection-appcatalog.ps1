# Site Collection App Catalog Setup Script
# Run this on your target SharePoint site to enable app catalog

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$TenantName = "1wy2g5"
)

# Full site URL construction
if ($SiteUrl -notmatch "^https://") {
    if ($SiteUrl -eq "main") {
        $FullSiteUrl = "https://$TenantName.sharepoint.com"
    } else {
        $FullSiteUrl = "https://$TenantName.sharepoint.com/sites/$SiteUrl"
    }
} else {
    $FullSiteUrl = $SiteUrl
}

Write-Host "🚀 Setting up Site Collection App Catalog" -ForegroundColor Green
Write-Host "Site: $FullSiteUrl" -ForegroundColor Yellow

try {
    # Check if PnP PowerShell is installed
    if (!(Get-Module -ListAvailable -Name PnP.PowerShell)) {
        Write-Host "Installing PnP PowerShell module..." -ForegroundColor Yellow
        Install-Module -Name PnP.PowerShell -Force -AllowClobber -Scope CurrentUser
    }

    # Connect to SharePoint
    Write-Host "Connecting to SharePoint..." -ForegroundColor Yellow
    Connect-PnPOnline -Url $FullSiteUrl -Interactive

    # Enable Site Collection App Catalog
    Write-Host "Enabling Site Collection App Catalog..." -ForegroundColor Yellow
    Add-PnPSiteCollectionAppCatalog

    Write-Host "✅ Site Collection App Catalog enabled!" -ForegroundColor Green
    Write-Host "App Catalog URL: $FullSiteUrl/_layouts/15/tenantAppCatalog.aspx" -ForegroundColor Cyan
    
    # Open the App Catalog in browser
    $AppCatalogUrl = "$FullSiteUrl/_layouts/15/tenantAppCatalog.aspx"
    Write-Host "Opening App Catalog..." -ForegroundColor Yellow
    Start-Process $AppCatalogUrl

} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 You may need Site Collection Admin permissions" -ForegroundColor Yellow
    Write-Host "💡 Try asking your site administrator to run this script" -ForegroundColor Yellow
}

Write-Host "`n📋 Next Steps:" -ForegroundColor Green
Write-Host "1. Build your package: cd spfx-package && npm run build:production" -ForegroundColor White
Write-Host "2. Upload .sppkg file to the App Catalog" -ForegroundColor White
Write-Host "3. Activate the feature in Site Settings" -ForegroundColor White
Write-Host "4. Add web part to your pages" -ForegroundColor White
