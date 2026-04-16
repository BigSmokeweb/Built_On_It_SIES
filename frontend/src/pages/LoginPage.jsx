import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── Data ───────────────────────────────────────────────────────── */
const ROLES = [
  { id: 'frontend',  label: 'Frontend Dev',    icon: '🎨', color: '#2f81f7' },
  { id: 'backend',   label: 'Backend Dev',     icon: '⚙️', color: '#3fb950' },
  { id: 'fullstack', label: 'Full Stack',      icon: '🚀', color: '#bc8cff' },
  { id: 'ai',        label: 'AI / ML',         icon: '🧠', color: '#e3b341' },
  { id: 'devops',    label: 'DevOps',          icon: '🔧', color: '#f85149' },
  { id: 'mobile',    label: 'Mobile Dev',      icon: '📱', color: '#00bcd4' },
  { id: 'designer',  label: 'UI/UX Designer',  icon: '✏️', color: '#d29922' },
  { id: 'data',      label: 'Data Engineer',   icon: '📊', color: '#56d364' },
];

const SKILL_OPTIONS = [
  'React','Vue','Angular','Next.js','TypeScript','JavaScript',
  'Python','Go','Rust','Node.js','GraphQL','Docker',
  'Kubernetes','AWS','PostgreSQL','MongoDB','Redis','Swift',
];

const AVATAR_GRADIENTS = [
  ['#2f81f7','#bc8cff'], ['#3fb950','#00bcd4'], ['#f85149','#e3b341'],
  ['#bc8cff','#f472b6'], ['#e3b341','#f97316'], ['#00bcd4','#2f81f7'],
];

const KNOWN_USERS = [
  { email:'revant@builtonit.com', name:'Revant Ganesh',  username:'revant_ganesh',  initials:'RG', avatarGrad:['#e3b341','#f85149'], role:'designer',  roleLabel:'UI/UX Designer',         bio:'Creative designer crafting beautiful interfaces. ✨', skills:['Figma','CSS','React','Design Systems','Adobe XD','Tailwind'], github:'https://github.com/revantganesh',  joined:'March 2023' },
  { email:'soham@builtonit.com',  name:'Soham Puri',     username:'soham_puri',     initials:'SP', avatarGrad:['#3fb950','#00bcd4'], role:'backend',   roleLabel:'Backend Developer',      bio:'Backend wizard building scalable APIs. ⚙️',           skills:['Node.js','Python','PostgreSQL','Docker','AWS','Redis','GraphQL'], github:'https://github.com/sohampuri',    joined:'August 2022' },
  { email:'keshav@builtonit.com', name:'Keshav Sharma',  username:'keshav_sharma',  initials:'KS', avatarGrad:['#2f81f7','#bc8cff'], role:'fullstack', roleLabel:'Full Stack Developer',    bio:'Full-stack engineer. Open source contributor. 🚀',    skills:['React','TypeScript','Next.js','Node.js','MongoDB','JavaScript','Prisma'], github:'https://github.com/keshav-sharma', joined:'November 2022' },
  { email:'milind@builtonit.com', name:'Milind Sahu',    username:'milind_sahu',    initials:'MS', avatarGrad:['#2f81f7','#bc8cff'], role:'fullstack', roleLabel:'Full Stack Developer',    bio:'React & Node.js enthusiast. Building cool stuff 🚀',  skills:['React','Node.js','Python','JavaScript','CSS'], github:'', joined:'January 2024' },
];

const TEAM = [
  { initials:'RG', grad:['#e3b341','#f85149'], name:'Revant' },
  { initials:'SP', grad:['#3fb950','#00bcd4'], name:'Soham' },
  { initials:'KS', grad:['#2f81f7','#bc8cff'], name:'Keshav' },
  { initials:'MS', grad:['#2f81f7','#bc8cff'], name:'Milind' },
];

const FEATURES = [
  { icon:'⚡', text:'Real-time collaboration' },
  { icon:'🛡️', text:'Open-source & secure' },
  { icon:'🚀', text:'12,400+ developers' },
  { icon:'🌍', text:'96 countries' },
];

