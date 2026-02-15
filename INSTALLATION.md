# 📦 MedTouch.ai Enhanced - Installation Guide

## ⚡ Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 📋 Prerequisites

### Required
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)
- **Git**: For version control

### Check Versions
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

### Install Node.js
- Download from: https://nodejs.org/
- Recommended: LTS version

---

## 🔧 Installation Steps

### Step 1: Download/Clone Repository

#### Option A: Download ZIP
1. Download all 25 files
2. Extract to folder: `medtouch-ai-enhanced`
3. Ensure folder structure is correct

#### Option B: Clone Repository (if using Git)
```bash
git clone YOUR_REPO_URL
cd medtouch-ai-enhanced
```

### Step 2: Verify Folder Structure

```
medtouch-ai-enhanced/
├── app/
│   ├── api/
│   │   └── predict/
│   │       └── route.ts
│   ├── FileUpload.tsx
│   ├── globals.css
│   ├── LanguageSelector.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── Stepper.tsx
│   ├── StepVitals.tsx
│   ├── StepSymptoms.tsx
│   ├── StepHistory.tsx
│   ├── StepReview.tsx
│   ├── translations.ts
│   └── VoiceInput.tsx
├── .gitignore
├── DEPLOYMENT_GUIDE.md
├── FEATURES.md
├── FILE_LIST.md
├── INSTALLATION.md (this file)
├── README.md
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

**Total: 25 files**

### Step 3: Install Dependencies

```bash
cd medtouch-ai-enhanced
npm install
```

This installs:
- Next.js 14.2.0
- React 18.2.0
- TypeScript
- Tailwind CSS
- All dev dependencies

**Expected time:** 1-2 minutes

### Step 4: Run Development Server

```bash
npm run dev
```

You should see:
```
 ✓ Ready in 2.5s
 ○ Local:   http://localhost:3000
 ○ Network: http://192.168.1.x:3000
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

You should see:
- MedTouch.ai header
- Language selector (top-right)
- Step 1: Vitals page
- Powder blue theme

---

## 🎨 Font Setup (Automatic)

Josefin Sans font is loaded automatically from Google Fonts in:
- `app/globals.css` - Font import
- `app/layout.tsx` - Preconnect headers

**No manual setup required!**

---

## 🌐 Environment Variables

**None required!** This app works out-of-the-box with no configuration.

Optional (future use):
```bash
# Create .env.local (optional)
NEXT_PUBLIC_API_URL=your-api-url
```

---

## 🧪 Testing the Installation

### 1. Test Language Switching
- Click language dropdown (top-right)
- Select "Español"
- Interface should change to Spanish
- ✅ Success if text changes

### 2. Test Voice Input
- Navigate to Step 2 (Symptoms)
- Click "🎤 Voice Input" button
- Allow microphone access
- Speak: "chest pain"
- ✅ Success if symptom gets selected

### 3. Test File Upload
- Navigate to Step 3 (History)
- Try drag-and-drop a PDF
- Or click "Choose Files"
- ✅ Success if file appears in list

### 4. Test Complete Flow
1. Enter vitals (Step 1) → Continue
2. Select symptoms (Step 2) → Continue
3. Select condition (Step 3) → Analyze
4. View results (Step 4)
- ✅ Success if you see risk analysis

---

## 🛠️ Build for Production

```bash
# Build optimized version
npm run build

# Run production server
npm start
```

Production build creates:
- Optimized JavaScript bundles
- Compressed CSS
- Static assets
- Ready for deployment

---

## 📱 Mobile Testing

### Local Network Testing

1. Find your local IP:
```bash
# macOS/Linux
ifconfig | grep inet

# Windows
ipconfig
```

2. Start dev server:
```bash
npm run dev
```

3. On mobile browser, visit:
```
http://YOUR_IP:3000
```

Example: `http://192.168.1.5:3000`

### Requirements
- Mobile and computer on same WiFi
- Firewall allows port 3000

---

## 🐛 Troubleshooting

### Issue: `npm install` fails

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete lock file
rm package-lock.json

# Try again
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID YOUR_PID /F

# Or use different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors

**Solution:**
```bash
# Rebuild TypeScript
npm run build

# Or ignore and run anyway
npm run dev
```

### Issue: Fonts not loading

**Solution:**
1. Check internet connection (needs Google Fonts)
2. Clear browser cache
3. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

### Issue: Voice input not working

**Solution:**
- Use HTTPS (voice requires secure context)
- Grant microphone permissions
- Try Chrome or Edge browser
- Check microphone is not used by another app

### Issue: File upload not working

**Solution:**
- Check file size <10MB
- Verify file format (PDF, JPEG, PNG)
- Try different file
- Check browser console for errors

---

## 🔄 Updating

### Pull Latest Changes
```bash
git pull origin main
npm install  # Install new dependencies
npm run dev
```

### Manual Update
1. Download new files
2. Replace old files
3. Run `npm install`
4. Run `npm run dev`

---

## 🗑️ Uninstallation

```bash
# Delete node_modules
rm -rf node_modules

# Delete build files
rm -rf .next

# Delete lock file
rm package-lock.json

# Delete entire project (optional)
cd ..
rm -rf medtouch-ai-enhanced
```

---

## 📊 System Requirements

### Minimum
- CPU: 2 cores
- RAM: 4GB
- Disk: 500MB free space
- OS: Windows 10, macOS 10.15, Ubuntu 20.04

### Recommended
- CPU: 4+ cores
- RAM: 8GB+
- Disk: 1GB free space
- SSD for faster builds

---

## 🎓 Learning Resources

### For Developers
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### For Voice API
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

### For File Upload
- File API: https://developer.mozilla.org/en-US/docs/Web/API/File

---

## ✅ Installation Checklist

- [ ] Node.js v18+ installed
- [ ] npm v9+ installed
- [ ] All 25 files downloaded
- [ ] Folder structure correct
- [ ] `npm install` completed successfully
- [ ] `npm run dev` runs without errors
- [ ] Can access http://localhost:3000
- [ ] Language selector works
- [ ] Voice input button appears
- [ ] File upload works
- [ ] Fonts load correctly (Josefin Sans)
- [ ] Mobile responsive (tested)
- [ ] Build works (`npm run build`)

---

## 🚀 Next Steps

1. ✅ Installation complete
2. 📖 Read FEATURES.md to learn about features
3. 🎨 Customize colors in tailwind.config.ts
4. 🌍 Add more languages in translations.ts
5. 🚢 Deploy to Vercel (see DEPLOYMENT_GUIDE.md)

---

## 💬 Get Help

**Issues?**
- Check DEPLOYMENT_GUIDE.md
- Read FEATURES.md
- See troubleshooting section above

**Still stuck?**
- Check browser console for errors
- Verify all 25 files are present
- Try deleting node_modules and reinstalling

---

**Installation complete!** 🎉

Ready to deploy? See **DEPLOYMENT_GUIDE.md**

---

**Version:** 2.0.0 Enhanced
**Last Updated:** February 2026
