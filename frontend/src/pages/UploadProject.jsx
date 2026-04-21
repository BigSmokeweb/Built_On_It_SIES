import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createProblem } from '../api.js';
import NavUser from '../components/NavUser';

const STEPS = ['Describe Problem', 'Add Details', 'Review & Publish'];

export default function SubmitProblem() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [form, setForm] = useState({ title: '', description: '', repoLink: '' });
  const [loading, setLoading] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (t) => setTags(tags.filter(x => x !== t));

  const handlePublish = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert('Please provide a title and description for your problem.');
      return;
    }
    setLoading(true);
    try {
      await createProblem({ title: form.title, description: form.description });
      navigate('/explore');
    } catch (err) {
      const msg = err?.response?.data?.error
        || (typeof err?.response?.data === 'string' ? err.response.data : null)
        || err?.message || 'Unknown error';
      alert(`Failed to publish problem: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const canNext = step === 0 ? form.title.trim() && form.description.trim() : true;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* TOP NAV */}
      <nav style={{
        height: 57, background: 'rgba(13,17,23,.97)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 clamp(12px,3vw,24px)', gap: 12,
        position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 15, color: 'var(--text)', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff' }}>⊞</div>
          Built On It
        </Link>
        <div style={{ flex: 1 }} />
        <Link to="/explore" style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'none', padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border)', transition: 'all .15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}>
          Browse Problems
        </Link>
        <NavUser />
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(24px,5vw,48px) clamp(16px,4vw,24px)', animation: 'fadeIn .4s ease' }}>

        {/* PAGE HEADER */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(47,129,247,.1)', border: '1px solid rgba(47,129,247,.2)', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#58a6ff', fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>
            📋 SUBMIT A PROBLEM
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 900, letterSpacing: -0.5, marginBottom: 8, color: 'var(--text)' }}>
            Share Your Challenge
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: 14, lineHeight: 1.6 }}>
            Describe a problem you're facing — the community will help solve it or build a mini-project around it.
          </p>
        </div>

        {/* STEP INDICATORS */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, gap: 0 }}>
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, flexShrink: 0, transition: 'all .3s',
                    background: done ? '#2f81f7' : active ? 'linear-gradient(135deg,#2f81f7,#bc8cff)' : 'var(--bg3)',
                    border: active ? 'none' : done ? 'none' : '1px solid var(--border)',
                    color: done || active ? '#fff' : 'var(--text3)',
                    boxShadow: active ? '0 0 16px rgba(47,129,247,.4)' : 'none',
                  }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: active ? '#58a6ff' : done ? 'var(--text2)' : 'var(--text3)', whiteSpace: 'nowrap', letterSpacing: .3 }}>
                    {s}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: i < step ? '#2f81f7' : 'var(--border)', margin: '0 8px', marginBottom: 20, transition: 'background .3s' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* PROGRESS BAR */}
        <div style={{ height: 3, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden', marginBottom: 28 }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg,#2f81f7,#bc8cff)', borderRadius: 2, width: `${progress}%`, transition: 'width .5s cubic-bezier(.4,0,.2,1)', boxShadow: '0 0 12px rgba(47,129,247,.6)' }} />
        </div>

        {/* FORM CARD */}
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16,
          padding: 'clamp(20px,4vw,32px)', borderTop: '2px solid rgba(47,129,247,.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,.2)',
        }}>

          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>
                  Problem Title <span style={{ color: '#f85149' }}>*</span>
                </label>
                <input
                  className="input"
                  placeholder="e.g. Need help with React useEffect infinite loop"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  style={{ fontSize: 14 }}
                />
                <div style={{ color: 'var(--text3)', fontSize: 11.5, marginTop: 6 }}>Be specific — a clear title gets faster responses.</div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>
                  Detailed Description <span style={{ color: '#f85149' }}>*</span>
                </label>
                <textarea
                  className="input"
                  rows={9}
                  placeholder="Explain what you're trying to achieve, what you've tried, and where you're stuck. Include error messages, code snippets, or links."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ resize: 'vertical', lineHeight: 1.7, fontSize: 13.5 }}
                />
                <div style={{ color: 'var(--text3)', fontSize: 11.5, marginTop: 6 }}>Markdown is supported — use ``` for code blocks.</div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 10, color: 'var(--text)' }}>
                  🏷️ Tags / Technologies
                </label>
                {tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                    {tags.map(tag => (
                      <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(47,129,247,.12)', border: '1px solid rgba(47,129,247,.25)', borderRadius: 20, padding: '4px 12px', fontSize: 12, color: '#79b8ff', fontWeight: 600 }}>
                        {tag}
                        <button onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#79b8ff', padding: 0, fontSize: 14, lineHeight: 1 }}>×</button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  className="input"
                  placeholder="Type a tag and press Enter (e.g. React, Node.js, Bug)"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
                <div style={{ color: 'var(--text3)', fontSize: 11.5, marginTop: 6 }}>Add up to 5 tags to help others find your problem.</div>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>
                  🔗 GitHub / Repository Link <span style={{ color: 'var(--text3)', fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  className="input"
                  placeholder="https://github.com/username/repo"
                  value={form.repoLink}
                  onChange={e => setForm({ ...form, repoLink: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, color: 'var(--text2)', fontSize: 13 }}>
                <span style={{ fontSize: 16 }}>👁️</span> Review your problem before publishing:
              </div>
              <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', borderLeft: '3px solid #2f81f7' }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 10, color: 'var(--text)' }}>{form.title || '(No title)'}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', marginBottom: 12 }}>{form.description || '(No description)'}</p>
                {tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {tags.map(tag => (
                      <span key={tag} style={{ background: 'rgba(47,129,247,.12)', border: '1px solid rgba(47,129,247,.25)', borderRadius: 20, padding: '3px 10px', fontSize: 11.5, color: '#79b8ff', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                )}
                {form.repoLink && (
                  <div style={{ color: 'var(--blue)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    🔗 <a href={form.repoLink} target="_blank" rel="noreferrer" style={{ color: '#58a6ff', textDecoration: 'none' }}>{form.repoLink}</a>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 16, padding: 14, background: 'rgba(63,185,80,.06)', border: '1px solid rgba(63,185,80,.2)', borderRadius: 10, fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6 }}>
                ✅ Once published, your problem will be visible to the entire community. You can edit or delete it anytime from your profile.
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-ghost" onClick={() => navigate('/explore')} style={{ color: 'var(--text2)', fontSize: 13 }}>
              ← Cancel
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              {step > 0 && (
                <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              {step < STEPS.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext}
                  style={{ opacity: canNext ? 1 : 0.45, cursor: canNext ? 'pointer' : 'not-allowed' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handlePublish}
                  disabled={loading}
                  style={{ minWidth: 160, justifyContent: 'center', background: loading ? 'var(--bg3)' : undefined }}
                >
                  {loading ? '⏳ Publishing...' : '🚀 Publish Problem'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, color: 'var(--text3)', fontSize: 12.5 }}>
          ❓ Need help? Check our <Link to="/faq" style={{ color: 'var(--blue)', textDecoration: 'none' }}>Submission Guide</Link>
        </div>
      </div>
    </div>
  );
}
