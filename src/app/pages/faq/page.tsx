"use client";

import { useState } from "react";
import Link from "next/link";

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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div 
      onClick={() => setOpen(!open)} 
      style={{ 
        cursor: 'pointer', 
        borderBottom: '1px solid var(--border)', 
        padding: '20px 0',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
        <span>{q}</span>
        <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>{open ? "−" : "+"}</span>
      </div>
      {open && (
        <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="container section" style={{ maxWidth: '800px', minHeight: '70vh' }}>
      <div className="text-center" style={{ marginBottom: '48px' }}>
        <p className="section-label">Support Center</p>
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Everything you need to know about the product, ritual, and orders.
        </p>
      </div>

      <div style={{ background: 'white', padding: '16px 32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
        {FAQS.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>

      <div className="text-center" style={{ marginTop: '48px', padding: '32px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border)' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Still have questions?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Our support team is available to assist you with your collective orders.
        </p>
        <Link href="/pages/contact" className="btn-primary" style={{ display: 'inline-block', padding: '12px 24px' }}>
          Contact Support
        </Link>
      </div>
    </div>
  );
}
