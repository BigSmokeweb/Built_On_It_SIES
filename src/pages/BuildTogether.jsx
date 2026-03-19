import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Data ─────────────────────────────────────────────────────────────────────
const ROLES_NEEDED = ['Frontend','Backend','Full Stack','AI/ML','DevOps','Mobile','Designer','Tech Writer','QA/Testing'];
const STAGES = ['Idea','Early Dev','WIP','Beta','Needs Rewrite'];
const STACK_TAGS = ['React','Vue','Next.js','Node.js','Python','Go','Rust','TypeScript','PostgreSQL','MongoDB','Docker','Kubernetes','AWS','Flutter','Swift'];

const sampleProjects = [
  {
    id:'b1', title:'OpenMind — AI Study Companion', stage:'Early Dev',
    owner:'neuralweaver', avatar:'NW', avatarColor:'#bc8cff',
    description:'Building an AI-powered study tool that creates personalized quizzes, summaries, and flashcards from uploaded PDFs and YouTube links. Currently have the PDF parser done in Python. Need help with the React frontend and OpenAI integration.',
    stack:['Python','React','TypeScript','OpenAI'],
    rolesNeeded:['Frontend','Backend'],
    spotsOpen:3, applicants:12, timePosted:'1h ago',
    isFeatured:true,
  },
  {
    id:'b2', title:'DevLog — Micro-journaling for developers', stage:'WIP',
    owner:'pixel_pusher', avatar:'PP', avatarColor:'#f472b6',
    description:'A minimalist daily dev journal that auto-fills your entries from git commits, PRs, and Jira tickets. MVP is almost done. Looking for a designer to polish the UI and a DevOps engineer to set up the CI/CD pipeline on Fly.io.',
    stack:['Next.js','PostgreSQL','Prisma','Docker'],
    rolesNeeded:['Designer','DevOps'],
    spotsOpen:2, applicants:7, timePosted:'4h ago',
    isFeatured:false,
  },
  {
    id:'b3', title:'RustGuard — Real-time web application firewall', stage:'Idea',
    owner:'ferris_wheel', avatar:'FW', avatarColor:'#d29922',
    description:'A high-performance WAF written in Rust that sits in front of your web app. Idea is to use eBPF for packet inspection at kernel level. Looking for Rust systems programmers and people experienced with Linux networking.',
    stack:['Rust','eBPF','C','Linux'],
    rolesNeeded:['Backend','DevOps'],
    spotsOpen:4, applicants:5, timePosted:'1d ago',
    isFeatured:false,
  },
  {
    id:'b4', title:'CollabCode — Real-time pair programming platform', stage:'Beta',
    owner:'aviator_codes', avatar:'AC', avatarColor:'#2f81f7',
    description:'Think Google Docs but for code. Built on top of Y.js for CRDT-based real-time sync. The core editor works using Monaco. Need help building the room management system, user auth, and WebRTC voice chat integration.',
    stack:['React','Node.js','Y.js','WebRTC','PostgreSQL'],
    rolesNeeded:['Full Stack','Backend'],
    spotsOpen:2, applicants:21, timePosted:'3h ago',
    isFeatured:true,
  },
  {
    id:'b5', title:'FlowDash — No-code API pipeline builder', stage:'WIP',
    owner:'goscale_dev', avatar:'GS', avatarColor:'#3fb950',
    description:'A visual drag-and-drop tool to chain API calls, transform data, and deploy serverless workflows — without writing code. Think Zapier but self-hostable. Have the core DAG engine in Go done. Need a React frontend dev.',
    stack:['Go','React','PostgreSQL','Docker'],
    rolesNeeded:['Frontend','Designer'],
    spotsOpen:2, applicants:9, timePosted:'6h ago',
    isFeatured:false,
  },
  {
    id:'b6', title:'DocuScan AI — Invoice & receipt OCR pipeline', stage:'Early Dev',
    owner:'query_king', avatar:'QK', avatarColor:'#00bcd4',
    description:'Automated document scanning pipeline using open-source OCR models (Tesseract + LayoutLM). Extracts structured data from invoices, receipts, and forms. Looking for ML engineers to improve accuracy and a backend dev for the REST API.',
    stack:['Python','FastAPI','PyTorch','PostgreSQL'],
    rolesNeeded:['AI/ML','Backend'],
    spotsOpen:3, applicants:14, timePosted:'2d ago',
    isFeatured:false,
  },
];

