import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontType = 'Uthmani' | 'IndoPak' | 'Amiri Quran' | 'Scheherazade New';
export type ThemeType = 'light' | 'dark' | 'cream';
export type UiSizeType = 'small' | 'medium' | 'large';
export type TranslationType = 131 | 22 | 97; // 131: Sahih Int, 22: Yusuf Ali, 97: Maududi
export type ReciterType = 7 | 1 | 2; // 7: Mishary, 1: AbdulBaset, 2: Sudais

interface AppState {
  font: FontType;
  fontSize: number;
  theme: ThemeType;
  uiSize: UiSizeType;
  translation: TranslationType;
  reciter: ReciterType;
  showTranslation: boolean;
  bookmarks: number[]; // Ayah keys or IDs
  lastRead: { surah: number; ayah: number } | null;
  
  setFont: (font: FontType) => void;
  setFontSize: (size: number) => void;
  setTheme: (theme: ThemeType) => void;
  setUiSize: (size: UiSizeType) => void;
  setTranslation: (trans: TranslationType) => void;
  setReciter: (reciter: ReciterType) => void;
  setShowTranslation: (show: boolean) => void;
  toggleBookmark: (ayahId: number) => void;
  setLastRead: (surah: number, ayah: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      font: 'Uthmani',
      fontSize: 24,
      theme: 'cream',
      uiSize: 'medium',
      translation: 131,
      reciter: 7,
      showTranslation: true,
      bookmarks: [],
      lastRead: null,

      setFont: (font) => set({ font }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-cream', 'dark');
        document.documentElement.classList.add(`theme-${theme}`);
      },
      setUiSize: (uiSize) => set({ uiSize }),
      setTranslation: (translation) => set({ translation }),
      setReciter: (reciter) => set({ reciter }),
      setShowTranslation: (showTranslation) => set({ showTranslation }),
      toggleBookmark: (ayahId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(ayahId)
            ? state.bookmarks.filter((id) => id !== ayahId)
            : [...state.bookmarks, ayahId],
        })),
      setLastRead: (surah, ayah) => set({ lastRead: { surah, ayah } }),
    }),
    {
      name: 'quran-storage',
    }
  )
);
