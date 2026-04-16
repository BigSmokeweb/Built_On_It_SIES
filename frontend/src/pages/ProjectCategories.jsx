import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── CATEGORY DATA ─────────────────────────────────────── */
const categories = [
  {
    topic: 'Web',
    title: 'Web Development',
    desc: 'Modern frameworks including React, Next.js, Vue, and backend technologies like Node.js and Go.',
    count: 2841,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    topic: 'AI/ML',
    title: 'AI & Machine Learning',
    desc: 'Neural networks, Large Language Models, PyTorch implementations, and computer vision tools.',
    count: 1562,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    topic: 'DevOps',
    title: 'DevOps & Cloud',
    desc: 'Infrastructure as Code, Kubernetes clusters, CI/CD pipelines, and cloud-native solutions.',
    count: 987,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    topic: 'Mobile',
    title: 'Mobile App Dev',
    desc: 'Native Swift and Kotlin development alongside cross-platform Flutter and React Native projects.',
    count: 743,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    topic: 'Security',
    title: 'Cybersecurity',
    desc: 'Penetration testing scripts, cryptography libraries, and security auditing tools for modern apps.',
    count: 521,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    topic: 'Data',
    title: 'Data Science',
    desc: 'Advanced data visualization, big data processing with Spark, and statistical analysis projects.',
    count: 1103,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const trendingTags = ['#react','#rust','#tensorflow','#kubernetes','#typescript','#docker','#blockchain','#web3','#nextjs','#graphql'];

const VaultIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z"/>
  </svg>
);

/* ─── CATEGORY CARD ─────────────────────────────────────── */
function CategoryCard({ cat, i, onBrowse }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="card"
      onClick={() => onBrowse(cat.topic)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 24px',
        cursor: 'pointer',
        animation: `fadeIn .4s ease ${i * 0.08}s both`,
        border: `1px solid ${hovered ? 'rgba(47,129,247,.45)' : 'var(--border)'}`,
        transition: 'border-color .2s, transform .2s, box-shadow .2s',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 10px 36px rgba(47,129,247,.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Icon box */}
      <div style={{
        width: 48,
        height: 48,
        background: hovered ? 'rgba(47,129,247,.25)' : 'rgba(47,129,247,.12)',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2f81f7',
        marginBottom: 18,
        border: '1px solid rgba(47,129,247,.25)',
        transition: 'background .2s',
      }}>
        {cat.icon}
      </div>

      <h3 style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.3, marginBottom: 10, color: 'var(--text)' }}>
        {cat.title}
      </h3>

      <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.65, marginBottom: 20, flex: 1 }}>
        {cat.desc}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: hovered ? 8 : 5,
        color: '#2f81f7',
        fontSize: 13,
        fontWeight: 600,
        transition: 'gap .2s',
      }}>
        Browse Projects →
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────── */
export default function Categories() {
  const navigate = useNavigate();
  const goToExplore = (topic) => navigate(`/explore?topic=${encodeURIComponent(topic)}`);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP NAV ────────────────────────────────────────── */}
      <nav style={{
        height: 57,
        background: 'rgba(13,17,23,.97)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(14px,3vw,32px)',
        gap: 16,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        animation: 'slideDown .4s ease',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <VaultIcon />
          </div>
          Built On It
        </Link>

        {/* Back to Home pill */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--text2)', textDecoration: 'none',
          padding: '4px 12px', borderRadius: 20,
          border: '1px solid var(--border2)',
          background: 'var(--bg3)',
          transition: 'all .18s',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
        >
          ← Home
        </Link>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 400, position: 'relative', marginLeft: 8 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: 13 }}>🔍</span>
          <input className="input" placeholder="Search categories..." style={{ paddingLeft: 32, height: 34, borderRadius: 20 }} />
        </div>

        {/* Right */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn-icon" style={{ width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, fontSize: 16 }}>
            🔔
          </button>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', cursor: 'pointer', border: '2px solid var(--border2)' }}>MS</div>
          </Link>
        </div>
      </nav>

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '44px 36px', animation: 'fadeIn .4s ease .1s both' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 10, letterSpacing: -0.5, color: 'var(--text)' }}>
            Project Categories
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, maxWidth: 580 }}>
            Explore high-quality project repositories organized by technology stacks and specialized fields.
          </p>
        </div>

        {/* Category Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 56 }}>
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} i={i} onBrowse={goToExplore} />
          ))}
        </div>

        {/* Trending Tags */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>
            Trending Tags
          </h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {trendingTags.map((tag, i) => (
              <Link
                key={tag}
                to="/explore"
                style={{
                  fontSize: 12, padding: '5px 14px', borderRadius: 20,
                  background: 'rgba(47,129,247,.08)', color: 'var(--blue)',
                  border: '1px solid rgba(47,129,247,.22)', textDecoration: 'none',
                  fontWeight: 500, animation: `fadeIn .3s ease ${i * 0.04}s both`,
                  transition: 'background .18s, transform .15s', display: 'inline-block',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(47,129,247,.2)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(47,129,247,.08)'; e.currentTarget.style.transform = 'none'; }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
            <div style={{ width: 18, height: 18, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <VaultIcon />
            </div>
            Built On It © 2024
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[['Privacy','/privacy'],['Terms','/terms'],['About','/about'],['Contact','/contact']].map(([l,to]) => <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 13, cursor: 'pointer', transition: 'color .15s', textDecoration: 'none' }}>{l}</Link>)}
          </div>
        </footer>
      </main>
    </div>
  );
}