const stageColors = { Idea:'#e3b341', 'Early Dev':'#2f81f7', WIP:'#bc8cff', Beta:'#3fb950', 'Needs Rewrite':'#f85149' };
const roleColors = { Frontend:'tag-blue', Backend:'tag-purple', 'Full Stack':'tag-blue', 'AI/ML':'tag-green', DevOps:'tag-orange', Mobile:'tag-blue', Designer:'tag-purple', 'Tech Writer':'tag-gray', 'QA/Testing':'tag-gray' };

// ─── Apply Modal ──────────────────────────────────────────────────────────────
function ApplyModal({ project, onClose }) {
  const [form, setForm] = useState({ role:'', message:'', github:'' });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));

  const submit = () => {
    if (!form.role || !form.message.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:24, backdropFilter:'blur(6px)', animation:'fadeIn .2s ease' }}
      onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, width:'100%', maxWidth:520, animation:'scaleIn .25s ease', boxShadow:'0 24px 80px rgba(0,0,0,.7)' }}>
        <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>Apply to Collaborate</div>
            <div style={{ color:'var(--text2)', fontSize:12 }}>on <span style={{ color:'var(--blue)' }}>{project.title}</span></div>
          </div>
          <button onClick={onClose} style={{ background:'var(--bg4)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', width:32, height:32, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>×</button>
        </div>
        <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:8 }}>Which role are you applying for? *</label>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {project.rolesNeeded.map(r => (
                <button key={r} onClick={() => set('role', r)}
                  style={{ padding:'7px 14px', borderRadius:8, border:`1px solid ${form.role===r ? 'var(--blue)' : 'var(--border)'}`, background: form.role===r ? 'rgba(47,129,247,.15)' : 'var(--bg3)', color: form.role===r ? 'var(--text)' : 'var(--text2)', cursor:'pointer', fontSize:13, fontWeight: form.role===r ? 600 : 400, transition:'all .15s' }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:8 }}>Why do you want to help? * <span style={{ color:'var(--text3)', fontWeight:400 }}>(min 50 chars)</span></label>
            <textarea className="input" rows={4} placeholder="Tell the project owner about your experience, why this project excites you, and what you can contribute..." value={form.message} onChange={e => set('message', e.target.value)} style={{ resize:'vertical', lineHeight:1.7 }} />
            <div style={{ fontSize:11, color: form.message.length < 50 ? 'var(--text3)' : 'var(--green)', marginTop:4 }}>{form.message.length} / 50 min characters</div>
          </div>
          <div>
            <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:8 }}>Your GitHub Profile URL</label>
            <input className="input" placeholder="https://github.com/yourusername" value={form.github} onChange={e => set('github', e.target.value)} />
          </div>
          {submitted && (
            <div style={{ padding:'12px 16px', background:'rgba(63,185,80,.12)', border:'1px solid rgba(63,185,80,.3)', borderRadius:8, display:'flex', alignItems:'center', gap:10, animation:'scaleIn .3s ease' }}>
              <span style={{ fontSize:18 }}>🎉</span>
              <div style={{ color:'#56d364', fontWeight:600, fontSize:13 }}>Application sent! The owner will reach out if it's a match.</div>
            </div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', paddingTop:8, borderTop:'1px solid var(--border)' }}>
            <button className="btn btn-ghost" onClick={onClose} style={{ color:'var(--text2)' }}>Cancel</button>
            <button className="btn btn-primary" onClick={submit} disabled={!form.role || form.message.length < 50 || submitted}>
              🤝 Send Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post Project Modal ───────────────────────────────────────────────────────
function PostModal({ onClose, onPost }) {
  const [form, setForm] = useState({ title:'', description:'', stage:'Idea', stack:'', roles:[] });
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));
  const toggleRole = (r) => setForm(f => ({ ...f, roles: f.roles.includes(r) ? f.roles.filter(x => x!==r) : [...f.roles, r] }));

  const submit = () => {
    setDone(true);
    onPost({
      id: 'b' + Date.now(), title: form.title, stage: form.stage,
      owner: 'you', avatar: 'ME', avatarColor: '#2f81f7',
      description: form.description,
      stack: form.stack.split(',').map(s => s.trim()).filter(Boolean),
      rolesNeeded: form.roles, spotsOpen: form.roles.length,
      applicants: 0, timePosted: 'just now', isFeatured: false,
    });
    setTimeout(onClose, 2000);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 16px', backdropFilter:'blur(6px)', overflowY:'auto', animation:'fadeIn .2s ease' }}
      onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, width:'100%', maxWidth:620, animation:'scaleIn .25s ease', boxShadow:'0 24px 80px rgba(0,0,0,.7)', marginBottom:24 }}>
        {/* Header + progress */}
        <div style={{ padding:'20px 24px 0', borderBottom:'1px solid var(--border)', paddingBottom:16, position:'sticky', top:0, background:'var(--bg2)', zIndex:10, borderRadius:'14px 14px 0 0' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <div>
              <div style={{ color:'var(--blue)', fontSize:11, fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginBottom:2 }}>STEP {step + 1} OF 2</div>
              <div style={{ fontWeight:700, fontSize:16 }}>{step === 0 ? 'Project Details' : 'Roles & Requirements'}</div>
            </div>
            <button onClick={onClose} style={{ background:'var(--bg4)', border:'1px solid var(--border)', borderRadius:8, color:'var(--text2)', width:32, height:32, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>×</button>
          </div>
          <div style={{ height:3, background:'var(--bg4)', borderRadius:2, overflow:'hidden' }}>
            <div style={{ height:'100%', background:'var(--blue)', width: step===0 ? '50%' : '100%', transition:'width .4s ease', boxShadow:'0 0 8px rgba(47,129,247,.5)', borderRadius:2 }} />
          </div>
        </div>

        <div style={{ padding:24 }}>
          {step === 0 && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:8 }}>Project Name *</label>
                <input className="input" placeholder="e.g. OpenMind — AI Study Companion" value={form.title} onChange={e => set('title', e.target.value)} />
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:8 }}>Project Stage</label>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {STAGES.map(s => (
                    <button key={s} onClick={() => set('stage', s)} style={{ padding:'6px 14px', borderRadius:8, border:`1px solid ${form.stage===s ? stageColors[s] : 'var(--border)'}`, background: form.stage===s ? stageColors[s]+'22' : 'var(--bg3)', color: form.stage===s ? stageColors[s] : 'var(--text2)', cursor:'pointer', fontSize:12, fontWeight: form.stage===s ? 600 : 400, transition:'all .15s' }}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:8 }}>Describe your project & what kind of help you need *</label>
                <textarea className="input" rows={5} placeholder="Explain what you're building, what progress you've made, what the biggest blockers are, and what kind of contributor would be ideal..." value={form.description} onChange={e => set('description', e.target.value)} style={{ resize:'vertical', lineHeight:1.7 }} />
              </div>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:8 }}>Tech Stack (comma separated)</label>
                <input className="input" placeholder="e.g. React, Node.js, PostgreSQL, Docker" value={form.stack} onChange={e => set('stack', e.target.value)} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', fontWeight:600, fontSize:13, marginBottom:10 }}>What roles are you looking for? * <span style={{ color:'var(--text3)', fontWeight:400 }}>(select all that apply)</span></label>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {ROLES_NEEDED.map(r => (
                    <button key={r} onClick={() => toggleRole(r)} style={{ padding:'8px 14px', borderRadius:8, border:`1px solid ${form.roles.includes(r) ? 'var(--blue)' : 'var(--border)'}`, background: form.roles.includes(r) ? 'rgba(47,129,247,.15)' : 'var(--bg3)', color: form.roles.includes(r) ? 'var(--text)' : 'var(--text2)', cursor:'pointer', fontSize:13, fontWeight: form.roles.includes(r) ? 600 : 400, transition:'all .15s', display:'flex', alignItems:'center', gap:6 }}>
                      {form.roles.includes(r) && <span style={{ color:'var(--blue)', fontSize:12 }}>✓</span>}
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              {done ? (
                <div style={{ padding:'16px', background:'rgba(63,185,80,.12)', border:'1px solid rgba(63,185,80,.3)', borderRadius:10, display:'flex', alignItems:'center', gap:10, animation:'scaleIn .3s ease' }}>
                  <span style={{ fontSize:22 }}>🚀</span>
                  <div>
                    <div style={{ fontWeight:700, color:'#56d364', fontSize:14 }}>Project posted!</div>
                    <div style={{ color:'var(--text2)', fontSize:12 }}>The community can now find and apply to your project.</div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div style={{ display:'flex', justifyContent:'space-between', marginTop:24, paddingTop:16, borderTop:'1px solid var(--border)' }}>
            <button className="btn btn-ghost" onClick={() => step===0 ? onClose() : setStep(0)} style={{ color:'var(--text2)' }}>{step===0 ? 'Cancel' : '← Back'}</button>
            {step === 0 ? (
              <button className="btn btn-primary" onClick={() => setStep(1)} disabled={!form.title.trim() || !form.description.trim()}>Next Step →</button>
            ) : (
              <button className="btn btn-primary btn-lg" onClick={submit} disabled={form.roles.length === 0 || done} style={{ justifyContent:'center', minWidth:160 }}>
                🚀 Post Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function CollabCard({ project, i, onApply }) {
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card" style={{ padding:0, overflow:'hidden', animation:`fadeIn .4s ease ${i * 0.07}s both`, transition:'border-color .2s, box-shadow .2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.boxShadow='none'; }}>

      {/* Featured stripe */}
      {project.isFeatured && (
        <div style={{ height:3, background:'linear-gradient(90deg,#2f81f7,#bc8cff)', borderRadius:'14px 14px 0 0' }} />
      )}

      <div style={{ padding:'20px 22px' }}>
        {/* Top row */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:8, alignItems:'center' }}>
              {project.isFeatured && <span style={{ fontSize:10, background:'linear-gradient(135deg,rgba(47,129,247,.3),rgba(188,140,255,.3))', color:'#c9d1d9', border:'1px solid rgba(188,140,255,.4)', borderRadius:4, padding:'2px 7px', fontWeight:600 }}>⭐ FEATURED</span>}
              <span style={{ fontSize:11, padding:'2px 8px', borderRadius:4, background: stageColors[project.stage]+'22', color: stageColors[project.stage], fontWeight:600, border:`1px solid ${stageColors[project.stage]}44` }}>{project.stage}</span>
              <span style={{ color:'var(--text3)', fontSize:11 }}>{project.timePosted}</span>
            </div>
            <h3 style={{ fontSize:16, fontWeight:800, letterSpacing:-0.3, lineHeight:1.3, color:'var(--text)' }}>{project.title}</h3>
          </div>
          <button onClick={() => setSaved(s => !s)} title={saved ? 'Saved' : 'Save project'}
            style={{ background:'none', border:'none', cursor:'pointer', fontSize:18, color: saved ? '#e3b341' : 'var(--text3)', transition:'color .2s, transform .2s', flexShrink:0, padding:4 }}
            onMouseEnter={e => e.currentTarget.style.transform='scale(1.2)'}
            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
            {saved ? '★' : '☆'}
          </button>
        </div>

        {/* Description */}
        <p style={{ color:'var(--text2)', fontSize:13, lineHeight:1.7, marginBottom:14, display: expanded ? 'block' : '-webkit-box', WebkitLineClamp: expanded ? undefined : 3, WebkitBoxOrient:'vertical', overflow: expanded ? 'visible' : 'hidden' }}>
          {project.description}
        </p>
        {project.description.length > 200 && (
          <button onClick={() => setExpanded(e => !e)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--blue)', fontSize:12, padding:0, marginBottom:12, fontWeight:500 }}>
            {expanded ? '↑ Show less' : '↓ Read more'}
          </button>
        )}

        {/* Tech Stack */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
          {project.stack.map(s => <span key={s} className="tag tag-gray" style={{ fontSize:11 }}>{s}</span>)}
        </div>

        {/* Roles needed */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, textTransform:'uppercase', letterSpacing:.8, marginBottom:8 }}>Roles Needed</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {project.rolesNeeded.map(r => <span key={r} className={`tag ${roleColors[r]||'tag-gray'}`} style={{ fontSize:11, display:'flex', alignItems:'center', gap:4 }}><span style={{ fontSize:9 }}>●</span>{r}</span>)}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:'1px solid var(--border)', flexWrap:'wrap', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, fontSize:12, color:'var(--text3)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:project.avatarColor+'33', border:`1px solid ${project.avatarColor}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:project.avatarColor }}>{project.avatar}</div>
              <span style={{ color:'var(--text2)' }}>{project.owner}</span>
            </div>
            <span style={{ display:'flex', alignItems:'center', gap:3 }}>
              <span style={{ color:'var(--green)' }}>⬤</span> {project.spotsOpen} spot{project.spotsOpen!==1?'s':''} open
            </span>
            <span>👥 {project.applicants} applied</span>
          </div>
          <button className="btn btn-primary" onClick={() => onApply(project)} style={{ fontSize:13, fontWeight:600, gap:6 }}>
            🤝 Apply to Help
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Collab() {
  const [projects, setProjects] = useState(sampleProjects);
  const [filterRole, setFilterRole] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Featured');
  const [navOpen, setNavOpen] = useState(true);
  const [showPost, setShowPost] = useState(false);
  const [applyTarget, setApplyTarget] = useState(null);

  const filtered = projects
    .filter(p => filterRole === 'All' || p.rolesNeeded.includes(filterRole))
    .filter(p => filterStage === 'All' || p.stage === filterStage)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.stack.join(' ').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Featured') return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.applicants - a.applicants;
      if (sort === 'Newest') return b.id.localeCompare(a.id);
      if (sort === 'Most Applied') return b.applicants - a.applicants;
      if (sort === 'Most Spots') return b.spotsOpen - a.spotsOpen;
      return 0;
    });

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      {/* NAV */}
      <div style={{ position:'sticky', top:0, zIndex:100 }}>
        <nav style={{ height: navOpen ? 57 : 0, overflow:'hidden', background:'rgba(13,17,23,.95)', borderBottom: navOpen ? '1px solid var(--border)' : 'none', display:'flex', alignItems:'center', padding: navOpen ? '0 20px' : '0', gap:12, backdropFilter:'blur(12px)', transition:'height .35s cubic-bezier(.4,0,.2,1), padding .35s', animation:'slideDown .4s ease' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:15, color:'var(--text)', textDecoration:'none', whiteSpace:'nowrap' }}>
            <div style={{ width:28, height:28, background:'var(--blue)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>⊞</div>
            DevVault
          </Link>
          <div style={{ flex:1, maxWidth:420, position:'relative' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text3)', fontSize:13 }}>🔍</span>
            <input className="input" placeholder="Search projects or tech stacks..." style={{ paddingLeft:32, height:34 }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setShowPost(true)}>+ Post Project</button>
            <button className="btn-icon">🔔</button>
            <div className="avatar-placeholder">DV</div>
            <button onClick={() => setNavOpen(false)}
              style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg3)', border:'1px solid var(--border2)', color:'var(--text2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all .18s', fontSize:14 }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--bg4)'; e.currentTarget.style.color='var(--text)'; e.currentTarget.style.boxShadow='0 0 0 2px rgba(47,129,247,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.boxShadow='none'; }}>↑</button>
          </div>
        </nav>
        <div style={{ position:'absolute', top:0, left:'50%', transform:`translateX(-50%) translateY(${navOpen ? '-100%' : '0'})`, transition:'transform .35s cubic-bezier(.4,0,.2,1)', zIndex:101 }}>
          <button onClick={() => setNavOpen(true)} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 16px', background:'rgba(13,17,23,.97)', border:'1px solid var(--border2)', borderTop:'none', borderRadius:'0 0 10px 10px', color:'var(--text2)', fontSize:12, fontWeight:600, cursor:'pointer', backdropFilter:'blur(12px)', boxShadow:'0 4px 20px rgba(0,0,0,.4)', transition:'all .18s' }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(47,129,247,.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,.4)'; }}>
            <span style={{ fontSize:11 }}>↓</span> DevVault
          </button>
        </div>
      </div>

      {/* POST MODAL */}
      {showPost && <PostModal onClose={() => setShowPost(false)} onPost={p => setProjects(ps => [p, ...ps])} />}
      {applyTarget && <ApplyModal project={applyTarget} onClose={() => setApplyTarget(null)} />}

      <div style={{ maxWidth:1160, margin:'0 auto', padding:'28px 20px', display:'grid', gridTemplateColumns:'1fr 290px', gap:22, alignItems:'start' }}>
        {/* LEFT — MAIN FEED */}
        <div>
          {/* Hero */}
          <div style={{ marginBottom:24, animation:'fadeIn .4s ease' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <span className="badge badge-blue" style={{ fontSize:10, letterSpacing:1 }}>🤝 COLLAB BOARD</span>
            </div>
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
              <div>
                <h1 style={{ fontSize:'clamp(1.5rem,3vw,2rem)', fontWeight:800, letterSpacing:-0.5, marginBottom:8 }}>Build Together</h1>
                <p style={{ color:'var(--text2)', fontSize:13.5, lineHeight:1.6, maxWidth:500 }}>Find real projects that need your skills — or post your own and find the teammates who'll take it to the next level.</p>
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => setShowPost(true)} style={{ whiteSpace:'nowrap' }}>+ Post Your Project</button>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24, animation:'fadeIn .4s ease .05s both' }}>
            {[{ n:'247', l:'Active Projects', icon:'🚀' }, { n:'1.2k', l:'Contributors', icon:'👥' }, { n:'89', l:'Shipped This Month', icon:'✅' }, { n:'340', l:'Spots Open', icon:'🎯' }].map(s => (
              <div key={s.l} className="card" style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:20 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight:800, fontSize:'1.15rem', lineHeight:1 }}>{s.n}</div>
                  <div style={{ color:'var(--text2)', fontSize:11, marginTop:2 }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters Bar */}
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 16px', marginBottom:18, animation:'fadeIn .4s ease .1s both' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
              {/* Sort */}
              <div style={{ display:'flex', gap:4 }}>
                {['Featured','Newest','Most Applied','Most Spots'].map(s => (
                  <button key={s} onClick={() => setSort(s)} style={{ padding:'5px 12px', borderRadius:100, border:'none', cursor:'pointer', fontSize:12, fontWeight: sort===s ? 600 : 400, background: sort===s ? 'var(--blue)' : 'transparent', color: sort===s ? '#fff' : 'var(--text2)', transition:'all .15s' }}>{s}</button>
                ))}
              </div>
              <div style={{ marginLeft:'auto', display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
                <select className="input" value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ height:32, paddingTop:0, paddingBottom:0, fontSize:12, cursor:'pointer', width:'auto' }}>
                  <option value="All">All Roles</option>
                  {ROLES_NEEDED.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <select className="input" value={filterStage} onChange={e => setFilterStage(e.target.value)} style={{ height:32, paddingTop:0, paddingBottom:0, fontSize:12, cursor:'pointer', width:'auto' }}>
                  <option value="All">All Stages</option>
                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Result count */}
          <div style={{ color:'var(--text3)', fontSize:12, marginBottom:12 }}>{filtered.length} project{filtered.length!==1?'s':''} found</div>

          {/* Feed */}
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text2)' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <div style={{ fontWeight:600, marginBottom:8 }}>No projects match your filters</div>
              <button className="btn btn-primary btn-sm" onClick={() => { setFilterRole('All'); setFilterStage('All'); setSearch(''); }}>Clear filters</button>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {filtered.map((project, i) => (
                <CollabCard key={project.id} project={project} i={i} onApply={setApplyTarget} />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display:'flex', flexDirection:'column', gap:14, position:'sticky', top: navOpen ? 77 : 20, transition:'top .35s', animation:'fadeInRight .4s ease .1s both' }}>
          {/* CTA */}
          <div style={{ background:'linear-gradient(135deg, rgba(47,129,247,.15), rgba(63,185,80,.08))', border:'1px solid rgba(47,129,247,.3)', borderRadius:12, padding:20 }}>
            <div style={{ fontSize:22, marginBottom:8 }}>🚀</div>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:6 }}>Have a project idea?</div>
            <p style={{ color:'var(--text2)', fontSize:12, lineHeight:1.6, marginBottom:14 }}>Post it here and connect with experienced developers who want to help bring it to life.</p>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', fontWeight:600 }} onClick={() => setShowPost(true)}>+ Post Your Project</button>
          </div>

          {/* How It Works */}
          <div className="card" style={{ padding:18 }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:14 }}>⚡ How It Works</div>
            {[{ step:'1', icon:'📋', title:'Post your project', desc:'Describe what you\'re building and what kind of help you need.' }, { step:'2', icon:'👀', title:'Get spotted', desc:'Developers browse and apply to roles that match their skills.' }, { step:'3', icon:'🤝', title:'Connect & build', desc:'Review applications and pick the best contributors to collaborate with.' }].map(s => (
              <div key={s.step} style={{ display:'flex', gap:12, marginBottom:14, alignItems:'flex-start' }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(47,129,247,.15)', border:'1px solid rgba(47,129,247,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'var(--blue)', flexShrink:0 }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>{s.icon} {s.title}</div>
                  <div style={{ color:'var(--text2)', fontSize:12, lineHeight:1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* In-demand skills */}
          <div className="card" style={{ padding:18 }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>🔥 In-Demand Skills</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {STACK_TAGS.map(t => (
                <button key={t} onClick={() => setSearch(t)} className="tag tag-blue" style={{ cursor:'pointer', fontSize:11, padding:'3px 9px', background:'rgba(47,129,247,.08)', border:'1px solid rgba(47,129,247,.2)', transition:'all .15s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(47,129,247,.2)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(47,129,247,.08)'}>{t}</button>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="card" style={{ padding:18 }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:12 }}>📜 Guidelines</div>
            {['Be specific about your tech stack & progress', 'Describe the exact kind of help you need', 'Respond to applicants within 48 hours', 'Agree on contribution terms upfront', 'Give credit to all contributors'].map((r, i) => (
              <div key={i} style={{ display:'flex', gap:8, marginBottom:8, fontSize:12, color:'var(--text2)', alignItems:'flex-start' }}>
                <span style={{ color:'var(--blue)', fontWeight:700, flexShrink:0 }}>{i+1}.</span>{r}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text2)', fontSize:13 }}>
          <div style={{ width:18, height:18, background:'var(--blue)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>⊞</div>
          DevVault © 2024
        </div>
        <div style={{ display:'flex', gap:20 }}>
          {['Privacy','Terms','About','Contact'].map(l => <span key={l} style={{ color:'var(--text2)', fontSize:13, cursor:'pointer' }}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}
