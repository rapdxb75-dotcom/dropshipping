"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MemberPortalPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const router = useRouter();

  // Signup State
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
  });

  // Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem("glo_user_logged_in") === "true") {
        setIsLoggedIn(true);
      }
    } catch (err) {}
  }, []);

  const handleLogoutAction = () => {
    try {
      localStorage.removeItem("glo_user_logged_in");
      setIsLoggedIn(false);
      setToastMsg("🔓 You have successfully signed out of the collective session.");
    } catch (err) {}
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Triggered on Sign In
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMsg("");
    setErrorMsg("");

    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_WEBHOOK_URL || "https://n8n-production-0558.up.railway.app/webhook-test/web-login-member";

    try {
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      let resData: any = null;
      try {
        resData = await res.json();
      } catch (err) {}

      if (!res.ok) {
        throw new Error(resData?.message || `Authentication relay rejected with code ${res.status}. Please check parameters.`);
      }

      setToastMsg("✨ Relay credentials authenticated! Directing to master collective drop UI...");
      try {
        localStorage.setItem("glo_user_logged_in", "true");
      } catch (err) {}

      setTimeout(() => {
        router.push("/");
      }, 1200);

    } catch (err: any) {
      console.error("Login Webhook Error:", err);
      setErrorMsg(err.message || "Failed to establish secure login relay connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Triggered on Create Account
  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMsg("");
    setErrorMsg("");

    const webhookUrl = process.env.NEXT_PUBLIC_REGISTER_WEBHOOK_URL || "https://n8n-production-0558.up.railway.app/webhook-test/web-register-member";

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      let resData: any = null;
      try {
        resData = await res.json();
      } catch (err) {}

      if (!res.ok) {
        throw new Error(resData?.message || `Webhook verification failed with status code ${res.status}.`);
      }

      setToastMsg("🎉 Provisioning complete! Automatically directing you to collective drops...");
      try {
        localStorage.setItem("glo_user_logged_in", "true");
      } catch (err) {}

      setSignupData({ fullName: "", email: "", userName: "", password: "" });
      
      // Auto-redirect to home view as authenticated user
      setTimeout(() => {
        router.push("/");
      }, 1400);

    } catch (err: any) {
      console.error("Webhook Relay Error:", err);
      setErrorMsg(err.message || "Failed to establish secure webhook relay connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container section text-center" style={{ maxWidth: '560px', minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      
      {/* ── Floating Toast Notification ── */}
      {toastMsg && (
        <div 
          style={{
            position: 'fixed',
            top: '32px',
            right: '32px',
            background: 'var(--text-primary)',
            color: 'var(--white)',
            padding: '16px 24px',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.9rem',
            fontWeight: 600,
            zIndex: 99999,
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>✨</span>
          <span>{toastMsg}</span>
        </div>
      )}

      <div style={{ background: 'var(--white)', padding: '48px 40px', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(26,26,26,0.04)', textAlign: 'left' }}>
        
        {isLoggedIn ? (
          /* LOGGED IN ACCOUNT VIEW */
          <div className="text-center" style={{ padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--text-primary)', color: 'var(--white)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px' }}>
              ✦
            </div>
            <p className="section-label" style={{ display: 'block', marginBottom: '4px' }}>Active Membership</p>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Welcome, Ritual Member
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '380px', margin: '0 auto 32px' }}>
              Your session state is authenticated. You possess ongoing tiered bundle drop privileges and guaranteed express dispatch priority.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px', margin: '0 auto' }}>
              <Link href="/" className="btn-primary" style={{ padding: '14px 24px', display: 'block' }}>
                Explore Drop Grid →
              </Link>
              <button
                type="button"
                onClick={handleLogoutAction}
                style={{
                  padding: '14px 24px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: '#d32f2f',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Sign Out / Logout
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD LOGIN / SIGNUP TABS */
          <>
        
        {/* Header Titles */}
        <p className="section-label text-center" style={{ display: 'block' }}>Member Collective</p>
        <h1 className="section-title text-center" style={{ fontSize: '2rem', marginBottom: '8px' }}>
          {isLoginMode ? "Welcome Back" : "Join the Ritual"}
        </h1>
        <p className="text-center" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
          {isLoginMode 
            ? "Access your pre-drop bundles and loyalty upgrade settings." 
            : "Register to unlock exclusive access to ongoing pre-drop bundles."}
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-primary)', padding: '6px', borderRadius: '16px', marginBottom: '32px', border: '1px solid var(--border)' }}>
          <button
            type="button"
            onClick={() => { setIsLoginMode(true); setToastMsg(""); setErrorMsg(""); }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.875rem',
              background: isLoginMode ? 'var(--white)' : 'transparent',
              color: isLoginMode ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: isLoginMode ? '0 4px 12px rgba(26,26,26,0.06)' : 'none',
              transition: 'all 0.2s ease',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginMode(false); setToastMsg(""); setErrorMsg(""); }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.875rem',
              background: !isLoginMode ? 'var(--white)' : 'transparent',
              color: !isLoginMode ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: !isLoginMode ? '0 4px 12px rgba(26,26,26,0.06)' : 'none',
              transition: 'all 0.2s ease',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </div>

        {/* ── Form Views ── */}
        {isLoginMode ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="e.g. jane.doe@gloritual.store"
                value={loginData.email}
                onChange={handleLoginChange}
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Password
                </label>
                <Link href="/pages/contact" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>
                  Forgot?
                </Link>
              </div>
              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleLoginChange}
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
              />
            </div>

            {errorMsg && (
              <div style={{ padding: '14px 18px', borderRadius: '12px', background: 'rgba(229, 57, 53, 0.08)', color: '#e53935', fontSize: '0.875rem', fontWeight: 500, border: '1px solid rgba(229, 57, 53, 0.2)', marginTop: '4px' }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{ marginTop: '8px', padding: '16px 32px' }}
            >
              {isSubmitting ? "Authenticating Relay..." : "Sign In"}
            </button>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full Name
              </label>
              <input
                required
                type="text"
                name="fullName"
                placeholder="e.g. Jane Doe"
                value={signupData.fullName}
                onChange={handleSignupChange}
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="e.g. jane.doe@gloritual.store"
                value={signupData.email}
                onChange={handleSignupChange}
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Username
              </label>
              <input
                required
                type="text"
                name="userName"
                placeholder="e.g. janedoe_wellness"
                value={signupData.userName}
                onChange={handleSignupChange}
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                value={signupData.password}
                onChange={handleSignupChange}
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
              />
            </div>

            {errorMsg && (
              <div style={{ padding: '14px 18px', borderRadius: '12px', background: 'rgba(229, 57, 53, 0.08)', color: '#e53935', fontSize: '0.875rem', fontWeight: 500, border: '1px solid rgba(229, 57, 53, 0.2)', marginTop: '4px' }}>
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{ marginTop: '8px', padding: '16px 32px' }}
            >
              {isSubmitting ? "Provisioning Membership..." : "Create Account"}
            </button>
          </form>
        )}

        {/* Footer Guidance */}
        <div className="text-center" style={{ marginTop: '28px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Secure relay desk operations managed by <strong style={{ color: 'var(--text-primary)' }}>Glo Ritual Core</strong>.
        </div>
        </>
        )}
      </div>
    </div>
  );
}
