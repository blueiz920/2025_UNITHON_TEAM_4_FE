import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange?: (language: string) => void;
}

export default function LanguageSelector({ selectedLanguage }: LanguageSelectorProps) {
  const languages = [
    { code: "ko", name: "한국어" },
    { code: "en", name: "English" },
    { code: "ja", name: "日本語" },
    { code: "zh", name: "中文" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ru", name: "Русский" },
  ];

  return (
    <div className="flex items-center gap-2 w-full">
      <Globe className="h-5 w-5 text-gray-500" />
      <select
        value={selectedLanguage}
        className="flex-1 border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-green-500 focus:border-green-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
