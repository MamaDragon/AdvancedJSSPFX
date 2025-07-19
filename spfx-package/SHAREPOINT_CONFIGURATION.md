# 🚀 SharePoint Site Configuration Guide

## 📝 Configure Your SPFx Package for Your SharePoint Site

### Step 1: Update serve.json for Local Development

Replace the placeholder URLs in `config/serve.json` with your actual SharePoint site:

```json
{
  "initialPage": "https://YOUR-TENANT.sharepoint.com/sites/YOUR-SITE/_layouts/15/workbench.aspx",
  "serveConfigurations": {
    "default": {
      "pageUrl": "https://YOUR-TENANT.sharepoint.com/sites/YOUR-SITE/_layouts/15/workbench.aspx"
    }
  }
}
```

**Replace these placeholders:**
- `YOUR-TENANT` = Your SharePoint tenant name (e.g., `contoso`)
- `YOUR-SITE` = Your SharePoint site name (e.g., `TeamSite` or `Projects`)

### Step 2: Update package-solution.json for Deployment

The package-solution.json file contains metadata about your solution. You can update:

```json
{
  "solution": {
    "name": "advanced-js-features-client-side-solution",
    "developer": {
      "name": "Your Name",
      "websiteUrl": "https://your-website.com",
      "privacyUrl": "https://your-privacy-policy.com",
      "termsOfUseUrl": "https://your-terms.com"
    }
  }
}
```

### Step 3: SharePoint Site Examples

#### Corporate Intranet
```
https://contoso.sharepoint.com/sites/intranet/_layouts/15/workbench.aspx
```

#### Team Site
```
https://contoso.sharepoint.com/sites/marketing/_layouts/15/workbench.aspx
```

#### Communication Site
```
https://contoso.sharepoint.com/sites/company-news/_layouts/15/workbench.aspx
```

#### Personal Site (OneDrive)
```
https://contoso-my.sharepoint.com/personal/username_contoso_com/_layouts/15/workbench.aspx
```

### Step 4: Development Workflow

1. **Local Development:**
   ```bash
   npm run serve
   ```
   This opens your SharePoint site with the local workbench.

2. **Build for Production:**
   ```bash
   npm run build:production
   ```
   This creates a `.sppkg` file in the `sharepoint/solution/` folder.

3. **Deploy to SharePoint:**
   - Upload the `.sppkg` file to your SharePoint App Catalog
   - Deploy the solution
   - Add the web part to your SharePoint pages

### Step 5: App Catalog Deployment

Your SPFx solution will be packaged as a `.sppkg` file that you upload to:

#### Tenant App Catalog (Recommended)
```
https://YOUR-TENANT.sharepoint.com/sites/appcatalog
```

#### Site Collection App Catalog
```
https://YOUR-TENANT.sharepoint.com/sites/YOUR-SITE/_layouts/15/tenantAppCatalog.aspx
```

### Step 6: Web Part Permissions

If your web part needs special permissions, update the `webApiPermissionRequests` in package-solution.json:

```json
{
  "webApiPermissionRequests": [
    {
      "resource": "Microsoft Graph",
      "scope": "User.Read"
    }
  ]
}
```

### Step 7: Testing in Different Environments

#### Development Environment
- Use `npm run serve` for local development
- Test in the hosted workbench

#### Staging Environment
- Deploy to a test site collection
- Validate all features work correctly

#### Production Environment
- Deploy to tenant app catalog
- Roll out to production sites

## 🔧 Quick Setup Commands

Once you have your SharePoint site URL, run these commands:

```bash
# Navigate to SPFx package
cd spfx-package

# Install Node.js 16.x if not already installed
# (Required for SPFx development)

# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build:production
```

## 📋 Checklist

- [ ] Replace placeholder URLs in serve.json
- [ ] Update developer information in package-solution.json
- [ ] Test local development with `npm run serve`
- [ ] Build production package with `npm run build:production`
- [ ] Upload .sppkg file to App Catalog
- [ ] Deploy and test in SharePoint

## 🎯 Your SharePoint Site URL Format

Most SharePoint sites follow this pattern:
```
https://[tenant].sharepoint.com/sites/[sitename]
```

For example:
- `https://contoso.sharepoint.com/sites/marketing`
- `https://contoso.sharepoint.com/sites/hr`
- `https://contoso.sharepoint.com/sites/projects`

Your workbench URL will be:
```
https://[tenant].sharepoint.com/sites/[sitename]/_layouts/15/workbench.aspx
```
