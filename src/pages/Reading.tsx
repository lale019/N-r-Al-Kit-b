import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchVersesByChapter, fetchChapterInfo, fetchAudioByChapter } from '../services/quranApi';
import { useStore } from '../store/useStore';
import { Play, Pause, Bookmark, Share2, Settings, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

export default function Reading() {
  const { id } = useParams<{ id: string }>();
  const chapterId = parseInt(id || '1', 10);
  const navigate = useNavigate();
  
  const { font, fontSize, theme, translation, reciter, showTranslation, bookmarks, toggleBookmark, setLastRead } = useStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: versesData, isLoading: versesLoading } = useQuery({
    queryKey: ['verses', chapterId, translation, reciter],
    queryFn: () => fetchVersesByChapter(chapterId, translation, reciter),
  });

  const { data: chapterInfo } = useQuery({
    queryKey: ['chapterInfo', chapterId],
    queryFn: () => fetchChapterInfo(chapterId),
  });

  const { data: audioData } = useQuery({
    queryKey: ['audio', chapterId, reciter],
    queryFn: () => fetchAudioByChapter(chapterId, reciter),
  });

  useEffect(() => {
    if (audioData?.audio_url) {
      audioRef.current = new Audio(audioData.audio_url);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [audioData]);

  const handleTimeUpdate = () => {
    // Basic time update logic to highlight current ayah
    // A real implementation would need precise timestamps per ayah
    // For now, we'll just play the whole chapter
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAyahClick = (ayahNumber: number) => {
    setLastRead(chapterId, ayahNumber);
    // In a full implementation, we would seek the audio to the specific ayah timestamp
  };

  if (versesLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const verses = versesData?.verses || [];

  const getFontClass = () => {
    switch (font) {
      case 'Uthmani': return 'font-uthmani';
      case 'IndoPak': return 'font-indopak';
      case 'Amiri Quran': return 'font-amiri';
      case 'Scheherazade New': return 'font-scheherazade';
      default: return 'font-uthmani';
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-app-surface/90 backdrop-blur-md border-b border-app-border p-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate('/')} className="p-2 rounded-full hover:bg-app-border/50 transition-colors" title="Back to Home">
          <ArrowLeft className="w-6 h-6 text-app-text" />
        </button>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => navigate(`/read/${Math.max(1, chapterId - 1)}`)}
            disabled={chapterId === 1}
            className="p-1 md:p-2 rounded-full hover:bg-app-border/50 transition-colors disabled:opacity-30"
            title="Previous Surah"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-app-text" />
          </button>
          
          <div className="text-center min-w-[100px] md:min-w-[140px]">
            <h1 className={clsx("text-xl md:text-2xl font-medium text-quran-green", getFontClass())}>
              {chapterInfo?.name_arabic || '...'}
            </h1>
            <p className="text-[10px] md:text-xs text-app-muted uppercase tracking-widest mt-1 font-sans">
              {chapterInfo?.name_simple || 'Loading...'}
            </p>
          </div>

          <button 
            onClick={() => navigate(`/read/${Math.min(114, chapterId + 1)}`)}
            disabled={chapterId === 114}
            className="p-1 md:p-2 rounded-full hover:bg-app-border/50 transition-colors disabled:opacity-30"
            title="Next Surah"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-app-text" />
          </button>
        </div>

        <div className="flex gap-1 md:gap-2">
          <button onClick={togglePlay} className="p-2 rounded-full bg-quran-green text-white hover:bg-quran-green/90 transition-colors shadow-md">
            {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5" />}
          </button>
        </div>
      </div>

      {/* Bismillah */}
      {chapterId !== 1 && chapterId !== 9 && (
        <div className="pt-8 pb-4 text-center">
          <h2 className={clsx("text-4xl text-quran-green", getFontClass())}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </h2>
        </div>
      )}

      {/* Verses */}
      <div className="px-4 md:px-8 py-6 space-y-12">
        {verses.map((verse: any) => {
          const isBookmarked = bookmarks.includes(verse.id);
          const verseNumber = verse.verse_key.split(':')[1];
          
          return (
            <div 
              key={verse.id} 
              className="group relative border-b border-app-border pb-8 last:border-0"
              onClick={() => handleAyahClick(parseInt(verseNumber, 10))}
            >
              {/* Actions */}
              <div className="absolute top-0 left-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleBookmark(verse.id); }}
                  className={clsx("p-2 rounded-full transition-colors", isBookmarked ? "text-quran-gold bg-quran-gold/10" : "text-app-text/40 hover:bg-app-border/50")}
                >
                  <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                </button>
                <button className="p-2 rounded-full text-app-text/40 hover:bg-app-border/50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Arabic Text */}
              <div 
                className={clsx("arabic-text text-right mb-6 text-app-text", getFontClass())}
                style={{ fontSize: `${fontSize}px` }}
              >
                {font === 'IndoPak' ? verse.text_indopak : verse.text_uthmani}
                <span className="ayah-circle">{verseNumber}</span>
              </div>

              {/* Translation */}
              {showTranslation && verse.translations && verse.translations[0] && (
                <div 
                  className="text-left text-app-text/80 font-light leading-relaxed"
                  style={{ fontSize: `${Math.max(14, fontSize * 0.5)}px` }}
                  dangerouslySetInnerHTML={{ __html: verse.translations[0].text }}
                />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
