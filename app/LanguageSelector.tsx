"use client";

export default function LanguageSelector({ language, setLanguage }: any) {
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ];

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="appearance-none bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl px-4 py-2.5 pr-10 font-medium cursor-pointer hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-powder-blue"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-navy-deep text-white">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
