import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Funstar — Premium Entertainment Streaming Platform</title>
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
        
        {/* Viewport */}
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover' />

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
        
        {/* Critical CSS for performance */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for initial render */
            body { 
              margin: 0; 
              padding: 0; 
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              overflow-x: hidden;
            }
            * { 
              box-sizing: border-box; 
            }
            .loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 9999;
            }
            .loading-logo {
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
              border-radius: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              animation: pulse 2s infinite;
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.8; }
            }
          `
        }} />
      </Head>
      
      {/* Loading Screen Component */}
      <div id="loading-screen" className="loading-screen">
        <div className="loading-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M18 4v1h-2V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-1h2v1c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V4c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4zm-4 8.5c0-.83-.67-1.5-1.5-1.5S11 11.67 11 12.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
          </svg>
        </div>
      </div>

      <Component {...pageProps} />

      {/* Remove loading screen after page load */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
              loadingScreen.style.opacity = '0';
              loadingScreen.style.transition = 'opacity 0.5s ease-out';
              setTimeout(() => {
                loadingScreen.style.display = 'none';
              }, 500);
            }
          });
        `
      }} />
    </>
  );
}

export default MyApp;