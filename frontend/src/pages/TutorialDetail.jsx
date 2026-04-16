import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavUser from '../components/NavUser';

/* ─── shared tutorial data (same as TutorialsPage) ─────────────── */
export const ALL_TUTORIALS = [
  {
    id: 't1', type: 'video',
    title: 'Build a Real-Time Chat App with Go & WebSockets',
    author: 'goscale-org', authorFull: 'GoScale Organization', avatar: 'GO', avatarColor: '#00bcd4',
    category: 'Web Development', level: 'Intermediate', duration: '48 min', views: '12.4k', likes: 892,
    thumb: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    videoId: '446E-r0A4Ro',
    tags: ['GO', 'WEBSOCKETS', 'DOCKER'],
    description: `In this hands-on video tutorial, we'll build a production-ready real-time chat application using Go on the backend and vanilla JavaScript on the frontend. You'll learn how WebSocket connections work under the hood, how to handle multiple concurrent users efficiently with goroutines, and how to containerize the entire app with Docker for seamless deployment.\n\nBy the end you'll have a fully functional chat app with rooms, typing indicators, and delivery receipts.`,
    chapters: [
      { time: '0:00', title: 'Introduction & project overview' },
      { time: '4:20', title: 'Setting up the Go project structure' },
      { time: '12:10', title: 'WebSocket server implementation' },
      { time: '22:45', title: 'Frontend JavaScript client' },
      { time: '34:00', title: 'Chat rooms & broadcasting' },
      { time: '41:30', title: 'Dockerizing & deployment' },
    ],
    resources: [
      { label: 'GitHub Repo', url: '#', icon: '⎇' },
      { label: 'Slides (PDF)', url: '#', icon: '📄' },
      { label: 'GoScale Docs', url: '#', icon: '📗' },
    ],
  },
  {
    id: 't2', type: 'article',
    title: 'Deploying Neural Networks on Edge Devices with Rust',
    author: 'deepmind-labs', authorFull: 'DeepMind Labs', avatar: 'DL', avatarColor: '#3fb950',
    category: 'AI / ML', level: 'Advanced', duration: '15 min read', views: '8.7k', likes: 564,
    thumb: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
    videoId: null,
    tags: ['RUST', 'PYTORCH', 'EDGE'],
    description: `Edge AI is transforming how we think about inference latency. This deep-dive article covers the full pipeline from exporting a PyTorch model to ONNX format, quantizing it for size and speed, and running it efficiently on ARM-based edge devices using a Rust inference runtime.\n\nWe'll go through memory safety guarantees that make Rust ideal for embedded systems, compare performance against Python and C++ alternatives, and look at real-world deployment patterns for Raspberry Pi and NVIDIA Jetson.`,
    chapters: [
      { time: '1', title: 'Why Rust for edge ML?' },
      { time: '2', title: 'Exporting PyTorch to ONNX' },
      { time: '3', title: 'Quantization strategies' },
      { time: '4', title: 'Rust ONNX runtime setup' },
      { time: '5', title: 'Benchmarks & results' },
    ],
    resources: [
      { label: 'Full Article', url: '#', icon: '📝' },
      { label: 'Code Samples', url: '#', icon: '⎇' },
    ],
    articleBody: [
      {
        heading: 'Why Rust for Edge ML?',
        text: `Rust's zero-cost abstractions and guaranteed memory safety make it uniquely suited for embedded inference. Unlike Python, there is no garbage collector introducing unpredictable pauses, and unlike C++, undefined behaviour is caught at compile time. For latency-sensitive inference on microcontrollers this matters enormously.`,
        code: null,
      },
      {
        heading: 'Exporting PyTorch to ONNX',
        text: 'Once your model is trained, export it with a single call:',
        code: `import torch\nmodel = MyModel()\nmodel.load_state_dict(torch.load('model.pt'))\nmodel.eval()\n\ndummy = torch.randn(1, 3, 224, 224)\ntorch.onnx.export(model, dummy, 'model.onnx',\n    opset_version=17,\n    input_names=['input'], output_names=['output'])`,
      },
      {
        heading: 'Quantization Strategies',
        text: `Dynamic INT8 quantization reduces model size by ~4× with minimal accuracy loss. For Raspberry Pi 4 we observed a 3.1× speedup in inference time compared to the FP32 baseline after applying post-training static quantization.`,
        code: null,
      },
      {
        heading: 'Running with the Rust ONNX Runtime',
        text: 'Add the dependency and run inference:',
        code: `[dependencies]\nort = { version = "1.16", features = ["load-dynamic"] }\n\n// main.rs\nuse ort::{Environment, Session, Value};\n\nlet env = Environment::builder().build()?;\nlet session = Session::builder(&env)?\n    .with_model_from_file("model.onnx")?;\n\nlet input = Array4::<f32>::zeros((1,3,224,224));\nlet outputs = session.run(vec![Value::from_array(input)?])?;`,
      },
      {
        heading: 'Benchmarks & Results',
        text: `On Raspberry Pi 4B (4GB): FP32 baseline 180ms/frame → INT8 quantized 58ms/frame → Rust ONNX INT8 42ms/frame. On NVIDIA Jetson Nano with TensorRT integration: 8ms/frame. Rust adds minimal overhead while providing memory safety guarantees you simply cannot get with C++ runtimes.`,
        code: null,
      },
    ],
  },
  {
    id: 't3', type: 'video',
    title: 'Next.js 14 App Router: Complete Beginner Guide',
    author: 'vercel-labs', authorFull: 'Vercel Labs', avatar: 'VL', avatarColor: '#2f81f7',
    category: 'Web Development', level: 'Beginner', duration: '62 min', views: '31.2k', likes: 2100,
    thumb: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
    videoId: '904XCp2EznE',
    tags: ['REACT', 'NEXT.JS', 'TYPESCRIPT'],
    description: `Next.js 14 introduced the stable App Router — a complete rethink of how React applications are structured on the server. This beginner-friendly tutorial takes you from zero to a fully deployed Next.js 14 app, covering file-based routing, server components, client components, data fetching with fetch(), loading and error boundaries, and the new metadata API for SEO.\n\nNo prior Next.js experience needed — just solid React fundamentals.`,
    chapters: [
      { time: '0:00', title: 'What changed in Next.js 14?' },
      { time: '8:30', title: 'App Router file conventions' },
      { time: '18:00', title: 'Server vs Client components' },
      { time: '28:00', title: 'Data fetching patterns' },
      { time: '40:00', title: 'Loading & error UI' },
      { time: '50:00', title: 'Deployment to Vercel' },
    ],
    resources: [
      { label: 'Starter Repo', url: '#', icon: '⎇' },
      { label: 'Next.js Docs', url: '#', icon: '📗' },
    ],
  },
  {
    id: 't4', type: 'live',
    title: 'Building a K8s Operator from Scratch with Go',
    author: 'goscale-org', authorFull: 'GoScale Organization', avatar: 'GO', avatarColor: '#bc8cff',
    category: 'DevOps', level: 'Advanced', duration: '2h 10 min', views: '4.1k', likes: 311,
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    videoId: 'X48VuDVv0do',
    tags: ['GO', 'KUBERNETES', 'OPERATORS'],
    description: `Kubernetes Operators allow you to encode operational knowledge directly into the cluster. In this live session recording, we build a complete custom Kubernetes Operator using Go and the controller-runtime framework. Starting from a CRD definition, we implement reconciliation loops, status conditions, and handle edge cases like drift detection.\n\nThis session is ideal for platform engineers looking to automate complex stateful application lifecycle management.`,
    chapters: [
      { time: '0:00', title: 'Operator pattern overview' },
      { time: '15:00', title: 'CRD design & scaffolding' },
      { time: '42:00', title: 'Writing the reconciler' },
      { time: '78:00', title: 'Status & conditions' },
      { time: '105:00', title: 'Testing & deployment' },
    ],
    resources: [
      { label: 'Session Recording', url: '#', icon: '🎬' },
      { label: 'GitHub Repo', url: '#', icon: '⎇' },
    ],
  },
];

