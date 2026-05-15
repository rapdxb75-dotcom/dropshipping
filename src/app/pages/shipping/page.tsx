export default function ShippingPage() {
  return (
    <div className="container section">
      <h1 className="section-title">Shipping Policy</h1>
      <div className="section-sub" style={{ textAlign: 'left', margin: '0' }}>
        <p><strong>1. Processing Time</strong><br/>All orders are processed within 24 hours (excluding weekends and holidays) after receiving your order confirmation email.</p>
        <br/>
        <p><strong>2. Shipping Rates & Estimates</strong><br/>We offer <strong>Free Standard Shipping</strong> (2–5 business days) on all products within the United States.</p>
        <br/>
        <p><strong>3. International Shipping</strong><br/>We currently ship to the US, Canada, UK, and Australia. International shipping times vary from 5-10 business days depending on customs.</p>
        <br/>
        <p><strong>4. Order Status</strong><br/>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
      </div>
    </div>
  );
}
