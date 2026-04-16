import { Link } from 'react-router-dom';
import NavUser from '../components/NavUser';

const stats = [
  { n: '12,400+', l: 'Developers', icon: '👥' },
  { n: '3,800+',  l: 'Projects',   icon: '📦' },
  { n: '96',      l: 'Countries',  icon: '🌍' },
  { n: '4.9★',   l: 'Rating',     icon: '⭐' },
];

const team = [
  { name: 'Milind Sahu',   role: 'Founder & Frontend Developer', initials: 'MS', grad: 'linear-gradient(135deg,#2f81f7,#bc8cff)', tag: 'React · Node.js' },
  { name: 'Keshav Sharma', role: 'Backend Engineer',             initials: 'KS', grad: 'linear-gradient(135deg,#3fb950,#00bcd4)', tag: 'Go · Docker' },
  { name: 'Revant Ganesh', role: 'UI/UX Designer',               initials: 'RG', grad: 'linear-gradient(135deg,#e3b341,#f85149)', tag: 'Figma · Motion' },
  { name: 'Soham Puri',    role: 'Frontend Developer',           initials: 'SP', grad: 'linear-gradient(135deg,#bc8cff,#f472b6)', tag: 'React · TypeScript' },
];

const values = [
  { icon: '🚀', title: 'Open by Default',    desc: 'Great software is built in the open. Every tool we ship is designed with the open-source community first.' },
  { icon: '🔐', title: 'Security First',     desc: 'Developer trust is sacred. We never compromise on privacy or security, for users or their projects.' },
  { icon: '🌍', title: 'Built for Everyone', desc: 'From the student shipping their first project to the staff engineer at a Fortune 500 — you belong here.' },
  { icon: '⚡', title: 'Speed Matters',      desc: 'Developer time is precious. We obsess over performance so you can find, share, and ship faster.' },
];

const FOOTER_LINKS = [['Privacy','/privacy'],['Terms','/terms'],['FAQ','/faq'],['Contact','/contact']];