const tagColors = { GO:'tag-blue', WEBSOCKETS:'tag-green', DOCKER:'tag-blue', RUST:'tag-orange', PYTORCH:'tag-orange', EDGE:'tag-gray', REACT:'tag-blue', 'NEXT.JS':'tag-purple', TYPESCRIPT:'tag-blue', KUBERNETES:'tag-blue', OPERATORS:'tag-purple' };
const levelColors = { Beginner:'#3fb950', Intermediate:'#d29922', Advanced:'#f85149' };
const typeColors  = { video:'#2f81f7', article:'#3fb950', live:'#f85149' };
const typeIcons   = { video:'🎬', article:'📝', live:'📡' };
const typeLabels  = { video:'Video Tutorial', article:'Written Article', live:'Live Session' };

const SAMPLE_COMMENTS = [
  { id:'c1', avatar:'SK', color:'#2f81f7', name:'Siddharth K', time:'2 days ago', text:'This is the clearest explanation of WebSockets I have ever seen. Followed along perfectly and got it running in under an hour!' },
  { id:'c2', avatar:'PP', color:'#3fb950', name:'Priya P', time:'4 days ago', text:'Love the Docker section especially — would love a follow-up on adding authentication with JWT.' },
  { id:'c3', avatar:'AM', color:'#bc8cff', name:'Arjun M', time:'1 week ago', text:'Excellent pacing. The chapter markers make it super easy to jump back to specific parts.' },
];

