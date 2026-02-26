import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Settings, Bookmark, Play, Pause, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Layout() {
  const location = useLocation();
  const { isPlaying, setIsPlaying, currentSurahId, setAudio } = useStore();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/read/1', icon: BookOpen, label: 'Read' },
    { path: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0 md:flex-row">
      <main className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>

      {/* Global Mini Player */}
      {currentSurahId && isPlaying && (
        <div className={`fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-app-surface border border-app-border rounded-2xl shadow-2xl p-3 flex items-center justify-between z-50 transition-all scale-100 opacity-100`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-app-brand/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-app-brand" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-app-brand uppercase tracking-wider">Now Playing</p>
              <p className="text-sm font-bold text-app-text truncate">Surah {currentSurahId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-app-brand text-white shadow-lg hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => { setAudio(null, null); setIsPlaying(false); }}
              className="p-2 rounded-full hover:bg-app-border/50 text-app-text/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-app-surface border-t border-app-border flex justify-around p-3 md:hidden z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path.startsWith('/read') && location.pathname.startsWith('/read'));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive ? 'text-quran-gold' : 'text-app-text/60 hover:text-app-text'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-app-surface border-r border-app-border p-4 shrink-0 h-screen sticky top-0">
        <div className="mb-8 px-4">
          <h1 className="text-2xl font-bold text-app-brand font-serif">Nūr Al-Kitāb</h1>
          <p className="text-xs text-app-muted font-sans mt-1">The Holy Quran</p>
        </div>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path.startsWith('/read') && location.pathname.startsWith('/read'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-app-brand/10 text-app-brand'
                    : 'text-app-text/70 hover:bg-app-border/50 hover:text-app-text'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
