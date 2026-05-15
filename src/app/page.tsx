"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const reviews = [
  {
    name: "S.J.",
    rating: 5,
    text: "Changed my morning routine. I keep one in the fridge and one in the freezer. My face looks snatched and my neck pain is gone.",
    date: "2 days ago",
  },
  {
    name: "M.K.",
    rating: 5,
    text: "Bought it for my migraines, ended up using it on my face too. My boyfriend stole it for his back pain. Need to buy more.",
    date: "1 week ago",
  },
  {
    name: "A.M.",
    rating: 5,
    text: "Saw it on TikTok, ordered immediately. Best $50 I've spent. Cold therapy hits different.",
    date: "2 weeks ago",
  },
  {
    name: "D.R.",
    rating: 5,
    text: "Amazing for muscle soreness after workouts. Stays freezing cold for over half an hour. Extremely high quality.",
    date: "3 weeks ago",
  },
  {
    name: "T.H.",
    rating: 5,
    text: "As a guy who lifts heavy, this roller is a game-changer for shoulder recovery. Glides perfectly and stays cold forever.",
    date: "1 month ago",
  },
  {
    name: "E.C.",
    rating: 5,
    text: "Absolute lifesaver for long desk shifts. Rolling this on my neck and temples during afternoon slumps instantly resets my focus.",
    date: "1 month ago",
  }
];

const benefits = [
  { icon: "✦", title: "DE-PUFF", desc: "Instantly reduces facial puffiness and under-eye bags." },
  { icon: "◈", title: "SOOTHE", desc: "Calms inflammation, redness, and tension." },
  { icon: "◉", title: "RECOVER", desc: "Eases sore muscles after workouts or long days." },
  { icon: "❄", title: "RELIEVE", desc: "Soothes headaches, neck pain, and back tension." },
];

