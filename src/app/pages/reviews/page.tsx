import Link from "next/link";

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

export default function ReviewsPage() {
  return (
    <div className="container section" style={{ maxWidth: '1000px', minHeight: '70vh' }}>
      <div className="text-center" style={{ marginBottom: '48px' }}>
        <p className="section-label">Real Results</p>
        <h1 className="section-title">Customer Reviews</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
          Loved by thousands of men and women aged 22–55 worldwide.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {reviews.map((r, i) => (
          <div key={i} className="card" style={{ padding: '28px', borderRadius: '20px' }}>
            <div style={{ color: '#F59E0B', fontSize: '1rem', marginBottom: '12px' }}>
              {'★'.repeat(r.rating)}
            </div>
            <p style={{ 
              fontSize: '0.9375rem', 
              lineHeight: 1.7, 
              color: 'var(--text-primary)', 
              fontStyle: 'italic', 
              marginBottom: '20px' 
            }}>
              &ldquo;{r.text}&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'var(--accent-cool)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 700, 
                fontSize: '1rem', 
                color: 'var(--text-primary)', 
                flexShrink: 0 
              }}>
                {r.name[0]}
              </div>
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

      <div className="text-center" style={{ 
        marginTop: '56px', 
        padding: '32px', 
        background: 'var(--bg-primary)', 
        borderRadius: '16px', 
        border: '1px solid var(--border)' 
      }}>
        <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Ready to start your ritual?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Experience the solid stainless steel cold roller with free shipping on bundles.
        </p>
        <Link href="/product/electric-cryo-roller" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '14px 32px' }}>
          Shop Now
        </Link>
      </div>
    </div>
  );
}
