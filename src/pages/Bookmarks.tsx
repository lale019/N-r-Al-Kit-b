import { useStore } from '../store/useStore';
import { Bookmark, Trash2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const { bookmarks, toggleBookmark } = useStore();

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-24">
      <header className="flex items-center gap-3 mb-8">
        <Bookmark className="w-8 h-8 text-app-brand" />
        <h1 className="text-4xl font-bold text-app-brand font-serif">Bookmarks</h1>
      </header>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark className="w-16 h-16 mx-auto text-app-text/20 mb-4" />
          <h2 className="text-xl font-medium text-app-text/70">No bookmarks yet</h2>
          <p className="text-sm text-app-text/50 mt-2 font-light">Tap the bookmark icon while reading to save verses here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((ayahId) => {
            // In a real app, we'd fetch the ayah details or store them with the bookmark
            // For now, we just show the ID and a link to the surah
            // Assuming ayahId is just the verse ID from the API, we'd need to know the chapter
            // Let's assume we can link to the reading page and it will handle it, or we just show a placeholder
            return (
              <div key={ayahId} className="bg-app-surface p-4 rounded-xl shadow-sm border border-app-border flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-app-bg flex items-center justify-center text-app-brand">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-app-text">Verse ID: {ayahId}</h3>
                    <p className="text-xs text-app-text/50 font-light">Saved Bookmark</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleBookmark(ayahId)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <Link 
                    to={`/read/1`} // Placeholder, ideally we'd know the chapter
                    className="p-2 text-app-brand hover:bg-app-brand/10 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
