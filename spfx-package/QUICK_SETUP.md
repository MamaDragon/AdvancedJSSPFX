# 🎯 Quick SharePoint Site Setup

## Step 1: Find Your SharePoint Site URL

Your SharePoint site URL typically looks like:
```
https://[company].sharepoint.com/sites/[sitename]
```

**Examples:**
- `https://contoso.sharepoint.com/sites/marketing`
- `https://fabrikam.sharepoint.com/sites/projects`
- `https://adatum.sharepoint.com/sites/hr`

## Step 2: Edit the Configuration Files

### Option A: Manual Edit (Easiest)

1. Open `config/serve.json`
2. Replace all instances of:
   ```
   https://yourtenant.sharepoint.com/sites/yoursite
   ```
   With your actual SharePoint site URL

### Option B: Use PowerShell Script

Run this command in PowerShell from the spfx-package folder:
```powershell
.\configure-sharepoint.ps1 -TenantName "contoso" -SiteName "marketing" -DeveloperName "Your Name"
```

## Step 3: Example Configuration

If your SharePoint site is `https://contoso.sharepoint.com/sites/marketing`, then update serve.json to:

```json
{
  "initialPage": "https://contoso.sharepoint.com/sites/marketing/_layouts/15/workbench.aspx",
  "serveConfigurations": {
    "default": {
      "pageUrl": "https://contoso.sharepoint.com/sites/marketing/_layouts/15/workbench.aspx"
    },
    "advancedJsFeatures": {
      "pageUrl": "https://contoso.sharepoint.com/sites/marketing/_layouts/15/workbench.aspx"
    }
  }
}
```

## Step 4: Test Your Configuration

Once configured, you can:

1. **Install Node.js 16.x** (required for SPFx)
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start development server:**
   ```bash
   npm run serve
   ```
4. **Build for production:**
   ```bash
   npm run build:production
   ```

The development server will automatically open your SharePoint site in the browser with the workbench loaded.

## 🚀 You're Ready!

Your SPFx package will now be configured to work with your specific SharePoint site. The advanced JavaScript features (WeakMap, Type Guards, Proxy, Set, Symbol, Generators, RxJS, etc.) will be available as web parts in your SharePoint environment!
