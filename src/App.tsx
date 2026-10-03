import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { ScrollManager } from '@/components/layout/ScrollManager';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { ProductDetail } from '@/pages/ProductDetail';

function SkipLink() {
  const { t } = useTranslation();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-night"
    >
      {t('nav.skip')}
    </a>
  );
}

function App() {
  return (
    // reducedMotion="user": OS の「視差効果を減らす」設定時は移動系アニメーションを止める
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SmoothScroll>
          <ScrollManager />
          <SkipLink />
          <div className="noise-overlay" aria-hidden="true" />
          <Header />

          <main id="main" tabIndex={-1} className="relative outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </SmoothScroll>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
