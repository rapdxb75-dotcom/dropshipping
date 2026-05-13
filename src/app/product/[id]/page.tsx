"use client";

import { useState, useEffect, useCallback, MouseEvent, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

const BUNDLE_OPTIONS = [
  { qty: 1, label: "1-Pack", sublabel: "Single", price: 44.99, originalPrice: 79.99, save: "SAVE 44%" },
  { qty: 2, label: "2-Pack", sublabel: "Best for Sharing", price: 74.99, originalPrice: 159.98, save: "SAVE 17%" },
  { qty: 3, label: "3-Pack", sublabel: "Most Popular", price: 99.99, originalPrice: 239.97, save: "SAVE 26%" },
];

const REVIEWS = [
  {
    name: "S.J.",
    rating: 5,
    text: "Changed my morning routine. I keep one in the fridge and one in the freezer. My face looks snatched and my neck pain is gone.",
    date: "2 days ago",
    verified: true,
  },
  {
    name: "M.K.",
    rating: 5,
    text: "Bought it for my migraines, ended up using it on my face too. My boyfriend stole it for his back pain. Need to buy more.",
    date: "1 week ago",
    verified: true,
  },
  {
    name: "A.M.",
    rating: 5,
    text: "Saw it on TikTok, ordered immediately. Best $50 I've spent. Cold therapy hits different.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "D.R.",
    rating: 5,
    text: "Amazing for muscle soreness after workouts. Stays freezing cold for over half an hour. Extremely high quality.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    name: "T.H.",
    rating: 5,
    text: "As a guy who lifts heavy, this roller is a game-changer for shoulder recovery. Glides perfectly and stays cold forever.",
    date: "1 month ago",
    verified: true,
  },
  {
    name: "E.C.",
    rating: 5,
    text: "Absolute lifesaver for long desk shifts. Rolling this on my neck and temples during afternoon slumps instantly resets my focus.",
    date: "1 month ago",
    verified: true,
  }
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
    a: "Orders are processed within 1–3 business days. US: 5–10 business days. International: 7–14."
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

const USE_CASES = [
  { icon: "☀️", title: "Morning Face Reset", desc: "De-puff and depuff under-eyes before coffee even hits." },
  { icon: "💪", title: "Post-Workout Recovery", desc: "Roll on sore muscles, neck, and back to ease tension fast." },
  { icon: "🤕", title: "Headache Relief", desc: "Glide along temples and forehead to soothe migraines instantly." },
  { icon: "🛋️", title: "Desk-Job Decompress", desc: "Melt tension from shoulders and neck after a long day at the screen." },
  { icon: "✨", title: "Pre-Event Glow", desc: "Sculpt and prime your face 10 minutes before any event." },
];

function CountdownTimer() {
  const [time, setTime] = useState({ h: 4, m: 23, s: 47 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 4; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className={styles.countdown}>
      <span className={styles.countdownUnit}>{pad(time.h)}</span>:
      <span className={styles.countdownUnit}>{pad(time.m)}</span>:
      <span className={styles.countdownUnit}>{pad(time.s)}</span>
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`} onClick={() => setOpen(!open)}>
      <div className={styles.faqQ}>
        <span>{q}</span>
        <span className={styles.faqChevron}>{open ? "−" : "+"}</span>
      </div>
      {open && <p className={styles.faqA}>{a}</p>}
    </div>
  );
}

export default function ProductPage() {
  const [selectedBundle, setSelectedBundle] = useState<number>(3);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [stockCount, setStockCount] = useState<number>(47);

  useEffect(() => {
    setStockCount(Math.floor(Math.random() * (58 - 32 + 1)) + 32);
  }, []);

  const bundle = BUNDLE_OPTIONS.find((b) => b.qty === selectedBundle)!;

  const images = [
    { src: "/product-lifestyle-hero.jpg", alt: "Glo Ritual Cold Therapy Roller — morning facial routine lifestyle view" },
    { src: "/product-hero.png", alt: "Glo Ritual Cold Therapy Roller — solid stainless steel core studio shot" },
    { src: "/product-fridge.jpg", alt: "Glo Ritual Cold Therapy Roller — chilling in freezer for daily facial de-puffing" },
    { src: "/product-shoulder.jpg", alt: "Glo Ritual Cold Therapy Roller — lifestyle shoulder and neck muscle recovery" },
    { src: "/product-counter.jpg", alt: "Glo Ritual Cold Therapy Roller — aesthetic marble counter display setup" },
  ];

  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({ display: 'none' });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fbq = (window as any).fbq;
      const ttq = (window as any).ttq;
      if (fbq) fbq('track', 'ViewContent', { content_ids: ['cryo-roller'], content_type: 'product' });
      if (ttq) ttq.track('ViewContent', { contents: [{ content_id: 'cryo-roller', content_type: 'product' }] });
    }
  }, []);

  const handleAddToCart = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        const fbq = (window as any).fbq;
        const ttq = (window as any).ttq;
        if (fbq && typeof fbq === 'function') fbq('track', 'AddToCart', { value: bundle.price, currency: 'USD' });
        if (ttq && typeof ttq.track === 'function') ttq.track('AddToCart', { value: bundle.price, currency: 'USD' });
      }
    } catch (err) {
      console.warn("Tracking prevented:", err);
    }
    router.push(`/checkout?qty=${bundle.qty}&price=${bundle.price}`);
  }, [bundle, router]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${images[activeImage].src})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  }, [activeImage, images]);

  const handleMouseLeave = useCallback(() => {
    setZoomStyle({ display: 'none' });
  }, []);

  return (
    <div className={styles.page}>
      {/* ── PDP Layout ── */}
      <div className={styles.pdpWrap}>

        {/* 1. Image Gallery */}
        <div className={styles.gallery}>
          <div 
            className={styles.mainImage}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={images[activeImage].src}
              alt={images[activeImage].alt}
              fill
              className={styles.mainImg}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className={styles.zoomWindow} style={zoomStyle}></div>
          </div>
          <div className={styles.thumbStrip}>
            {images.map((img, i) => (
              <button
                key={i}
                id={`thumb-${i}`}
                className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ""}`}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img.src} alt={img.alt} width={72} height={72} className={styles.thumbImg} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>

          {/* 2. Title + Rating */}
          <div className={styles.ratingRow}>
            <span style={{ color: '#F59E0B' }}>★★★★★</span>
            <span className={styles.ratingCount}>1,287 reviews</span>
            <span className={styles.ratingBadge}>✅ Verified</span>
          </div>
          <h1 className={styles.title}>Glo Ritual Cold Therapy Roller</h1>
          <p className={styles.tagline}>Face. Body. Recovery. In 5 minutes.</p>

          {/* 3. Price + Bundle Selector */}
          <div className={styles.priceBlock}>
            <span className={styles.price}>$44.99</span>
            <span className={styles.priceOrig}>$79.99</span>
            <span className={styles.savePill}>SAVE 44%</span>
          </div>

          <div className={styles.bundleWrap}>
            <p className={styles.bundleLabel}>Select Bundle:</p>
            {BUNDLE_OPTIONS.map((opt) => (
              <button
                key={opt.qty}
                id={`bundle-${opt.qty}`}
                className={`${styles.bundleOption} ${selectedBundle === opt.qty ? styles.bundleSelected : ""}`}
                onClick={() => setSelectedBundle(opt.qty)}
              >
                {opt.qty === 3 && <span className={styles.popularBadge}>MOST POPULAR</span>}
                <div className={styles.bundleLeft}>
                  <strong>{opt.label}</strong>
                  <span className={styles.bundleSubLabel}>{opt.sublabel}</span>
                </div>
                <div className={styles.bundleRight}>
                  <span className={styles.bundlePrice}>${opt.price.toFixed(2)}</span>
                  {opt.save && <span className={styles.bundleSave}>{opt.save}</span>}
                </div>
              </button>
            ))}
          </div>

          {/* 4. Free Shipping Badge */}
          <div className={styles.shippingBadge}>
            <span>🎉</span> Free Shipping Unlocked on 2-Pack &amp; 3-Pack!
          </div>

          {/* Scarcity + Timer */}
          <div className={styles.urgencyRow}>
            <div className={styles.stockBadge}>
              <span className="animate-pulse" style={{ fontSize: '0.7rem' }}>🔴</span>
              Only {stockCount} left in stock
            </div>
            <div className={styles.timerBadge}>
              ⏳ Sale ends in <CountdownTimer />
            </div>
          </div>

          {/* 5. Sticky Add to Cart (mobile) + desktop button */}
          <button
            id="add-to-cart-desktop"
            className={`btn-primary ${styles.atcDesktop}`}
            onClick={handleAddToCart}
          >
            Add to Cart — $44.99
          </button>

          {/* 6. Trust Icons */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <span>🛡</span>
              <div>
                <strong>Secure SSL Checkout</strong>
                <p>256-bit encrypted</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span>📦</span>
              <div>
                <strong>Free Shipping on Bundles</strong>
                <p>Fast &amp; reliable</p>
              </div>
            </div>
            <div className={styles.trustItem}>
              <span>💬</span>
              <div>
                <strong>Email Support</strong>
                <p>support@gloritual.store</p>
              </div>
            </div>
          </div>

          {/* 7. Benefit Grid */}
          <div className={styles.benefitGrid}>
            {["✦ De-Puff", "◈ Tone", "◉ Glow", "❄ Soothe"].map((b) => (
              <div key={b} className={styles.benefitChip}>{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 8. Use Cases */}
      <section className={`${styles.section} ${styles.useCasesSection}`}>
        <div className={styles.sectionContainer}>
          <p className="section-label text-center">Your daily reset</p>
          <h2 className={`section-title text-center`} style={{ marginBottom: '40px' }}>
            5 Ways to Use It
          </h2>
          <div className={styles.useCaseGrid}>
            {USE_CASES.map((u) => (
              <div key={u.title} className={styles.useCaseCard}>
                <span className={styles.useCaseIcon}>{u.icon}</span>
                <h3 className={styles.useCaseName}>{u.title}</h3>
                <p className={styles.useCaseDesc}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Before / After */}
      <section className={`${styles.section} ${styles.baSection}`}>
        <div className={styles.sectionContainer}>
          <p className="section-label text-center">Real Results</p>
          <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>
            See the Difference
          </h2>
          <div className={styles.baGrid}>
            <div className={styles.baCard}>
              <div className={styles.baLabel}>Before</div>
              <div className={`${styles.baImage} ${styles.baBefore}`}>
                <span style={{ fontSize: '3rem' }}>😴</span>
                <p>Puffy, tired skin</p>
              </div>
            </div>
            <div className={styles.baCard}>
              <div className={`${styles.baLabel} ${styles.baLabelAfter}`}>After</div>
              <div className={`${styles.baImage} ${styles.baAfter}`}>
                <span style={{ fontSize: '3rem' }}>✨</span>
                <p>Sculpted, glowing skin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. How It Works (Detail) */}
      <section className={`${styles.section} ${styles.howSection}`}>
        <div className={styles.sectionContainer}>
          <p className="section-label text-center">How It Works</p>
          <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>
            3 Steps to Reset
          </h2>
          <div className={styles.howGrid}>
            {[
              { n: "01", icon: "❄", title: "CHILL", desc: "Freeze for 15 minutes (or fridge for cold therapy mode)." },
              { n: "02", icon: "✦", title: "GLIDE", desc: "Roll upward strokes wherever you need relief." },
              { n: "03", icon: "✓", title: "RESET", desc: "De-puff, soothe, recover. Done in 5 minutes." },
            ].map((s) => (
              <div key={s.n} className={styles.howCard}>
                <div className={styles.howIcon}>{s.icon}</div>
                <div className={styles.howNum}>{s.n}</div>
                <h3 className={styles.howTitle}>{s.title}</h3>
                <p className={styles.howDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Comparison Table */}
      <section className={`${styles.section} ${styles.compSection}`}>
        <div className={styles.sectionContainer}>
          <p className="section-label text-center">Why Glo Ritual?</p>
          <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>
            Why Glo Ritual
          </h2>
          <div className={styles.tableWrap}>
            <table className={styles.compTable}>
              <thead>
                <tr>
                  <th className={styles.thFeature}>Feature</th>
                  <th className={styles.thUs}>Glo Ritual ✦</th>
                  <th className={styles.thOther}>Regular Ice Pack</th>
                  <th className={styles.thOther}>Massage Gun</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Stays cold for extended sessions", true, false, false],
                  ["Works on face AND body", true, false, false],
                  ["Travel-friendly design", true, false, false],
                  ["No batteries, no charging", true, true, false],
                  ["Premium stainless steel build", true, false, true],
                  ["Designed for daily use", true, false, true],
                ].map(([feat, us, ice, facial]) => (
                  <tr key={feat as string}>
                    <td className={styles.tdFeat}>{feat as string}</td>
                    <td className={styles.tdUs}>{us ? "✔" : "✗"}</td>
                    <td className={styles.tdOther}>{ice ? "✔" : "✗"}</td>
                    <td className={styles.tdOther}>{facial ? "✔" : "✗"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 12. Reviews */}
      <section className={`${styles.section} ${styles.reviewsSection}`}>
        <div className={styles.sectionContainer}>
          <p className="section-label text-center">Customer Reviews</p>
          <h2 className="section-title text-center" style={{ marginBottom: '8px' }}>
            Loved by Thousands (Ages 22–55)
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
            ★★★★★ 4.9 / 5 average rating
          </p>
          <div className={styles.reviewsGrid}>
            {REVIEWS.map((r, i) => (
              <div key={i} className={styles.reviewCard}>
                <div style={{ color: '#F59E0B', marginBottom: '10px' }}>{'★'.repeat(r.rating)}</div>
                <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                <div className={styles.reviewAuthor}>
                  <div className={styles.reviewAvatar}>{r.name[0]}</div>
                  <div>
                    <strong style={{ fontSize: '0.875rem' }}>— {r.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {r.verified && "Verified Buyer · "} {r.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionContainer}>
          <p className="section-label text-center">FAQ</p>
          <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>
            Common Questions
          </h2>
          <div className={styles.faqList}>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>



      {/* Sticky Add to Cart — Mobile */}
      <div className={styles.stickyAtc}>
        <div className={styles.stickyAtcInner}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Glo Ritual Cold Therapy Roller</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{bundle.label} — ${bundle.price.toFixed(2)}</div>
          </div>
          <button
            id="add-to-cart-mobile"
            className={`btn-primary ${styles.stickyAtcBtn}`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
