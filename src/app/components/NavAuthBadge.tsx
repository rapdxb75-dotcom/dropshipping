"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NavAuthBadge() {
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    try {
      const state = localStorage.getItem("glo_user_logged_in");
      if (state === "true") {
        setIsMember(true);
      }
    } catch (err) {}
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("glo_user_logged_in");
      setIsMember(false);
      window.location.reload();
    } catch (err) {}
  };

  // Temporarily hidden from UI per request
  return null;

  if (isMember) {
    return (
      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link 
          href="/pages/register"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(26,26,26,0.04)',
            padding: '2px 8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          ✨ Portal
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: '2px 4px',
            transition: 'color 0.2s ease'
          }}
          title="Sign out of collective"
        >
          Logout
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link href="/pages/register">Members</Link>
    </li>
  );
}