/* ─── Main Component ─────────────────────────────────────────────── */
export default function LoginPage() {
  const navigate  = useNavigate();
  const [tab,     setTab]     = useState('login');
  const [step,    setStep]    = useState(0);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState('');
  const [pulse,   setPulse]   = useState(0);

  const [loginForm, setLoginForm] = useState({ email:'', password:'' });
  const [form, setForm] = useState({
    name:'', username:'', email:'', password:'', confirmPassword:'',
    role:'', bio:'', skills:[], github:'', avatarGrad:0,
  });

  /* Animate left-panel stat counter */
  useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 4), 2800);
    return () => clearInterval(id);
  }, []);

  const set       = (k, v) => setForm(f => ({ ...f, [k]:v }));
  const toggleSkill = s   => set('skills', form.skills.includes(s) ? form.skills.filter(x => x !== s) : [...form.skills, s]);

  const handleLogin = () => {
    setError('');
    const email = loginForm.email.trim().toLowerCase();
    const known = KNOWN_USERS.find(u => u.email.toLowerCase() === email);
    if (known) {
      localStorage.setItem('boi_user', JSON.stringify(known));
      setSuccess(true);
      setTimeout(() => navigate('/'), 1000);
      return;
    }
    const stored = JSON.parse(localStorage.getItem('boi_user') || 'null');
    if (!stored)                             { setError('No account found. Please sign up first.'); return; }
    if (stored.email !== loginForm.email)    { setError('Email not found.'); return; }
    if (stored.password !== loginForm.password) { setError('Incorrect password.'); return; }
    setSuccess(true);
    setTimeout(() => navigate('/'), 1000);
  };

  const handleGuest = () => {
    localStorage.removeItem('boi_user');
    localStorage.setItem('boi_guest', 'true');
    navigate('/');
  };

  const handleSignup = () => {
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    const initials  = form.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    const userData  = { ...form, initials, joined: new Date().toLocaleDateString('en-US', { month:'long', year:'numeric' }) };
    localStorage.setItem('boi_user', JSON.stringify(userData));
    localStorage.removeItem('boi_guest');
    setSuccess(true);
    setTimeout(() => navigate('/'), 1200);
  };

  const canStep0 = form.name.trim() && form.username.trim() && form.email.trim() && form.password.length >= 6 && form.password === form.confirmPassword;
  const canStep1 = !!form.role;
  const grad     = AVATAR_GRADIENTS[form.avatarGrad];
  const initials = form.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() || '?';

  const inputStyle = (name) => ({
    width:'100%', padding:'13px 16px', borderRadius:10, border:`1.5px solid ${focused===name ? '#2f81f7' : 'rgba(255,255,255,.08)'}`,
    background: focused===name ? 'rgba(47,129,247,.05)' : 'rgba(255,255,255,.04)',
    color:'var(--text)', fontSize:14, outline:'none', transition:'all .2s', boxSizing:'border-box',
    boxShadow: focused===name ? '0 0 0 3px rgba(47,129,247,.12)' : 'none',
    fontFamily:"'Inter',sans-serif",
  });

  const labelStyle = { display:'block', fontWeight:700, fontSize:11, color:'var(--text3)', marginBottom:7, letterSpacing:0.8, textTransform:'uppercase' };

  return (
    <div style={{ background:'#0a0d12', minHeight:'100vh', display:'flex', fontFamily:"'Inter',sans-serif", position:'relative', overflow:'hidden' }}>

      {/* ── AMBIENT GLOW ORBS ─────────────────────────────────── */}
      <div style={{ position:'fixed', top:'-15%', left:'-10%', width:'55vw', height:'55vw', background:'radial-gradient(circle,rgba(47,129,247,.07),transparent 65%)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', bottom:'-20%', right:'-5%',  width:'50vw', height:'50vw', background:'radial-gradient(circle,rgba(188,140,255,.06),transparent 65%)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', top:'40%', left:'38%', width:'30vw', height:'30vw', background:'radial-gradient(circle,rgba(63,185,80,.04),transparent 65%)', pointerEvents:'none', zIndex:0 }} />

      {/* ══════════════ LEFT PANEL ══════════════ */}
      <div className="login-left-panel" style={{
        flex:'0 0 46%', position:'relative', zIndex:1, display:'flex', flexDirection:'column',
        justifyContent:'space-between', padding:'40px 52px', borderRight:'1px solid rgba(255,255,255,.06)',
        background:'linear-gradient(160deg,rgba(13,17,23,.98) 0%,rgba(22,27,34,.95) 100%)',
      }}>
        {/* Dot-grid overlay */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,.035) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />

        {/* Logo */}
        <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10, position:'relative', zIndex:1 }}>
          <div style={{ width:36, height:36, background:'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, fontWeight:900, color:'#fff', boxShadow:'0 4px 16px rgba(47,129,247,.35)' }}>⊞</div>
          <span style={{ fontWeight:900, fontSize:18, background:'linear-gradient(90deg,#e6edf3,#8b949e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Built On It</span>
        </Link>

        {/* Hero text */}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(47,129,247,.1)', border:'1px solid rgba(47,129,247,.2)', borderRadius:100, padding:'5px 14px', marginBottom:28 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#3fb950', boxShadow:'0 0 8px #3fb950' }} />
            <span style={{ fontSize:11, fontWeight:700, color:'#58a6ff', letterSpacing:1 }}>DEVELOPER PLATFORM</span>
          </div>

          <h1 style={{ fontSize:'clamp(2.2rem,3.5vw,3.2rem)', fontWeight:900, lineHeight:1.08, letterSpacing:-2, marginBottom:20, color:'#e6edf3' }}>
            Build.<br />
            <span style={{ background:'linear-gradient(90deg,#2f81f7,#bc8cff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Ship.</span><br />
            Collaborate.
          </h1>
          <p style={{ color:'#8b949e', fontSize:14.5, lineHeight:1.8, maxWidth:310, marginBottom:36 }}>
            Join thousands of developers discovering, building, and shipping projects together on the ultimate open-source hub.
          </p>

          {/* Feature pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:44 }}>
            {FEATURES.map((f,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:7, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:100, padding:'6px 14px', transition:'all .2s' }}>
                <span style={{ fontSize:14 }}>{f.icon}</span>
                <span style={{ fontSize:12, color:'#8b949e', fontWeight:500 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Team avatars */}
          <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:28 }}>
            {TEAM.map((t, i) => (
              <div key={t.initials} title={t.name}
                style={{ width:40, height:40, borderRadius:'50%', background:`linear-gradient(135deg,${t.grad[0]},${t.grad[1]})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'#fff', border:'2.5px solid #0a0d12', marginLeft: i === 0 ? 0 : -12, zIndex:10-i, boxShadow:'0 2px 8px rgba(0,0,0,.4)', cursor:'default', transition:'transform .2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                {t.initials}
              </div>
            ))}
            <div style={{ marginLeft:14, color:'#8b949e', fontSize:13 }}>
              <span style={{ color:'#e6edf3', fontWeight:700 }}>12,400+</span> devs building
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display:'flex', gap:32, position:'relative', zIndex:1, borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:24 }}>
          {[['3.8k','Projects'],['96','Countries'],['48h','Avg. Response']].map((s,i) => (
            <div key={i}>
              <div style={{ fontWeight:900, fontSize:'1.2rem', background:'linear-gradient(90deg,#e6edf3,#8b949e)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s[0]}</div>
              <div style={{ color:'#6e7681', fontSize:10.5, letterSpacing:0.8, marginTop:2, textTransform:'uppercase' }}>{s[1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════ RIGHT PANEL ══════════════ */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'32px 24px', overflowY:'auto', position:'relative', zIndex:1 }}>
        <div style={{ width:'100%', maxWidth:420 }}>

          {/* Success overlay */}
          {success && (
            <div style={{ textAlign:'center', padding:'80px 0', animation:'scaleIn .35s ease' }}>
              <div style={{ fontSize:64, marginBottom:20, filter:'drop-shadow(0 0 24px rgba(63,185,80,.5))' }}>🎉</div>
              <div style={{ fontWeight:900, fontSize:'1.6rem', marginBottom:10, color:'#e6edf3' }}>
                {tab==='login' ? 'Welcome back!' : 'Profile created!'}
              </div>
              <div style={{ color:'#8b949e', fontSize:14, marginBottom:28 }}>Taking you to your profile…</div>
              <div style={{ height:3, background:'rgba(255,255,255,.08)', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', width:'100%', background:'linear-gradient(90deg,#2f81f7,#bc8cff)', animation:'progressFill 1s ease forwards', borderRadius:2, boxShadow:'0 0 12px rgba(47,129,247,.6)' }} />
              </div>
            </div>
          )}

          {!success && (<>
            {/* Tab switcher */}
            <div style={{ display:'flex', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14, padding:4, marginBottom:32 }}>
              {[['login','🔐 Sign In'],['signup','✨ Create Account']].map(([id, label]) => (
                <button key={id} onClick={() => { setTab(id); setStep(0); setError(''); }}
                  style={{ flex:1, padding:'10px 16px', border:'none', borderRadius:11, cursor:'pointer', fontSize:13, fontWeight:700, transition:'all .25s',
                    background: tab===id ? 'linear-gradient(135deg,#2f81f7,#1f6feb)' : 'transparent',
                    color: tab===id ? '#fff' : '#8b949e',
                    boxShadow: tab===id ? '0 4px 18px rgba(47,129,247,.4)' : 'none',
                  }}>
                  {label}
                </button>
              ))}
            </div>

            {/* ─── LOGIN FORM ─── */}
            {tab === 'login' && (
              <div style={{ display:'flex', flexDirection:'column', gap:20, animation:'fadeIn .3s ease' }}>
                <div style={{ marginBottom:4 }}>
                  <h2 style={{ fontWeight:900, fontSize:'1.7rem', marginBottom:6, color:'#e6edf3', letterSpacing:-0.5 }}>Welcome back</h2>
                  <p style={{ color:'#8b949e', fontSize:13.5 }}>Sign in to your Built On It account</p>
                </div>

                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input style={inputStyle('email')} type="email" placeholder="you@builtonit.com"
                    value={loginForm.email}
                    onChange={e => setLoginForm(f => ({ ...f, email:e.target.value }))}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
                </div>

                <div>
                  <label style={labelStyle}>Password</label>
                  <input style={inputStyle('password')} type="password" placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={e => setLoginForm(f => ({ ...f, password:e.target.value }))}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                </div>

                {error && (
                  <div style={{ padding:'11px 14px', background:'rgba(248,81,73,.1)', border:'1px solid rgba(248,81,73,.25)', borderRadius:10, color:'#ff7b72', fontSize:13, display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:16 }}>⚠</span> {error}
                  </div>
                )}

                <button onClick={handleLogin}
                  style={{ padding:'14px 20px', borderRadius:12, border:'none', cursor:'pointer', fontSize:15, fontWeight:800, color:'#fff', background:'linear-gradient(135deg,#2f81f7,#1f6feb)', boxShadow:'0 6px 24px rgba(47,129,247,.4)', transition:'all .2s', letterSpacing:0.3, marginTop:2 }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(47,129,247,.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 24px rgba(47,129,247,.4)'; }}>
                  Sign In →
                </button>

                <div style={{ textAlign:'center', color:'#6e7681', fontSize:13 }}>
                  Don't have an account?{' '}
                  <button onClick={() => setTab('signup')} style={{ background:'none', border:'none', color:'#58a6ff', cursor:'pointer', fontWeight:700, fontSize:13 }}>
                    Create one free
                  </button>
                </div>

                {/* Guest divider */}
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ flex:1, height:1, background:'rgba(255,255,255,.08)' }} />
                  <span style={{ fontSize:11, color:'#6e7681', fontWeight:600, letterSpacing:0.5 }}>OR</span>
                  <div style={{ flex:1, height:1, background:'rgba(255,255,255,.08)' }} />
                </div>

                <button onClick={handleGuest}
                  style={{ padding:'12px 20px', borderRadius:12, border:'1px solid rgba(255,255,255,.1)', background:'rgba(255,255,255,.04)', color:'#8b949e', fontSize:14, fontWeight:600, cursor:'pointer', transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.color='#e6edf3'; e.currentTarget.style.borderColor='rgba(255,255,255,.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.04)'; e.currentTarget.style.color='#8b949e'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; }}>
                  👤 Continue as Guest
                </button>

                {/* Hint */}
                <div style={{ background:'rgba(47,129,247,.06)', border:'1px solid rgba(47,129,247,.15)', borderRadius:10, padding:'12px 16px' }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#58a6ff', letterSpacing:0.5, marginBottom:6 }}>💡 TEAM DIRECT ENTRY</div>
                  <div style={{ fontSize:12, color:'#8b949e', lineHeight:1.6 }}>
                    Use <code style={{ color:'#a5d6ff', background:'rgba(255,255,255,.06)', padding:'1px 5px', borderRadius:4 }}>name@builtonit.com</code> to sign in instantly as a team member — no password needed.
                  </div>
                </div>
              </div>
            )}

            {/* ─── SIGN UP FORM ─── */}
            {tab === 'signup' && (
              <div style={{ animation:'fadeIn .3s ease' }}>

                {/* Step progress */}
                <div style={{ marginBottom:28 }}>
                  <div style={{ display:'flex', alignItems:'center', marginBottom:10 }}>
                    {['Account','Your Role','Skills & Bio'].map((s, i) => (
                      <div key={s} style={{ display:'flex', alignItems:'center', flex: i < 2 ? 1 : 'none' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <div style={{ width:24, height:24, borderRadius:'50%', background: i < step ? '#3fb950' : i===step ? 'linear-gradient(135deg,#2f81f7,#bc8cff)' : 'rgba(255,255,255,.08)', border:`1.5px solid ${i<=step ? 'transparent' : 'rgba(255,255,255,.12)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color: i<=step ? '#fff' : '#6e7681', transition:'all .3s', boxShadow: i===step ? '0 0 12px rgba(47,129,247,.4)' : 'none' }}>
                            {i < step ? '✓' : i+1}
                          </div>
                          <span style={{ fontSize:11, fontWeight: i===step ? 700 : 400, color: i===step ? '#e6edf3' : '#6e7681', whiteSpace:'nowrap' }}>{s}</span>
                        </div>
                        {i < 2 && <div style={{ flex:1, height:1, background: i < step ? 'linear-gradient(90deg,#3fb950,rgba(63,185,80,.3))' : 'rgba(255,255,255,.08)', margin:'0 10px', transition:'all .4s' }} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* STEP 0 */}
                {step === 0 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    <div style={{ marginBottom:4 }}>
                      <h2 style={{ fontWeight:900, fontSize:'1.5rem', marginBottom:5, color:'#e6edf3', letterSpacing:-0.5 }}>Create your account</h2>
                      <p style={{ color:'#8b949e', fontSize:13 }}>Set up your Built On It profile</p>
                    </div>

                    {/* Avatar picker */}
                    <div style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 16px', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12 }}>
                      <div style={{ width:56, height:56, borderRadius:'50%', background:`linear-gradient(135deg,${grad[0]},${grad[1]})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:900, color:'#fff', border:'3px solid rgba(255,255,255,.12)', boxShadow:`0 0 20px ${grad[0]}44`, flexShrink:0, transition:'all .3s' }}>
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontSize:11, color:'#8b949e', fontWeight:700, letterSpacing:0.5, marginBottom:8, textTransform:'uppercase' }}>Avatar Colour</div>
                        <div style={{ display:'flex', gap:7 }}>
                          {AVATAR_GRADIENTS.map(([a,b], i) => (
                            <button key={i} onClick={() => set('avatarGrad', i)}
                              style={{ width:24, height:24, borderRadius:'50%', background:`linear-gradient(135deg,${a},${b})`, border:`2.5px solid ${form.avatarGrad===i ? '#fff' : 'transparent'}`, cursor:'pointer', outline: form.avatarGrad===i ? `2px solid ${a}` : 'none', outlineOffset:2, transition:'all .15s' }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input style={inputStyle('name')} placeholder="Milind Sahu" value={form.name} onChange={e => set('name', e.target.value)} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
                      </div>
                      <div>
                        <label style={labelStyle}>Username *</label>
                        <input style={inputStyle('uname')} placeholder="milind_sahu" value={form.username} onChange={e => set('username', e.target.value.toLowerCase().replace(/\s/g,'_'))} onFocus={() => setFocused('uname')} onBlur={() => setFocused('')} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input style={inputStyle('semail')} type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} onFocus={() => setFocused('semail')} onBlur={() => setFocused('')} />
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                      <div>
                        <label style={labelStyle}>Password *</label>
                        <input style={inputStyle('spw')} type="password" placeholder="Min 6 chars" value={form.password} onChange={e => set('password', e.target.value)} onFocus={() => setFocused('spw')} onBlur={() => setFocused('')} />
                      </div>
                      <div>
                        <label style={labelStyle}>Confirm *</label>
                        <input style={inputStyle('cpw')} type="password" placeholder="Repeat" value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)} onFocus={() => setFocused('cpw')} onBlur={() => setFocused('')} />
                      </div>
                    </div>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                      <div style={{ fontSize:12, color:'#ff7b72', display:'flex', alignItems:'center', gap:6 }}>⚠ Passwords don't match</div>
                    )}
                    <div>
                      <label style={labelStyle}>GitHub URL (optional)</label>
                      <input style={inputStyle('gh')} placeholder="https://github.com/yourusername" value={form.github} onChange={e => set('github', e.target.value)} onFocus={() => setFocused('gh')} onBlur={() => setFocused('')} />
                    </div>
                  </div>
                )}

                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <div style={{ marginBottom:20 }}>
                      <h2 style={{ fontWeight:900, fontSize:'1.5rem', marginBottom:5, color:'#e6edf3', letterSpacing:-0.5 }}>What's your role?</h2>
                      <p style={{ color:'#8b949e', fontSize:13 }}>This shapes your profile and recommendations</p>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
                      {ROLES.map(r => (
                        <button key={r.id} onClick={() => set('role', r.id)}
                          style={{ padding:'13px 14px', borderRadius:11, border:`1.5px solid ${form.role===r.id ? r.color : 'rgba(255,255,255,.08)'}`, background: form.role===r.id ? r.color+'18' : 'rgba(255,255,255,.03)', cursor:'pointer', display:'flex', alignItems:'center', gap:9, transition:'all .18s', boxShadow: form.role===r.id ? `0 0 12px ${r.color}30` : 'none' }}
                          onMouseEnter={e => { if(form.role!==r.id) e.currentTarget.style.borderColor='rgba(255,255,255,.18)'; }}
                          onMouseLeave={e => { if(form.role!==r.id) e.currentTarget.style.borderColor='rgba(255,255,255,.08)'; }}>
                          <span style={{ fontSize:19 }}>{r.icon}</span>
                          <span style={{ fontWeight: form.role===r.id ? 700 : 500, fontSize:13, color: form.role===r.id ? '#e6edf3' : '#8b949e' }}>{r.label}</span>
                          {form.role===r.id && <span style={{ marginLeft:'auto', color:r.color, fontSize:13 }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    <div style={{ marginBottom:4 }}>
                      <h2 style={{ fontWeight:900, fontSize:'1.5rem', marginBottom:5, color:'#e6edf3', letterSpacing:-0.5 }}>Almost there! 🎉</h2>
                      <p style={{ color:'#8b949e', fontSize:13 }}>Add your skills and a short bio</p>
                    </div>
                    <div>
                      <label style={labelStyle}>Skills</label>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                        {SKILL_OPTIONS.map(s => (
                          <button key={s} onClick={() => toggleSkill(s)}
                            style={{ padding:'5px 13px', borderRadius:100, border:`1.5px solid ${form.skills.includes(s) ? '#2f81f7' : 'rgba(255,255,255,.1)'}`, background: form.skills.includes(s) ? 'rgba(47,129,247,.15)' : 'rgba(255,255,255,.03)', color: form.skills.includes(s) ? '#58a6ff' : '#8b949e', fontSize:12, cursor:'pointer', fontWeight: form.skills.includes(s) ? 700 : 400, transition:'all .15s' }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Short Bio</label>
                      <textarea style={{ ...inputStyle('bio'), resize:'vertical', lineHeight:1.65, fontSize:13, minHeight:80 }}
                        rows={3} placeholder="Full-stack dev passionate about open source 🚀"
                        value={form.bio} onChange={e => set('bio', e.target.value)}
                        onFocus={() => setFocused('bio')} onBlur={() => setFocused('')} />
                      <div style={{ fontSize:11, color:'#6e7681', textAlign:'right', marginTop:4 }}>{form.bio.length}/160</div>
                    </div>
                    {/* Preview card */}
                    <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:12, padding:'14px 16px', display:'flex', alignItems:'center', gap:14 }}>
                      <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg,${grad[0]},${grad[1]})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, fontWeight:900, color:'#fff', flexShrink:0, boxShadow:`0 0 16px ${grad[0]}44` }}>
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:'#e6edf3' }}>{form.name || 'Your Name'}</div>
                        <div style={{ color:'#58a6ff', fontSize:12 }}>@{form.username || 'username'}</div>
                        <div style={{ color:'#6e7681', fontSize:11, marginTop:2 }}>{ROLES.find(r => r.id===form.role)?.label || 'Developer'}</div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div style={{ padding:'11px 14px', background:'rgba(248,81,73,.1)', border:'1px solid rgba(248,81,73,.25)', borderRadius:10, color:'#ff7b72', fontSize:13, display:'flex', alignItems:'center', gap:8, marginTop:14 }}>
                    <span style={{ fontSize:16 }}>⚠</span> {error}
                  </div>
                )}

                {/* Nav buttons */}
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:22, gap:10 }}>
                  {step > 0
                    ? <button onClick={() => setStep(s => s-1)}
                        style={{ padding:'11px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,.1)', background:'rgba(255,255,255,.04)', color:'#8b949e', cursor:'pointer', fontWeight:600, fontSize:13, transition:'all .18s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.2)'; e.currentTarget.style.color='#e6edf3'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.1)'; e.currentTarget.style.color='#8b949e'; }}>
                        ← Back
                      </button>
                    : <button onClick={() => setTab('login')}
                        style={{ padding:'11px 20px', borderRadius:10, border:'1px solid rgba(255,255,255,.06)', background:'transparent', color:'#6e7681', cursor:'pointer', fontWeight:600, fontSize:13, transition:'all .15s' }}>
                        Cancel
                      </button>
                  }
                  {step < 2
                    ? <button onClick={() => { setError(''); setStep(s => s+1); }}
                        disabled={step===0 ? !canStep0 : !canStep1}
                        style={{ padding:'11px 24px', borderRadius:10, border:'none', background: (step===0 ? canStep0 : canStep1) ? 'linear-gradient(135deg,#2f81f7,#1f6feb)' : 'rgba(255,255,255,.06)', color: (step===0 ? canStep0 : canStep1) ? '#fff' : '#6e7681', cursor: (step===0 ? canStep0 : canStep1) ? 'pointer' : 'not-allowed', fontWeight:700, fontSize:13, boxShadow:(step===0 ? canStep0 : canStep1) ? '0 4px 16px rgba(47,129,247,.35)' : 'none', transition:'all .2s' }}>
                        Continue →
                      </button>
                    : <button onClick={handleSignup}
                        style={{ padding:'11px 24px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#2f81f7,#bc8cff)', color:'#fff', cursor:'pointer', fontWeight:800, fontSize:13, boxShadow:'0 6px 24px rgba(47,129,247,.4)', transition:'all .2s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(47,129,247,.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 6px 24px rgba(47,129,247,.4)'; }}>
                        🚀 Create Profile
                      </button>
                  }
                </div>
              </div>
            )}
          </>)}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .login-left-panel{ display:none!important } }
        @keyframes progressFill { from{width:0} to{width:100%} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:none} }
        * { box-sizing:border-box; }
        input, textarea, button { font-family:'Inter',sans-serif; }
      `}</style>
    </div>
  );
}
