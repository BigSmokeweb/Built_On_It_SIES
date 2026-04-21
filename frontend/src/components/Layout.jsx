import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) setSidebarOpen(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileSidebarOpen(false);
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'Inter, sans-serif', display: 'flex' }}>

      {/* ── LEFT SIDEBAR ONLY ── */}
      <Sidebar
        open={sidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Desktop sidebar toggle */}
      <div
        style={{ position: 'sticky', top: 57, alignSelf: 'flex-start', height: 0, zIndex: 50 }}
        className="resp-desktop-sidebar"
      >
        <button
          onClick={() => setSidebarOpen(o => !o)}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          style={{
            position: 'absolute', left: 0, top: 20, width: 20, height: 52,
            background: 'var(--bg2)', border: '1px solid var(--border2)', borderLeft: 'none',
            borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)',
            fontSize: 12, fontWeight: 700, transition: 'all .18s', boxShadow: '2px 0 8px rgba(0,0,0,.3)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--text2)'; }}
        >
          {sidebarOpen ? '‹' : '›'}
        </button>
      </div>

      {/* Page content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
      </div>

      <style>{`
        @media(max-width:768px){
          .resp-desktop-sidebar{display:none!important}
        }
      `}</style>
    </div>
  );
}
