import { useState } from 'react';
import { Link } from 'react-router-dom';

const STEPS = ['Basic Project Information', 'Media & Screenshots', 'Review & Publish'];

export default function SubmitProject() {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState(['React','Tailwind','Node.js']);
  const [tagInput, setTagInput] = useState('');
  const [form, setForm] = useState({ name: '', tagline: '', repo: '', demo: '', desc: '' });

  const progress = ((step + 1) / STEPS.length) * 100;

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags(t => [...t, tagInput.trim()]);
      setTagInput('');
    }
  };
  const removeTag = (t) => setTags(tags.filter(tag => tag !== t));

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* TOPNAV */}
      <nav style={{ height: 57, background: 'rgba(13,17,23,.95)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', animation: 'slideDown .4s ease' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🚀</div>
          DevVault
        </Link>
        <div style={{ marginLeft: '20px', display: 'flex', gap: 4 }}>
          {['Projects','Feed','Showcase'].map(l => <Link key={l} to="#" className="topnav-link">{l}</Link>)}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
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
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Submit Your Project</h1>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Share your latest creation with the global developer community and get feedback.</p>
        </div>

        {/* FORM */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '28px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>Project Name</label>
              <input className="input" placeholder="e.g. Lumina Dashboard" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>Short Tagline</label>
              <input className="input" placeholder="One sentence summary" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🔗</span> Repository URL
              </label>
              <input className="input" placeholder="https://github.com/username/repo" value={form.repo} onChange={e => setForm({ ...form, repo: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>🌐</span> Live Demo
              </label>
              <input className="input" placeholder="https://project-demo.com" value={form.demo} onChange={e => setForm({ ...form, demo: e.target.value })} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text)' }}>Detailed Description</label>
            <textarea className="input" rows={6} placeholder="Tell us about your project, the tech stack used, and the problem it solves..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} style={{ resize: 'vertical', lineHeight: 1.6 }} />
            <div style={{ color: 'var(--text3)', fontSize: 12, marginTop: 6 }}>Markdown is supported for descriptions.</div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 10, color: 'var(--text)' }}>Tags & Technologies</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {tags.map(t => (
                <div key={t} className="tag tag-blue" style={{ fontSize: 12, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t}
                  <button onClick={() => removeTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#79b8ff', padding: 0, fontSize: 13, lineHeight: 1 }}>×</button>
                </div>
              ))}
            </div>
            <input className="input" placeholder="Type a tag and press enter (e.g. Next.js, Postgres)" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-ghost" style={{ fontSize: 14, color: 'var(--text2)' }}>Save Draft</button>
            <div style={{ display: 'flex', gap: 10 }}>
              {step > 0 && <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Back</button>}
              <button className="btn btn-primary btn-lg" onClick={() => setStep(s => Math.min(s + 1, STEPS.length - 1))} style={{ minWidth: 140, justifyContent: 'center' }}>
                {step === STEPS.length - 1 ? '🚀 Publish' : 'Next Step →'}
              </button>
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
