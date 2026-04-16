import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/* ─── BRAND ─────────────────────────────────────────────────── */
const BRAND = 'Built On It';

/* ─── SIDEBAR NAV ──────────────────────────────────────────── */
const sidebarItems = [
  { icon: '⊞', label: 'Dashboard', active: true, to: '/' },
  { icon: '⊟', label: 'Categories', to: '/categories' },
  { icon: '📁', label: 'Projects', to: '/explore' },
  { icon: '📚', label: 'Tutorials', to: '/tutorials' },
  { icon: '⚡', label: 'Build Together', to: '/collab' },
  { icon: '🆘', label: 'AskDev', to: '/community' },
];

/* ─── FEATURES ───────────────────────────────────────────────── */
const features = [
  { icon: '⊟', label: 'Categories', desc: 'Browse projects by tech stack', to: '/categories', color: '#2f81f7', bg: 'rgba(47,129,247,.1)' },
  { icon: '📁', label: 'Explore Projects', desc: 'Discover open-source tools', to: '/explore', color: '#3fb950', bg: 'rgba(63,185,80,.1)' },
  { icon: '📚', label: 'Tutorials', desc: 'Learn from expert-crafted guides', to: '/tutorials', color: '#bc8cff', bg: 'rgba(188,140,255,.1)' },
  { icon: '⚡', label: 'Build Together', desc: 'Collaborate with developers', to: '/collab', color: '#e3b341', bg: 'rgba(227,179,65,.1)' },
  { icon: '🆘', label: 'AskDev', desc: 'Get answers from the community', to: '/community', color: '#f85149', bg: 'rgba(248,81,73,.1)' },
  { icon: '👤', label: 'Your Profile', desc: 'Showcase your work & projects', to: '/profile', color: '#00bcd4', bg: 'rgba(0,188,212,.1)' },
];

/* ─── STATS ──────────────────────────────────────────────────── */
const stats = [
  { n: '12,400+', l: 'Developers' },
  { n: '3,800+', l: 'Projects' },
  { n: '96', l: 'Countries' },
  { n: '4.9★', l: 'Community Rating' },
];

/* ─── FEATURED PROJECTS ─────────────────────────────────────── */
const featured = [
  { title: 'AuthEngine Pro', badge: 'ENTERPRISE', desc: 'High-performance authentication middleware with JWT, OAuth2 & session management.', stars: '1.2k', lang: 'TypeScript', time: '2h ago', color: '#2f81f7', emoji: '🔐' },
  { title: 'DataViz SDK', badge: 'ANALYTICS', desc: 'Real-time charting library designed for massive datasets with WebGL rendering.', stars: '850', lang: 'React', time: '5h ago', color: '#3fb950', emoji: '📊' },
  { title: 'CloudStream API', badge: 'NETWORKING', desc: 'Ultra-low latency data streaming engine with built-in auto-scaling.', stars: '2.1k', lang: 'Go', time: '12h ago', color: '#bc8cff', emoji: '☁️' },
];

/* ─── NEW ARRIVALS ──────────────────────────────────────────── */
const arrivals = [
  { icon: '🛡', title: 'Shield.js', desc: 'Runtime security layer', color: '#2f81f7' },
  { icon: '📦', title: 'SwiftStore', desc: 'KV storage engine', color: '#3fb950' },
  { icon: '🔗', title: 'MockFlow', desc: 'API prototyping tool', color: '#bc8cff' },
  { icon: '📊', title: 'Metrics.io', desc: 'Distributed tracing', color: '#e3b341' },
];

/* ─── FOOTER COLS ───────────────────────────────────────────── */
const footerCols = [
  { title: 'PLATFORM', links: [{ l: 'Explore Projects', to: '/explore' }, { l: 'Categories', to: '/categories' }, { l: 'Tutorials', to: '/tutorials' }, { l: 'Upload Project', to: '/submit' }] },
  { title: 'RESOURCES', links: [{ l: 'Tutorials', to: '/tutorials' }, { l: 'FAQ', to: '/faq' }, { l: 'Community', to: '/community' }, { l: 'Support', to: '/contact' }] },
  { title: 'COMPANY', links: [{ l: 'About Us', to: '/about' }, { l: 'Contact', to: '/contact' }, { l: 'Privacy Policy', to: '/privacy' }, { l: 'Terms of Service', to: '/terms' }] },
];

