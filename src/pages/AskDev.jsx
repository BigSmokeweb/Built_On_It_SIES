import { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Sample Data ─────────────────────────────────────────────────────────────
const TAGS = ['React', 'Rust', 'TypeScript', 'Go', 'Python', 'Docker', 'Kubernetes', 'AI/ML', 'CSS', 'Node.js', 'Security', 'Database'];

const samplePosts = [
  {
    id: 'c1', votes: 284, userVote: 0, title: 'How do I debounce an API call inside a useEffect without memory leaks?',
    body: 'I have a search input that fires an API call on every keystroke. I\'m using useEffect with a debounce function but React is warning me about memory leaks when the component unmounts mid-request. What is the correct pattern here?',
    tags: ['React', 'TypeScript'], author: 'aviator_codes', avatar: 'AC', avatarColor: '#2f81f7',
    comments: 42, time: '3h ago', solved: true, category: 'Frontend',
  },
  {
    id: 'c2', votes: 157, userVote: 0, title: 'Rust borrow checker: cannot borrow `x` as mutable more than once at a time',
    body: 'I\'m trying to mutate a Vec while iterating over it. This seems like a very common pattern but the borrow checker is throwing an error. Is the correct fix to clone the vec first, or is there a zero-copy approach?',
    tags: ['Rust'], author: 'ferris_wheel', avatar: 'FW', avatarColor: '#d29922',
    comments: 31, time: '5h ago', solved: true, category: 'Systems',
  },
  {
    id: 'c3', votes: 89, userVote: 0, title: 'Kubernetes pod keeps CrashLoopBackOff — no logs, just exits immediately',
    body: 'My Go service exits with code 1 inside a k8s pod but when I run the Docker image locally it works fine. There are no logs before the crash. The only difference I can think of is env vars. How do I debug this?',
    tags: ['Kubernetes', 'Docker', 'Go'], author: 'goscale_dev', avatar: 'GS', avatarColor: '#3fb950',
    comments: 18, time: '8h ago', solved: false, category: 'DevOps',
  },
  {
    id: 'c4', votes: 213, userVote: 0, title: 'Best approach for streaming LLM output to a React frontend with Server-Sent Events?',
    body: 'I\'m building a ChatGPT-like interface where the AI response streams token by token. I\'ve tried WebSockets but they feel like overkill. Is SSE + ReadableStream the right approach? What are the pitfalls with React state updates?',
    tags: ['React', 'AI/ML', 'Node.js'], author: 'neuralweaver', avatar: 'NW', avatarColor: '#bc8cff',
    comments: 67, time: '1h ago', solved: false, category: 'AI / ML',
  },
  {
    id: 'c5', votes: 44, userVote: 0, title: 'PostgreSQL query taking 8 seconds on a 2M row table — indexes not helping?',
    body: 'I have a compound index on (user_id, created_at) but EXPLAIN ANALYZE shows a sequential scan. The query is SELECT * FROM events WHERE user_id = $1 AND status = \'active\' ORDER BY created_at DESC LIMIT 20. What am I missing?',
    tags: ['Database', 'TypeScript'], author: 'query_king', avatar: 'QK', avatarColor: '#00bcd4',
    comments: 25, time: '2d ago', solved: true, category: 'Database',
  },
  {
    id: 'c6', votes: 99, userVote: 0, title: 'CSS Grid auto-fit vs auto-fill — why are my columns not collapsing?',
    body: 'I\'m using grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) but on small screens I still get a horizontal scroll instead of the columns collapsing to one. I\'ve set width: 100% on the container. What am I missing?',
    tags: ['CSS'], author: 'pixel_pusher', avatar: 'PP', avatarColor: '#f472b6',
    comments: 13, time: '6h ago', solved: false, category: 'Frontend',
  },
];

const CATEGORIES = ['All', 'Frontend', 'Systems', 'DevOps', 'AI / ML', 'Database', 'Security', 'Mobile'];
const SORTS = ['Hot', 'New', 'Top', 'Rising'];

// ─── Components ───────────────────────────────────────────────────────────────
function VoteButton({ count, userVote, onVote }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 32 }}>
      <button onClick={() => onVote(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: userVote === 1 ? 'var(--blue)' : 'var(--text3)', lineHeight: 1, padding: '2px 4px', borderRadius: 4, transition: 'color .15s' }}
        onMouseEnter={e => { if (userVote !== 1) e.currentTarget.style.color = 'var(--text2)'; }}
        onMouseLeave={e => { if (userVote !== 1) e.currentTarget.style.color = 'var(--text3)'; }}>▲</button>
      <span style={{ fontSize: 13, fontWeight: 700, color: userVote === 1 ? 'var(--blue)' : userVote === -1 ? 'var(--red)' : 'var(--text)', lineHeight: 1 }}>
        {count + userVote}
      </span>
      <button onClick={() => onVote(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: userVote === -1 ? 'var(--red)' : 'var(--text3)', lineHeight: 1, padding: '2px 4px', borderRadius: 4, transition: 'color .15s' }}
        onMouseEnter={e => { if (userVote !== -1) e.currentTarget.style.color = 'var(--text2)'; }}
        onMouseLeave={e => { if (userVote !== -1) e.currentTarget.style.color = 'var(--text3)'; }}>▼</button>
    </div>
  );
}

