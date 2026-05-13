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
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <button style={{ flex: 1, padding: '12px', background: '#5a31f4', color: 'white', borderRadius: '8px', fontWeight: 'bold' }}>Shop Pay</button>
            <button style={{ flex: 1, padding: '12px', background: '#000', color: 'white', borderRadius: '8px', fontWeight: 'bold' }}>Apple Pay</button>
            <button style={{ flex: 1, padding: '12px', background: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '8px', fontWeight: 'bold' }}>Google Pay</button>
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
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input required type="text" placeholder="City" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <input required type="text" placeholder="State" style={{ width: '100px', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <input required type="text" placeholder="ZIP code" style={{ width: '120px', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }} />
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
              <span>{qty >= 2 ? "🎉 FREE Shipping Unlocked!" : "Add 1 more item to unlock FREE Shipping!"}</span>
              <span style={{ color: qty >= 2 ? 'var(--success)' : 'var(--text-muted)' }}>{qty >= 2 ? "100%" : "50%"}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: qty >= 2 ? '100%' : '50%', 
                  height: '100%', 
                  background: qty >= 2 ? 'var(--success)' : 'var(--text-primary)',
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
            <span>{qty >= 2 ? "Free" : "$4.99"}</span>
          </div>
          
          <hr style={{ borderColor: 'var(--border)', margin: '24px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Total</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              ${(price + (qty >= 2 ? 0 : 4.99)).toFixed(2)}
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
