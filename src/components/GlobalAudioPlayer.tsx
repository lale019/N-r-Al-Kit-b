import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export default function GlobalAudioPlayer() {
  const { isPlaying, currentAudioUrl, setIsPlaying } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        setIsPlaying(false);
      });
    }

    const audio = audioRef.current;

    if (currentAudioUrl && audio.src !== currentAudioUrl) {
      audio.src = currentAudioUrl;
      audio.load(); // Ensure new source is loaded
      if (isPlaying) {
        audio.play().catch(err => console.error("Audio play failed:", err));
      }
    }

    if (isPlaying && currentAudioUrl) {
      audio.play().catch(err => {
        console.error("Audio play failed:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentAudioUrl, isPlaying, setIsPlaying]);

  return null;
}
