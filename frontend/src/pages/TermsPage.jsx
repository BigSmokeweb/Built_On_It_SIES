import { Link } from 'react-router-dom';

const VaultIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z"/>
  </svg>
);

const sections = [
  { id: '1', title: '1. Acceptance of Terms', content: 'By accessing or using Built On It, you agree to be bound by these Terms. If you do not agree, please do not use the platform. These Terms apply to all visitors, users, and others who access the platform.' },
  { id: '2', title: '2. User Accounts', content: 'You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. Notify us immediately at security@devvault.io of any unauthorized use.' },
  { id: '3', title: '3. Content & Projects', content: `You retain ownership of all content you submit. By posting on Built On It you grant us a limited licence to display and distribute it on the platform.\n\nYou may not post:\n• Malicious code, malware, or exploits\n• Content that violates intellectual property rights\n• Spam, misleading, or fraudulent content\n• Content that violates our Community Guidelines` },
  { id: '4', title: '4. Prohibited Conduct', content: `You agree not to:\n\n• Attempt to gain unauthorised access to any part of the platform\n• Scrape, crawl, or harvest user data without permission\n• Impersonate other users or entities\n• Use Built On It for any illegal or harmful purpose\n• Circumvent rate limits or abuse our API` },
  { id: '5', title: '5. Intellectual Property', content: 'All trademarks, logos, and service marks displayed on Built On It are property of Built On It Inc. or their respective owners. Content submitted by users remains the property of the user under their chosen licence.' },
  { id: '6', title: '6. Disclaimer of Warranties', content: 'Built On It is provided "as is" without warranties of any kind, expressed or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of harmful components.' },
  { id: '7', title: '7. Limitation of Liability', content: 'To the maximum extent permitted by law, Built On It shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform.' },
  { id: '8', title: '8. Termination', content: 'We reserve the right to suspend or terminate your account at any time for violation of these Terms or our Community Guidelines. You may delete your account at any time through Settings → Danger Zone.' },
  { id: '9', title: '9. Changes to Terms', content: 'We may update these Terms from time to time. We will notify you of significant changes by email or a prominent notice on the platform. Continued use after changes constitutes acceptance.' },
  { id: '10', title: '10. Governing Law', content: 'These Terms are governed by and construed in accordance with the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.' },
];

export default function TermsPage() {
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
        {/* TOC */}
        <nav style={{ position: 'sticky', top: 77, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>Contents</div>
          {sections.map(s => (
            <a key={s.id} href={`#t${s.id}`} style={{ display: 'block', fontSize: 11, color: 'var(--text2)', textDecoration: 'none', padding: '4px 8px', borderRadius: 5, marginBottom: 2, lineHeight: 1.4, transition: 'all .15s' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg4)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}>
              {s.title}
            </a>
          ))}
        </nav>

        <main style={{ animation: 'fadeIn .5s ease' }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--purple)', background: 'rgba(188,140,255,.1)', border: '1px solid rgba(188,140,255,.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 16, textTransform: 'uppercase' }}>📋 Legal</div>
            <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>Terms of Service</h1>
            <p style={{ color: 'var(--text2)', fontSize: 13 }}>Last updated: <strong style={{ color: 'var(--text)' }}>March 20, 2024</strong></p>
            <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.8, marginTop: 12 }}>Please read these Terms of Service carefully before using Built On It. These terms govern your access to and use of our platform, products, and services.</p>
          </div>

          {sections.map((s, i) => (
            <div key={s.id} id={`t${s.id}`} style={{ marginBottom: 36, animation: `fadeIn .4s ease ${i * 0.04}s both` }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>{s.title}</h2>
              <p style={{ color: 'var(--text2)', fontSize: 13.5, lineHeight: 1.85, whiteSpace: 'pre-line' }}>{s.content}</p>
            </div>
          ))}

          <div style={{ background: 'rgba(188,140,255,.06)', border: '1px solid rgba(188,140,255,.2)', borderRadius: 12, padding: '18px 22px' }}>
            <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7 }}>
              Questions? Email <a href="mailto:legal@devvault.io" style={{ color: 'var(--purple)' }}>legal@devvault.io</a> or visit our <Link to="/contact" style={{ color: 'var(--purple)' }}>Contact page</Link>.
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
          {[['Privacy', '/privacy'], ['FAQ', '/faq'], ['About', '/about'], ['Contact', '/contact']].map(([l, to]) => (
            <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
