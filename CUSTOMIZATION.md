# 🎨 MedTouch.ai - Customization Guide

## 🎯 Quick Customizations

### Change Theme Colors (5 minutes)

Edit `tailwind.config.ts`:

```typescript
colors: {
  'powder-blue': {
    DEFAULT: '#YOUR_COLOR',  // Change primary color
    light: '#YOUR_LIGHT',
    dark: '#YOUR_DARK',
  },
  'navy': {
    deep: '#YOUR_NAVY',     // Change header color
    medium: '#YOUR_MEDIUM',
    light: '#YOUR_LIGHT',
  },
}
```

**Example:** Change to green theme:
```typescript
'powder-blue': {
  DEFAULT: '#A8E6CF',  // Mint green
  light: '#D4F4DD',
  dark: '#7ED4A8',
},
```

### Add New Language (10 minutes)

Edit `app/translations.ts`:

```typescript
de: {  // German
  subtitle: "Intelligentes Notfall-Triage-Dashboard",
  footer: "⚕️ Nur zu Demonstrationszwecken.",
  step1: "Vitalwerte",
  step2: "Symptome",
  step3: "Historie",
  step4: "Überprüfung",
  // ... copy all English keys
}
```

Then update `app/LanguageSelector.tsx`:
```typescript
{ code: "de", name: "Deutsch", flag: "🇩🇪" },
```

### Change Font (3 minutes)

Edit `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'YOUR_FONT', sans-serif;
}
```

Popular medical fonts:
- **Lato**: Modern, clean
- **Open Sans**: Highly readable
- **Roboto**: Material design
- **Source Sans Pro**: Professional

---

## 🎨 Advanced Customizations

### 1. Custom Color Palette

Create a brand new theme:

```typescript
// tailwind.config.ts
colors: {
  // Hospital brand colors
  'brand-primary': '#2E7D32',     // Green
  'brand-secondary': '#1565C0',   // Blue
  'brand-accent': '#F57C00',      // Orange
  
  // Custom grays
  'gray-custom': {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    // ... up to 900
  },
}
```

Update components to use new colors:
```typescript
className="bg-brand-primary text-white"
```

### 2. Logo & Branding

Add your hospital logo:

**Step 1:** Add logo to `public/` folder:
```
public/
  └── logo.png
```

**Step 2:** Update `app/page.tsx` header:
```typescript
<div className="flex items-center gap-3">
  <Image 
    src="/logo.png" 
    alt="Hospital Logo" 
    width={48} 
    height={48}
  />
  <h1>Your Hospital Name</h1>
</div>
```

### 3. Custom Animations

Add custom animations in `tailwind.config.ts`:

```typescript
animation: {
  'bounce-slow': 'bounce 2s infinite',
  'wiggle': 'wiggle 1s ease-in-out infinite',
},
keyframes: {
  wiggle: {
    '0%, 100%': { transform: 'rotate(-3deg)' },
    '50%': { transform: 'rotate(3deg)' },
  }
}
```

Use in components:
```typescript
className="animate-wiggle"
```

### 4. Voice Input Languages

Add more voice recognition languages:

Edit `app/VoiceInput.tsx`:

```typescript
const languageMap: { [key: string]: string } = {
  en: 'en-US',
  es: 'es-ES',
  hi: 'hi-IN',
  fr: 'fr-FR',
  zh: 'zh-CN',
  de: 'de-DE',  // Add German
  ja: 'ja-JP',  // Add Japanese
  ar: 'ar-SA',  // Add Arabic
};
```

### 5. Custom Symptom List

Modify symptoms in `app/StepSymptoms.tsx`:

```typescript
const symptomsList = [
  // Your custom symptoms
  "Custom Symptom 1",
  "Custom Symptom 2",
  "Custom Symptom 3",
  // ... add more
];
```

Or load from API:
```typescript
const [symptoms, setSymptoms] = useState([]);

useEffect(() => {
  fetch('/api/symptoms')
    .then(res => res.json())
    .then(data => setSymptoms(data));
}, []);
```

### 6. File Upload Customization

Change accepted file types in `app/FileUpload.tsx`:

```typescript
const validTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.ms-excel',  // Add Excel
  'text/plain',                // Add text files
];

const maxSize = 20 * 1024 * 1024; // Change to 20MB
```

### 7. AI Prediction Customization

Modify prediction logic in `app/api/predict/route.ts`:

```typescript
// Add custom risk factors
if (age > 70 && hasDiabetes) {
  riskScore += 3;  // Extra points for elderly diabetics
}

// Add custom department routing
if (symptom === 'Back Pain' && age > 50) {
  return 'Orthopedics';
}
```

