import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavUser from '../components/NavUser';

const faqs = [
  {
    category: 'Getting Started', color: '#2f81f7', icon: '🚀',
    items: [
      { q: 'What is Built On It?', a: 'Built On It is an open-source project discovery and collaboration platform for developers. You can explore thousands of projects, share your own work, and connect with engineers worldwide.' },
      { q: 'Is Built On It free to use?', a: 'Yes! Built On It is completely free for individual developers. We offer a Pro plan for teams and enterprises that need advanced features like private repositories and analytics.' },
      { q: 'How do I create an account?', a: 'Click "Sign Up" on any page. You can create an account with your email and set up your profile in under 2 minutes.' },
      { q: 'Can I use Built On It without signing in?', a: 'Absolutely. You can browse all public projects, categories, and tutorials without an account. You only need to sign in to upload projects or bookmark content.' },
    ],
  },
  {
    category: 'Projects & Uploads', color: '#3fb950', icon: '📦',
    items: [
      { q: 'How do I upload a project?', a: 'Head to the AskDev section, click "Post Project", fill in the title, description, tech stack, and repository link. Your project will be live immediately after submission.' },
      { q: 'What kinds of projects can I share?', a: "Anything code-related! Libraries, frameworks, tools, full-stack apps, ML models, browser extensions, CLI tools — as long as it's your own work and not malicious, it's welcome." },
      { q: 'Can I keep my project private?', a: 'Private projects are available on our Pro plan. Free accounts can publish unlimited public projects.' },
      { q: 'How are projects ranked in search?', a: 'Projects are ranked by a combination of stars, recent activity, recency, and tag relevance. High-quality descriptions and complete metadata improve your ranking.' },
    ],
  },
  {
    category: 'Account & Billing', color: '#bc8cff', icon: '💳',
    items: [
      { q: 'How do I change my username?', a: 'Go to your Profile → Settings → Edit Profile. You can update your username, bio, location, and social links.' },
      { q: 'How do I cancel my Pro subscription?', a: "Go to Profile → Settings → Billing. Click \"Cancel Subscription\". You'll retain Pro features until the end of your billing period." },
      { q: 'Do you offer student or open-source discounts?', a: 'Yes! Students with a valid .edu email get Pro for free. Verified open-source maintainers with 500+ GitHub stars get 50% off. Email us at billing@builtonit.io.' },
    ],
  },
  {
    category: 'Community & Safety', color: '#e3b341', icon: '🛡️',
    items: [
      { q: 'How do I report a project or user?', a: 'Click the ⚠️ flag icon on any project card or profile, choose a reason, and submit. Our trust & safety team reviews reports within 48 hours.' },
      { q: 'What is the Built On It Code of Conduct?', a: 'We expect all community members to be respectful, constructive, and inclusive. Harassment, hate speech, spam, and the posting of malicious code are strictly prohibited.' },
      { q: 'Are my public projects indexed by search engines?', a: 'Yes. Public projects are crawlable by default. You can opt out in your project settings under Privacy → Disable search engine indexing.' },
    ],
  },
];

