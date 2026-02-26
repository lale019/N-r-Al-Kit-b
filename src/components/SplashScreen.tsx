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
          className="fixed inset-0 z-[100] bg-[#04241A] overflow-hidden"
        >
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://i.ibb.co/DDt6RLbb/splash.png" 
            alt="Nūr Al-Kitāb Splash"
            className="w-full h-full object-cover md:object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