const LANGS = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'SQL', 'Bash', 'YAML', 'JSON', 'CSS', 'HTML', 'Other'];

function SolutionCard({ s, i }) {
  const [svotes, setSvotes] = useState(s.votes);
  const [sv, setSv] = useState(0);
  const handleVote = (dir) => { const nv = sv === dir ? 0 : dir; setSv(nv); setSvotes(s.votes + nv); };
  return (
    <div style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--border)', animation: `fadeIn .3s ease ${i * 0.07}s both` }}>
      <VoteButton count={svotes} userVote={sv} onVote={handleVote} />
      <div style={{ flex: 1 }}>
        {s.accepted && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#56d364', fontSize: 11, fontWeight: 600, marginBottom: 10, background: 'rgba(63,185,80,.08)', border: '1px solid rgba(63,185,80,.25)', borderRadius: 6, padding: '4px 10px' }}>✓ Accepted Solution</div>
        )}
        {s.explanation && <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>{s.explanation}</p>}
        {s.code && (
          <div style={{ marginBottom: 12, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ background: 'var(--bg4)', padding: '6px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>{s.lang || 'code'}</span>
              <button onClick={() => navigator.clipboard?.writeText(s.code)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 11, padding: '2px 6px' }}>📋 Copy</button>
            </div>
            <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--bg3)', fontSize: 12, lineHeight: 1.8, overflowX: 'auto', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text2)', whiteSpace: 'pre' }}>{s.code}</pre>
          </div>
        )}
        {!s.explanation && !s.code && s.body && (
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit', fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, margin: '0 0 10px' }}>{s.body}</pre>
        )}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {s.repoUrl && <a href={s.repoUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6, background: 'rgba(47,129,247,.1)', border: '1px solid rgba(47,129,247,.25)', color: 'var(--blue)', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>‹› View Repository ↗</a>}
          {s.fileName && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6, background: 'var(--bg4)', border: '1px solid var(--border)', color: 'var(--text2)', fontSize: 12 }}>📄 {s.fileName}</span>}
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text3)', alignItems: 'center' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: s.avatarColor + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: s.avatarColor }}>{s.avatar}</div>
          <span style={{ color: 'var(--text2)' }}>{s.author}</span><span>·</span><span>{s.time}</span>
        </div>
      </div>
    </div>
  );
}

