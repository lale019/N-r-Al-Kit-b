import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#04241A] flex items-center justify-center p-8 overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <img 
              src="https://i.ibb.co/60dbYP71/Logo.png" 
              alt="Nūr Al-Kitāb Logo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Subtle background glow to make the logo pop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-quran-gold/5 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
