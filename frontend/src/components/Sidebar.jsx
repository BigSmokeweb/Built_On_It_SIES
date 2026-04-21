import { Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { icon: '⊞', label: 'Dashboard', to: '/' },
  { icon: '⊟', label: 'Categories', to: '/categories' },
  { icon: '📁', label: 'Projects', to: '/explore' },
  { icon: '📚', label: 'Tutorials', to: '/tutorials' },
  { icon: '⚡', label: 'Build Together', to: '/collab' },
  { icon: '🆘', label: 'AskDev', to: '/community' },
];

export default function Sidebar({ open, mobileOpen, onMobileClose }) {
  const loc = useLocation();

  const NavLinks = ({ onClick }) => (
    <>
      <div style={{ padding: '0 12px', marginBottom: 8 }}>
        <input className="input" placeholder="Quick search..." style={{ height: 32, fontSize: 12 }} />
      </div>
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
      </div>
    </>
  );

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
        <NavLinks />
      </aside>

      {/* Mobile Sidebar Overlay */}
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
        <NavLinks onClick={onMobileClose} />
      </aside>
    </>
  );
}
