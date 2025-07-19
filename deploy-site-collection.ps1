# Deploy SPFx Package to Site Collection
# This script builds and provides deployment guidance for site collection deployment

param(
    [Parameter(Mandatory=$false)]
    [string]$SiteName = "",
    
    [Parameter(Mandatory=$false)]
    [string]$TenantName = "1wy2g5",
    
    [Parameter(Mandatory=$false)]
    [switch]$BuildOnly = $false
)

Write-Host "🚀 SPFx Site Collection Deployment Script" -ForegroundColor Green
Write-Host "Tenant: $TenantName" -ForegroundColor Yellow

# Navigate to SPFx package directory
$SpfxPath = Join-Path $PSScriptRoot "spfx-package"
if (!(Test-Path $SpfxPath)) {
    Write-Host "❌ SPFx package directory not found: $SpfxPath" -ForegroundColor Red
    exit 1
}

Set-Location $SpfxPath
Write-Host "📂 Working in: $SpfxPath" -ForegroundColor Yellow

# Build the package
Write-Host "`n🔨 Building SPFx package for site collection deployment..." -ForegroundColor Green
try {
    & npm run build:production
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed"
    }
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Make sure you have Node.js 16.x installed" -ForegroundColor Yellow
    exit 1
}

# Check if .sppkg file was created
$SppkgPath = Join-Path $SpfxPath "sharepoint\solution\advanced-js-features.sppkg"
if (Test-Path $SppkgPath) {
    $SppkgSize = (Get-Item $SppkgPath).Length
    Write-Host "✅ Package created: advanced-js-features.sppkg ($([math]::Round($SppkgSize/1KB, 2)) KB)" -ForegroundColor Green
} else {
    Write-Host "❌ Package file not found: $SppkgPath" -ForegroundColor Red
    exit 1
}

if ($BuildOnly) {
    Write-Host "✅ Build only completed. Package ready for deployment." -ForegroundColor Green
    exit 0
}

# Provide deployment guidance
Write-Host "`n📋 Site Collection Deployment Steps:" -ForegroundColor Green

if ($SiteName) {
    $SiteUrl = "https://$TenantName.sharepoint.com/sites/$SiteName"
    $AppCatalogUrl = "$SiteUrl/_layouts/15/tenantAppCatalog.aspx"
    $FeatureUrl = "$SiteUrl/_layouts/15/ManageFeatures.aspx"
    
    Write-Host "🎯 Target Site: $SiteUrl" -ForegroundColor Cyan
    Write-Host "`n1. 📦 Upload Package:" -ForegroundColor Yellow
    Write-Host "   Go to: $AppCatalogUrl" -ForegroundColor White
    Write-Host "   Upload: $SppkgPath" -ForegroundColor White
    
    Write-Host "`n2. ⚡ Activate Feature:" -ForegroundColor Yellow
    Write-Host "   Go to: $FeatureUrl" -ForegroundColor White
    Write-Host "   Find: 'Advanced JavaScript Features'" -ForegroundColor White
    Write-Host "   Click: 'Activate'" -ForegroundColor White
    
    Write-Host "`n3. 🎨 Add Web Part:" -ForegroundColor Yellow
    Write-Host "   Edit any page on: $SiteUrl" -ForegroundColor White
    Write-Host "   Search for: 'Advanced JavaScript Features'" -ForegroundColor White
    
    # Option to open URLs
    $OpenUrls = Read-Host "`nOpen URLs in browser? (y/n)"
    if ($OpenUrls -eq "y" -or $OpenUrls -eq "Y") {
        Write-Host "Opening App Catalog..." -ForegroundColor Yellow
        Start-Process $AppCatalogUrl
        Start-Sleep 2
        Write-Host "Opening Feature Management..." -ForegroundColor Yellow
        Start-Process $FeatureUrl
    }
} else {
    Write-Host "1. 🏗️  Enable site collection app catalog on your target site" -ForegroundColor Yellow
    Write-Host "2. 📦 Upload package to: [YOURSITE]/_layouts/15/tenantAppCatalog.aspx" -ForegroundColor Yellow
    Write-Host "3. ⚡ Activate feature in: [YOURSITE]/_layouts/15/ManageFeatures.aspx" -ForegroundColor Yellow
    Write-Host "4. 🎨 Add web part to pages" -ForegroundColor Yellow
    
    Write-Host "`n💡 Run with -SiteName parameter for specific site guidance:" -ForegroundColor Cyan
    Write-Host "   .\deploy-site-collection.ps1 -SiteName 'mysite'" -ForegroundColor White
}

Write-Host "`n📄 Package Location:" -ForegroundColor Green
Write-Host $SppkgPath -ForegroundColor White

Write-Host "`n🔧 Need help with site collection app catalog?" -ForegroundColor Green
Write-Host "Run: .\setup-site-collection-appcatalog.ps1 -SiteUrl 'yoursite'" -ForegroundColor White
