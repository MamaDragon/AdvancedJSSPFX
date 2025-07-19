# 🚀 SPFx Deployment Guide for Tenant `1wy2g5`

## Your App Catalog Location
**App Catalog URL:** https://1wy2g5.sharepoint.com/sites/appcatalog/SitePages/Home.aspx

## Quick Deployment Steps

### 1. Build Your Package
```powershell
cd spfx-package
npm run build:production
```

### 2. Upload to App Catalog
1. Go to: https://1wy2g5.sharepoint.com/sites/appcatalog
2. Click **"Apps for SharePoint"** in the left navigation
3. Click **"Upload"** or drag your `.sppkg` file
4. The package will be at: `spfx-package\sharepoint\solution\advanced-js-features.sppkg`

### 3. Deploy the App
1. After upload, click **"Deploy"** when prompted
2. Choose **"Make this solution available to all sites in the organization"**
3. Click **"Deploy"**

### 4. Use on Any Site
Once deployed, you can add the web part to any site in your tenant:
1. Go to any SharePoint site in your organization
2. Edit a page
3. Click **"+"** to add a web part
4. Search for **"Advanced JavaScript Features"**
5. Add the web part to your page

## Development Testing

### Test in Your App Catalog Workbench
```powershell
cd spfx-package
gulp serve
```
This will open: https://1wy2g5.sharepoint.com/sites/appcatalog/_layouts/15/workbench.aspx

### Test on Other Sites
Update the serve.json file to test on different sites:
```json
"pageUrl": "https://1wy2g5.sharepoint.com/sites/[SITENAME]/_layouts/15/workbench.aspx"
```

## File Locations

| File | Purpose | Location |
|------|---------|----------|
| `.sppkg` | Deployment package | `spfx-package\sharepoint\solution\` |
| `serve.json` | Development config | `spfx-package\config\serve.json` |
| `package-solution.json` | Package metadata | `spfx-package\config\package-solution.json` |

## Troubleshooting

### Can't Access App Catalog?
- Make sure you have **Site Collection Administrator** rights
- Contact your IT administrator if you don't have permissions

### Upload Fails?
- Check the `.sppkg` file was built successfully
- Try refreshing the App Catalog page
- Make sure you're using a recent browser

### Web Part Doesn't Appear?
- Wait a few minutes after deployment
- Refresh the site where you're trying to add it
- Check if the app was properly deployed (not just uploaded)

## Next Steps
1. Build your package: `npm run build:production`
2. Upload to: https://1wy2g5.sharepoint.com/sites/appcatalog
3. Deploy to make available organization-wide
4. Test on any SharePoint site in your tenant!
