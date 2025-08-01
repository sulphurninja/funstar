import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OceanTV — Premium Entertainment Streaming Platform</title>
        <meta name='title' content='Funstar — Premium Entertainment Streaming Platform' />
        <meta
          name='description'
          content='Stream unlimited movies, TV shows, exclusive originals and premium content on Funstar. Watch on any device with 4K quality. Cancel anytime.'
        />
        <meta name='keywords' content='streaming, movies, TV shows, entertainment, premium content, 4K, Funstar, watch online, originals' />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://funstar.com/' />
        <meta
          property='og:title'
          content='Funstar — Premium Entertainment Streaming Platform'
        />
        <meta
          property='og:description'
          content='Stream unlimited movies, TV shows, exclusive originals and premium content on Funstar. Watch on any device with 4K quality. Cancel anytime.'
        />
        <meta property='og:image' content='/funstar-og.jpg' />
        <meta property='og:site_name' content='Funstar' />

        {/* Twitter */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://funstar.com/' />
        <meta
          property='twitter:title'
          content='Funstar — Premium Entertainment Streaming Platform'
        />
        <meta
          property='twitter:description'
          content='Stream unlimited movies, TV shows, exclusive originals and premium content on Funstar. Watch on any device with 4K quality. Cancel anytime.'
        />
        <meta property='twitter:image' content='/funstar-twitter.jpg' />
        <meta property='twitter:creator' content='@FunstarStream' />

        {/* Additional Meta Tags */}
        <meta name='author' content='Funstar Entertainment' />
        <meta name='theme-color' content='#6366f1' />
        <meta name='msapplication-TileColor' content='#6366f1' />
        <meta name='application-name' content='Funstar' />
        <meta name='apple-mobile-web-app-title' content='Funstar' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <meta name='mobile-web-app-capable' content='yes' />
        
        {/* Mobile App-like Viewport - No zoom but mobile optimized */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover' />

        {/* Favicons */}
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#6366f1' />
        <link rel='shortcut icon' href='/favicon.ico' />

        {/* PWA Meta Tags */}
        <meta name='msapplication-config' content='/browserconfig.xml' />
        
        {/* SEO & Crawling */}
        <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
        <meta name='googlebot' content='index, follow' />
        <link rel='canonical' href='https://funstar.com/' />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Funstar",
              "description": "Premium Entertainment Streaming Platform",
              "url": "https://funstar.com",
              "logo": "https://funstar.com/logo.png",
              "sameAs": [
                "https://twitter.com/FunstarStream",
                "https://facebook.com/FunstarOfficial",
                "https://instagram.com/funstar_official"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-FUNSTAR",
                "contactType": "Customer Service",
                "availableLanguage": ["English"]
              }
            })
          }}
        />

        {/* Preload Critical Resources */}
        <link rel='preload' href='/fonts/inter-var.woff2' as='font' type='font/woff2' crossOrigin='anonymous' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

        {/* DNS Prefetch */}
        <link rel='dns-prefetch' href='//api.funstar.com' />
        <link rel='dns-prefetch' href='//cdn.funstar.com' />

        {/* Additional Performance Hints */}
        <meta httpEquiv='x-dns-prefetch-control' content='on' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='referrer' content='origin-when-cross-origin' />

        {/* Security Headers */}
        <meta httpEquiv='X-Content-Type-Options' content='nosniff' />
        <meta httpEquiv='X-Frame-Options' content='DENY' />
        <meta httpEquiv='X-XSS-Protection' content='1; mode=block' />
        
        {/* Mobile App-like Critical CSS - No zoom but native feel */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Mobile-first critical CSS */
            * { 
              box-sizing: border-box; 
            }
            
            html {
              font-size: 16px;
              -webkit-text-size-adjust: 100%;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              /* Disable zoom */
              -webkit-user-select: none;
              -webkit-touch-callout: none;
            }
            
            body { 
              margin: 0; 
              padding: 0; 
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              overflow-x: hidden;
              min-height: 100vh;
              line-height: 1.5;
              /* Disable zoom gestures */
              touch-action: pan-x pan-y;
            }
            
            /* Mobile loading screen */
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              height: 100dvh; /* Dynamic viewport height for mobile */
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
              padding: 1rem;
            }
            
            .loading-logo {
              width: 60px;
              height: 60px;
              background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              animation: pulse 2s infinite;
              box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
            }
            
            /* Responsive loading logo */
            @media (min-width: 480px) {
              .loading-logo {
                width: 80px;
                height: 80px;
                border-radius: 20px;
              }
            }
            
            @keyframes pulse {
              0%, 100% { 
                transform: scale(1); 
                opacity: 1; 
              }
              50% { 
                transform: scale(1.05); 
                opacity: 0.8; 
              }
            }
            
            /* Prevent horizontal scrolling */
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            
            /* Mobile touch improvements - No zoom but native feel */
            button, a {
              -webkit-tap-highlight-color: transparent;
              touch-action: manipulation;
              cursor: pointer;
            }
            
            /* Disable text selection for app-like feel */
            .no-select {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            
            /* Safe area for mobile devices */
            @supports (padding: max(0px)) {
              .safe-area-inset-top {
                padding-top: max(1rem, env(safe-area-inset-top));
              }
              .safe-area-inset-bottom {
                padding-bottom: max(1rem, env(safe-area-inset-bottom));
              }
            }
            
            /* Disable zoom on input focus */
            input, textarea, select {
              font-size: 16px !important;
            }
          `
        }} />
      </Head>
      
      {/* Enhanced Loading Screen Component */}
      <div id="loading-screen" className="loading-screen">
        <div className="loading-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white" className="sm:w-10 sm:h-10">
            <path d="M18 4v1h-2V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1h2v1c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4zm-4 8.5c0-.83-.67-1.5-1.5-1.5S11 11.67 11 12.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
          </svg>
        </div>
      </div>

      <Component {...pageProps} />

      {/* Enhanced loading screen removal script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Disable zoom with JavaScript as additional layer
            document.addEventListener('gesturestart', function (e) {
              e.preventDefault();
            });
            
            document.addEventListener('gesturechange', function (e) {
              e.preventDefault();
            });
            
            document.addEventListener('gestureend', function (e) {
              e.preventDefault();
            });
            
            // Disable double-tap zoom
            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
              const now = (new Date()).getTime();
              if (now - lastTouchEnd <= 300) {
                event.preventDefault();
              }
              lastTouchEnd = now;
            }, false);
            
            function removeLoadingScreen() {
              const loadingScreen = document.getElementById('loading-screen');
              if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                  loadingScreen.style.display = 'none';
                  loadingScreen.remove();
                }, 500);
              }
            }
            
            if (document.readyState === 'complete') {
              removeLoadingScreen();
            } else {
              window.addEventListener('load', removeLoadingScreen);
              // Fallback timeout
              setTimeout(removeLoadingScreen, 3000);
            }
          })();
        `
      }} />
    </>
  );
}

export default MyApp;