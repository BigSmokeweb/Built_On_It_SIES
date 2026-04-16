import { Link } from 'react-router-dom';
import NavUser from '../components/NavUser';

const sections = [
  { id:'1', title:'Acceptance of Terms', icon:'✅', content:'By accessing or using Built On It, you agree to be bound by these Terms. If you do not agree, please do not use the platform. These Terms apply to all visitors, users, and others who access the platform.' },
  { id:'2', title:'User Accounts', icon:'👤', content:'You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. Notify us immediately at security@builtonit.io of any unauthorised use.' },
  { id:'3', title:'Content & Projects', icon:'📦', content:`You retain ownership of all content you submit. By posting on Built On It you grant us a limited licence to display and distribute it on the platform.\n\nYou may not post:\n• Malicious code, malware, or exploits\n• Content that violates intellectual property rights\n• Spam, misleading, or fraudulent content\n• Content that violates our Community Guidelines` },
  { id:'4', title:'Prohibited Conduct', icon:'⛔', content:`You agree not to:\n\n• Attempt to gain unauthorised access to any part of the platform\n• Scrape, crawl, or harvest user data without permission\n• Impersonate other users or entities\n• Use Built On It for any illegal or harmful purpose\n• Circumvent rate limits or abuse our API` },
  { id:'5', title:'Intellectual Property', icon:'🏛️', content:'All trademarks, logos, and service marks displayed on Built On It are property of Built On It or their respective owners. Content submitted by users remains the property of the user under their chosen licence.' },
  { id:'6', title:'Disclaimer of Warranties', icon:'⚠️', content:'Built On It is provided "as is" without warranties of any kind, expressed or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of harmful components.' },
  { id:'7', title:'Limitation of Liability', icon:'🛡️', content:'To the maximum extent permitted by law, Built On It shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform.' },
  { id:'8', title:'Termination', icon:'🚫', content:'We reserve the right to suspend or terminate your account at any time for violation of these Terms or our Community Guidelines. You may delete your account at any time through Settings → Danger Zone.' },
  { id:'9', title:'Changes to Terms', icon:'📝', content:'We may update these Terms from time to time. We will notify you of significant changes by email or a prominent notice on the platform. Continued use after changes constitutes acceptance.' },
  { id:'10', title:'Governing Law', icon:'⚖️', content:'These Terms are governed by and construed in accordance with the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.' },
];

export default function TermsPage() {
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
      <div style={{ background:'linear-gradient(135deg,rgba(188,140,255,.07),rgba(47,129,247,.04))', borderBottom:'1px solid var(--border)', padding:'clamp(40px,6vw,72px) clamp(16px,4vw,48px) clamp(36px,5vw,60px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 50% 0%,rgba(188,140,255,.1) 0%,transparent 60%)', pointerEvents:'none' }} />
        <div style={{ position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:10, fontWeight:700, letterSpacing:2, color:'var(--purple)', background:'rgba(188,140,255,.1)', border:'1px solid rgba(188,140,255,.25)', borderRadius:20, padding:'5px 16px', marginBottom:20, textTransform:'uppercase' }}>📋 Legal</div>
          <h1 style={{ fontSize:'clamp(1.9rem,4vw,2.8rem)', fontWeight:900, letterSpacing:-1, marginBottom:12 }}>Terms of Service</h1>
          <p style={{ color:'var(--text2)', fontSize:14 }}>Last updated: <strong style={{ color:'var(--text)' }}>March 20, 2024</strong></p>
          <p style={{ color:'var(--text2)', fontSize:14.5, lineHeight:1.85, marginTop:14, maxWidth:580, margin:'14px auto 0' }}>Please read these Terms carefully before using Built On It. These terms govern your access to and use of our platform, products, and services.</p>
        </div>
      </div>

      {/* MAIN: TOC + CONTENT */}
      <div style={{ maxWidth:1040, margin:'0 auto', padding:'clamp(32px,5vw,52px) clamp(16px,4vw,32px) 80px', display:'grid', gridTemplateColumns:'clamp(160px,20%,220px) 1fr', gap:40, alignItems:'start' }} className="terms-grid">
        {/* TOC */}
        <nav style={{ position:'sticky', top:77, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'20px 16px' }}>
          <div style={{ fontSize:10, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:1.5, marginBottom:14 }}>Contents</div>
          {sections.map((s, i) => (
            <a key={s.id} href={`#t${s.id}`} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--text2)', textDecoration:'none', padding:'6px 8px', borderRadius:6, marginBottom:2, lineHeight:1.4, transition:'all .15s' }}
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
            <div key={s.id} id={`t${s.id}`} style={{ marginBottom:40, scrollMarginTop:80, animation:`fadeIn .4s ease ${i*0.04}s both` }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:12, borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:20 }}>{s.icon}</span>
                <h2 style={{ fontSize:'1rem', fontWeight:800, color:'var(--text)', margin:0 }}>{i+1}. {s.title}</h2>
              </div>
              <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.9, whiteSpace:'pre-line' }}>{s.content}</p>
            </div>
          ))}

          {/* Info box */}
          <div style={{ background:'rgba(188,140,255,.07)', border:'1px solid rgba(188,140,255,.2)', borderRadius:12, padding:'20px 24px' }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:8, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>⚖️ Legal questions?</div>
            <p style={{ color:'var(--text2)', fontSize:13.5, lineHeight:1.75, margin:0 }}>
              Email <a href="mailto:legal@builtonit.io" style={{ color:'var(--purple)', textDecoration:'none', fontWeight:600 }}>legal@builtonit.io</a> or visit our <Link to="/contact" style={{ color:'var(--purple)', textDecoration:'none', fontWeight:600 }}>Contact page</Link>.
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
          {[['Privacy','/privacy'],['FAQ','/faq'],['About','/about'],['Contact','/contact']].map(([l,to]) => (
            <Link key={l} to={to} style={{ color:'var(--text2)', fontSize:13, textDecoration:'none', transition:'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>

      <style>{`
        @media(max-width:640px) {
          .terms-grid { grid-template-columns: 1fr !important; }
          .terms-grid > nav { position:static !important; }
        }
      `}</style>
    </div>
  );
}
