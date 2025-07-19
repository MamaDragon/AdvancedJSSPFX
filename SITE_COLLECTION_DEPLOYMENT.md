# 🏢 Site Collection Deployment Guide for `1wy2g5`

## Site Collection vs Tenant Deployment

### ✅ Site Collection Deployment (What You Want)
- Deploy to **specific SharePoint sites** only
- No tenant admin permissions required
- Site owners can manage their own apps
- Perfect for testing or site-specific solutions

### 🌐 Tenant Deployment (Alternative)
- Available to **all sites** in organization
- Requires tenant admin permissions
- Deployed once, available everywhere

## Your Site Collection Setup

### 1. Enable Site Collection App Catalog
First, you need to enable a site collection app catalog on your specific site:

**Option A: SharePoint Admin Center (if you have access)**
1. Go to SharePoint Admin Center
2. Sites → Active sites
3. Select your site
4. Click "Settings"
5. Enable "Site collection app catalog"

**Option B: PowerShell (if you have permissions)**
```powershell
Connect-PnPOnline -Url "https://1wy2g5.sharepoint.com/sites/[YOURSITE]" -Interactive
Add-PnPSiteCollectionAppCatalog
```

**Option C: Ask Site Owner/Admin**
Ask someone with site collection admin rights to enable the app catalog for your site.

### 2. Build Your Package for Site Collection
```powershell
cd spfx-package
npm run build:production
```

The package is now configured with `"skipFeatureDeployment": false` which means:
- ✅ Works with site collection app catalogs
- ✅ Site owners can activate/deactivate features
- ✅ More granular control

### 3. Deploy to Your Site Collection

#### If Your Site Has App Catalog Enabled:
1. Go to: `https://1wy2g5.sharepoint.com/sites/[YOURSITE]/_layouts/15/tenantAppCatalog.aspx`
2. Upload your `.sppkg` file from: `spfx-package\sharepoint\solution\`
3. Click "Deploy"
4. The app will be available **only on this site**

#### Common Site Collection App Catalog URLs:
- Main site: `https://1wy2g5.sharepoint.com/_layouts/15/tenantAppCatalog.aspx`
- Team site: `https://1wy2g5.sharepoint.com/sites/[SITENAME]/_layouts/15/tenantAppCatalog.aspx`

### 4. Activate the Feature
After deployment, you need to activate the feature:
1. Go to: `https://1wy2g5.sharepoint.com/sites/[YOURSITE]/_layouts/15/ManageFeatures.aspx`
2. Find "Advanced JavaScript Features"
3. Click "Activate"

### 5. Add Web Part to Pages
1. Edit any page on your site
2. Click "+" to add web part
3. Search for "Advanced JavaScript Features"
4. Add to your page

## Development Testing for Site Collection

Update your `serve.json` to point to your specific site:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/spfx-serve.schema.json",
  "port": 4321,
  "https": true,
  "initialPage": "https://1wy2g5.sharepoint.com/sites/[YOURSITE]/_layouts/15/workbench.aspx"
}
```

## File Structure for Site Collection

```
spfx-package/
├── sharepoint/solution/
│   └── advanced-js-features.sppkg    (Deploy this file)
├── config/
│   ├── package-solution.json         (✅ Updated for site collection)
│   └── serve.json                    (Configure for your site)
└── src/webparts/                     (Your React components)
```

## Troubleshooting Site Collection Deployment

### "App Catalog not found"
- Site collection app catalog may not be enabled
- Ask site collection admin to enable it
- Try the tenant app catalog as fallback

### "Feature not appearing"
- Go to Site Settings → Manage site features
- Look for "Advanced JavaScript Features"
- Click "Activate" if not active

### "Web part not available"
- Make sure feature is activated
- Wait a few minutes after deployment
- Refresh the page where you're adding the web part

## Which Sites Can You Use?

Since you have the App Catalog URL `https://1wy2g5.sharepoint.com/sites/appcatalog`, you likely have access to:

1. **Main tenant site**: `https://1wy2g5.sharepoint.com`
2. **Team sites**: `https://1wy2g5.sharepoint.com/sites/[SITENAME]`
3. **The app catalog site itself**: `https://1wy2g5.sharepoint.com/sites/appcatalog`

Try enabling site collection app catalog on any of these where you have admin rights!

## Quick Commands

```powershell
# Build for site collection
cd spfx-package
npm run build:production

# Test on specific site
gulp serve

# The file to upload
# Location: spfx-package\sharepoint\solution\advanced-js-features.sppkg
```