export default function AboutPage() {
  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh', fontFamily:"'Inter',sans-serif" }}>

      {/* NAV */}
      <nav style={{ height:57, background:'rgba(13,17,23,.97)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 clamp(14px,3vw,32px)', gap:16, position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)', animation:'slideDown .4s ease' }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:800, fontSize:15, color:'var(--text)', textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:28, height:28, background:'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:'#fff', fontWeight:900 }}>⊞</div>
          Built On It
        </Link>
        <div style={{ marginLeft:'auto', display:'flex', gap:12, alignItems:'center' }}>
          <Link to="/" style={{ color:'var(--text2)', fontSize:13, textDecoration:'none', transition:'color .15s', fontWeight:500 }}
            onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color='var(--text2)'}>← Home</Link>
          <NavUser />
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign:'center', padding:'80px clamp(16px,5vw,40px) 60px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 50% -10%, rgba(47,129,247,.15) 0%, transparent 60%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'20%', left:'5%', width:300, height:300, borderRadius:'50%', background:'rgba(188,140,255,.05)', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:700, margin:'0 auto', animation:'fadeIn .5s ease' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:10, fontWeight:700, letterSpacing:2, color:'var(--blue)', background:'rgba(47,129,247,.1)', border:'1px solid rgba(47,129,247,.25)', borderRadius:20, padding:'5px 16px', marginBottom:22, textTransform:'uppercase' }}>
            ⊞ About Built On It
          </div>
          <h1 style={{ fontSize:'clamp(2.2rem,5vw,3.4rem)', fontWeight:900, letterSpacing:-1.5, lineHeight:1.1, marginBottom:20 }}>
            Built by developers,<br />
            <span style={{ background:'linear-gradient(90deg,#2f81f7,#bc8cff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>for developers</span>
          </h1>
          <p style={{ color:'var(--text2)', fontSize:16, lineHeight:1.85, maxWidth:560, margin:'0 auto 40px' }}>
            Built On It is the definitive platform for discovering, sharing, and collaborating on developer projects. We exist because great code deserves to be found.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/explore" className="btn btn-primary btn-lg">Explore Projects →</Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 clamp(16px,4vw,32px) 72px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14, animation:'fadeIn .5s ease .1s both' }}>
          {stats.map(s => (
            <div key={s.l} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'28px 20px', textAlign:'center', transition:'border-color .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(47,129,247,.4)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--blue)', lineHeight:1, marginBottom:6 }}>{s.n}</div>
              <div style={{ color:'var(--text2)', fontSize:12, textTransform:'uppercase', letterSpacing:1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section style={{ maxWidth:820, margin:'0 auto', padding:'0 clamp(16px,4vw,32px) 72px', animation:'fadeIn .5s ease .15s both' }}>
        <div style={{ background:'linear-gradient(135deg,rgba(47,129,247,.06),rgba(188,140,255,.06))', border:'1px solid rgba(47,129,247,.2)', borderRadius:16, padding:'clamp(28px,4vw,48px) clamp(24px,5vw,52px)' }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, color:'var(--blue)', textTransform:'uppercase', marginBottom:14 }}>Our Mission</div>
          <h2 style={{ fontSize:'clamp(1.2rem,3vw,1.6rem)', fontWeight:800, marginBottom:18, lineHeight:1.3 }}>Make every developer's work discoverable and shareable</h2>
          <p style={{ color:'var(--text2)', fontSize:14.5, lineHeight:1.9 }}>
            We started Built On It because we were tired of great projects dying in obscurity. Whether you're building a CLI tool, a machine learning library, or a full-stack app — your work deserves an audience. Built On It gives every project a home, a community, and the visibility it deserves.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 clamp(16px,4vw,32px) 72px' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, color:'var(--text3)', textTransform:'uppercase', marginBottom:10 }}>What We Stand For</div>
          <h2 style={{ fontSize:'clamp(1.3rem,3vw,1.8rem)', fontWeight:800, letterSpacing:-0.5 }}>Values at our core</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16 }}>
          {values.map((v, i) => (
            <div key={v.title} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'28px 26px', animation:`fadeIn .4s ease ${i*0.08}s both`, transition:'border-color .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; }}>
              <div style={{ fontSize:32, marginBottom:14 }}>{v.icon}</div>
              <h3 style={{ fontWeight:800, fontSize:15, marginBottom:10, color:'var(--text)' }}>{v.title}</h3>
              <p style={{ color:'var(--text2)', fontSize:13.5, lineHeight:1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 clamp(16px,4vw,32px) 80px' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, color:'var(--text3)', textTransform:'uppercase', marginBottom:10 }}>The People</div>
          <h2 style={{ fontSize:'clamp(1.3rem,3vw,1.8rem)', fontWeight:800, letterSpacing:-0.5 }}>Meet the team</h2>
          <p style={{ color:'var(--text2)', fontSize:14, marginTop:8 }}>The four engineers behind Built On It</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:16 }}>
          {team.map((m, i) => (
            <div key={m.name} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:16, padding:'32px 20px', textAlign:'center', animation:`fadeIn .4s ease ${i*0.08}s both`, transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
              <div style={{ width:72, height:72, borderRadius:'50%', background:m.grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:900, color:'#fff', margin:'0 auto 16px', boxShadow:'0 4px 20px rgba(0,0,0,.3)' }}>{m.initials}</div>
              <div style={{ fontWeight:800, fontSize:15, marginBottom:5 }}>{m.name}</div>
              <div style={{ color:'var(--text2)', fontSize:12, marginBottom:10 }}>{m.role}</div>
              <div style={{ display:'inline-block', fontSize:10, fontWeight:700, color:'var(--text3)', background:'var(--bg4)', border:'1px solid var(--border)', borderRadius:6, padding:'3px 10px', letterSpacing:0.3 }}>{m.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth:700, margin:'0 auto', padding:'0 clamp(16px,4vw,32px) 80px', textAlign:'center', animation:'fadeIn .4s ease .3s both' }}>
        <div style={{ background:'linear-gradient(135deg,rgba(47,129,247,.08),rgba(188,140,255,.08))', border:'1px solid rgba(47,129,247,.2)', borderRadius:18, padding:'clamp(36px,5vw,56px) clamp(20px,4vw,48px)' }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🚀</div>
          <h2 style={{ fontSize:'clamp(1.4rem,3vw,1.8rem)', fontWeight:800, marginBottom:12, letterSpacing:-0.5 }}>Ready to join the community?</h2>
          <p style={{ color:'var(--text2)', fontSize:14.5, marginBottom:28, lineHeight:1.75 }}>Explore thousands of open-source projects or share your own with the Built On It community.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/explore" className="btn btn-primary btn-lg">Explore Projects →</Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'clamp(16px,3vw,24px) clamp(16px,4vw,32px)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text2)', fontSize:13 }}>
          <div style={{ width:18, height:18, background:'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff', fontWeight:900 }}>⊞</div>
          Built On It © 2024
        </div>
        <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
          {FOOTER_LINKS.map(([l,to]) => (
            <Link key={l} to={to} style={{ color:'var(--text2)', fontSize:13, textDecoration:'none', transition:'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
