import { WifiOff, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Offline() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-24 h-24 bg-quran-green/10 rounded-full flex items-center justify-center">
        <WifiOff className="w-12 h-12 text-quran-green" />
      </div>
      <h1 className="text-3xl font-bold text-quran-green font-serif">You're Offline</h1>
      <p className="text-app-text/60 max-w-xs">
        It looks like you don't have an internet connection. Please check your network and try again.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-quran-green text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
      >
        <Home className="w-5 h-5" /> Back to Home
      </button>
    </div>
  );
}
