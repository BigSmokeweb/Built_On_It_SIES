import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { icon: '⊞', label: 'Dashboard', to: '/' },
  { icon: '⊟', label: 'Categories', to: '/categories' },
  { icon: '📁', label: 'Projects', to: '/explore' },
  { icon: '📚', label: 'Tutorials', to: '/tutorials' },
  { icon: '⚡', label: 'Build Together', to: '/collab' },
  { icon: '🆘', label: 'AskDev', to: '/community' },
];

/* Reusable nav content — used by both Sidebar and BrowseProjects overlay */
export function SidebarContent({ onClick }) {
  const loc = useLocation();
  const [user, setUser] = useState(null);
  const isGuest = !user && !!localStorage.getItem('boi_guest');

  useEffect(() => {
    const stored = localStorage.getItem('boi_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);
  return (
    <>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px 16px', fontWeight: 800, fontSize: 15, color: 'var(--text)', borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
        <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 900 }}>⊞</div>
        Built On It
      </div>

      {/* Quick search */}
      <div style={{ padding: '0 12px', marginBottom: 8 }}>
        <input className="input" placeholder="Quick search..." style={{ height: 32, fontSize: 12 }} />
      </div>

      {/* Nav links */}
      {sidebarItems.map((item, i) => {
        const isActive = loc.pathname === item.to;
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`sidebar-item${isActive ? ' active' : ''}`}
            style={{ animationDelay: `${i * 0.06}s`, animation: 'fadeInLeft .3s ease both', textDecoration: 'none' }}
            onClick={onClick}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* Footer links */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Link to="/about" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none', padding: '5px 8px', borderRadius: 6, transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 6 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}
          onClick={onClick}>
          ℹ️ About Built On It
        </Link>
        <Link to="/faq" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none', padding: '5px 8px', borderRadius: 6, transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 6 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}
          onClick={onClick}>
          ❓ FAQ
        </Link>
        {user ? (
          <Link to="/profile" style={{ textDecoration: 'none' }} onClick={onClick}>
            <button className="btn btn-primary" style={{ width: '100%', fontSize: 13, justifyContent: 'center' }}>👤 View Profile</button>
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }} onClick={onClick}>
            <button className="btn btn-primary" style={{ width: '100%', fontSize: 13, justifyContent: 'center' }}>⬡ Sign In</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default function Sidebar({ open, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="resp-desktop-sidebar"
        style={{
          width: open ? 220 : 0,
          minHeight: '100vh',
          background: 'var(--bg)',
          borderRight: open ? '1px solid var(--border)' : 'none',
          padding: open ? '16px 0' : 0,
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          transition: 'width .35s cubic-bezier(.4,0,.2,1), padding .35s, border .35s',
          flexShrink: 0,
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 198, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Mobile Sidebar */}
      <aside style={{
        position: 'fixed', left: mobileOpen ? 0 : '-260px', top: 57, width: 240,
        height: 'calc(100vh - 57px)', background: 'var(--bg)', borderRight: '1px solid var(--border)',
        padding: '16px 0', display: 'flex', flexDirection: 'column',
        transition: 'left .3s cubic-bezier(.4,0,.2,1)', zIndex: 199,
        boxShadow: mobileOpen ? '4px 0 24px rgba(0,0,0,.5)' : 'none',
        overflow: 'hidden auto',
      }}>
        <SidebarContent onClick={onMobileClose} />
      </aside>
    </>
  );
}
