import { useState } from 'react';
import { Link } from 'react-router-dom';

const VaultIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z"/>
  </svg>
);

const channels = [
  { icon: '💬', title: 'Community Discord', desc: 'Join 8,000+ developers in our Discord. Fastest way to get help.', action: 'Join Discord', color: '#5865f2' },
  { icon: '🐛', title: 'Bug Reports', desc: 'Found a bug? Open an issue on our GitHub and we\'ll fix it fast.', action: 'Open Issue', color: '#3fb950' },
  { icon: '📧', title: 'Email Support', desc: 'For account or billing issues, reach us at support@devvault.io', action: 'Send Email', color: '#2f81f7' },
  { icon: '🐦', title: 'Twitter / X', desc: 'Follow @Built On ItHQ for updates, announcements, and tips.', action: 'Follow Us', color: '#1d9bf0' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1400);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* NAV */}
      <nav style={{ height: 57, background: 'rgba(13,17,23,.97)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16, position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', animation: 'slideDown .4s ease' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><VaultIcon /></div>
          Built On It
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>← Back to Home</Link>
          <Link to="/profile"><div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', border: '2px solid var(--border2)' }}>MS</div></Link>
        </div>
      </nav>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 32px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56, animation: 'fadeIn .5s ease' }}>
          <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--blue)', background: 'rgba(47,129,247,.1)', border: '1px solid rgba(47,129,247,.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 16, textTransform: 'uppercase' }}>📬 Get in Touch</div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, letterSpacing: -1, marginBottom: 14 }}>Contact Us</h1>
          <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>We'd love to hear from you. Reach out via any of the channels below or use the form.</p>
        </div>

        {/* Channels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 56, animation: 'fadeIn .5s ease .1s both' }}>
          {channels.map((ch, i) => (
            <div key={ch.title} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 18px', animation: `fadeIn .4s ease ${i * 0.08}s both` }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{ch.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{ch.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>{ch.desc}</p>
              <button style={{ background: 'none', border: `1px solid ${ch.color}44`, color: ch.color, fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 6, cursor: 'pointer', transition: 'all .18s' }} onMouseEnter={e => { e.currentTarget.style.background = ch.color + '22'; }} onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}>
                {ch.action} →
              </button>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, animation: 'fadeIn .5s ease .2s both' }}>
          {/* Left */}
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>Send us a message</h2>
            <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7, marginBottom: 28 }}>Fill out the form and our team will get back to you within 24 hours.</p>

            {sent ? (
              <div style={{ background: 'rgba(63,185,80,.08)', border: '1px solid rgba(63,185,80,.3)', borderRadius: 12, padding: '32px 24px', textAlign: 'center', animation: 'scaleIn .3s ease' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--green)' }}>Message sent!</h3>
                <p style={{ color: 'var(--text2)', fontSize: 13 }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} style={{ marginTop: 16, background: 'none', border: '1px solid var(--border2)', color: 'var(--text2)', fontSize: 13, padding: '6px 16px', borderRadius: 6, cursor: 'pointer' }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Name</label>
                    <input className="input" required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Email</label>
                    <input className="input" type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Subject</label>
                  <input className="input" required placeholder="What's this about?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Message</label>
                  <textarea className="input" required rows={5} placeholder="Tell us more..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start', padding: '10px 28px', fontSize: 14 }}>
                  {loading ? '⏳ Sending...' : '📨 Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right: FAQ teaser */}
          <div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 26px' }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Before you write…</h3>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>Check our FAQ — most questions are already answered there.</p>
              <Link to="/faq" className="btn btn-secondary" style={{ display: 'inline-flex', marginBottom: 24 }}>Browse FAQ →</Link>

              <div style={{ height: 1, background: 'var(--border)', margin: '4px 0 20px' }} />
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Response Times</div>
              {[['🟢 Discord', 'Under 1 hour'], ['🟡 Email', '24 hours'], ['🔵 GitHub Issues', '48 hours']].map(([ch, rt]) => (
                <div key={ch} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <span>{ch}</span>
                  <span style={{ color: 'var(--text2)' }}>{rt}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg,rgba(47,129,247,.06),rgba(188,140,255,.06))', border: '1px solid rgba(47,129,247,.15)', borderRadius: 12, padding: '20px 22px', marginTop: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>📍 Our office</div>
              <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7 }}>Built On It HQ<br />Bangalore, Karnataka<br />India 560001</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
          <div style={{ width: 18, height: 18, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><VaultIcon /></div>
          Built On It © 2024
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['FAQ', '/faq'], ['About', '/about']].map(([l, to]) => (
            <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
