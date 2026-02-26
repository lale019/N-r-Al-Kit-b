import { useStore } from '../store/useStore';
import { Settings as SettingsIcon, Type, Globe, Volume2, Moon, Sun, BookOpen, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { 
    font, setFont, 
    fontSize, setFontSize, 
    theme, setTheme, 
    uiSize, setUiSize,
    translation, setTranslation, 
    reciter, setReciter,
    showTranslation, setShowTranslation
  } = useStore();

  const fonts = ['Uthmani', 'IndoPak', 'Amiri Quran', 'Scheherazade New'];
  const themes = ['light', 'dark', 'cream'];
  const translations = [
    { id: 20, name: 'Sahih International (English)' },
    { id: 131, name: 'The Clear Quran (English)' },
    { id: 22, name: 'Yusuf Ali (English)' },
    { id: 97, name: 'Maududi (Urdu)' }
  ];
  const reciters = [
    { id: 7, name: 'Mishary Rashid Alafasy' },
    { id: 1, name: 'AbdulBaset AbdulSamad' },
    { id: 2, name: 'Abdur-Rahman as-Sudais' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-24">
      <header className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-quran-green" />
        <h1 className="text-4xl font-bold text-quran-green font-serif">Settings</h1>
      </header>

      <section className="space-y-6 bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
        <h2 className="text-xl font-medium flex items-center gap-2 text-app-text">
          <Type className="w-5 h-5 text-quran-green" /> Reading Experience
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-light text-app-text/80 mb-2">Arabic Font</label>
            <div className="grid grid-cols-2 gap-2">
              {fonts.map(f => (
                <button
                  key={f}
                  onClick={() => setFont(f as any)}
                  className={`p-3 rounded-xl border text-sm font-light transition-colors ${
                    font === f 
                      ? 'bg-quran-green text-white border-quran-green' 
                      : 'border-app-border hover:bg-app-border/50 text-app-text'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-app-text/80 mb-2">
              Font Size ({fontSize}px)
            </label>
            <input 
              type="range" 
              min="16" 
              max="64" 
              value={fontSize} 
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-app-border rounded-lg appearance-none cursor-pointer accent-quran-green"
            />
          </div>

          <div className="pt-4 border-t border-app-border">
            <label className="block text-sm font-light text-app-text/80 mb-2">UI Size</label>
            <div className="grid grid-cols-3 gap-3">
              {(['small', 'medium', 'large'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setUiSize(s)}
                  className={`p-3 rounded-xl border text-sm font-light capitalize transition-colors ${
                    uiSize === s 
                      ? 'bg-quran-green text-white border-quran-green' 
                      : 'border-app-border hover:bg-app-border/50 text-app-text'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-app-border">
            <label className="block text-sm font-light text-app-text/80 mb-2">Theme</label>
            <div className="flex gap-4">
              {themes.map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t as any)}
                  className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 transition-colors ${
                    theme === t 
                      ? 'border-quran-green text-quran-green bg-quran-green/5' 
                      : 'border-app-border hover:bg-app-border/50 text-app-text'
                  }`}
                >
                  {t === 'light' && <Sun className="w-5 h-5" />}
                  {t === 'dark' && <Moon className="w-5 h-5" />}
                  {t === 'cream' && <BookOpen className="w-5 h-5" />}
                  <span className="text-xs font-light capitalize">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
        <h2 className="text-xl font-medium flex items-center gap-2 text-app-text">
          <Globe className="w-5 h-5 text-quran-green" /> Translation
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-light text-app-text/80">Show Translation</label>
            <button 
              onClick={() => setShowTranslation(!showTranslation)}
              className={`w-12 h-6 rounded-full transition-colors relative ${showTranslation ? 'bg-quran-green' : 'bg-app-border'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${showTranslation ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {showTranslation && (
            <div>
              <label className="block text-sm font-light text-app-text/80 mb-2">Select Translation</label>
              <select 
                value={translation}
                onChange={(e) => setTranslation(Number(e.target.value) as any)}
                className="w-full p-3 rounded-xl border border-app-border bg-app-surface text-app-text focus:ring-2 focus:ring-quran-green outline-none font-light"
              >
                {translations.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-6 bg-app-surface p-6 rounded-2xl shadow-sm border border-app-border">
        <h2 className="text-xl font-medium flex items-center gap-2 text-app-text">
          <Volume2 className="w-5 h-5 text-quran-green" /> Audio
        </h2>
        
        <div>
          <label className="block text-sm font-light text-app-text/80 mb-2">Select Reciter</label>
          <select 
            value={reciter}
            onChange={(e) => setReciter(Number(e.target.value) as any)}
            className="w-full p-3 rounded-xl border border-app-border bg-app-surface text-app-text focus:ring-2 focus:ring-quran-green outline-none font-light"
          >
            {reciters.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="text-center text-xs text-app-text/50 mt-8 font-light space-y-4">
        <p>All Quran content sourced from verified Quran.com APIs.</p>
        <div className="flex justify-center gap-4">
          <Link to="/privacy" className="flex items-center gap-1 hover:text-quran-green transition-colors underline">
            <Shield className="w-3 h-3" /> Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
