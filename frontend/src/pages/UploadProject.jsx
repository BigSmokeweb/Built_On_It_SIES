import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createProblem } from '../api';

const STEPS = ['Describe Problem', 'Add Details', 'Review & Publish'];

export default function SubmitProblem() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    repoLink: ''
  });
  const [loading, setLoading] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handlePublish = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      alert('Please provide a title and description for your problem.');
      return;
    }
    setLoading(true);
    try {
      // Backend expects { title, description }
      await createProblem({
        title: form.title,
        description: form.description,
        // Note: tags and repoLink are not yet stored in DB; you can extend later
      });
      navigate('/explore');
    } catch (err) {
      console.error(err);
      alert('Failed to publish problem. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* TOP NAV */}
      <nav style={{ height: 57, background: 'rgba(13,17,23,.95)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 clamp(12px,3vw,20px)', gap: 10, position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', animation: 'slideDown .4s ease' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap', flexShrink: 0, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>⊞</div>
          Built On It
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexShrink: 0 }}>
          <button className="btn-icon">🔔</button>
          <div className="avatar-placeholder" style={{ background: 'linear-gradient(135deg,#f97316,#d29922)' }}>A</div>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '36px 24px', animation: 'fadeIn .4s ease' }}>
        {/* PROGRESS */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: 'var(--blue)', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
            STEP {step + 1} OF {STEPS.length}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{STEPS[step]}</div>
            <div style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600 }}>{Math.round(progress)}% Complete</div>
          </div>
          <div style={{ height: 4, background: 'var(--bg4)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--blue)', borderRadius: 2, width: `${progress}%`, transition: 'width .5s ease', boxShadow: '0 0 10px rgba(47,129,247,.5)' }} />
          </div>
        </div>

        {/* HEADING */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: 8, letterSpacing: -0.5, color: 'var(--text)' }}>Submit a Problem</h1>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Describe a problem you're facing. The community will help solve it or build a mini-project around it.</p>
        </div>

        {/* FORM */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 32px' }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>Problem Title *</label>
                <input
                  className="input"
                  placeholder="e.g. Need help with React useEffect infinite loop"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>Detailed Description *</label>
                <textarea
                  className="input"
                  rows={8}
                  placeholder="Explain what you're trying to achieve, what you've tried, and where you're stuck. Include error messages, code snippets, or links."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ resize: 'vertical', lineHeight: 1.6 }}
                />
                <div style={{ color: 'var(--text3)', fontSize: 12, marginTop: 6 }}>Markdown is supported for formatting.</div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 10, color: 'var(--text)' }}>Tags / Technologies</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  {tags.map(tag => (
                    <div key={tag} className="tag tag-blue" style={{ fontSize: 12, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {tag}
                      <button onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#79b8ff', padding: 0, fontSize: 13, lineHeight: 1 }}>×</button>
                    </div>
                  ))}
                </div>
                <input
                  className="input"
                  placeholder="Type a tag and press Enter (e.g. React, Node.js, Bug)"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>
                  🔗 GitHub / Repository Link (optional)
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
              <div style={{ marginBottom: 16, color: 'var(--text2)', fontSize: 13 }}>Review your problem before publishing:</div>
              <div className="card" style={{ padding: 20, background: 'var(--bg3)' }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--text)' }}>{form.title || '(No title)'}</h3>
                <p style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{form.description || '(No description)'}</p>
                {tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                    {tags.map(tag => <span key={tag} className="tag tag-blue">{tag}</span>)}
                  </div>
                )}
                {form.repoLink && (
                  <div style={{ marginTop: 12 }}>
                    <span style={{ color: 'var(--blue)', fontSize: 12 }}>🔗 {form.repoLink}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-ghost" onClick={() => navigate('/explore')} style={{ color: 'var(--text2)' }}>Cancel</button>
            <div style={{ display: 'flex', gap: 10 }}>
              {step > 0 && (
                <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              {step < STEPS.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(s => s + 1)}
                  disabled={step === 0 && (!form.title.trim() || !form.description.trim())}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handlePublish}
                  disabled={loading}
                  style={{ minWidth: 140, justifyContent: 'center' }}
                >
                  {loading ? 'Publishing...' : '🚀 Publish Problem'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: 'var(--text2)', fontSize: 13 }}>
          ❓ Need help? Check our <span style={{ color: 'var(--blue)', cursor: 'pointer' }}>Submission Guide</span>
        </div>
      </div>
    </div>
  );
}