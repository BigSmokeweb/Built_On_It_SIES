import { Link } from 'react-router-dom';

const VaultIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z" />
  </svg>
);

const stats = [
  { n: '12,400+', l: 'Developers' },
  { n: '3,800+', l: 'Projects' },
  { n: '96', l: 'Countries' },
  { n: '4.9★', l: 'Rating' },
];

const team = [
  { name: 'Milind Sahu', role: 'Founder & Frontend Developer', initials: 'MS', gradient: 'linear-gradient(135deg,#2f81f7,#bc8cff)' },
  { name: 'Keshav Sharma', role: 'Backend Engineer', initials: 'KS', gradient: 'linear-gradient(135deg,#3fb950,#00bcd4)' },
  { name: 'Revant Ganesh', role: 'UI/UX Designer', initials: 'RG', gradient: 'linear-gradient(135deg,#e3b341,#f85149)' },
  { name: 'Soham Puri', role: 'Frontend Developer', initials: 'SP', gradient: 'linear-gradient(135deg,#bc8cff,#f472b6)' },
];

const values = [
  { icon: '🚀', title: 'Open by Default', desc: 'We believe great software is built in the open. Every tool we ship is designed with the open-source community first.' },
  { icon: '🔐', title: 'Security First', desc: 'Developer trust is sacred. We never compromise on privacy or security, for users or their projects.' },
  { icon: '🌍', title: 'Built for Everyone', desc: 'Built On It is for every developer — from the student shipping their first project to the staff engineer at a Fortune 500.' },
  { icon: '⚡', title: 'Speed Matters', desc: 'Developer time is precious. We obsess over performance so you can find, share, and ship faster.' },
];

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* NAV */}
      <nav style={{ height: 57, background: 'rgba(13,17,23,.97)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16, position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', animation: 'slideDown .4s ease' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><VaultIcon /></div>
          Built On It
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none', transition: 'color .15s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>← Back to Home</Link>
          <Link to="/profile">
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', border: '2px solid var(--border2)' }}>MS</div>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '80px 32px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(47,129,247,.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto', animation: 'fadeIn .5s ease' }}>
          <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--blue)', background: 'rgba(47,129,247,.1)', border: '1px solid rgba(47,129,247,.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 20, textTransform: 'uppercase' }}>
            ⊞ About Built On It
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20, color: 'var(--text)' }}>
            Built by developers,<br />
            <span style={{ color: 'var(--blue)' }}>for developers</span>
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            Built On It is the definitive platform for discovering, sharing, and collaborating on developer projects. We exist because great code deserves to be found.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, animation: 'fadeIn .5s ease .1s both' }}>
          {stats.map(s => (
            <div key={s.l} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--blue)', marginBottom: 6 }}>{s.n}</div>
              <div style={{ color: 'var(--text2)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 72px', animation: 'fadeIn .5s ease .15s both' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '40px 44px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: 'var(--blue)', textTransform: 'uppercase', marginBottom: 14 }}>Our Mission</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>Make every developer's work discoverable and shareable</h2>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.85 }}>
            We started Built On It because we were tired of great projects dying in obscurity. Whether you're building a CLI tool, a machine learning library, or a full-stack app — your work deserves an audience. Built On It gives every project a home, a community, and the visibility it deserves.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 72px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>What we believe in</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {values.map((v, i) => (
            <div key={v.title} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 26px', animation: `fadeIn .4s ease ${i * 0.08}s both` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{v.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{v.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 80px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Meet the team</h2>
        <p style={{ color: 'var(--text2)', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>The people behind Built On It</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {team.map((m, i) => (
            <div key={m.name} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 16px', textAlign: 'center', animation: `fadeIn .4s ease ${i * 0.08}s both` }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: m.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 auto 14px', border: '3px solid var(--border2)' }}>{m.initials}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.name}</div>
              <div style={{ color: 'var(--text2)', fontSize: 11 }}>{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 80px', textAlign: 'center', animation: 'fadeIn .4s ease .3s both' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(47,129,247,.08), rgba(188,140,255,.08))', border: '1px solid rgba(47,129,247,.2)', borderRadius: 16, padding: '48px 40px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 12 }}>Ready to join us?</h2>
          <p style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>Explore thousands of open-source projects or share your own with the Built On It community.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/explore" className="btn btn-primary btn-lg">Explore Projects →</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
          <div style={{ width: 18, height: 18, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><VaultIcon /></div>
          Built On It © 2024
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['FAQ', '/faq'], ['Contact', '/contact']].map(([l, to]) => (
            <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none', transition: 'color .15s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
