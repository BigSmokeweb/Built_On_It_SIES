import { Link } from 'react-router-dom';

const VaultIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z"/>
  </svg>
);

const sections = [
  { id: '1', title: '1. Information We Collect', content: `We collect information you provide when you create an account, upload a project, or contact support:\n\n• Name and email address\n• Username and profile information\n• Project data and descriptions\n• Payment info (processed via Stripe)\n• Usage data and log files (IP, browser type, pages visited)` },
  { id: '2', title: '2. How We Use Your Information', content: `We use collected information to:\n\n• Operate and improve Built On It\n• Personalize your experience\n• Send transactional emails (account updates, security alerts)\n• With consent, send newsletters\n• Comply with legal obligations\n\nWe never sell your personal data.` },
  { id: '3', title: '3. Data Sharing', content: `We may share data with:\n\n• Service providers (hosting, analytics, payments) under confidentiality\n• Law enforcement when legally required\n• Other users — only what you've made public (profile, projects)\n\nWe do not sell data to advertisers.` },
  { id: '4', title: '4. Cookies & Tracking', content: `We use cookies to keep you logged in, remember preferences, and understand platform usage via privacy-respecting analytics. You can disable cookies in browser settings.` },
  { id: '5', title: '5. Data Retention', content: `Data is retained while your account is active. On deletion:\n\n• Profile removed within 30 days\n• Public project data may persist anonymised\n• Backups purged within 90 days\n\nRequest deletion: privacy@devvault.io` },
  { id: '6', title: '6. Your Rights', content: `You may have the right to access, correct, or delete your data, restrict processing, and data portability. Contact privacy@devvault.io to exercise these rights.` },
  { id: '7', title: '7. Security', content: `All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We conduct regular security audits and maintain a responsible disclosure program at devvault.io/security.` },
  { id: '8', title: '8. Contact', content: `Questions? Email: privacy@devvault.io\nAddress: Built On It Inc., Bangalore, Karnataka, India 560001` },
];

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ height: 57, background: 'rgba(13,17,23,.97)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16, position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><VaultIcon /></div>
          Built On It
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>← Back to Home</Link>
          <Link to="/profile"><div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', border: '2px solid var(--border2)' }}>MS</div></Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 32px 80px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40, alignItems: 'start' }}>
        <nav style={{ position: 'sticky', top: 77, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>Contents</div>
          {sections.map(s => (
            <a key={s.id} href={`#s${s.id}`} style={{ display: 'block', fontSize: 11, color: 'var(--text2)', textDecoration: 'none', padding: '4px 8px', borderRadius: 5, marginBottom: 2, lineHeight: 1.4, transition: 'all .15s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}>
              {s.title}
            </a>
          ))}
        </nav>

        <main style={{ animation: 'fadeIn .5s ease' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--blue)', background: 'rgba(47,129,247,.1)', border: '1px solid rgba(47,129,247,.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 16, textTransform: 'uppercase' }}>🔐 Legal</div>
            <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>Privacy Policy</h1>
            <p style={{ color: 'var(--text2)', fontSize: 13 }}>Last updated: <strong style={{ color: 'var(--text)' }}>March 20, 2024</strong></p>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>At Built On It, your privacy is fundamental. This policy explains what data we collect, how we use it, and what choices you have.</p>
          </div>

          {sections.map((s, i) => (
            <div key={s.id} id={`s${s.id}`} style={{ marginBottom: 36, animation: `fadeIn .4s ease ${i * 0.04}s both` }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>{s.title}</h2>
              <p style={{ color: 'var(--text2)', fontSize: 13.5, lineHeight: 1.85, whiteSpace: 'pre-line' }}>{s.content}</p>
            </div>
          ))}

          <div style={{ background: 'rgba(47,129,247,.06)', border: '1px solid rgba(47,129,247,.2)', borderRadius: 12, padding: '18px 22px' }}>
            <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7 }}>
              Questions? Email <a href="mailto:privacy@devvault.io" style={{ color: 'var(--blue)' }}>privacy@devvault.io</a> or visit our <Link to="/contact" style={{ color: 'var(--blue)' }}>Contact page</Link>.
            </p>
          </div>
        </main>
      </div>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
          <div style={{ width: 18, height: 18, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><VaultIcon /></div>
          Built On It © 2024
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['Terms', '/terms'], ['FAQ', '/faq'], ['About', '/about'], ['Contact', '/contact']].map(([l, to]) => (
            <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
