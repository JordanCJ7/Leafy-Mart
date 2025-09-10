import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  // Read order summary from location.state or sessionStorage fallback
  let summary = location.state || null;
  if (!summary) {
    try {
      const s = sessionStorage.getItem('leafyMartPendingOrder');
      if (s) summary = JSON.parse(s);
    } catch (err) {
      console.warn('Could not read pending order from sessionStorage', err);
    }
  }
  summary = summary || { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0 };

  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState(null);

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [method, setMethod] = useState('card');

  // Luhn check for card number
  const luhnValid = (num) => {
    const s = num.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;
    for (let i = s.length - 1; i >= 0; i--) {
      let d = parseInt(s[i], 10);
      if (shouldDouble) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  // Detect card issuer
  const detectIssuer = (num) => {
    const s = num.replace(/\D/g, '');
    if (/^4/.test(s)) return 'Visa';
    if (/^5[1-5]/.test(s)) return 'Mastercard';
    if (/^3[47]/.test(s)) return 'AMEX';
    if (/^6(?:011|5)/.test(s) || /^64[4-9]/.test(s)) return 'Discover';
    return 'Card';
  };

  const validate = () => {
    if (!cardName.trim()) return 'Please enter the name on card.';
    const raw = cardNumber.replace(/\s+/g, '');
    if (!/^[0-9]{13,19}$/.test(raw)) return 'Enter a valid card number.';
    if (!luhnValid(raw)) return 'Card number failed checksum (Luhn).' ;
    if (!/^(0[1-9]|1[0-2])\/(?:[0-9]{2})$/.test(expiry)) return 'Expiry must be in MM/YY format.';
    if (!/^[0-9]{3,4}$/.test(cvv)) return 'Enter a valid CVV.';
    return null;
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: 'error', message: err });
      return;
    }

    setProcessing(true);
    setStatus(null);
    try {
      // show processing state
      await new Promise(resolve => setTimeout(resolve, 1400));

      // success flow: clear cart, show confirmation then navigate
      clearCart();
      setStatus({ type: 'success', message: 'Payment successful. Redirecting to order tracking...' });
      setTimeout(() => navigate('/order-tracking', { state: { message: 'Payment successful' } }), 900);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Payment failed. Please try again.' });
    } finally {
      setProcessing(false);
    }
  };

  // Helper: format card number display
  const formatCard = (v) => {
    const s = v.replace(/\D/g, '');
    // Grouping: Amex 4-6-5, others by 4
    if (/^3[47]/.test(s)) {
      return s.replace(/(\d{1,4})(\d{1,6})?(\d{1,5})?/,'$1 $2 $3').trim();
    }
    return s.replace(/(.{4})/g, '$1 ').trim();
  };

  const issuer = detectIssuer(cardNumber);

  return (
    <div style={{ background: '#f1faee', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: 980, margin: '2rem auto', padding: '1rem' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: 6 }}>Payment</h1>
        <p style={{ color: '#666', marginTop: 0 }}>Securely complete your purchase. We use a simulated gateway for development — no real payment is processed.</p>

        <div style={{ display: 'flex', gap: 20, marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {/* Order Summary */}
          <aside style={{ flex: '0 1 320px', background: '#fff', padding: '20px', borderRadius: 12, boxShadow: '0 6px 24px rgba(46,125,50,0.06)' }}>
            <h3 style={{ marginTop: 0, color: '#2e7d32' }}>Order Summary</h3>
            <div style={{ marginTop: 8 }}>
              {summary.items.length === 0 ? (
                <p style={{ color: '#666' }}>No items in order.</p>
              ) : (
                summary.items.map(it => (
                  <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{it.name}</div>
                      <div style={{ color: '#666', fontSize: 12 }}>{it.quantity} × {it.priceDisplay}</div>
                    </div>
                    <div style={{ fontWeight: 700 }}>LKR {(it.price * it.quantity).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12, marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#666' }}>Subtotal</span>
                <strong>LKR {summary.subtotal.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#666' }}>Shipping</span>
                <strong style={{ color: summary.shipping === 0 ? '#28a745' : '#333' }}>{summary.shipping === 0 ? 'FREE' : `LKR ${summary.shipping.toLocaleString()}`}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#666' }}>Tax</span>
                <strong>LKR {summary.tax.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '1.05rem' }}>
                <span style={{ fontWeight: 800 }}>Total</span>
                <span style={{ fontWeight: 800, color: '#2e7d32' }}>LKR {summary.total.toLocaleString()}</span>
              </div>
            </div>
          </aside>

          {/* Payment Form */}
          <section style={{ flex: '1 1 520px', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 6px 24px rgba(46,125,50,0.06)' }}>
            <h3 style={{ marginTop: 0, color: '#2e7d32' }}>Payment Method</h3>
            <form onSubmit={handlePayNow}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} />
                  <span>Credit / Debit Card</span>
                </label>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="radio" name="method" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} />
                  <span>UPI / Mobile Pay</span>
                </label>
              </div>

              {method === 'card' ? (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>Name on card</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Full name" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>Card number</label>
                    <div style={{ position: 'relative' }}>
                      <input value={formatCard(cardNumber)} onChange={e => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" maxLength={23} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} />
                      <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#666' }}>{issuer}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>Expiry (MM/YY)</label>
                      <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" maxLength={5} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} />
                    </div>
                    <div style={{ width: 120 }}>
                      <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>CVV</label>
                      <input value={cvv} onChange={e => setCvv(e.target.value)} placeholder="123" maxLength={4} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} />
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>UPI ID / Mobile</label>
                  <input placeholder="username@bank or mobile" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
                <button type="submit" disabled={processing} style={{ flex: 1, padding: '12px 16px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: processing ? 'not-allowed' : 'pointer' }}>
                  {processing ? 'Processing payment…' : `Pay LKR ${summary.total.toLocaleString()}`}
                </button>
                <button type="button" onClick={() => navigate('/cart')} disabled={processing} style={{ padding: '12px 16px', background: '#fff', color: '#333', border: '1px solid #e6e6e6', borderRadius: 8 }}>Back to Cart</button>
              </div>

              {status && (
                <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: status.type === 'success' ? '#e8f5e9' : '#ffebee', color: status.type === 'success' ? '#2e7d32' : '#c62828' }}>
                  {status.message}
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