### 8. Custom Step Components

Add a new step (Step 5: Prescription):

**Step 1:** Create component:
```typescript
// app/StepPrescription.tsx
export default function StepPrescription({ formData, setFormData, next, prev, t }: any) {
  return (
    <div>
      {/* Your prescription UI */}
    </div>
  );
}
```

**Step 2:** Update `app/page.tsx`:
```typescript
{step === 5 && (
  <StepPrescription ... />
)}
```

**Step 3:** Update stepper:
```typescript
const steps = [t.step1, t.step2, t.step3, t.step4, t.step5];
```

### 9. Mobile App (PWA)

Convert to Progressive Web App:

**Step 1:** Create `public/manifest.json`:
```json
{
  "name": "MedTouch.ai",
  "short_name": "MedTouch",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#B0D4E3",
  "theme_color": "#1A2B4A",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

**Step 2:** Add to `app/layout.tsx`:
```typescript
<link rel="manifest" href="/manifest.json" />
```

### 10. Dark Mode

Add dark mode support:

**Step 1:** Update `tailwind.config.ts`:
```typescript
darkMode: 'class',
```

**Step 2:** Create theme toggle:
```typescript
// app/ThemeToggle.tsx
'use client';

export default function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <button onClick={toggleTheme}>
      🌙 Toggle Dark Mode
    </button>
  );
}
```

**Step 3:** Add dark mode classes:
```typescript
className="bg-white dark:bg-gray-900 text-black dark:text-white"
```

---

## 🔧 Configuration Files

### package.json
Add custom scripts:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "export": "next build && next export",  // Static export
  "analyze": "ANALYZE=true next build"     // Bundle analysis
}
```

### next.config.mjs
Add custom configuration:
```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-cdn.com'],
  },
  i18n: {
    locales: ['en', 'es', 'hi', 'fr', 'zh'],
    defaultLocale: 'en',
  },
};
```

---

## 🎯 Use Cases

### Hospital Branding
1. Change colors to hospital brand
2. Add hospital logo
3. Update footer text
4. Customize department names

### Multi-Facility
1. Add facility selector
2. Custom routing per facility
3. Different color schemes per facility
4. Facility-specific symptoms

### Specialized Clinic
1. Remove irrelevant symptoms
2. Add specialty-specific questions
3. Custom risk algorithms
4. Integration with EHR system

---

## 📊 Analytics Integration

### Google Analytics

Add to `app/layout.tsx`:
```typescript
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  `}
</Script>
```

### Custom Event Tracking

Track user actions:
```typescript
// Track language change
const trackLanguageChange = (newLang: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'language_change', {
      language: newLang
    });
  }
};
```

---

## 🔒 Security Customizations

### Add Authentication

Protect routes with NextAuth.js:

```bash
npm install next-auth
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    // Your auth providers
  ],
};

export default NextAuth(authOptions);
```

### Rate Limiting

Add API rate limiting:

```typescript
// app/api/predict/route.ts
const rateLimiter = new Map();

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  
  // Check rate limit
  if (rateLimiter.get(ip) > 10) {
    return new Response('Too many requests', { status: 429 });
  }
  
  // Continue with prediction...
}
```

---

## 🎨 Design System

### Create Design Tokens

```typescript
// app/design-tokens.ts
export const tokens = {
  colors: {
    primary: '#B0D4E3',
    secondary: '#1A2B4A',
    // ...
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    // ...
  },
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
};
```

Use in components:
```typescript
import { tokens } from './design-tokens';

<div style={{ color: tokens.colors.primary }} />
```

---

## 📝 Best Practices

1. **Always test after customization**
2. **Keep backups of original files**
3. **Document your changes**
4. **Use version control (Git)**
5. **Test on multiple devices**
6. **Validate accessibility**
7. **Check browser compatibility**

---

## 🐛 Common Customization Issues

### Colors not updating
```bash
# Clear Tailwind cache
rm -rf .next
npm run dev
```

### Fonts not loading
- Check Google Fonts URL is correct
- Verify internet connection
- Clear browser cache

### Build errors after customization
- Check for syntax errors
- Verify all imports are correct
- Run `npm run build` to see detailed errors

---

## 💡 Pro Tips

1. **Use CSS Variables** for easy theme switching
2. **Create reusable components** for consistency
3. **Test translations** with native speakers
4. **Optimize images** before adding
5. **Monitor bundle size** after adding features
6. **Use TypeScript** for type safety
7. **Document custom features** for team

---

**Happy Customizing!** 🎨

Need help? Check FEATURES.md or INSTALLATION.md

---

**Version:** 2.0.0
**Last Updated:** February 2026
