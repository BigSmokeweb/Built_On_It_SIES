import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  fetchProblemById,
  fetchTakers,
  joinProblem,
  fetchSolutions,
  downloadSolution,
  createSolution
} from '../api';

const tabs = ['README', 'Features', 'Benchmarks', 'Dependencies', 'Releases'];

const features = [
  'Zero-cost abstractions', 'Multi-threaded scheduling', 'ONNX & TensorFlow support', 'WebAssembly compatible',
];

const deps = ['tokio v1.2', 'serde v1.0', 'ndarray v0.15', 'rayon v1.5', 'anyhow v1.0'];

export default function ProjectDetail() {
  const { id } = useParams();

  // Problem data
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [activeTab, setActiveTab] = useState('README');
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(12400);
  const [copied, setCopied] = useState(false);
  const [supported, setSupported] = useState(false);

  // Collaborators
  const [takers, setTakers] = useState([]);

  // Solutions
  const [solutions, setSolutions] = useState([]);
  const [loadingSolutions, setLoadingSolutions] = useState(true);
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [solutionText, setSolutionText] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [solutionFile, setSolutionFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch problem details
  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProblemById(id);
        setProblem(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load problem');
      } finally {
        setLoading(false);
      }
    };
    loadProblem();
  }, [id]);

  // Fetch takers and solutions when problem loads
  useEffect(() => {
    if (problem?.id) {
      const loadTakers = async () => {
        const { data } = await fetchTakers(problem.id);
        setTakers(data);
      };
      const loadSolutions = async () => {
        try {
          setLoadingSolutions(true);
          const { data } = await fetchSolutions(problem.id);
          setSolutions(data);
        } catch (err) {
          console.error('Failed to load solutions:', err);
        } finally {
          setLoadingSolutions(false);
        }
      };
      loadTakers();
      loadSolutions();
    }
  }, [problem]);

  // Join project handler
  const handleJoinProblem = async () => {
    const studentName = prompt('Enter your name to join this project:');
    if (!studentName) return;
    try {
      await joinProblem(id, studentName);
      alert('You have joined the project!');
      const { data } = await fetchTakers(id);
      setTakers(data);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to join');
    }
  };

  // Solution submission
  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    if (!solutionText && !githubLink && !solutionFile) {
      alert('Please provide text, a GitHub link, or a file.');
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    if (solutionText) formData.append('text', solutionText);
    if (githubLink) formData.append('github_link', githubLink);
    if (solutionFile) formData.append('file', solutionFile);
    try {
      await createSolution(id, formData);
      alert('Solution posted!');
      setSolutionText('');
      setGithubLink('');
      setSolutionFile(null);
      setShowSolutionForm(false);
      // Refresh solutions
      const { data } = await fetchSolutions(id);
      setSolutions(data);
    } catch (err) {
      alert('Failed to post solution');
    } finally {
      setSubmitting(false);
    }
  };

  // Download solution file
  const handleSolutionDownload = async (solutionId) => {
    try {
      const response = await downloadSolution(solutionId);
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'solution-file';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match) filename = match[1];
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download file');
    }
  };

  // Demo UI handlers (star, copy, support)
  const handleStar = () => {
    setStarred(s => !s);
    setStarCount(n => starred ? n - 1 : n + 1);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText('git clone https://github.com/example/project.git').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSupport = () => {
    setSupported(true);
    setTimeout(() => setSupported(false), 2000);
  };

  const formatStars = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* TOPNAV */}
      <nav style={{ height:57, background:'rgba(13,17,23,.95)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 clamp(12px,3vw,20px)', gap:10, position:'sticky', top:0, zIndex:100, backdropFilter:'blur(12px)', animation:'slideDown .4s ease' }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:15, color:'var(--text)', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>
          <div style={{ width:28, height:28, background:'var(--blue)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>⊞</div>
          Built On It
        </Link>
        <div style={{ flex:1, maxWidth:380, position:'relative', minWidth:0 }}>
          <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text3)' }}>🔍</span>
          <input className="input" placeholder="Search projects, authors, or tags..." style={{ paddingLeft:32, height:34 }} />
        </div>
        <div style={{ marginLeft:'auto', display:'flex', gap:8, flexShrink:0 }}>
          <button className="btn-icon">🔔</button>
          <div className="avatar-placeholder" style={{ background:'linear-gradient(135deg,#f97316,#d29922)' }}>A</div>
        </div>
      </nav>

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(16px,3vw,28px) clamp(14px,3vw,24px)', display:'grid', gridTemplateColumns:'minmax(0,1fr)', gap:24, animation:'fadeIn .4s ease' }}
        className="project-detail-grid">
        {/* LEFT COLUMN */}
        <div>
          {/* PROJECT HEADER */}
          <div className="card" style={{ padding:24, marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:20 }}>
              <div style={{ width:70, height:70, background:'rgba(47,129,247,.15)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, border:'1px solid rgba(47,129,247,.25)', flexShrink:0, animation:'float 4s ease-in-out infinite' }}>⚙</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
                  <h1 style={{ fontSize:'1.5rem', fontWeight:800, letterSpacing:-0.5 }}>
  {problem?.title || 'SkyNet AI Engine'}
</h1>
{problem && (
  <span 
    className="badge" 
    style={{ 
      fontSize: 10,
      background: problem.status === 'open' ? 'rgba(63,185,80,0.15)' : 'rgba(210,153,34,0.15)',
      color: problem.status === 'open' ? '#56d364' : '#e3b341',
      border: `1px solid ${problem.status === 'open' ? 'rgba(63,185,80,0.3)' : 'rgba(210,153,34,0.3)'}`
    }}
  >
    {problem.status === 'open' ? '🟢 OPEN' : '🟡 TAKEN'}
  </span>
)}
<span className="badge badge-blue" style={{ fontSize:10 }}>PROJECT</span>
                </div>
                <p style={{ color:'var(--text2)', fontSize:13.5, lineHeight:1.6, marginBottom:16, maxWidth:500 }}>
                  A high-performance neural network library written in Rust for real-time edge computing. Optimized for low-latency inference on ARM and RISC-V architectures.
                </p>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>

                  <button
                    className="btn btn-secondary"
                    onClick={handleCopy}
                    style={{ transition:'all .2s', background: copied ? 'rgba(63,185,80,.12)' : undefined, borderColor: copied ? 'var(--green)' : undefined, color: copied ? 'var(--green)' : undefined }}>
                    {copied ? '✓ Copied!' : '📋 Clone'}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleStar}
                    style={{ transition:'all .2s', background: starred ? 'rgba(210,153,34,.12)' : undefined, borderColor: starred ? 'var(--orange)' : undefined, color: starred ? 'var(--orange)' : undefined }}>
                    {starred ? '★' : '⭐'} {formatStars(starCount)}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div style={{ display:'flex', borderBottom:'1px solid var(--border)', marginBottom:0, overflowX:'auto', scrollbarWidth:'none' }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:'10px 18px', border:'none', cursor:'pointer', background:'transparent', color: activeTab===tab ? 'var(--text)' : 'var(--text2)', fontSize:13, fontWeight: activeTab===tab ? 600 : 400, borderBottom:`2px solid ${activeTab===tab ? 'var(--blue)' : 'transparent'}`, transition:'all .18s', marginBottom:-1 }}>
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="card" style={{ padding:28, borderRadius:'0 0 var(--radius-lg) var(--radius-lg)', borderTop:'none', animation:'fadeIn .3s ease' }}>
            {activeTab === 'README' && (
              <>
                <h2 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:14 }}>Introduction</h2>
                <p style={{ color:'var(--text2)', fontSize:13.5, lineHeight:1.75, marginBottom:24 }}>
                  SkyNet is designed for developers who need maximum performance with minimal footprint. Whether you're building for autonomous drones, industrial IoT, or smart home devices, SkyNet provides the tools to deploy complex AI models at the edge.
                </p>
                <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:14 }}>Screenshots</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
                  {[0,1].map(i => (
                    <div key={i} style={{ height:130, background:'var(--bg3)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text3)', fontSize:28, border:'1px solid var(--border)' }}>🖼</div>
                  ))}
                </div>
                <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:14 }}>Key Features</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:24 }}>
                  {features.map(f => (
                    <div key={f} style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text2)', fontSize:13 }}>
                      <span style={{ color:'var(--blue)', fontSize:15 }}>✅</span>
                      {f}
                    </div>
                  ))}
                </div>
                <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:14 }}>Quick Start</h3>
                <div style={{ background:'var(--bg3)', borderRadius:8, padding:'16px 20px', border:'1px solid var(--border)', fontFamily:'JetBrains Mono, monospace', fontSize:12, lineHeight:1.8 }}>
                  <div style={{ color:'var(--text3)' }}># Add to your Cargo.toml</div>
                  <div><span style={{ color:'#79b8ff' }}>skynet-ai</span> = <span style={{ color:'#a5d6ff' }}>"2.4.5"</span></div>
                  <div style={{ marginTop:8, color:'var(--text3)' }}># Basic usage</div>
                  <div><span style={{ color:'#f97583' }}>use</span> <span style={{ color:'var(--text2)' }}>skynet::prelude::*;</span></div>
                  <div><span style={{ color:'#f97583' }}>let</span> engine = Engine::<span style={{ color:'#b392f0' }}>new</span>(Config::<span style={{ color:'#b392f0' }}>default</span>());</div>
                </div>
              </>
            )}
            {activeTab === 'Features' && (
              <div>
                <h2 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:16 }}>All Features</h2>
                <div style={{ display:'grid', gap:12 }}>
                  {['Zero-cost abstractions — no runtime overhead', 'Multi-threaded scheduling — automatic parallelism', 'ONNX & TensorFlow support — import any model', 'WebAssembly compatible — runs in the browser', 'ARM & RISC-V optimized — edge-ready binaries', 'Async-first API — built on tokio runtime'].map(f => (
                    <div key={f} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'var(--bg3)', borderRadius:8, border:'1px solid var(--border)', fontSize:13, color:'var(--text2)' }}>
                      <span style={{ color:'var(--green)', fontSize:16 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'Benchmarks' && (
              <div>
                <h2 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:16 }}>Performance Benchmarks</h2>
                {[{ label:'Inference Speed', value:85, unit:'2.4ms avg', color:'var(--blue)' }, { label:'Memory Usage', value:60, unit:'< 8MB footprint', color:'var(--green)' }, { label:'CPU Utilization', value:40, unit:'multi-core', color:'var(--orange)' }].map(b => (
                  <div key={b.label} style={{ marginBottom:20 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:13 }}>
                      <span style={{ fontWeight:600 }}>{b.label}</span>
                      <span style={{ color:'var(--text2)' }}>{b.unit}</span>
                    </div>
                    <div style={{ height:8, background:'var(--bg3)', borderRadius:4, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${b.value}%`, background:b.color, borderRadius:4, transition:'width 1s ease', boxShadow:`0 0 8px ${b.color}66` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'Dependencies' && (
              <div>
                <h2 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:16 }}>Dependencies</h2>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {deps.map(d => <span key={d} className="tag tag-gray" style={{ fontSize:12, padding:'5px 12px' }}>{d}</span>)}
                </div>
              </div>
            )}
            {activeTab === 'Releases' && (
              <div>
                <h2 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:16 }}>Release History</h2>
                {[{ v:'v2.4.5', date:'Mar 15, 2024', notes:'Bug fixes and performance improvements' }, { v:'v2.4.0', date:'Feb 20, 2024', notes:'Added ONNX model support' }, { v:'v2.3.0', date:'Jan 10, 2024', notes:'WebAssembly target added' }].map(r => (
                  <div key={r.v} style={{ padding:'14px 16px', background:'var(--bg3)', borderRadius:8, border:'1px solid var(--border)', marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontWeight:700, color:'var(--blue)' }}>{r.v}</span>
                      <span style={{ color:'var(--text3)', fontSize:12 }}>{r.date}</span>
                    </div>
                    <p style={{ color:'var(--text2)', fontSize:13, margin:0 }}>{r.notes}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display:'flex', flexDirection:'column', gap:16, animation:'fadeInRight .4s ease .1s both' }}>
          {/* STATS */}
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>Project Stats</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                { label:'STARS', value: formatStars(starCount), trend:'+12%', color:'#e3b341' },
                { label:'FORKS', value:'1,185', trend:'+5%', color:'#56d364' },
                { label:'ISSUES', value:'24', sub:'12 closed this week', color:'#f85149' },
                { label:'WATCHERS', value:'450', sub:'Stable community', color:'#79b8ff' },
              ].map(s => (
                <div key={s.label} style={{ background:'var(--bg3)', borderRadius:8, padding:'12px 14px', border:'1px solid var(--border)' }}>
                  <div style={{ fontSize:10, color:'var(--text3)', fontWeight:600, letterSpacing:1, marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontSize:'1.5rem', fontWeight:700, lineHeight:1 }}>{s.value}</div>
                  {s.trend && <div style={{ fontSize:11, color:'#56d364', marginTop:3 }}>↑ {s.trend}</div>}
                  {s.sub && <div style={{ fontSize:10, color:'var(--text3)', marginTop:3 }}>{s.sub}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* OWNER */}
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>About Owner</h3>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(135deg,#f97316,#d29922)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>AR</div>
              <div>
                <div style={{ fontWeight:700, fontSize:14 }}>Alex Rivera</div>
                <div style={{ color:'var(--text2)', fontSize:12 }}>Core Developer • San Francisco, CA</div>
              </div>
            </div>

            {/* SOLUTIONS */}
<div className="card" style={{ padding: 20 }}>
  <h3 style={{ fontWeight: 700, marginBottom: 14, fontSize: 14 }}>💡 Solutions ({solutions.length})</h3>
  {loadingSolutions ? (
    <p style={{ color: 'var(--text2)', fontSize: 12 }}>Loading solutions...</p>
  ) : solutions.length === 0 ? (
    <p style={{ color: 'var(--text2)', fontSize: 12 }}>No solutions yet. Be the first!</p>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 300, overflowY: 'auto' }}>
      {solutions.map((sol) => (
        <div key={sol.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
          {sol.solution_type === 'text' && (
            <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.6 }}>{sol.text}</p>
          )}
          {sol.solution_type === 'github' && (
            <a
              href={sol.github_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--blue)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              🔗 View on GitHub →
            </a>
          )}
          {sol.solution_type === 'file' && (
            <div>
              <p style={{ color: 'var(--text2)', fontSize: 12, marginBottom: 6 }}>
                📎 {sol.file_path?.split('/').pop() || 'Attached file'}
              </p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleSolutionDownload(sol.id)}
                style={{ fontSize: 11 }}
              >
                ⬇️ Download
              </button>
            </div>
          )}
          <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6 }}>
            Posted {new Date(sol.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )}
  <button
    className="btn btn-outline btn-sm"
    style={{ width: '100%', marginTop: 16 }}
    onClick={() => setShowSolutionForm(!showSolutionForm)}
  >
    {showSolutionForm ? 'Cancel' : '+ Post Solution'}
  </button>
</div>

{/* SOLUTION FORM (conditionally rendered) */}
{showSolutionForm && (
  <div className="card" style={{ padding: 20 }}>
    <h4 style={{ fontWeight: 600, marginBottom: 12, fontSize: 13 }}>Post Your Solution</h4>
    <form onSubmit={handleSubmitSolution}>
      <textarea
        className="input"
        placeholder="Describe your solution..."
        rows={3}
        value={solutionText}
        onChange={(e) => setSolutionText(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <input
        className="input"
        placeholder="GitHub URL (optional)"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <input
        type="file"
        onChange={(e) => setSolutionFile(e.target.files[0])}
        style={{ marginBottom: 12, fontSize: 12 }}
      />
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={submitting}
        style={{ width: '100%' }}
      >
        {submitting ? 'Posting...' : 'Submit Solution'}
      </button>
    </form>
  </div>
)}


            {[{ icon:'🌐', text:'arivera.dev' }, { icon:'📧', text:'alex@skynet-engine.org' }].map(l => (
              <div key={l.text} style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text2)', fontSize:12, marginBottom:6 }}>
                <span>{l.icon}</span><span style={{ color:'var(--blue)', cursor:'pointer' }}>{l.text}</span>
              </div>
            ))}
            <button
              className={`btn ${supported ? 'btn-secondary' : 'btn-primary'}`}
              style={{ width:'100%', justifyContent:'center', marginTop:12, transition:'all .2s' }}
              onClick={handleSupport}>
              {supported ? '💚 Thank you!' : 'Support Project'}
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>Quick Links</h3>
            {[{ icon:'‹›', label:'Source Code', href:'#' }, { icon:'📚', label:'Tutorials', href:'/tutorials' }, { icon:'💬', label:'Discord Community', href:'#' }].map(l => (
              <a key={l.label} href={l.href} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', background:'var(--bg3)', borderRadius:7, marginBottom:8, border:'1px solid var(--border)', cursor:'pointer', transition:'all .15s', textDecoration:'none', color:'inherit' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='var(--border2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
                  <span>{l.icon}</span>{l.label}
                </div>
                <span style={{ color:'var(--text3)', fontSize:11 }}>↗</span>
              </a>
            ))}
          </div>

          {/* TOP DEPS */}
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>Top Dependencies</h3>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {deps.map(d => <span key={d} className="tag tag-gray" style={{ fontSize:11 }}>{d}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Collaborators Card */}
<div className="card" style={{ padding:20 }}>
  <h3 style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>👥 Collaborators ({takers.length})</h3>
  {takers.length === 0 ? (
    <p style={{ color:'var(--text2)', fontSize:12 }}>Be the first to join!</p>
  ) : (
    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
      {takers.map((t, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:'50%', background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff' }}>
            {t.student_name.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize:13 }}>{t.student_name}</span>
          <span style={{ marginLeft:'auto', fontSize:11, color:'var(--text3)' }}>
            {new Date(t.taken_at).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  )}
  <button 
    className="btn btn-primary" 
    style={{ width:'100%', marginTop:16 }}
    onClick={handleJoinProblem}
  >
    🤝 Join Project
  </button>
</div>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'clamp(14px,3vw,20px) clamp(14px,3vw,24px)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, color:'var(--text2)', fontSize:13 }}>
          <div style={{ width:18, height:18, background:'var(--blue)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10 }}>⊞</div>
          Built On It © 2024. Built for developers.
        </div>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          {[['Privacy','/privacy'],['Terms','/terms'],['Contact','/contact']].map(([l,to]) => <Link key={l} to={to} style={{ color:'var(--text2)', fontSize:13, textDecoration:'none' }}>{l}</Link>)}
        </div>
      </footer>
      <style>{`
        @media(min-width:769px){.project-detail-grid{grid-template-columns:minmax(0,1fr) 300px!important}}
        .project-detail-grid>div:first-child{min-width:0}
      `}</style>
    </div>
  );
}
