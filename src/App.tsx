/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import Home from './pages/Home';
import Reading from './pages/Reading';
import Settings from './pages/Settings';
import Bookmarks from './pages/Bookmarks';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Offline from './pages/Offline';
import { useStore } from './store/useStore';
import { useEffect } from 'react';

const queryClient = new QueryClient();

export default function App() {
  const theme = useStore((state) => state.theme);
  const uiSize = useStore((state) => state.uiSize);

  useEffect(() => {
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-cream', 'dark');
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Apply UI scaling
    if (uiSize === 'small') {
      document.documentElement.style.fontSize = '14px';
    } else if (uiSize === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
  }, [theme, uiSize]);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalAudioPlayer />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="read/:id" element={<Reading />} />
            <Route path="settings" element={<Settings />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="offline" element={<Offline />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
