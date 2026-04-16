import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import NavUser from '../components/NavUser';

const CATEGORIES = ['Web Development', 'AI / ML', 'DevOps', 'Mobile', 'Security', 'Data Science', 'Systems', 'Other'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const TYPES = [
  { id: 'video', icon: '🎬', label: 'Video Tutorial' },
  { id: 'article', icon: '📝', label: 'Written Article' },
  { id: 'live', icon: '📡', label: 'Live Session' },
];

const sampleTutorials = [
  { id: 't1', type: 'video', title: 'Build a Real-Time Chat App with Go & WebSockets', author: 'goscale-org', avatar: 'GO', avatarColor: '#00bcd4', category: 'Web Development', level: 'Intermediate', duration: '48 min', views: '12.4k', likes: 892, thumb: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=200&fit=crop', tags: ['GO','WEBSOCKETS','DOCKER'] },
  { id: 't2', type: 'article', title: 'Deploying Neural Networks on Edge Devices with Rust', author: 'deepmind-labs', avatar: 'DL', avatarColor: '#3fb950', category: 'AI / ML', level: 'Advanced', duration: '15 min read', views: '8.7k', likes: 564, thumb: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=480&h=200&fit=crop', tags: ['RUST','PYTORCH','EDGE'] },
  { id: 't3', type: 'video', title: 'Next.js 14 App Router: Complete Beginner Guide', author: 'vercel-labs', avatar: 'VL', avatarColor: '#2f81f7', category: 'Web Development', level: 'Beginner', duration: '62 min', views: '31.2k', likes: 2100, thumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=480&h=200&fit=crop', tags: ['REACT','NEXT.JS','TYPESCRIPT'] },
  { id: 't4', type: 'live', title: 'Building a K8s Operator from Scratch with Go', author: 'goscale-org', avatar: 'GO', avatarColor: '#bc8cff', category: 'DevOps', level: 'Advanced', duration: '2h 10 min', views: '4.1k', likes: 311, thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=200&fit=crop', tags: ['GO','KUBERNETES','OPERATORS'] },
];

const tagColors = { GO:'tag-blue', WEBSOCKETS:'tag-green', DOCKER:'tag-blue', RUST:'tag-orange', PYTORCH:'tag-orange', EDGE:'tag-gray', REACT:'tag-blue', 'NEXT.JS':'tag-purple', TYPESCRIPT:'tag-blue', KUBERNETES:'tag-blue', OPERATORS:'tag-purple' };
const levelColors = { Beginner: '#3fb950', Intermediate: '#d29922', Advanced: '#f85149' };
const typeColors = { video: '#2f81f7', article: '#3fb950', live: '#f85149' };

const STEPS = ['Tutorial Info', 'Content & Media', 'Preview & Publish'];

export default function Tutorials() {
  const [showUpload, setShowUpload] = useState(false);
  const [step, setStep] = useState(0);
  const [filterCat, setFilterCat] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  const [navOpen, setNavOpen] = useState(true);
  const [likedIds, setLikedIds] = useState([]);

  // Upload form state
  const [form, setForm] = useState({ title: '', category: '', level: '', type: 'video', description: '', videoUrl: '', repoUrl: '', tags: '' });
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [published, setPublished] = useState(false);
  const thumbRef = useRef(null);

  const progress = ((step + 1) / STEPS.length) * 100;

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleThumb = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbFile(file);
    const reader = new FileReader();
    reader.onload = ev => setThumbPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setShowUpload(false);
      setStep(0);
      setForm({ title: '', category: '', level: '', type: 'video', description: '', videoUrl: '', repoUrl: '', tags: '' });
      setThumbFile(null);
      setThumbPreview(null);
    }, 2200);
  };

  const toggleLike = (id) => setLikedIds(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id]);

  const filtered = sampleTutorials.filter(t => {
    if (filterCat !== 'All' && t.category !== filterCat) return false;
    if (filterLevel !== 'All' && t.level !== filterLevel) return false;
    if (filterType !== 'All' && t.type !== filterType) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.author.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* TOP NAV WRAPPER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <nav style={{ height: navOpen ? 57 : 0, overflow: 'hidden', background: 'rgba(13,17,23,.95)', borderBottom: navOpen ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', padding: navOpen ? '0 clamp(12px,3vw,20px)' : '0', gap: 10, backdropFilter: 'blur(12px)', transition: 'height .35s cubic-bezier(.4,0,.2,1), padding .35s', animation: 'slideDown .4s ease' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff' }}>⊞</div>
            Built On It
          </Link>
          <div style={{ flex: 1, maxWidth: 400, position: 'relative', marginLeft: 8, minWidth: 0 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: 13 }}>🔍</span>
            <input className="input" placeholder="Search tutorials, authors, or topics..." style={{ paddingLeft: 32, height: 34 }} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
            <button className="btn btn-primary btn-sm" onClick={() => { setShowUpload(true); setStep(0); }} style={{ gap: 6, whiteSpace: 'nowrap' }}>
              <span>+</span> Upload Tutorial
            </button>
            <button className="btn-icon">🔔</button>
            <NavUser />
            <button onClick={() => setNavOpen(false)} title="Hide navigation"
              style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .18s', fontSize: 14 }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg4)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(47,129,247,.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.boxShadow = 'none'; }}>↑</button>
          </div>
        </nav>
        {/* Restore tab */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: `translateX(-50%) translateY(${navOpen ? '-100%' : '0'})`, transition: 'transform .35s cubic-bezier(.4,0,.2,1)', zIndex: 101 }}>
          <button onClick={() => setNavOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 16px', background: 'rgba(13,17,23,.97)', border: '1px solid var(--border2)', borderTop: 'none', borderRadius: '0 0 10px 10px', color: 'var(--text2)', fontSize: 12, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(12px)', boxShadow: '0 4px 20px rgba(0,0,0,.4)', transition: 'all .18s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(47,129,247,.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.4)'; }}>
            <span style={{ fontSize: 11 }}>↓</span> Built On It
          </button>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {showUpload && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(6px)', animation: 'fadeIn .2s ease' }} onClick={e => { if (e.target === e.currentTarget) setShowUpload(false); }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', animation: 'scaleIn .25s ease', boxShadow: '0 24px 80px rgba(0,0,0,.7)' }}>
            {/* Modal header */}
            <div style={{ padding: '20px 24px 0', borderBottom: '1px solid var(--border)', paddingBottom: 16, position: 'sticky', top: 0, background: 'var(--bg2)', zIndex: 10, borderRadius: '16px 16px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ color: 'var(--blue)', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>STEP {step + 1} OF {STEPS.length}</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{STEPS[step]}</div>
                </div>
                <button onClick={() => setShowUpload(false)} style={{ background: 'var(--bg4)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text2)', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; }}>×</button>
              </div>
              {/* Progress bar */}
              <div style={{ height: 3, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'var(--blue)', borderRadius: 2, width: `${progress}%`, transition: 'width .4s ease', boxShadow: '0 0 8px rgba(47,129,247,.5)' }} />
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              {/* STEP 1 */}
              {step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Tutorial type */}
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 10, color: 'var(--text)' }}>Tutorial Type</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {TYPES.map(t => (
                        <button key={t.id} onClick={() => setField('type', t.id)}
                          style={{ flex: 1, padding: '12px 10px', borderRadius: 8, border: `1px solid ${form.type === t.id ? 'var(--blue)' : 'var(--border)'}`, background: form.type === t.id ? 'rgba(47,129,247,.1)' : 'var(--bg3)', cursor: 'pointer', color: form.type === t.id ? 'var(--text)' : 'var(--text2)', transition: 'all .18s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 22 }}>{t.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 500 }}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Tutorial Title *</label>
                    <input className="input" placeholder="e.g. Build a REST API with Go and PostgreSQL" value={form.title} onChange={e => setField('title', e.target.value)} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Category *</label>
                      <select className="input" value={form.category} onChange={e => setField('category', e.target.value)} style={{ cursor: 'pointer' }}>
                        <option value="">Select category...</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Difficulty Level *</label>
                      <select className="input" value={form.level} onChange={e => setField('level', e.target.value)} style={{ cursor: 'pointer' }}>
                        <option value="">Select level...</option>
                        {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Description *</label>
                    <textarea className="input" rows={4} placeholder="Describe what viewers will learn, prerequisites, and what you'll build together..." value={form.description} onChange={e => setField('description', e.target.value)} style={{ resize: 'vertical', lineHeight: 1.6 }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Tags (comma separated)</label>
                    <input className="input" placeholder="e.g. React, TypeScript, Postgres" value={form.tags} onChange={e => setField('tags', e.target.value)} />
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Thumbnail upload */}
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Thumbnail / Cover Image</label>
                    <div
                      onClick={() => thumbRef.current?.click()}
                      style={{ height: 160, borderRadius: 10, border: `2px dashed ${thumbPreview ? 'var(--blue)' : 'var(--border2)'}`, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden', transition: 'border-color .2s', position: 'relative' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = thumbPreview ? 'var(--blue)' : 'var(--border2)'}>
                      {thumbPreview ? (
                        <>
                          <img src={thumbPreview} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .2s' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = 1}
                            onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                            <span style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>Click to change</span>
                          </div>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', color: 'var(--text3)' }}>
                          <div style={{ fontSize: 32, marginBottom: 8 }}>🖼</div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>Click to upload thumbnail</div>
                          <div style={{ fontSize: 11, marginTop: 4 }}>PNG, JPG, WebP · Max 5MB</div>
                        </div>
                      )}
                    </div>
                    <input ref={thumbRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleThumb} />
                  </div>

                  {form.type === 'video' && (
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                        <span style={{ marginRight: 6 }}>🎬</span>Video URL (YouTube, Vimeo, or direct MP4)
                      </label>
                      <input className="input" placeholder="https://youtube.com/watch?v=..." value={form.videoUrl} onChange={e => setField('videoUrl', e.target.value)} />
                    </div>
                  )}

                  {form.type === 'live' && (
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                        <span style={{ marginRight: 6 }}>📡</span>Stream / Meeting URL
                      </label>
                      <input className="input" placeholder="https://meet.google.com/... or Zoom link" value={form.videoUrl} onChange={e => setField('videoUrl', e.target.value)} />
                    </div>
                  )}

                  {form.type === 'article' && (
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                        <span style={{ marginRight: 6 }}>📝</span>Article Content (Markdown supported)
                      </label>
                      <textarea className="input" rows={8} placeholder="# Getting Started&#10;&#10;In this tutorial we'll build...&#10;&#10;## Prerequisites&#10;- Node.js 18+&#10;- Basic React knowledge" value={form.description} onChange={e => setField('description', e.target.value)} style={{ resize: 'vertical', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.7 }} />
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                      <span style={{ marginRight: 6 }}>🔗</span>Project Repository URL
                    </label>
                    <input className="input" placeholder="https://github.com/username/project-repo" value={form.repoUrl} onChange={e => setField('repoUrl', e.target.value)} />
                  </div>
                </div>
              )}

              {/* STEP 3 - Preview */}
              {step === 2 && (
                <div>
                  <div style={{ marginBottom: 16, color: 'var(--text2)', fontSize: 13 }}>Review your tutorial before publishing:</div>
                  <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 20 }}>
                    {thumbPreview ? (
                      <img src={thumbPreview} alt="thumb" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: 160, background: `linear-gradient(135deg, ${typeColors[form.type] || '#2f81f7'}22, ${typeColors[form.type] || '#2f81f7'}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
                        {TYPES.find(t => t.id === form.type)?.icon || '🎬'}
                      </div>
                    )}
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                        <span className="badge badge-blue" style={{ fontSize: 9 }}>{(TYPES.find(t => t.id === form.type)?.label || 'VIDEO').toUpperCase()}</span>
                        {form.level && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: (levelColors[form.level] || '#3fb950') + '22', color: levelColors[form.level] || '#3fb950', fontWeight: 600 }}>{form.level}</span>}
                        {form.category && <span style={{ fontSize: 10, color: 'var(--text3)', background: 'var(--bg4)', padding: '2px 8px', borderRadius: 4 }}>{form.category}</span>}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{form.title || 'Untitled Tutorial'}</div>
                      <p style={{ color: 'var(--text2)', fontSize: 12.5, lineHeight: 1.6, marginBottom: 12 }}>{form.description || 'No description provided.'}</p>
                      {form.tags && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => <span key={t} className="tag tag-blue" style={{ fontSize: 11 }}>{t.toUpperCase()}</span>)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Publish success */}
                  {published && (
                    <div style={{ padding: '16px', background: 'rgba(63,185,80,.12)', border: '1px solid rgba(63,185,80,.3)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, animation: 'scaleIn .3s ease' }}>
                      <span style={{ fontSize: 20 }}>🎉</span>
                      <div>
                        <div style={{ fontWeight: 700, color: '#56d364', fontSize: 14 }}>Tutorial Published!</div>
                        <div style={{ color: 'var(--text2)', fontSize: 12 }}>Your tutorial is now live on Built On It.</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <button className="btn btn-ghost" onClick={() => setShowUpload(false)} style={{ color: 'var(--text2)' }}>Cancel</button>
                <div style={{ display: 'flex', gap: 10 }}>
                  {step > 0 && (
                    <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
                  )}
                  {step < STEPS.length - 1 ? (
                    <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={step === 0 && !form.title.trim()}>
                      Next Step →
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-lg" onClick={handlePublish} style={{ minWidth: 140, justifyContent: 'center' }} disabled={published}>
                      {published ? '✓ Published!' : '🚀 Publish Tutorial'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* HERO */}
        <div style={{ marginBottom: 32, animation: 'fadeIn .4s ease' }}>
          <div className="badge badge-purple" style={{ marginBottom: 14, fontSize: 10, letterSpacing: 1 }}>📚 COMMUNITY KNOWLEDGE</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, letterSpacing: -0.5, marginBottom: 8 }}>Project Tutorials</h1>
              <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6, maxWidth: 520 }}>Learn from the community. Watch video walkthroughs, read in-depth guides, and join live sessions from the developers who built your favourite projects.</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => { setShowUpload(true); setStep(0); }} style={{ whiteSpace: 'nowrap' }}>
              + Upload Tutorial
            </button>
          </div>
        </div>

        {/* STATS STRIP */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12, marginBottom: 32, animation: 'fadeIn .4s ease .05s both' }}>
          {[{ n: '847', l: 'Tutorials', icon: '📚' }, { n: '12.4k', l: 'Learners', icon: '👥' }, { n: '342', l: 'Contributors', icon: '✦' }, { n: '98%', l: 'Rated Helpful', icon: '⭐' }].map(s => (
            <div key={s.l} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem', lineHeight: 1 }}>{s.n}</div>
                <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center', animation: 'fadeIn .4s ease .1s both' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['All', ...CATEGORIES.slice(0, 5)].map(c => (
              <button key={c} onClick={() => setFilterCat(c)} style={{ padding: '5px 14px', borderRadius: 100, border: `1px solid ${filterCat === c ? 'var(--blue)' : 'var(--border)'}`, background: filterCat === c ? 'rgba(47,129,247,.15)' : 'transparent', color: filterCat === c ? 'var(--blue)' : 'var(--text2)', fontSize: 12, cursor: 'pointer', fontWeight: filterCat === c ? 600 : 400, transition: 'all .15s' }}>{c}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map(l => (
              <button key={l} onClick={() => setFilterLevel(l)} style={{ padding: '5px 12px', borderRadius: 6, border: `1px solid ${filterLevel === l ? 'var(--blue)' : 'var(--border)'}`, background: filterLevel === l ? 'rgba(47,129,247,.12)' : 'transparent', color: filterLevel === l ? 'var(--text)' : 'var(--text2)', fontSize: 12, cursor: 'pointer', transition: 'all .15s' }}>{l}</button>
            ))}
            <select className="input" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ height: 32, paddingTop: 0, paddingBottom: 0, fontSize: 12, cursor: 'pointer', width: 'auto' }}>
              <option value="All">All Types</option>
              {TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
        </div>

        {/* TUTORIALS GRID */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 600 }}>No tutorials match your filters</div>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 16 }} onClick={() => { setFilterCat('All'); setFilterLevel('All'); setFilterType('All'); setSearch(''); }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18, marginBottom: 48 }}>
            {filtered.map((t, i) => (
              <Link key={t.id} to={`/tutorial/${t.id}`} style={{ textDecoration:'none', display:'block', animation: `fadeIn .4s ease ${i * 0.08}s both` }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', transition:'transform .18s, box-shadow .18s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=''; }}>
                  {/* Thumbnail */}
                  <div style={{ height: 140, position: 'relative', overflow: 'hidden' }}>
                    <img src={t.thumb} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.75))' }} />
                    {/* Type badge */}
                    <span style={{ position: 'absolute', top: 10, left: 10, padding: '3px 9px', borderRadius: 6, background: (typeColors[t.type] || '#2f81f7') + 'cc', color: '#fff', fontSize: 11, fontWeight: 600, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {TYPES.find(x => x.id === t.type)?.icon} {TYPES.find(x => x.id === t.type)?.label}
                    </span>
                    {/* Level badge */}
                    <span style={{ position: 'absolute', top: 10, right: 10, padding: '2px 8px', borderRadius: 6, background: 'rgba(0,0,0,.6)', color: levelColors[t.level] || '#fff', fontSize: 10, fontWeight: 600, backdropFilter: 'blur(4px)' }}>{t.level}</span>
                    {/* Duration */}
                    <span style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 11, color: 'rgba(255,255,255,.85)', fontWeight: 500 }}>⏱ {t.duration}</span>
                  </div>

                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, lineHeight: 1.3, color: 'var(--text)' }}>{t.title}</div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                      {t.tags.map(tag => <span key={tag} className={`tag ${tagColors[tag] || 'tag-gray'}`}>{tag}</span>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text2)' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: t.avatarColor + '33', border: `1px solid ${t.avatarColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: t.avatarColor }}>{t.avatar}</div>
                        {t.author}
                      </div>
                      <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--text3)' }}>
                        <span>👁 {t.views}</span>
                        <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleLike(t.id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: likedIds.includes(t.id) ? '#f85149' : 'var(--text3)', padding: 0, display: 'flex', alignItems: 'center', gap: 2, transition: 'color .15s' }}>
                          {likedIds.includes(t.id) ? '❤' : '♡'} {t.likes + (likedIds.includes(t.id) ? 1 : 0)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Upload CTA card */}
            <div className="card" onClick={() => { setShowUpload(true); setStep(0); }} style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px dashed var(--border2)', minHeight: 280, gap: 12, transition: 'all .2s', textAlign: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'rgba(47,129,247,.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.background = ''; }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--bg4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1px solid var(--border2)' }}>+</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Share Your Knowledge</div>
                <div style={{ color: 'var(--text2)', fontSize: 12, lineHeight: 1.5 }}>Upload a tutorial and teach the community how to build something awesome.</div>
              </div>
              <span className="btn btn-primary btn-sm" style={{ marginTop: 6 }}>Upload Tutorial</span>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
            <div style={{ width: 18, height: 18, background: 'var(--blue)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>⊞</div>
            Built On It © 2024
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[['Privacy','/privacy'],['Terms','/terms'],['About','/about'],['Contact','/contact']].map(([l,to]) => <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 13, textDecoration: 'none' }}>{l}</Link>)}
          </div>
        </footer>
      </div>
    </div>
  );
}

