import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glo Ritual | Electric Cryotherapy Ice Roller — Cold Therapy At Home",
  description:
    "De-puff, tone & recover with the Glo Ritual Cold Therapy Roller. Cold therapy ritual for face and body. Free US shipping on bundles. 30-day money-back guarantee.",
  keywords: "cryotherapy roller, ice roller face, electric facial roller, de-puff, skincare",
  openGraph: {
    title: "Glo Ritual | Electric Cryotherapy Ice Roller",
    description: "Cold therapy. Studio results. At home.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'TEST_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('TEST_TIKTOK_ID');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        {/* GA4 */}
        <Script id="ga4-script" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-TESTID" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TESTID');
          `}
        </Script>
      </head>
      <body>
        {/* Announcement Bar */}
        <div className="announcement-bar">
          🚀 FREE US Shipping on 2-Pack & 3-Pack Bundles · Ships in 2–5 Days
        </div>

        {/* Nav */}
        <nav className="nav">
          <Link href="/" className="nav-logo">Glo Ritual</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/product/electric-cryo-roller">Shop</Link></li>
            <li><Link href="/pages/reviews">Reviews</Link></li>
            <li><Link href="/pages/faq">FAQ</Link></li>
          </ul>
          <Link href="/product/electric-cryo-roller" className="nav-cart-btn">
            Shop Now →
          </Link>
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer className="footer" style={{ textAlign: 'center', padding: '60px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ fontWeight: 700, letterSpacing: '0.1em', fontSize: '1.1rem' }}>
              GLO RITUAL · COLD THERAPY RITUAL
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <a href="/product/electric-cryo-roller" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</a>
              <span>·</span>
              <a href="/pages/shipping" style={{ color: 'inherit', textDecoration: 'none' }}>Shipping</a>
              <span>·</span>
              <a href="/pages/returns" style={{ color: 'inherit', textDecoration: 'none' }}>Returns</a>
              <span>·</span>
              <a href="/pages/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
              <span>·</span>
              <a href="/pages/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
              <span>·</span>
              <a href="/pages/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
              <span>·</span>
              <a href="/pages/faq" style={{ color: 'inherit', textDecoration: 'none' }}>FAQ</a>
            </div>

            <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>
              <a href="mailto:support@gloritual.store" style={{ color: 'inherit', textDecoration: 'none' }}>support@gloritual.store</a>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '16px' }}>
              © 2026 Glo Ritual LLC. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
