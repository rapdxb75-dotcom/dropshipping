"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQty = parseInt(searchParams.get("qty") || "3", 10);
  const initialPrice = parseFloat(searchParams.get("price") || "89.99");
  
  const [qtyMultiplier, setQtyMultiplier] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const qty = initialQty * qtyMultiplier;
  const price = initialPrice * qtyMultiplier;

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const fbq = (window as any).fbq;
        const ttq = (window as any).ttq;
        if (fbq && typeof fbq === 'function') fbq("track", "InitiateCheckout", { value: price, currency: "USD" });
        if (ttq && typeof ttq.track === 'function') ttq.track("InitiateCheckout", { value: price, currency: "USD" });
      }
    } catch (e) {}
  }, [price]);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      try {
        if (typeof window !== "undefined") {
          const fbq = (window as any).fbq;
          const ttq = (window as any).ttq;
          if (fbq && typeof fbq === 'function') fbq("track", "Purchase", { value: price, currency: "USD" });
          if (ttq && typeof ttq.track === 'function') ttq.track("CompletePayment", { value: price, currency: "USD" });
        }
      } catch (e) {}
    }, 1500);
  };

  const handleExpressPay = (method: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      try {
        if (typeof window !== "undefined") {
          const fbq = (window as any).fbq;
          const ttq = (window as any).ttq;
          if (fbq && typeof fbq === 'function') fbq("track", "Purchase", { value: price, currency: "USD" });
          if (ttq && typeof ttq.track === 'function') ttq.track("CompletePayment", { value: price, currency: "USD" });
        }
      } catch (e) {}
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="container section text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h1 className="section-title">Order Confirmed!</h1>
        <p className="section-sub" style={{ marginBottom: '32px' }}>
          Thank you for your purchase. We're getting your order ready to be shipped.
          You will receive an email confirmation shortly.
        </p>
        <button className="btn-primary" style={{ maxWidth: '300px', margin: '0 auto' }} onClick={() => router.push('/')}>
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="container section" style={{ maxWidth: '1000px' }}>
      <h1 className="section-title text-center" style={{ marginBottom: '40px' }}>Secure Checkout</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Left Column - Form */}
        <div style={{ flex: '1 1 minmax(280px, 500px)', minWidth: 0 }}>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', 
              gap: '12px', 
              marginBottom: '24px' 
            }}
          >
            {/* ── Authentic Shop Pay Button ── */}
            <button 
              type="button" 
              onClick={() => handleExpressPay("Shop Pay")}
              style={{ 
                width: '100%', 
                height: '44px', 
                background: '#5A31F4', 
                color: '#FFFFFF', 
                borderRadius: '6px', 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '4px', 
                cursor: 'pointer', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'opacity 0.2s'
              }}
              title="Express checkout with Shop Pay"
            >
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>shop</span>
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 400, fontSize: '1.1rem' }}>pay</span>
            </button>

            {/* ── Authentic Apple Pay Button ── */}
            <button 
              type="button" 
              onClick={() => handleExpressPay("Apple Pay")}
              style={{ 
                width: '100%', 
                height: '44px', 
                background: '#000000', 
                color: '#FFFFFF', 
                borderRadius: '6px', 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '5px', 
                cursor: 'pointer', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'opacity 0.2s'
              }}
              title="Express checkout with Apple Pay"
            >
              <svg style={{ width: '13px', height: '15px', fill: '#FFFFFF', flexShrink: 0 }} viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 500, fontSize: '1.05rem', letterSpacing: '-0.3px' }}>Pay</span>
            </button>

            {/* ── Authentic Google Pay Button ── */}
            <button 
              type="button" 
              onClick={() => handleExpressPay("Google Pay")}
              style={{ 
                width: '100%', 
                height: '44px', 
                background: '#FFFFFF', 
                color: '#3C4043', 
                borderRadius: '6px', 
                border: '1px solid #DADCE0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '6px', 
                cursor: 'pointer', 
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'background-color 0.2s'
              }}
              title="Express checkout with Google Pay"
            >
              <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 500, fontSize: '1.02rem', letterSpacing: '-0.3px', color: '#3C4043' }}>Pay</span>
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <hr style={{ flex: 1, borderColor: 'var(--border)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>OR</span>
            <hr style={{ flex: 1, borderColor: 'var(--border)' }} />
          </div>

          <form onSubmit={handlePay}>
            <h3 style={{ marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Contact Information</h3>
            <input required type="email" placeholder="Email" style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            
            <h3 style={{ margin: '24px 0 16px', fontFamily: 'var(--font-serif)' }}>Shipping Address</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <input required type="text" placeholder="First name" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <input required type="text" placeholder="Last name" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            </div>
            <input required type="text" placeholder="Address" style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <input required type="text" placeholder="City" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <input required type="text" placeholder="State" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <input required type="text" placeholder="ZIP code" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            </div>

            <h3 style={{ margin: '24px 0 16px', fontFamily: 'var(--font-serif)' }}>Payment</h3>
            <input required type="text" placeholder="Card number" style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <input required type="text" placeholder="MM / YY" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <input required type="text" placeholder="CVC" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            </div>

            <button type="submit" className="btn-primary" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay $${price.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Right Column - Summary */}
        <div style={{ flex: '1 1 300px', background: 'var(--bg-primary)', padding: '32px', borderRadius: '16px', height: 'fit-content', border: '1px solid var(--border)' }}>
          {/* Bundle Progress Bar */}
          <div style={{ marginBottom: '24px', background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '8px' }}>
              <span>🎉 FREE Shipping Unlocked!</span>
              <span style={{ color: 'var(--success)' }}>100%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'var(--success)',
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease'
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: '64px', height: '64px', border: '1px solid var(--border)', borderRadius: '8px', background: 'white' }}>
              <Image src="/product-hero.png" alt="Glo Ritual Roller" fill style={{ objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--text-primary)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                {qty}
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.875rem' }}>Glo Ritual Cold Therapy Roller</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{initialQty}-Pack Bundle</span>
              
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px', border: '1px solid var(--border)', borderRadius: '4px', width: 'fit-content', background: 'white' }}>
                <button type="button" onClick={() => setQtyMultiplier(q => Math.max(1, q - 1))} style={{ padding: '2px 8px' }}>-</button>
                <span style={{ fontSize: '0.875rem', padding: '0 8px', minWidth: '20px', textAlign: 'center' }}>{qtyMultiplier}</span>
                <button type="button" onClick={() => setQtyMultiplier(q => q + 1)} style={{ padding: '2px 8px' }}>+</button>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
              ${price.toFixed(2)}
            </div>
          </div>
          
          <hr style={{ borderColor: 'var(--border)', margin: '24px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.875rem' }}>
            <span>Subtotal</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '0.875rem' }}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <hr style={{ borderColor: 'var(--border)', margin: '24px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Total</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container section text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