/* ─── CODE ANIMATION ─────────────────────────────────────────── */
const codeLines = [
  { text: 'builtonit --init', className: 'cmd' },
  { text: '' },
  { text: 'builtonit --create project-x', className: 'cmd' },
  { text: '' },
  { text: 'export const CoreVault = (config) => {', className: 'keyword' },
  { text: '  const [data, setData] = useState(null);', className: 'normal' },
  { text: '  useEffect(() => {', className: 'normal' },
  { text: "    fetchVault('https://api.builtonit.io/v1'", className: 'string' },
];

export default function Dashboard() {
  const [visible, setVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    setVisible(true);
    // On desktop, default sidebar open
    if (window.innerWidth > 768) setSidebarOpen(true);
    const t = setInterval(() => {
      setTypedLines(p => { if (p >= codeLines.length) { clearInterval(t); return p; } return p + 1; });
    }, 200);
    return () => clearInterval(t);
  }, []);

  // Close mobile sidebar on resize to desktop
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

  const isMobile = () => window.innerWidth <= 768;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── MOBILE SIDEBAR OVERLAY ───────────────────────────── */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 198, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* ── TOP NAV ─────────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <nav style={{
          height: navOpen ? 57 : 0, overflow: 'hidden',
          background: 'rgba(13,17,23,.97)', borderBottom: navOpen ? '1px solid var(--border)' : 'none',
          display: 'flex', alignItems: 'center', padding: navOpen ? '0 clamp(12px,3vw,20px)' : '0', gap: 10,
          backdropFilter: 'blur(12px)', transition: 'height .35s cubic-bezier(.4,0,.2,1), padding .35s',
          animation: 'slideDown .4s ease',
        }}>
          {/* Hamburger — mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileSidebarOpen(o => !o)}
            title="Toggle menu"
          >☰</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap', flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', fontWeight: 900 }}>⊞</div>
            {BRAND}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ position: 'relative', flex: 1, maxWidth: 360, minWidth: 0 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: 13 }}>🔍</span>
            <input className="input" placeholder="Search projects, devs, tutorials..." style={{ paddingLeft: 32, height: 34, borderRadius: 20 }} />
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link to="/about" style={{ color: 'var(--text2)', fontSize: 12, textDecoration: 'none', padding: '4px 10px', borderRadius: 6, transition: 'all .15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}
              className="resp-hide-480">About</Link>
            <Link to="/faq" style={{ color: 'var(--text2)', fontSize: 12, textDecoration: 'none', padding: '4px 10px', borderRadius: 6, transition: 'all .15s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}
              className="resp-hide-480">FAQ</Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <div className="avatar-placeholder" style={{ cursor: 'pointer', transition: 'box-shadow .2s, transform .2s', background: 'linear-gradient(135deg,#2f81f7,#bc8cff)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 0 2px #2f81f7'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}>MS</div>
            </Link>
          </div>
          <button onClick={() => setNavOpen(false)} title="Hide navigation"
            style={{ marginLeft: 4, width: 28, height: 28, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .18s', fontSize: 14 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg4)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text2)'; }}>↑</button>
        </nav>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: `translateX(-50%) translateY(${navOpen ? '-100%' : '0'})`, transition: 'transform .35s cubic-bezier(.4,0,.2,1)', zIndex: 101 }}>
          <button onClick={() => setNavOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 16px', background: 'rgba(13,17,23,.97)', border: '1px solid var(--border2)', borderTop: 'none', borderRadius: '0 0 10px 10px', color: 'var(--text2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,.4)', transition: 'all .18s' }}>
            <span style={{ fontSize: 11 }}>↓</span> {BRAND}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* ── SIDEBAR ─────────────────────────────────────────── */}
        <div style={{ position: 'relative', display: 'flex', flexShrink: 0 }}>
          {/* Desktop sidebar */}
          <aside style={{
            width: sidebarOpen ? 220 : 0,
            minHeight: navOpen ? 'calc(100vh - 57px)' : '100vh',
            background: 'var(--bg)', borderRight: sidebarOpen ? '1px solid var(--border)' : 'none',
            padding: sidebarOpen ? '16px 0' : 0, display: 'flex', flexDirection: 'column',
            position: 'sticky', top: navOpen ? 57 : 0, height: navOpen ? 'calc(100vh - 57px)' : '100vh',
            overflow: 'hidden', transition: 'width .35s cubic-bezier(.4,0,.2,1), padding .35s, border .35s', flexShrink: 0,
          }}
            className="resp-desktop-sidebar"
          >
            <div style={{ padding: '0 12px', marginBottom: 8 }}>
              <input className="input" placeholder="Quick search..." style={{ height: 32, fontSize: 12 }} />
            </div>
            {sidebarItems.map((item, i) => (
              <Link key={item.label} to={item.to} className={`sidebar-item ${item.active ? 'active' : ''}`} style={{ animationDelay: `${i * 0.06}s`, animation: 'fadeInLeft .3s ease both', textDecoration: 'none' }}>
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link to="/about" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none', padding: '5px 8px', borderRadius: 6, transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}>
                ℹ️ About {BRAND}
              </Link>
              <Link to="/faq" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none', padding: '5px 8px', borderRadius: 6, transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}>
                ❓ FAQ
              </Link>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <button className="btn btn-primary" style={{ width: '100%', fontSize: 13, justifyContent: 'center' }}>
                  ⬡ Sign In
                </button>
              </Link>
            </div>
          </aside>

          {/* Desktop sidebar toggle */}
          <div style={{ position: 'sticky', top: navOpen ? 57 : 0, alignSelf: 'flex-start', height: 0, transition: 'top .35s cubic-bezier(.4,0,.2,1)', zIndex: 50 }}
            className="resp-desktop-sidebar">
            <button onClick={() => setSidebarOpen(o => !o)} title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              style={{ position: 'absolute', left: 0, top: 20, width: 20, height: 52, background: 'var(--bg2)', border: '1px solid var(--border2)', borderLeft: 'none', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text2)', fontSize: 12, fontWeight: 700, transition: 'all .18s', boxShadow: '2px 0 8px rgba(0,0,0,.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg2)'; e.currentTarget.style.color = 'var(--text2)'; }}>
              {sidebarOpen ? '‹' : '›'}
            </button>
          </div>
        </div>

        {/* Mobile sidebar (slide-over) */}
        <aside style={{
          position: 'fixed', left: mobileSidebarOpen ? 0 : '-260px', top: 57, width: 240,
          height: 'calc(100vh - 57px)', background: 'var(--bg)', borderRight: '1px solid var(--border)',
          padding: '16px 0', display: 'flex', flexDirection: 'column',
          transition: 'left .3s cubic-bezier(.4,0,.2,1)', zIndex: 199,
          boxShadow: mobileSidebarOpen ? '4px 0 24px rgba(0,0,0,.5)' : 'none',
          overflow: 'hidden auto',
        }}>
          <div style={{ padding: '0 12px', marginBottom: 8 }}>
            <input className="input" placeholder="Quick search..." style={{ height: 32, fontSize: 12 }} />
          </div>
          {sidebarItems.map((item, i) => (
            <Link key={item.label} to={item.to} className={`sidebar-item ${item.active ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
              onClick={() => setMobileSidebarOpen(false)}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/profile" style={{ textDecoration: 'none' }} onClick={() => setMobileSidebarOpen(false)}>
              <button className="btn btn-primary" style={{ width: '100%', fontSize: 13, justifyContent: 'center' }}>
                ⬡ Sign In
              </button>
            </Link>
          </div>
        </aside>

        {/* ── MAIN ──────────────────────────────────────────────── */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* HERO */}
          <section style={{ padding: 'clamp(32px,5vw,64px) clamp(16px,4vw,48px) clamp(28px,4vw,48px)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(47,129,247,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(47,129,247,.04) 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -80, right: -80, width: 500, height: 500, background: 'radial-gradient(circle,rgba(47,129,247,.07),transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, left: '30%', width: 300, height: 300, background: 'radial-gradient(circle,rgba(188,140,255,.06),transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ flex: '1 1 300px', zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-20px)', transition: 'all .6s ease' }}>
              <div className="badge badge-blue" style={{ marginBottom: 20, fontSize: 10, letterSpacing: 1 }}>⚡ OPEN SOURCE INTELLIGENCE PLATFORM</div>
              <h1 style={{ fontSize: 'clamp(2rem,4.5vw,3.6rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 20, color: 'var(--text)' }}>
                Your Ultimate<br />
                <span style={{ background: 'linear-gradient(90deg,#2f81f7,#bc8cff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>Built On It</span>
                Platform
              </h1>
              <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.75, maxWidth: 400, marginBottom: 32 }}>
                Discover, share, and collaborate on developer projects. Explore categories, learn with tutorials, build together — all in one hub.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                <Link to="/explore" className="btn btn-primary btn-lg">Explore Projects →</Link>
                <Link to="/categories" className="btn btn-outline btn-lg">Browse Categories</Link>
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {stats.map(s => (
                  <div key={s.l}>
                    <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text)' }}>{s.n}</div>
                    <div style={{ color: 'var(--text3)', fontSize: 11, letterSpacing: 0.5 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code window — hidden on mobile via inline display */}
            <div style={{ flex: '1 1 340px', maxWidth: 440, zIndex: 1, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(20px)', transition: 'all .7s ease .2s', animation: visible ? 'float 4s ease-in-out infinite' : 'none' }}
              className="hero-code-panel">
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.55)' }}>
                <div style={{ background: 'var(--bg3)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                  <span style={{ color: 'var(--text3)', fontSize: 11, marginLeft: 8, fontFamily: 'JetBrains Mono, monospace' }}>builtonit --init</span>
                </div>
                <div style={{ padding: '16px 20px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.85, minHeight: 180 }}>
                  {codeLines.slice(0, typedLines).map((line, i) => (
                    <div key={i} style={{ color: line.className === 'cmd' ? '#7ee787' : line.className === 'keyword' ? '#79b8ff' : line.className === 'string' ? '#a5d6ff' : 'var(--text2)', whiteSpace: 'pre' }}>
                      {line.className === 'cmd' && <span style={{ color: '#56d364' }}>$ </span>}
                      {line.text}
                      {i === typedLines - 1 && <span style={{ animation: 'blink 1s infinite', background: 'var(--text)', width: 7, height: 14, display: 'inline-block', verticalAlign: 'middle', marginLeft: 1 }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES GRID */}
          <section style={{ padding: '0 clamp(16px,4vw,48px) clamp(32px,5vw,56px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 4 }}>Everything you need</h2>
                <p style={{ color: 'var(--text2)', fontSize: 13 }}>All the tools and features, built into one platform.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
              {features.map((f, i) => (
                <Link key={f.label} to={f.to} style={{ textDecoration: 'none', display: 'block', animation: `fadeIn .4s ease ${i * 0.07}s both` }}>
                  <div className="card" style={{ padding: '20px 22px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 14, transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '66'; e.currentTarget.style.boxShadow = `0 8px 28px ${f.color}18`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: f.bg, border: `1px solid ${f.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{f.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 4, color: 'var(--text)' }}>{f.label}</div>
                      <div style={{ color: 'var(--text2)', fontSize: 12 }}>{f.desc}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FEATURED PROJECTS */}
          <section style={{ padding: '0 clamp(16px,4vw,48px) clamp(32px,5vw,56px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 4 }}>Featured Projects</h2>
                <p style={{ color: 'var(--text2)', fontSize: 13 }}>The most popular and trending tools in our ecosystem.</p>
              </div>
              <Link to="/explore" style={{ color: 'var(--blue)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {featured.map((p, i) => (
                <Link key={p.title} to="/explore" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', animation: `fadeIn .4s ease ${i * 0.1 + 0.3}s both` }}>
                    <div style={{ height: 90, background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ width: 44, height: 44, background: p.color + '33', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `1px solid ${p.color}44` }}>{p.emoji}</div>
                      <span className="badge badge-blue" style={{ position: 'absolute', top: 10, right: 10, fontSize: 9 }}>{p.badge}</span>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 5, color: 'var(--text)' }}>{p.title}</div>
                      <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.55, marginBottom: 10 }}>{p.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11.5, color: 'var(--text3)' }}>
                        <span>⭐ {p.stars}</span>
                        <span style={{ color: 'var(--blue)' }}>{p.lang}</span>
                        <span style={{ marginLeft: 'auto' }}>🕐 {p.time}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* NEW ARRIVALS + CTA STRIP */}
          <section style={{ padding: '0 clamp(16px,4vw,48px) clamp(32px,5vw,56px)' }}>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {/* New Arrivals */}
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 16 }}>🚀</span>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>New Arrivals</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 10 }}>
                  {arrivals.map((a, i) => (
                    <div key={a.title} className="card" style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, animation: `fadeIn .4s ease ${i * 0.08 + 0.5}s both` }}>
                      <div style={{ width: 32, height: 32, background: a.color + '22', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{a.icon}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{a.title}</div>
                        <div style={{ color: 'var(--text3)', fontSize: 11 }}>{a.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div style={{ flex: '1 1 260px', maxWidth: 340 }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(47,129,247,.08), rgba(188,140,255,.08))', border: '1px solid rgba(47,129,247,.2)', borderRadius: 14, padding: 'clamp(20px,3vw,28px) 24px', height: '100%', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
                  <div style={{ fontSize: 32 }}>🌐</div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.3 }}>Join {stats[0].n} developers on {BRAND}</h3>
                  <p style={{ color: 'var(--text2)', fontSize: 12.5, lineHeight: 1.7 }}>Share your projects, discover new tools, learn from tutorials, and collaborate with the global developer community.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                    <Link to="/profile" className="btn btn-primary" style={{ justifyContent: 'center', fontSize: 13 }}>Get Started Free →</Link>
                    <Link to="/about" className="btn btn-outline" style={{ justifyContent: 'center', fontSize: 13 }}>Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ borderTop: '1px solid var(--border)', padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,48px)', background: 'var(--bg)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 28, marginBottom: 28 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, marginBottom: 12 }}>
                  <div style={{ width: 22, height: 22, background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>⊞</div>
                  {BRAND}
                </div>
                <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.7, marginBottom: 14 }}>The definitive platform for developers to discover, build, and share sophisticated projects and architectural components.</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['🌐', '📧', '💬'].map(ic => <button key={ic} className="btn-icon" style={{ fontSize: 14 }}>{ic}</button>)}
                </div>
              </div>
              {footerCols.map(col => (
                <div key={col.title}>
                  <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>{col.title}</div>
                  {col.links.map(item => (
                    <Link key={item.l} to={item.to} style={{ display: 'block', color: 'var(--text2)', fontSize: 13, marginBottom: 8, textDecoration: 'none', transition: 'color .15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>{item.l}</Link>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <span style={{ color: 'var(--text3)', fontSize: 12 }}>© 2024 {BRAND}. Crafted for the global developer community.</span>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[['Contact', '/contact'], ['FAQ', '/faq'], ['Privacy', '/privacy'], ['Terms', '/terms']].map(([l, to]) => (
                  <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 12, textDecoration: 'none', transition: 'color .15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>{l}</Link>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Hide desktop sidebar elements on mobile via style */}
      <style>{`
        @media(max-width:768px){
          .resp-desktop-sidebar{display:none!important}
          .hero-code-panel{display:none!important}
          .resp-hide-480{display:none}
        }
        @media(max-width:480px){
          .resp-hide-480{display:none!important}
        }
      `}</style>
    </div>
  );
}