const FAQS = [
  {
    q: "How long does it stay cold?",
    a: "The solid stainless steel head retains cold for extended sessions after being chilled. Keep it in the fridge or freezer between uses for best results."
  },
  {
    q: "Do I need to charge it?",
    a: "No. The Glo Ritual roller is fully manual — no batteries, no charging. Just chill and glide."
  },
  {
    q: "Is it safe for sensitive skin?",
    a: "Yes. Cold therapy is widely used for soothing sensitive and inflamed skin. The stainless steel head is hypoallergenic. Patch test first if you have known sensitivities."
  },
  {
    q: "Can I use it on my body too?",
    a: "Absolutely. It's designed for face, neck, shoulders, back, and sore muscles. Many customers use it post-workout or after long days at a desk."
  },
  {
    q: "How do I clean it?",
    a: "Wipe with a damp cloth or alcohol wipe after each use. Do not submerge in water."
  },
  {
    q: "When will my order ship?",
    a: "Orders are processed within 24 hours. US: 2–5 business days. International: 7–14."
  },
  {
    q: "Do you offer refunds?",
    a: "All sales are final. We do not accept returns or exchanges. If your item arrives damaged or defective, email support@gloritual.store within 7 days of delivery with a photo. We'll review case-by-case."
  },
  {
    q: "How do I contact you?",
    a: "support@gloritual.store · Response within 48 hours."
  },
  {
    q: "Where do you ship?",
    a: "United States, Canada, United Kingdom, Australia."
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`} onClick={() => setOpen(!open)} style={{ cursor: 'pointer', borderBottom: '1px solid var(--border)', padding: '16px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
        <span>{q}</span>
        <span style={{ fontSize: '1.25rem' }}>{open ? "−" : "+"}</span>
      </div>
      {open && <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>{a}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={`${styles.heroLabel} animate-up`}>
            ✦ Viral on TikTok · 1,287+ Reviews
          </span>
          <h1 className={`${styles.heroTitle} animate-up-d1`}>
            Cold therapy ritual.<br />
            Face. Body.<br />
            <em>Recovery.</em>
          </h1>
          <p className={`${styles.heroSub} animate-up-d2`}>
            The stainless steel cold roller that de-puffs, soothes sore muscles, and resets your body — in just 5 minutes a day.
          </p>
          <div className={`${styles.heroActions} animate-up-d3`}>
            <Link href="/product/electric-cryo-roller" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '17px 40px' }}>
              Shop Now — $44.99
            </Link>
            <div className={styles.heroTrust}>
              <span>✦ 1,200+ Happy Customers</span>
              <span>📦 FREE Shipping For All Products To The US</span>
              <span>⭐ 4.9/5 Rated</span>
            </div>
          </div>
        </div>
        <div className={`${styles.heroImageWrap} animate-up-d2`}>
          <div className={styles.heroImageBg} />
          <Image
            src="/product-lifestyle-hero.jpg"
            alt="Woman experiencing a morning glow facial routine using the Glo Ritual Cold Therapy Roller"
            width={560}
            height={560}
            className={`${styles.heroImage} animate-float`}
            priority
          />
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-wrap">
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 3 }).flatMap(() => [
            <span key={Math.random()} className="marquee-item">✦ FREE Shipping For All Products To The United States</span>,
            <span key={Math.random()} className="marquee-item">⚡ Ships in 24 hours</span>,
          ])}
        </div>
      </div>

      {/* ── Featured Product Card ── */}
      <section className={`section ${styles.productSection}`}>
        <div className="container">
          <div className={styles.productCard}>
            <div className={styles.productCardImage}>
              <Image
                src="/product-hero.png"
                alt="Glo Ritual Cold Therapy Roller — Premium Stainless Steel Core"
                width={480}
                height={480}
                className={styles.productCardImg}
              />
              <div className={styles.productBadge}>MOST POPULAR</div>
            </div>
            <div className={styles.productCardInfo}>
              <p className="section-label">MOST POPULAR · NEW DROP</p>
              <h2 className={styles.productCardTitle}>Cold Therapy Roller</h2>
              <p className={styles.productCardDesc}>
                Our solid stainless steel roller stays cold for 30+ minutes — gliding effortlessly to de-puff your face, soothe sore muscles, and ease pain. Loved by 1,200+ across the US, UK, Canada & Australia.
              </p>
              <div className={styles.productRating}>
                <span style={{ color: '#F59E0B' }}>★★★★★</span>
                <span>4.9/5 &nbsp;·&nbsp; 1,287 reviews</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.price}>$44.99</span>
                <span className={styles.priceNote}>From $33.33 / item in a bundle</span>
              </div>
              <Link href="/product/electric-cryo-roller" className="btn-primary">
                View Product &amp; Bundles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className={`section ${styles.howSection}`}>
        <div className="container text-center">
          <p className="section-label">Simple as 1-2-3</p>
          <h2 className="section-title">The Ritual</h2>
          <p className="section-sub" style={{ marginBottom: '56px' }}>
            Chill, glide, glow. Under 5 minutes.
          </p>
          <div className={styles.stepsGrid}>
            {[
              { n: "01", title: "CHILL", desc: "Pop in the freezer for 15 minutes (or fridge for cold therapy).", icon: "❄" },
              { n: "02", title: "GLIDE", desc: "Roll upward strokes on face, neck, back, or sore muscles.", icon: "✦" },
              { n: "03", title: "RESET", desc: "De-puff, recover, repeat. Your daily reset button.", icon: "◈" },
            ].map((s) => (
              <div key={s.n} className={styles.stepCard}>
                <div className={styles.stepIcon}>{s.icon}</div>
                <div className={styles.stepNum}>{s.n}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Grid ── */}
      <section className={`section ${styles.benefitsSection}`}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <p className="section-label">What It Does</p>
            <h2 className="section-title">4 Reasons You Need This</h2>
          </div>
          <div className={styles.benefitsGrid}>
            {benefits.map((b) => (
              <div key={b.title} className={`card ${styles.benefitCard}`}>
                <div className={styles.benefitIcon}>{b.icon}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={`section ${styles.reviewsSection}`}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <p className="section-label">Customer Love</p>
            <h2 className="section-title">1,200+ Happy Customers</h2>
          </div>
          <div className={styles.reviewsGrid}>
            {reviews.map((r, i) => (
              <div key={i} className={`card ${styles.reviewCard}`}>
                <div style={{ color: '#F59E0B', fontSize: '1rem', marginBottom: '12px' }}>
                  {'★'.repeat(r.rating)}
                </div>
                <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                <div className={styles.reviewAuthor}>
                  <div className={styles.reviewAvatar}>{r.name[0]}</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>— {r.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Verified Buyer · {r.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link href="/product/electric-cryo-roller" className="btn-outline">
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Global Trust Block ── */}
      <section className={`section-sm`} style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container text-center">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>Loved by 1,200+ Customers Worldwide</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#F59E0B', fontSize: '1.2rem' }}>
            <span>★★★★★</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>4.9/5 Rating</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="text-center" style={{ marginBottom: '56px' }}>
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>Ready for your ritual?</h2>
          <p className={styles.ctaSub}>
            Join 1,200+ who reset daily with cold therapy.
          </p>
          <Link
            href="/product/electric-cryo-roller"
            className="btn-primary"
            style={{ display: 'inline-block', width: 'auto', padding: '18px 48px', marginTop: '32px' }}
          >
            Shop Now — FREE Shipping For All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