function FAQItem({ item, i, accentColor }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:'1px solid var(--border)', animation:`fadeIn .3s ease ${i*0.05}s both` }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:'100%', textAlign:'left', background:'none', border:'none', padding:'18px 0', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, cursor:'pointer', color:'var(--text)', fontSize:14, fontWeight:600, transition:'color .15s' }}
        onMouseEnter={e => e.currentTarget.style.color=accentColor}
        onMouseLeave={e => e.currentTarget.style.color='var(--text)'}>
        <span>{item.q}</span>
        <span style={{ fontSize:20, flexShrink:0, color:'var(--text3)', transition:'transform .25s, color .15s', transform:open?'rotate(45deg)':'none', color: open ? accentColor : 'var(--text3)' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom:18, color:'var(--text2)', fontSize:13.5, lineHeight:1.8, animation:'fadeIn .2s ease' }}>
          {item.a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...faqs.map(f => f.category)];

  const filtered = faqs.map(group => ({
    ...group,
    items: group.items.filter(item =>
      (activeCategory === 'All' || activeCategory === group.category) &&
      (search === '' || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase()))
    ),
  })).filter(g => g.items.length > 0);

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

      <main style={{ maxWidth:860, margin:'0 auto', padding:'clamp(36px,5vw,60px) clamp(16px,4vw,32px) 80px' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:48, animation:'fadeIn .5s ease' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:10, fontWeight:700, letterSpacing:2, color:'var(--blue)', background:'rgba(47,129,247,.1)', border:'1px solid rgba(47,129,247,.25)', borderRadius:20, padding:'5px 16px', marginBottom:18, textTransform:'uppercase' }}>
            ❓ Help Center
          </div>
          <h1 style={{ fontSize:'clamp(1.9rem,4vw,2.8rem)', fontWeight:900, letterSpacing:-1, marginBottom:14 }}>Frequently Asked Questions</h1>
          <p style={{ color:'var(--text2)', fontSize:15, lineHeight:1.7, marginBottom:28 }}>
            Can't find your answer?{' '}
            <Link to="/contact" style={{ color:'var(--blue)', textDecoration:'none', fontWeight:600 }}>Contact our team →</Link>
          </p>
          {/* Search */}
          <div style={{ position:'relative', maxWidth:500, margin:'0 auto' }}>
            <span style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'var(--text3)', fontSize:15 }}>🔍</span>
            <input className="input" placeholder="Search questions…" value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft:44, height:48, fontSize:14, borderRadius:28 }} />
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:40, justifyContent:'center' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding:'7px 18px', borderRadius:20, border:`1px solid ${activeCategory===cat ? 'var(--blue)' : 'var(--border2)'}`, background: activeCategory===cat ? 'rgba(47,129,247,.15)' : 'transparent', color: activeCategory===cat ? 'var(--blue)' : 'var(--text2)', fontSize:13, fontWeight: activeCategory===cat ? 700 : 400, cursor:'pointer', transition:'all .18s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Groups */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:8 }}>No results found</div>
            <p style={{ color:'var(--text2)', fontSize:13 }}>Try different keywords or <Link to="/contact" style={{ color:'var(--blue)' }}>ask our team</Link>.</p>
          </div>
        ) : filtered.map((group, gi) => (
          <div key={group.category} style={{ marginBottom:36, animation:`fadeIn .4s ease ${gi*0.1}s both` }}>
            {/* Group header */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:2, padding:'12px 0 8px' }}>
              <span style={{ fontSize:18 }}>{group.icon}</span>
              <div style={{ width:3, height:20, borderRadius:2, background:group.color, flexShrink:0 }} />
              <h2 style={{ fontSize:13, fontWeight:800, color:group.color, textTransform:'uppercase', letterSpacing:1 }}>{group.category}</h2>
            </div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'0 24px' }}>
              {group.items.map((item, i) => <FAQItem key={item.q} item={item} i={i} accentColor={group.color} />)}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div style={{ background:'linear-gradient(135deg,rgba(47,129,247,.07),rgba(188,140,255,.07))', border:'1px solid rgba(47,129,247,.2)', borderRadius:16, padding:'clamp(28px,4vw,40px)', textAlign:'center', marginTop:32 }}>
          <div style={{ fontSize:36, marginBottom:14 }}>💬</div>
          <h3 style={{ fontWeight:800, fontSize:18, marginBottom:8 }}>Still have questions?</h3>
          <p style={{ color:'var(--text2)', fontSize:14, marginBottom:24, lineHeight:1.7 }}>Our support team is happy to help. Average response time: 24 hours.</p>
          <Link to="/contact" className="btn btn-primary" style={{ padding:'11px 32px' }}>Contact Support →</Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'clamp(16px,3vw,24px) clamp(16px,4vw,32px)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text2)', fontSize:13 }}>
          <div style={{ width:18, height:18, background:'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff', fontWeight:900 }}>⊞</div>
          Built On It © 2024
        </div>
        <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
          {[['Privacy','/privacy'],['Terms','/terms'],['About','/about'],['Contact','/contact']].map(([l,to]) => (
            <Link key={l} to={to} style={{ color:'var(--text2)', fontSize:13, textDecoration:'none', transition:'color .15s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text2)'}>{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