function PostModal({ post, onClose }) {
  const [solutions, setSolutions] = useState([
    { id: 1, author: 'rustacean_pro', avatar: 'RP', avatarColor: '#3fb950', votes: 89, explanation: 'The cleanest pattern is to return a cleanup function from useEffect that sets a cancelled flag. This prevents state updates on unmounted components without needing extra libraries.', code: `useEffect(() => {\n  let cancelled = false;\n  const timer = setTimeout(async () => {\n    const data = await fetchAPI(query);\n    if (!cancelled) setResults(data);\n  }, 300);\n  return () => { cancelled = true; clearTimeout(timer); };\n}, [query]);`, lang: 'JavaScript', repoUrl: 'https://github.com/example/react-debounce-patterns', fileName: '', time: '2h ago', accepted: true },
    { id: 2, author: 'reactHooksGuru', avatar: 'RH', avatarColor: '#bc8cff', votes: 34, explanation: 'Use AbortController — this cancels the in-flight network request at the browser level rather than just ignoring the response. Far more efficient for real-world search inputs.', code: `useEffect(() => {\n  const controller = new AbortController();\n  fetch(url, { signal: controller.signal })\n    .then(r => r.json())\n    .then(setResults)\n    .catch(() => {});\n  return () => controller.abort();\n}, [url]);`, lang: 'JavaScript', repoUrl: '', fileName: 'useSearch.hook.ts', time: '3h ago', accepted: false },
  ]);
  const [tab, setTab] = useState('explain');
  const [postVote, setPostVote] = useState(post.userVote);
  const [form, setForm] = useState({ explanation: '', code: '', lang: 'JavaScript', repoUrl: '', file: null });
  const [submitted, setSubmitted] = useState(false);
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleFile = (e) => { const f = e.target.files?.[0]; if (f) setF('file', f); };
  const submit = () => {
    if (!form.explanation.trim() && !form.code.trim()) return;
    setSolutions(s => [...s, { id: Date.now(), author: 'you', avatar: 'ME', avatarColor: '#2f81f7', votes: 0, explanation: form.explanation, code: form.code, lang: form.lang, repoUrl: form.repoUrl, fileName: form.file?.name || '', time: 'just now', accepted: false }]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ explanation: '', code: '', lang: 'JavaScript', repoUrl: '', file: null }); setTab('explain'); }, 1600);
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 16px', backdropFilter: 'blur(6px)', overflowY: 'auto', animation: 'fadeIn .2s ease' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, width: '100%', maxWidth: 820, animation: 'scaleIn .25s ease', boxShadow: '0 24px 80px rgba(0,0,0,.7)', marginBottom: 24 }}>
        {/* Problem header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <VoteButton count={post.votes} userVote={postVote} onVote={v => setPostVote(cur => cur === v ? 0 : v)} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {post.solved && <span style={{ fontSize: 10, background: 'rgba(63,185,80,.15)', color: '#56d364', border: '1px solid rgba(63,185,80,.3)', borderRadius: 4, padding: '2px 7px', fontWeight: 600 }}>✓ SOLVED</span>}
              <span style={{ fontSize: 10, background: 'var(--bg4)', color: 'var(--text3)', borderRadius: 4, padding: '2px 7px' }}>{post.category}</span>
              {post.tags.map(t => <span key={t} className="tag tag-blue" style={{ fontSize: 10 }}>{t}</span>)}
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h2>
            <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7, background: 'var(--bg3)', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid var(--blue)', margin: 0 }}>{post.body}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 12, color: 'var(--text3)', alignItems: 'center' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: post.avatarColor + '33', border: `1px solid ${post.avatarColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: post.avatarColor }}>{post.avatar}</div>
              <span style={{ color: 'var(--text2)' }}>{post.author}</span><span>·</span><span>{post.time}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'var(--bg4)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text2)', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>×</button>
        </div>

        {/* Solutions list */}
        <div style={{ padding: '0 24px' }}>
          <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>💡 {solutions.length} Solution{solutions.length !== 1 ? 's' : ''}</span>
            <span style={{ color: 'var(--text3)', fontSize: 12 }}>Sorted by votes</span>
          </div>
          {solutions.map((s, i) => <SolutionCard key={s.id} s={s} i={i} />)}
        </div>

        {/* Reply form */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>💡 Post Your Solution</div>
          <div style={{ color: 'var(--text3)', fontSize: 12, marginBottom: 16 }}>Add an explanation, paste your code, link a repo, or attach a file — the more detail, the better rated your solution will be.</div>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 16 }}>
            {[['explain', '📝 Explanation'], ['code', '‹› Code Snippet'], ['links', '🔗 Repo & File']].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 16px', border: 'none', borderBottom: `2px solid ${tab === id ? 'var(--blue)' : 'transparent'}`, cursor: 'pointer', background: 'transparent', color: tab === id ? 'var(--text)' : 'var(--text2)', fontSize: 13, fontWeight: tab === id ? 600 : 400, transition: 'all .18s', marginBottom: -1 }}>{label}</button>
            ))}
          </div>
          {tab === 'explain' && (
            <textarea className="input" rows={6} placeholder="Explain your solution step by step. What's the root cause? How does your fix address it? What edge cases should they watch for?" value={form.explanation} onChange={e => setF('explanation', e.target.value)} style={{ resize: 'vertical', lineHeight: 1.75 }} />
          )}
          {tab === 'code' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontWeight: 600, fontSize: 12, color: 'var(--text2)' }}>Language</label>
                <select className="input" value={form.lang} onChange={e => setF('lang', e.target.value)} style={{ height: 30, paddingTop: 0, paddingBottom: 0, fontSize: 12, width: 'auto', cursor: 'pointer' }}>
                  {LANGS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <textarea className="input" rows={9} placeholder={`// Paste your ${form.lang} solution here...\n// Add comments to explain each step`} value={form.code} onChange={e => setF('code', e.target.value)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, lineHeight: 1.8, resize: 'vertical' }} />
              {form.code && (
                <div style={{ marginTop: 8, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <div style={{ background: 'var(--bg4)', padding: '5px 12px', fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace', borderBottom: '1px solid var(--border)' }}>Preview · {form.lang}</div>
                  <pre style={{ margin: 0, padding: '12px 16px', background: 'var(--bg3)', fontSize: 12, lineHeight: 1.8, overflowX: 'auto', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text2)', whiteSpace: 'pre' }}>{form.code}</pre>
                </div>
              )}
            </div>
          )}
          {tab === 'links' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>‹› GitHub / Repository URL <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: 11 }}>optional</span></label>
                <input className="input" placeholder="https://github.com/yourusername/solution-repo" value={form.repoUrl} onChange={e => setF('repoUrl', e.target.value)} />
                {form.repoUrl && !form.repoUrl.startsWith('http') && <div style={{ fontSize: 11, color: 'var(--orange)', marginTop: 4 }}>⚠ Include https://</div>}
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>📄 Attach a Code File <span style={{ color: 'var(--text3)', fontWeight: 400, fontSize: 11 }}>optional · .js .ts .py .go .rs .sql .md</span></label>
                <div onClick={() => document.getElementById('sol-file')?.click()}
                  style={{ padding: '20px', border: `2px dashed ${form.file ? 'var(--blue)' : 'var(--border2)'}`, borderRadius: 8, background: 'var(--bg3)', cursor: 'pointer', textAlign: 'center', transition: 'border-color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = form.file ? 'var(--blue)' : 'var(--border2)'}>
                  {form.file ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>📄</span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{form.file.name}</div>
                        <div style={{ color: 'var(--text3)', fontSize: 11 }}>{(form.file.size / 1024).toFixed(1)} KB · Click to change</div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); setF('file', null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 18 }}>×</button>
                    </div>
                  ) : (
                    <div style={{ color: 'var(--text3)' }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>Click to upload a code file</div>
                      <div style={{ fontSize: 11, marginTop: 4 }}>Any source file up to 500KB</div>
                    </div>
                  )}
                </div>
                <input id="sol-file" type="file" accept=".js,.ts,.jsx,.tsx,.py,.go,.rs,.sql,.md,.txt,.yaml,.json,.css" style={{ display: 'none' }} onChange={handleFile} />
              </div>
            </div>
          )}
          {submitted && (
            <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(63,185,80,.12)', border: '1px solid rgba(63,185,80,.3)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, animation: 'scaleIn .3s ease' }}>
              <span style={{ fontSize: 18 }}>🎉</span><span style={{ color: '#56d364', fontWeight: 600, fontSize: 13 }}>Solution posted! The community will rate it.</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {form.explanation && <span style={{ color: 'var(--green)' }}>✓ Explanation</span>}
              {form.code && <span style={{ color: 'var(--green)' }}>✓ Code ({form.lang})</span>}
              {form.repoUrl && <span style={{ color: 'var(--green)' }}>✓ Repo</span>}
              {form.file && <span style={{ color: 'var(--green)' }}>✓ {form.file.name}</span>}
            </div>
            <button className="btn btn-primary" onClick={submit} disabled={(!form.explanation.trim() && !form.code.trim()) || submitted}>💡 Post Solution</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Community() {
  const [posts, setPosts] = useState(samplePosts);
  const [sort, setSort] = useState('Hot');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [navOpen, setNavOpen] = useState(true);
  const [showPost, setShowPost] = useState(false);
  const [openPost, setOpenPost] = useState(null);

  // New post form
  const [form, setForm] = useState({ title: '', body: '', tags: '', category: '' });
  const [posted, setPosted] = useState(false);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleVote = (id, dir) => {
    setPosts(ps => ps.map(p => {
      if (p.id !== id) return p;
      const newVote = p.userVote === dir ? 0 : dir;
      return { ...p, userVote: newVote };
    }));
  };

  const handleSubmitPost = () => {
    if (!form.title.trim()) return;
    const newPost = {
      id: 'c' + Date.now(), votes: 1, userVote: 1,
      title: form.title, body: form.body,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      author: 'you', avatar: 'ME', avatarColor: '#2f81f7',
      comments: 0, time: 'just now', solved: false,
      category: form.category || 'General',
    };
    setPosts(ps => [newPost, ...ps]);
    setPosted(true);
    setTimeout(() => { setPosted(false); setShowPost(false); setForm({ title: '', body: '', tags: '', category: '' }); }, 1800);
  };

  const filtered = posts
    .filter(p => category === 'All' || p.category === category)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.join(' ').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'New') return b.id.localeCompare(a.id);
      if (sort === 'Top') return (b.votes + b.userVote) - (a.votes + a.userVote);
      if (sort === 'Rising') return b.comments - a.comments;
      return (b.votes + b.userVote) - (a.votes + a.userVote); // Hot
    });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* TOP NAV */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <nav style={{ height: navOpen ? 57 : 0, overflow: 'hidden', background: 'rgba(13,17,23,.95)', borderBottom: navOpen ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', padding: navOpen ? '0 20px' : '0', gap: 12, backdropFilter: 'blur(12px)', transition: 'height .35s cubic-bezier(.4,0,.2,1), padding .35s', animation: 'slideDown .4s ease' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>⊞</div>
            DevVault
          </Link>
          <div style={{ flex: 1, maxWidth: 420, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: 13 }}>🔍</span>
            <input className="input" placeholder="Search problems & solutions..." style={{ paddingLeft: 32, height: 34 }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setShowPost(true)}>+ Post Problem</button>
            <button className="btn-icon">🔔</button>
            <div className="avatar-placeholder">DV</div>
            <button onClick={() => setNavOpen(false)} title="Hide navigation"
              style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .18s', fontSize: 14 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg4)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(47,129,247,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.boxShadow = 'none'; }}>↑</button>
          </div>
        </nav>
        {/* Restore tab */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: `translateX(-50%) translateY(${navOpen ? '-100%' : '0'})`, transition: 'transform .35s cubic-bezier(.4,0,.2,1)', zIndex: 101 }}>
          <button onClick={() => setNavOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 16px', background: 'rgba(13,17,23,.97)', border: '1px solid var(--border2)', borderTop: 'none', borderRadius: '0 0 10px 10px', color: 'var(--text2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,.4)', transition: 'all .18s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(47,129,247,.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.4)'; }}>
            <span style={{ fontSize: 11 }}>↓</span> DevVault
          </button>
        </div>
      </div>

      {/* POST PROBLEM MODAL */}
      {showPost && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(6px)', animation: 'fadeIn .2s ease' }}
          onClick={e => { if (e.target === e.currentTarget) setShowPost(false); }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, width: '100%', maxWidth: 600, animation: 'scaleIn .25s ease', boxShadow: '0 24px 80px rgba(0,0,0,.7)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Post a Problem</div>
                <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>Describe your problem clearly and get the best solution from the community</div>
              </div>
              <button onClick={() => setShowPost(false)} style={{ background: 'var(--bg4)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text2)', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>×</button>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Problem Title *</label>
                <input className="input" placeholder="e.g. How do I efficiently paginate a MongoDB collection with aggregation?" value={form.title} onChange={e => setField('title', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Describe Your Problem *</label>
                <textarea className="input" rows={5} placeholder="Include what you've already tried, error messages, code snippets, and what result you expect vs what you're getting..." value={form.body} onChange={e => setField('body', e.target.value)} style={{ resize: 'vertical', lineHeight: 1.6 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Category</label>
                  <select className="input" value={form.category} onChange={e => setField('category', e.target.value)} style={{ cursor: 'pointer' }}>
                    <option value="">Select...</option>
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Tags (comma separated)</label>
                  <input className="input" placeholder="e.g. React, TypeScript" value={form.tags} onChange={e => setField('tags', e.target.value)} />
                </div>
              </div>
              {posted && (
                <div style={{ padding: '12px 16px', background: 'rgba(63,185,80,.12)', border: '1px solid rgba(63,185,80,.3)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, color: '#56d364', fontWeight: 600, fontSize: 13, animation: 'scaleIn .3s ease' }}>
                  🎉 Problem posted! The community is on it.
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                <button className="btn btn-ghost" onClick={() => setShowPost(false)} style={{ color: 'var(--text2)' }}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmitPost} disabled={!form.title.trim() || posted}>
                  🚀 Post Problem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POST DETAIL MODAL */}
      {openPost && <PostModal post={openPost} onClose={() => setOpenPost(null)} />}

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '24px 20px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
        {/* LEFT — FEED */}
        <div>
          {/* Hero */}
          <div style={{ marginBottom: 20, animation: 'fadeIn .4s ease' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>👥 Dev Community</h1>
            <p style={{ color: 'var(--text2)', fontSize: 13 }}>Post your toughest problems. Get battle-tested solutions from the community.</p>
          </div>

          {/* Sort + Filters */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', animation: 'fadeIn .4s ease .05s both' }}>
            {SORTS.map(s => (
              <button key={s} onClick={() => setSort(s)} style={{ padding: '5px 14px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: sort === s ? 600 : 400, background: sort === s ? 'var(--blue)' : 'transparent', color: sort === s ? '#fff' : 'var(--text2)', transition: 'all .15s' }}>{s === 'Hot' ? '🔥' : s === 'New' ? '✨' : s === 'Top' ? '⭐' : '📈'} {s}</button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{ padding: '4px 12px', borderRadius: 100, border: `1px solid ${category === c ? 'var(--blue)' : 'var(--border)'}`, background: category === c ? 'rgba(47,129,247,.15)' : 'transparent', color: category === c ? 'var(--blue)' : 'var(--text2)', fontSize: 11, cursor: 'pointer', fontWeight: category === c ? 600 : 400, transition: 'all .15s' }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Post Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div style={{ fontWeight: 600 }}>No problems found</div>
                <button className="btn btn-primary btn-sm" style={{ marginTop: 16 }} onClick={() => { setCategory('All'); setSearch(''); }}>Clear filters</button>
              </div>
            )}
            {filtered.map((post, i) => (
              <div key={post.id} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition: 'border-color .18s, transform .18s, box-shadow .18s', animation: `fadeIn .35s ease ${i * 0.05}s both` }}>
                <div style={{ display: 'flex', gap: 0 }}>
                  {/* Vote column */}
                  <div style={{ background: 'var(--bg3)', padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid var(--border)', minWidth: 52 }}>
                    <VoteButton count={post.votes} userVote={post.userVote} onVote={dir => handleVote(post.id, dir)} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, padding: '14px 18px' }} onClick={() => setOpenPost(post)}>
                    {/* Meta row */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                      {post.solved && <span style={{ fontSize: 10, background: 'rgba(63,185,80,.15)', color: '#56d364', border: '1px solid rgba(63,185,80,.3)', borderRadius: 4, padding: '1px 6px', fontWeight: 600 }}>✓ SOLVED</span>}
                      <span style={{ fontSize: 10, background: 'var(--bg4)', color: 'var(--text3)', borderRadius: 4, padding: '1px 6px' }}>{post.category}</span>
                      {post.tags.map(t => <span key={t} className="tag tag-blue" style={{ fontSize: 10 }}>{t}</span>)}
                      <span style={{ marginLeft: 'auto', color: 'var(--text3)', fontSize: 11 }}>posted by <span style={{ color: 'var(--blue)' }}>{post.author}</span> · {post.time}</span>
                    </div>

                    {/* Title */}
                    <h2 style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginBottom: 6, color: 'var(--text)' }}>{post.title}</h2>

                    {/* Body snippet */}
                    <p style={{ color: 'var(--text2)', fontSize: 12.5, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 10 }}>{post.body}</p>

                    {/* Action row */}
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text3)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        💬 {post.comments} solution{post.comments !== 1 ? 's' : ''}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'color .15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text2)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
                        🔗 Share
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', transition: 'color .15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text2)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}>
                        🔖 Save
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: navOpen ? 77 : 20, transition: 'top .35s', animation: 'fadeInRight .4s ease .1s both' }}>
          {/* Post CTA */}
          <div style={{ background: 'linear-gradient(135deg, rgba(47,129,247,.15), rgba(188,140,255,.1))', border: '1px solid rgba(47,129,247,.3)', borderRadius: 10, padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Have a Problem?</div>
            <p style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>Post it here and get solutions from experienced developers around the world.</p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontWeight: 600 }} onClick={() => setShowPost(true)}>+ Post Your Problem</button>
          </div>

          {/* Community Stats */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>📊 Community Stats</div>
            {[{ label: 'Problems Posted', value: '3,847', icon: '📋' }, { label: 'Solutions Given', value: '12.4k', icon: '💡' }, { label: 'Problems Solved', value: '2,910', icon: '✅' }, { label: 'Active Members', value: '8,200', icon: '👥' }].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text2)', fontSize: 12 }}>{s.icon} {s.label}</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{s.value}</span>
              </div>
            ))}
            <div style={{ padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text2)', fontSize: 12 }}>🟢 Online Now</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--green)' }}>348</span>
            </div>
          </div>

          {/* Community Rules */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>📜 Rules</div>
            {['Be specific — include error messages & code', 'Search before posting duplicates', 'Mark your problem solved when fixed', 'Respect all experience levels', 'No spam or self-promotion'].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: 'var(--text2)', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>{r}
              </div>
            ))}
          </div>

          {/* Hot Tags */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>🔥 Hot Topics</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {TAGS.map(t => <button key={t} onClick={() => setSearch(t)} className="tag tag-blue" style={{ cursor: 'pointer', border: '1px solid rgba(47,129,247,.2)', fontSize: 11, padding: '3px 9px', background: 'rgba(47,129,247,.08)', transition: 'all .15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(47,129,247,.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(47,129,247,.08)'}>{t}</button>)}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
          <div style={{ width: 18, height: 18, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>⊞</div>
          DevVault © 2024
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'About', 'Contact'].map(l => <span key={l} style={{ color: 'var(--text2)', fontSize: 13, cursor: 'pointer' }}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}
