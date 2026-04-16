import { Link } from 'react-router-dom';
import NavUser from '../components/NavUser';

const sections = [
  { id:'1', title:'Information We Collect', icon:'📋', content:`We collect information you provide when you create an account, upload a project, or contact support:\n\n• Name and email address\n• Username and profile information\n• Project data and descriptions\n• Payment info (processed via Stripe)\n• Usage data and log files (IP, browser type, pages visited)` },
  { id:'2', title:'How We Use Your Information', icon:'⚙️', content:`We use collected information to:\n\n• Operate and improve Built On It\n• Personalise your experience\n• Send transactional emails (account updates, security alerts)\n• With consent, send newsletters\n• Comply with legal obligations\n\nWe never sell your personal data.` },
  { id:'3', title:'Data Sharing', icon:'🔗', content:`We may share data with:\n\n• Service providers (hosting, analytics, payments) under confidentiality\n• Law enforcement when legally required\n• Other users — only what you've made public (profile, projects)\n\nWe do not sell data to advertisers.` },
  { id:'4', title:'Cookies & Tracking', icon:'🍪', content:`We use cookies to keep you logged in, remember preferences, and understand platform usage via privacy-respecting analytics (no third-party ad tracking). You can disable cookies in browser settings.` },
  { id:'5', title:'Data Retention', icon:'🗄️', content:`Data is retained while your account is active. On deletion:\n\n• Profile removed within 30 days\n• Public project data may persist anonymised\n• Backups purged within 90 days\n\nRequest deletion: privacy@builtonit.io` },
  { id:'6', title:'Your Rights', icon:'⚖️', content:`You may have the right to access, correct, or delete your data, restrict processing, and data portability. Contact privacy@builtonit.io to exercise these rights. We respond within 30 days.` },
  { id:'7', title:'Security', icon:'🔒', content:`All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We conduct regular security audits and maintain a responsible disclosure programme at builtonit.io/security.` },
  { id:'8', title:'Contact', icon:'📬', content:`Questions? Email: privacy@builtonit.io\nAddress: Built On It, Bangalore, Karnataka, India 560001` },
];

export default function PrivacyPage() {
  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh', fontFamily:"'Inter',sans-serif" }}>

      {/* NAV */}
      <nav style={{ height:57, background:'rgba(13,17,23,.97)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 clamp(14px,3vw,32px)', gap:16, position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)', animation:'slideDown .4s ease' }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:800, fontSize:15, color:'var(--text)', textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:28, height:28, background:'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#fff', fontWeight:900 }}>⊞</div>
          Built On It
        </Link>
        <div style={{ marginLeft:'auto', display:'flex', gap:12, alignItems:'center' }}>
          <Link to="/" style={{ color:'var(--text2)', fontSize:13, textDecoration:'none', fontWeight:500 }}
            onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color='var(--text2)'}>← Home</Link>
          <NavUser />
        </div>
      </nav>

      {/* HERO STRIP */}
      <div style={{ background:'linear-gradient(135deg,rgba(47,129,247,.07),rgba(188,140,255,.04))', borderBottom:'1px solid var(--border)', padding:'clamp(40px,6vw,72px) clamp(16px,4vw,48px) clamp(36px,5vw,60px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 50% 0%,rgba(47,129,247,.1) 0%,transparent 60%)', pointerEvents:'none' }} />
        <div style={{ position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:10, fontWeight:700, letterSpacing:2, color:'var(--blue)', background:'rgba(47,129,247,.1)', border:'1px solid rgba(47,129,247,.25)', borderRadius:20, padding:'5px 16px', marginBottom:20, textTransform:'uppercase' }}>🔐 Legal</div>
          <h1 style={{ fontSize:'clamp(1.9rem,4vw,2.8rem)', fontWeight:900, letterSpacing:-1, marginBottom:12 }}>Privacy Policy</h1>
          <p style={{ color:'var(--text2)', fontSize:14 }}>Last updated: <strong style={{ color:'var(--text)' }}>March 20, 2024</strong></p>
          <p style={{ color:'var(--text2)', fontSize:14.5, lineHeight:1.85, marginTop:14, maxWidth:580, margin:'14px auto 0' }}>At Built On It, your privacy is fundamental. This policy explains what data we collect, how we use it, and what choices you have.</p>
        </div>
      </div>

      {/* MAIN: TOC + CONTENT */}
      <div style={{ maxWidth:1040, margin:'0 auto', padding:'clamp(32px,5vw,52px) clamp(16px,4vw,32px) 80px', display:'grid', gridTemplateColumns:'clamp(160px,20%,220px) 1fr', gap:40, alignItems:'start' }} className="privacy-grid">
        {/* TOC */}
        <nav style={{ position:'sticky', top:77, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'20px 16px' }}>
          <div style={{ fontSize:10, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:1.5, marginBottom:14 }}>Contents</div>
          {sections.map((s, i) => (
            <a key={s.id} href={`#s${s.id}`} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--text2)', textDecoration:'none', padding:'6px 8px', borderRadius:6, marginBottom:2, lineHeight:1.4, transition:'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.background='var(--bg4)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.background='none'; }}>
              <span style={{ fontSize:13 }}>{s.icon}</span>
              <span>{i+1}. {s.title}</span>
            </a>
          ))}
        </nav>

        {/* Content */}
        <main style={{ animation:'fadeIn .5s ease', minWidth:0 }}>
          {sections.map((s, i) => (
            <div key={s.id} id={`s${s.id}`} style={{ marginBottom:40, scrollMarginTop:80, animation:`fadeIn .4s ease ${i*0.04}s both` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:12, borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:20 }}>{s.icon}</span>
                <h2 style={{ fontSize:'1rem', fontWeight:800, color:'var(--text)', margin:0 }}>{i+1}. {s.title}</h2>
              </div>
              <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.9, whiteSpace:'pre-line' }}>{s.content}</p>
            </div>
          ))}

          {/* Info box */}
          <div style={{ background:'rgba(47,129,247,.07)', border:'1px solid rgba(47,129,247,.2)', borderRadius:12, padding:'20px 24px' }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:8, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>📬 Questions about your privacy?</div>
            <p style={{ color:'var(--text2)', fontSize:13.5, lineHeight:1.75, margin:0 }}>
              Email <a href="mailto:privacy@builtonit.io" style={{ color:'var(--blue)', textDecoration:'none', fontWeight:600 }}>privacy@builtonit.io</a> or visit our <Link to="/contact" style={{ color:'var(--blue)', textDecoration:'none', fontWeight:600 }}>Contact page</Link>. We respond within 30 days.
            </p>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'clamp(16px,3vw,24px) clamp(16px,4vw,32px)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text2)', fontSize:13 }}>
          <div style={{ width:18, height:18, background:'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff', fontWeight:900 }}>⊞</div>
          Built On It © 2024
        </div>
        <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
          {[['Terms','/terms'],['FAQ','/faq'],['About','/about'],['Contact','/contact']].map(([l,to]) => (
            <Link key={l} to={to} style={{ color:'var(--text2)', fontSize:13, textDecoration:'none', transition:'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>

      <style>{`
        @media(max-width:640px) {
          .privacy-grid { grid-template-columns: 1fr !important; }
          .privacy-grid > nav { position:static !important; }
        }
      `}</style>
    </div>
  );
}