export default function TutorialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tutorial = ALL_TUTORIALS.find(t => t.id === id);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const [showArticle, setShowArticle] = useState(false);

  if (!tutorial) {
    return (
      <div style={{ background:'var(--bg)', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
        <div style={{ fontSize:56 }}>🎓</div>
        <h2 style={{ fontWeight:800, fontSize:'1.4rem' }}>Tutorial not found</h2>
        <Link to="/tutorials" className="btn btn-primary">← Back to Tutorials</Link>
      </div>
    );
  }

  const related = ALL_TUTORIALS.filter(t => t.id !== id).slice(0, 3);

  const postComment = () => {
    if (!comment.trim()) return;
    setComments(c => [{ id: `c${Date.now()}`, avatar:'MS', color:'#2f81f7', name:'You', time:'Just now', text:comment }, ...c]);
    setComment('');
  };

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh', fontFamily:"'Inter',sans-serif" }}>

      {/* ── NAV ──────────────────────────────────────────────────── */}
      <nav style={{ position:'sticky', top:0, zIndex:100, height:57, background:'rgba(13,17,23,.97)', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', padding:'0 clamp(12px,3vw,24px)', gap:12, backdropFilter:'blur(12px)', animation:'slideDown .4s ease' }}>
        <button onClick={() => navigate('/tutorials')}
          style={{ display:'flex', alignItems:'center', gap:6, background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, padding:'5px 12px', color:'var(--text2)', cursor:'pointer', fontSize:13, fontWeight:600, transition:'all .18s' }}
          onMouseEnter={e => { e.currentTarget.style.background='var(--bg4)'; e.currentTarget.style.color='var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--text2)'; }}>
          ← Tutorials
        </button>

        <Link to="/" style={{ display:'flex', alignItems:'center', gap:7, textDecoration:'none', marginLeft:4 }}>
          <div style={{ width:26, height:26, background:'linear-gradient(135deg,#2f81f7,#bc8cff)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#fff', fontWeight:900 }}>⊞</div>
          <span style={{ fontWeight:800, fontSize:14, color:'var(--text)' }}>Built On It</span>
        </Link>

        <div style={{ flex:1 }} />

        {/* Breadcrumb */}
        <div style={{ fontSize:12, color:'var(--text3)', display:'flex', alignItems:'center', gap:6 }} className="resp-hide-480">
          <Link to="/tutorials" style={{ color:'var(--text3)', textDecoration:'none' }}>Tutorials</Link>
          <span>/</span>
          <span style={{ color:'var(--text2)', maxWidth:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{tutorial.title}</span>
        </div>

        <div style={{ flex:1 }} />

        <NavUser />
      </nav>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'32px clamp(16px,4vw,32px)', display:'grid', gridTemplateColumns:'1fr 320px', gap:32, alignItems:'start' }} className="tutorial-detail-grid">

        {/* LEFT — main content */}
        <div>

          {/* Hero — video thumbnail or article cover */}
          <div style={{ borderRadius:14, overflow:'hidden', marginBottom:24, position:'relative', background:'#000', boxShadow:'0 16px 48px rgba(0,0,0,.5)' }}>
            {tutorial.videoId ? (
              /* Click-to-open YouTube — uses high-quality Unsplash thumb as bg */
              <a href={`https://www.youtube.com/watch?v=${tutorial.videoId}`} target="_blank" rel="noreferrer"
                style={{ display:'block', position:'relative', textDecoration:'none', cursor:'pointer' }}>

                {/* Background image */}
                <img
                  src={tutorial.thumb}
                  alt={tutorial.title}
                  style={{ width:'100%', height:360, objectFit:'cover', display:'block' }}
                />

                {/* Cinematic gradient overlay */}
                <div style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 50%, rgba(0,0,0,.15) 100%)',
                  transition:'opacity .25s',
                }} />

                {/* Hover brighten layer */}
                <div className="yt-hover-layer" style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0)', transition:'background .25s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.05)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0)'} />

                {/* Center play button */}
                <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}>
                  <div style={{
                    width:76, height:76, borderRadius:'50%',
                    background:'rgba(255,0,0,.92)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    boxShadow:'0 0 0 8px rgba(255,0,0,.18), 0 8px 32px rgba(0,0,0,.55)',
                    transition:'transform .2s, box-shadow .2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform='scale(1.12)'; e.currentTarget.style.boxShadow='0 0 0 12px rgba(255,0,0,.22), 0 8px 40px rgba(0,0,0,.6)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 0 0 8px rgba(255,0,0,.18), 0 8px 32px rgba(0,0,0,.55)'; }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div style={{ color:'#fff', fontWeight:700, fontSize:14, letterSpacing:0.3, textShadow:'0 2px 8px rgba(0,0,0,.7)', display:'flex', alignItems:'center', gap:6 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity:.85 }}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1-.1z"/></svg>
                    Watch on YouTube ↗
                  </div>
                </div>

                {/* Bottom title strip */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 24px' }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.6)', letterSpacing:1, marginBottom:4, textTransform:'uppercase' }}>
                    {tutorial.category} · {tutorial.level}
                  </div>
                  <div style={{ fontWeight:800, fontSize:'clamp(1rem,2vw,1.2rem)', color:'#fff', lineHeight:1.3, textShadow:'0 2px 8px rgba(0,0,0,.5)' }}>
                    {tutorial.title}
                  </div>
                </div>
              </a>
            ) : (
              /* Article / live cover */
              <div style={{ position:'relative' }}>
                <img src={tutorial.thumb} alt={tutorial.title} style={{ width:'100%', height:320, objectFit:'cover', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,.5)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
                  <div style={{ fontSize:56 }}>{typeIcons[tutorial.type]}</div>
                  <div style={{ fontWeight:700, fontSize:18, color:'#fff' }}>{typeLabels[tutorial.type]}</div>
                  <div style={{ color:'rgba(255,255,255,.75)', fontSize:14 }}>{tutorial.duration}</div>
                  {tutorial.type === 'article' && (
                    <button onClick={() => setShowArticle(true)}
                      style={{ marginTop:4, padding:'10px 28px', borderRadius:10, border:'2px solid #fff', background:'rgba(255,255,255,.15)', color:'#fff', fontWeight:800, fontSize:14, cursor:'pointer', backdropFilter:'blur(4px)', transition:'all .2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,.3)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,.15)'; }}>
                      📖 Read Article
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Inline Article Reader ────────────────────────────── */}
          {tutorial.type === 'article' && tutorial.articleBody && (
            <div style={{ marginBottom:20 }}>
              {!showArticle ? (
                <button onClick={() => setShowArticle(true)}
                  style={{ width:'100%', padding:'13px', borderRadius:10, border:'1px dashed var(--border2)', background:'rgba(47,129,247,.04)', color:'var(--blue)', fontWeight:700, fontSize:14, cursor:'pointer', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(47,129,247,.09)'; e.currentTarget.style.borderColor='var(--blue)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(47,129,247,.04)'; e.currentTarget.style.borderColor='var(--border2)'; }}>
                  📖 Read Full Article
                </button>
              ) : (
                <div className="card" style={{ padding:'24px 28px', animation:'fadeIn .3s ease' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                    <div style={{ fontWeight:800, fontSize:16, color:'var(--text)' }}>📖 Full Article</div>
                    <button onClick={() => setShowArticle(false)}
                      style={{ background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:6, padding:'4px 10px', color:'var(--text3)', cursor:'pointer', fontSize:12 }}>✕ Close</button>
                  </div>
                  {tutorial.articleBody.map((section, i) => (
                    <div key={i} style={{ marginBottom:24 }}>
                      <h3 style={{ fontWeight:800, fontSize:15, color:'var(--text)', marginBottom:8, display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ width:22, height:22, borderRadius:6, background:'rgba(47,129,247,.15)', border:'1px solid rgba(47,129,247,.25)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:'var(--blue)', flexShrink:0 }}>{i+1}</span>
                        {section.heading}
                      </h3>
                      <p style={{ color:'var(--text2)', fontSize:14, lineHeight:1.85, marginBottom: section.code ? 12 : 0 }}>{section.text}</p>
                      {section.code && (
                        <pre style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, padding:'14px 16px', fontSize:12.5, color:'#58a6ff', overflowX:'auto', lineHeight:1.65, fontFamily:"'Fira Code','Courier New',monospace", margin:0 }}>
                          <code>{section.code}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Meta badges */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14, alignItems:'center' }}>
            <span style={{ padding:'4px 10px', borderRadius:6, background:(typeColors[tutorial.type]||'#2f81f7')+'22', color:(typeColors[tutorial.type]||'#2f81f7'), fontSize:11, fontWeight:700, border:`1px solid ${(typeColors[tutorial.type]||'#2f81f7')}44` }}>
              {typeIcons[tutorial.type]} {typeLabels[tutorial.type]}
            </span>
            <span style={{ padding:'4px 10px', borderRadius:6, background:(levelColors[tutorial.level]||'#3fb950')+'22', color:(levelColors[tutorial.level]||'#3fb950'), fontSize:11, fontWeight:700, border:`1px solid ${(levelColors[tutorial.level]||'#3fb950')}44` }}>
              {tutorial.level}
            </span>
            <span style={{ fontSize:12, color:'var(--text3)' }}>⏱ {tutorial.duration}</span>
            <span style={{ fontSize:12, color:'var(--text3)' }}>👁 {tutorial.views} views</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize:'clamp(1.3rem,2.5vw,1.7rem)', fontWeight:900, lineHeight:1.25, letterSpacing:-0.5, marginBottom:16, color:'var(--text)' }}>
            {tutorial.title}
          </h1>

          {/* Author row + actions */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:24, paddingBottom:20, borderBottom:'1px solid var(--border)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:tutorial.avatarColor+'33', border:`2px solid ${tutorial.avatarColor}66`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:tutorial.avatarColor }}>
                {tutorial.avatar}
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>{tutorial.authorFull}</div>
                <div style={{ fontSize:12, color:'var(--text3)' }}>@{tutorial.author}</div>
              </div>
            </div>

            <div style={{ display:'flex', gap:8 }}>
              <button onClick={() => setLiked(l => !l)}
                style={{ padding:'7px 14px', borderRadius:8, border:`1px solid ${liked ? '#f85149' : 'var(--border2)'}`, background: liked ? 'rgba(248,81,73,.1)' : 'var(--bg3)', color: liked ? '#f85149' : 'var(--text2)', cursor:'pointer', fontSize:13, fontWeight:600, transition:'all .2s', display:'flex', alignItems:'center', gap:5 }}>
                {liked ? '❤' : '♡'} {tutorial.likes + (liked ? 1 : 0)}
              </button>
              <button onClick={() => setBookmarked(b => !b)}
                style={{ padding:'7px 14px', borderRadius:8, border:`1px solid ${bookmarked ? 'var(--blue)' : 'var(--border2)'}`, background: bookmarked ? 'rgba(47,129,247,.1)' : 'var(--bg3)', color: bookmarked ? 'var(--blue)' : 'var(--text2)', cursor:'pointer', fontSize:13, fontWeight:600, transition:'all .2s' }}>
                {bookmarked ? '🔖' : '📌'} {bookmarked ? 'Saved' : 'Save'}
              </button>
              <button style={{ padding:'7px 14px', borderRadius:8, border:'1px solid var(--border2)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontSize:13, fontWeight:600, transition:'all .18s' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--bg4)'; e.currentTarget.style.color='var(--text)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--text2)'; }}>
                ↗ Share
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="card" style={{ padding:'20px 24px', marginBottom:20 }}>
            <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14, color:'var(--text)' }}>📖 About this Tutorial</h3>
            {tutorial.description.split('\n\n').map((p, i) => (
              <p key={i} style={{ color:'var(--text2)', fontSize:14, lineHeight:1.8, marginBottom:12 }}>{p}</p>
            ))}
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:10 }}>
              {tutorial.tags.map(tag => (
                <span key={tag} className={`tag ${tagColors[tag] || 'tag-gray'}`}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Chapters */}
          <div className="card" style={{ padding:'20px 24px', marginBottom:20 }}>
            <h3 style={{ fontWeight:700, fontSize:15, marginBottom:16, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>
              📋 {tutorial.type === 'article' ? 'Sections' : 'Chapters'}
            </h3>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {tutorial.chapters.map((ch, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:14, padding:'10px 12px', borderRadius:8, background:'var(--bg3)', border:'1px solid var(--border)', transition:'all .18s', cursor:'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.background='var(--bg4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg3)'; }}>
                  <div style={{ width:28, height:28, borderRadius:6, background:'rgba(47,129,247,.12)', border:'1px solid rgba(47,129,247,.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--blue)', fontSize:11, fontWeight:700, flexShrink:0 }}>{i+1}</div>
                  <div style={{ flex:1, fontWeight:500, fontSize:13, color:'var(--text)' }}>{ch.title}</div>
                  <div style={{ fontSize:12, color:'var(--text3)', fontFamily:'monospace' }}>{ch.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="card" style={{ padding:'20px 24px', marginBottom:20 }}>
            <h3 style={{ fontWeight:700, fontSize:15, marginBottom:16, color:'var(--text)' }}>🔗 Resources</h3>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              {tutorial.resources.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text2)', textDecoration:'none', fontSize:13, fontWeight:600, transition:'all .18s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--blue)'; e.currentTarget.style.color='var(--blue)'; e.currentTarget.style.background='rgba(47,129,247,.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.background='var(--bg3)'; }}>
                  <span>{r.icon}</span> {r.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="card" style={{ padding:'20px 24px' }}>
            <h3 style={{ fontWeight:700, fontSize:15, marginBottom:18, color:'var(--text)', display:'flex', alignItems:'center', gap:8 }}>
              💬 Comments <span style={{ fontSize:12, color:'var(--text3)', fontWeight:400 }}>({comments.length})</span>
            </h3>

            {/* Comment input */}
            <div style={{ display:'flex', gap:10, marginBottom:20 }}>
              <div style={{ width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#2f81f7,#bc8cff)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff', flexShrink:0 }}>MS</div>
              <div style={{ flex:1, display:'flex', gap:8 }}>
                <input className="input" placeholder="Add a comment…" value={comment} onChange={e => setComment(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && postComment()}
                  style={{ flex:1, height:36, fontSize:13 }} />
                <button onClick={postComment} className="btn btn-primary btn-sm" style={{ flexShrink:0 }}>Post</button>
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {comments.map(c => (
                <div key={c.id} style={{ display:'flex', gap:10 }}>
                  <div style={{ width:34, height:34, borderRadius:'50%', background:c.color+'33', border:`1.5px solid ${c.color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:c.color, flexShrink:0 }}>{c.avatar}</div>
                  <div>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <span style={{ fontWeight:700, fontSize:13, color:'var(--text)' }}>{c.name}</span>
                      <span style={{ fontSize:11, color:'var(--text3)' }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.65 }}>{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <div style={{ display:'flex', flexDirection:'column', gap:16, position:'sticky', top:77 }}>

          {/* Stats */}
          <div className="card" style={{ padding:'18px 20px' }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:14, color:'var(--text)' }}>📊 Tutorial Stats</div>
            {[
              ['👁', 'Views', tutorial.views],
              ['❤', 'Likes', String(tutorial.likes)],
              ['⏱', 'Duration', tutorial.duration],
              ['📂', 'Category', tutorial.category],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                <span style={{ fontSize:12, color:'var(--text3)', display:'flex', alignItems:'center', gap:6 }}>{icon} {label}</span>
                <span style={{ fontSize:12, fontWeight:600, color:'var(--text)' }}>{value}</span>
              </div>
            ))}
            <div style={{ paddingTop:8 }}>
              <span style={{ fontSize:12, color:'var(--text3)' }}>🎯 Level </span>
              <span style={{ fontSize:12, fontWeight:700, color:levelColors[tutorial.level] || '#fff', marginLeft:8 }}>{tutorial.level}</span>
            </div>
          </div>

          {/* Author card */}
          <div className="card" style={{ padding:'18px 20px', textAlign:'center' }}>
            <div style={{ width:52, height:52, borderRadius:'50%', background:tutorial.avatarColor+'33', border:`2px solid ${tutorial.avatarColor}66`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:800, color:tutorial.avatarColor, margin:'0 auto 10px' }}>
              {tutorial.avatar}
            </div>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>{tutorial.authorFull}</div>
            <div style={{ fontSize:12, color:'var(--text3)', marginBottom:12 }}>@{tutorial.author}</div>
            <button className="btn btn-secondary" style={{ width:'100%', justifyContent:'center', fontSize:13 }}>Follow</button>
          </div>

          {/* Related tutorials */}
          <div className="card" style={{ padding:'18px 20px' }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:14, color:'var(--text)' }}>🎓 Related Tutorials</div>
            {related.map(t => (
              <Link key={t.id} to={`/tutorial/${t.id}`} style={{ textDecoration:'none', display:'block', marginBottom:12 }}>
                <div style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'8px', borderRadius:8, transition:'all .18s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--bg3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}>
                  <img src={t.thumb} alt={t.title} style={{ width:64, height:44, borderRadius:6, objectFit:'cover', flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:'var(--text)', lineHeight:1.3, marginBottom:4 }}>{t.title}</div>
                    <div style={{ fontSize:11, color:'var(--text3)' }}>⏱ {t.duration}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .tutorial-detail-grid { grid-template-columns:1fr !important; }
          .resp-hide-480 { display:none !important; }
        }
      `}</style>
    </div>
  );
}
