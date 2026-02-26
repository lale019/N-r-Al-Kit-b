import { useQuery } from '@tanstack/react-query';
import { fetchChapters } from '../services/quranApi';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { BookOpen } from 'lucide-react';

export default function Home() {
  const { data: chapters, isLoading } = useQuery({
    queryKey: ['chapters'],
    queryFn: fetchChapters,
  });

  const lastRead = useStore((state) => state.lastRead);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col items-center text-center">
        <div>
          <h1 className="text-4xl font-bold text-quran-green font-serif">Nūr Al-Kitāb</h1>
          <p className="text-app-muted mt-1 font-sans text-lg">The Holy Quran</p>
        </div>
      </header>

      {lastRead && (
        <section className="bg-quran-green text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-quran-gold mb-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Last Read
              </h2>
              <p className="text-xl font-bold mb-1">Surah {lastRead.surah}</p>
              <p className="text-sm text-white/80">Ayah {lastRead.ayah}</p>
            </div>
            <Link
              to={`/read/${lastRead.surah}`}
              className="bg-white text-quran-green px-6 py-2 rounded-full font-medium hover:bg-quran-cream transition-colors shadow-sm"
            >
              Continue
            </Link>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-6 text-quran-green font-serif">Surahs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters?.map((chapter: any) => (
            <Link
              key={chapter.id}
              to={`/read/${chapter.id}`}
              className="bg-app-surface p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-quran-gold/50 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-app-bg flex items-center justify-center text-quran-green font-medium text-sm">
                  {chapter.id}
                </div>
                <div>
                  <h3 className="font-medium text-app-text group-hover:text-quran-green transition-colors">
                    {chapter.name_simple}
                  </h3>
                  <p className="text-xs text-app-text/50 uppercase tracking-wider mt-1">
                    {chapter.revelation_place} • {chapter.verses_count} Verses
                  </p>
                </div>
              </div>
              <div className="font-amiri text-xl text-quran-green">
                {chapter.name_arabic}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
