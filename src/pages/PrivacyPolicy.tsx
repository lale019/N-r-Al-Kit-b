import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 pb-24">
      <header className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-app-border/50 transition-colors">
          <ArrowLeft className="w-6 h-6 text-app-text" />
        </button>
        <h1 className="text-3xl font-bold text-quran-green font-serif">Privacy Policy</h1>
      </header>

      <section className="space-y-4 text-app-text/80 font-light leading-relaxed">
        <p>Last updated: February 26, 2026</p>
        
        <h2 className="text-xl font-bold text-quran-green mt-6">1. Introduction</h2>
        <p>
          Welcome to Nūr Al-Kitāb. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our application 
          and tell you about your privacy rights.
        </p>

        <h2 className="text-xl font-bold text-quran-green mt-6">2. Data We Collect</h2>
        <p>
          Nūr Al-Kitāb is designed to be a private experience. We do not require you to create an account. 
          All your settings, bookmarks, and "Last Read" progress are stored locally on your device using your browser's local storage. 
          We do not collect or store this data on our servers.
        </p>

        <h2 className="text-xl font-bold text-quran-green mt-6">3. Third-Party Services</h2>
        <p>
          Our application uses verified APIs from Quran.com to fetch Quranic text and audio. 
          When you use the application, requests are made to these APIs. Please refer to Quran.com's privacy policy for more information.
        </p>

        <h2 className="text-xl font-bold text-quran-green mt-6">4. Cookies</h2>
        <p>
          We do not use tracking cookies. We only use local storage to remember your preferences (theme, font size, etc.).
        </p>

        <h2 className="text-xl font-bold text-quran-green mt-6">5. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at support@nural-kitab.com.
        </p>
      </section>
    </div>
  );
}
