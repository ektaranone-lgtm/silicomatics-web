# GitHub Pages Deployment & Squarespace Integration

## 🚀 Step 1: Deploy to GitHub Pages

### A. Push Your Code to GitHub

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it (e.g., `silicomatics-web`)
   - Set to Public (required for free GitHub Pages)
   - Don't add README, .gitignore, or license (we have them)

2. **Initialize and push your code**
   ```bash
   cd /Users/akshay/Documents/Projects/silicomatics-web/silico-frontend
   
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - ready for GitHub Pages"
   
   # Add your GitHub repo as remote
   git remote add origin https://github.com/YOUR-USERNAME/silicomatics-web.git
   
   # Push to GitHub
   git push -u origin main
   ```

### B. Enable GitHub Pages

1. **Go to your repository on GitHub**
   - Navigate to `https://github.com/YOUR-USERNAME/silicomatics-web`

2. **Go to Settings → Pages** (left sidebar)

3. **Configure Source**
   - Source: Select `GitHub Actions`
   - (Don't use "Deploy from a branch" - we're using the workflow I created)

4. **Automatic Deployment**
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically run
   - Go to "Actions" tab to watch the deployment
   - Wait 2-3 minutes for first deployment

5. **Your site will be live at:**
   - `https://YOUR-USERNAME.github.io/silicomatics-web/`
   - Or if using a custom domain: `https://yourdomain.com`

---

## 🔗 Step 2: Integrate with Squarespace

You have **3 options** to integrate with Squarespace:

### Option A: Custom Domain (Professional - Recommended)

**Best for:** Professional sites where you want the app on your main domain

1. **In GitHub Pages Settings:**
   - Settings → Pages → Custom domain
   - Enter: `app.silicomatics.com` (or `silicomatics.com` for main domain)
   - Click "Save"
   - Wait for DNS check

2. **In Your Domain Provider (or Squarespace DNS):**
   - Add a CNAME record:
     - Name: `app` (or `@` for root domain)
     - Value: `YOUR-USERNAME.github.io`
     - TTL: 3600

3. **Update vite.config.ts base path:**
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/' : '/',
   ```
   (Already set correctly for custom domain)

4. **In Squarespace:**
   - Link your "Get Started" button to `https://app.silicomatics.com`
   - Keep marketing content on Squarespace
   - App runs separately on subdomain

### Option B: Embed with iframe (Quick & Easy)

**Best for:** Quick integration, testing, or when you want everything in Squarespace

1. **Get your GitHub Pages URL:**
   - `https://YOUR-USERNAME.github.io/silicomatics-web/`

2. **In Squarespace:**
   - Edit the page where you want the app
   - Click "+" to add a block
   - Select "Code" block
   - Paste this code:

   ```html
   <div style="width: 100%; height: 100vh; min-height: 800px;">
     <iframe 
       src="https://YOUR-USERNAME.github.io/silicomatics-web/"
       width="100%"
       height="100%"
       frameborder="0"
       style="border: none;"
       allow="fullscreen"
     ></iframe>
   </div>
   ```

3. **Adjust height as needed** (800px, 100vh, etc.)

**Pros:** Simple, everything in Squarespace
**Cons:** iframe limitations, not great for SEO

### Option C: Link to External App

**Best for:** Separating marketing site from web app

1. **In Squarespace:**
   - Keep your marketing pages (Home, About, Services, Contact)
   - Update "Get Started" and "Login" buttons
   - Link to: `https://YOUR-USERNAME.github.io/silicomatics-web/`

2. **Styling the link:**
   - Use a prominent button/CTA
   - Example: "Launch Application" or "Get Started"

**Pros:** Clean separation, full app functionality
**Cons:** User leaves Squarespace site

---

## 🔧 Step 3: Configure for Repository Name

If your GitHub Pages URL includes the repository name (e.g., `/silicomatics-web/`):

1. **Update `vite.config.ts`:**
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/silicomatics-web/' : '/',
   ```

2. **Commit and push:**
   ```bash
   git add vite.config.ts
   git commit -m "Update base path for GitHub Pages"
   git push
   ```

3. **Wait for re-deployment** (automatic via GitHub Actions)

---

## 📝 Testing Your Deployment

### Before going live:

```bash
# Test production build locally
pnpm build
pnpm preview
```

Visit `http://localhost:4173` to verify everything works.

### After deployment:

1. Visit your GitHub Pages URL
2. Test all routes (Home, About, Services, Contact, Login, etc.)
3. Verify buttons and interactions work
4. Check browser console for errors
5. Test on mobile devices

---

## 🔄 Making Updates

Every time you push to GitHub, it auto-deploys:

```bash
# Make your changes
git add .
git commit -m "Update homepage content"
git push

# GitHub Actions will automatically rebuild and deploy
# Check progress in: GitHub → Actions tab
```

---

## 🐛 Troubleshooting

### Routes show 404 errors
- GitHub Pages requires special handling for SPAs
- The workflow creates a `404.html` that redirects to index.html
- If routes still fail, verify the workflow ran successfully

### Assets not loading
- Check `base` path in `vite.config.ts` matches your URL structure
- For custom domain: `base: '/'`
- For repo subdirectory: `base: '/repo-name/'`

### Deployment fails
- Go to GitHub → Actions tab
- Click on failed workflow
- Check error logs
- Common issues:
  - pnpm version mismatch
  - Build errors (test locally first with `pnpm build`)
  - Missing GitHub Pages permissions

### Custom domain not working
- Wait 24-48 hours for DNS propagation
- Verify CNAME record is correct
- Check GitHub Pages settings for DNS verification status
- Enable "Enforce HTTPS" after DNS is verified

---

## 🎯 Recommended Setup for Production

**Architecture:**
```
silicomatics.com (Squarespace)
├── Marketing pages: Home, About, Blog
├── Static content managed in Squarespace
└── "Launch App" button → app.silicomatics.com

app.silicomatics.com (GitHub Pages)
├── Full Vue.js application
├── All interactive features
└── Links back to main site for marketing content
```

**Why this works:**
- Squarespace: Easy content management, good for marketing
- GitHub Pages: Free hosting, auto-deploy, perfect for Vue apps
- Clean separation of concerns
- Professional user experience

---

## 💡 Pro Tips

1. **Use environment variables** for different deployments
2. **Enable branch protection** on main to prevent accidental deploys
3. **Set up staging** using GitHub Pages from a dev branch
4. **Monitor performance** using Lighthouse in Chrome DevTools
5. **Add a custom 404 page** for better UX

---

## 📞 Quick Reference

- **Your GitHub Pages URL:** `https://YOUR-USERNAME.github.io/silicomatics-web/`
- **Actions Dashboard:** `https://github.com/YOUR-USERNAME/silicomatics-web/actions`
- **Pages Settings:** `https://github.com/YOUR-USERNAME/silicomatics-web/settings/pages`

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Enable GitHub Pages with Actions source
3. ✅ Wait for deployment (check Actions tab)
4. ✅ Test your live site
5. ✅ Choose integration method with Squarespace
6. ✅ (Optional) Set up custom domain

Need help? Check GitHub Actions logs for deployment issues!
