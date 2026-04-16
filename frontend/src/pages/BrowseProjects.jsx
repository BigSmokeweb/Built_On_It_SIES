import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProblems } from '../api';

const allProjects = [
  { id:'p1', title:'NextJS Admin Ultra', badge:'FRAMEWORK', desc:'A high-performance admin dashboard starter kit with full TypeScript support and built-in auth flows.', stars:'4.2k', lang:'TypeScript', tags:['REACT','NEXT.JS','TAILWIND'], author:'vercel-labs', time:'2h ago', img:'https://images.unsplash.com/photo-1547658719-da2b51169166?w=480&h=200&fit=crop', color:'#2f81f7', stars_n:4200, topic:'Web' },
  { id:'p2', title:'RustStream Engine', badge:'SYSTEMS', desc:'Ultra-fast real-time data streaming engine built entirely in Rust for high-throughput pipelines.', stars:'12.8k', lang:'Rust', tags:['RUST','GRPC','DOCKER'], author:'tokio-rs', time:'1d ago', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=200&fit=crop', color:'#d29922', stars_n:12800, topic:'DevOps' },
  { id:'p3', title:'NeuralNexus AI', badge:'AI / ML', desc:'A comprehensive Python library for deploying neural network models at the edge with minimal dependencies.', stars:'54k', lang:'Python', tags:['PYTHON','PYTORCH','CUDA'], author:'deepmind-labs', time:'5m ago', img:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=480&h=200&fit=crop', color:'#3fb950', stars_n:54000, topic:'AI/ML' },
  { id:'p4', title:'SwiftUI MasterKit', badge:'MOBILE', desc:'A collection of premium SwiftUI components and animations for building polished iOS applications.', stars:'8.1k', lang:'Swift', tags:['SWIFT','SWIFTUI','IOS'], author:'apple-devs', time:'4d ago', img:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=480&h=200&fit=crop', color:'#bc8cff', stars_n:8100, topic:'Mobile' },
  { id:'p5', title:'GoScale API Framework', badge:'BACKEND', desc:'The ultimate framework for building highly scalable microservices with built-in Prometheus metrics.', stars:'19.3k', lang:'Go', tags:['GO','KUBERNETES','PROMETHEUS'], author:'goscale-org', time:'12h ago', img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=200&fit=crop', color:'#00bcd4', stars_n:19300, topic:'DevOps' },
  { id:'p6', title:'VueGlass UI', badge:'FRONTEND', desc:'Beautiful glassmorphism design system for Vue.js projects with full a11y compliance.', stars:'3.7k', lang:'Vue', tags:['VUE 3','TYPESCRIPT','A11Y'], author:'vueglass-dev', time:'6h ago', img:'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=480&h=200&fit=crop', color:'#f472b6', stars_n:3700, topic:'Web' },
];


const filterOptions = {
  Languages: ['JavaScript','TypeScript','Python','Rust','Go','Swift','Kotlin','C++'],
  Frameworks: ['React','Next.js','Vue','Angular','Svelte','FastAPI','Django'],
  Popularity: ['Most Stars','Most Forks','Most Watched','Trending'],
  License: ['MIT','Apache 2.0','GPL','BSD','ISC'],
  Topics: ['Web','AI/ML','DevOps','Mobile','Security','Data'],
};

const tagColors = { REACT:'tag-blue', 'NEXT.JS':'tag-purple', TAILWIND:'tag-blue', RUST:'tag-orange', GRPC:'tag-gray', DOCKER:'tag-blue', PYTHON:'tag-green', PYTORCH:'tag-orange', CUDA:'tag-red', SWIFT:'tag-orange', SWIFTUI:'tag-purple', IOS:'tag-gray', GO:'tag-blue', KUBERNETES:'tag-blue', PROMETHEUS:'tag-red', 'VUE 3':'tag-green', TYPESCRIPT:'tag-blue', A11Y:'tag-gray' };
const badgeColors = { FRAMEWORK:'badge-blue', SYSTEMS:'badge-orange', 'AI / ML':'badge-green', MOBILE:'badge-purple', BACKEND:'badge-blue', FRONTEND:'badge-purple' };

const PAGE_SIZE = 6;

export default function Explore() {
  const [activeTab, setActiveTab] = useState('Trending');
  const [view, setView] = useState('grid');
  const [openFilter, setOpenFilter] = useState('Languages');
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(true);
  const [checkedFilters, setCheckedFilters] = useState({});
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();

  // Real data state
  const [dbProblems, setDbProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch problems from backend
  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProblems();
        // Map backend fields to frontend expected structure
        const mapped = data.map(p => ({
          id: p.id,
          title: p.title,
          badge: p.status === 'open' ? 'OPEN' : 'TAKEN',
          desc: p.description,
          stars: '0',
          lang: 'N/A',
          tags: [],
          author: p.taken_by || 'Anonymous',
          time: new Date(p.created_at).toLocaleDateString(),
          stars_n: 0,
          topic: 'General',
          img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=480&h=200&fit=crop',
          color: '#2f81f7'
        }));
        setDbProblems(mapped);
      } catch (err) {
        console.error('Failed to fetch problems:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProblems();
  }, []);

  // Pre-apply topic filter from URL
  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic) {
      setCheckedFilters({ Topics: [topic] });
      setOpenFilter('Topics');
    }
  }, [searchParams]);

  const tabs = ['Trending','Recent','Most Stars','New Releases'];

  const toggleFilter = (section, item) => {
    setCheckedFilters(prev => {
      const sectionFilters = prev[section] || [];
      const exists = sectionFilters.includes(item);
      return {
        ...prev,
        [section]: exists ? sectionFilters.filter(i => i !== item) : [...sectionFilters, item],
      };
    });
    setPage(1);
  };

  const clearAll = () => { setCheckedFilters({}); setPage(1); };

  const activeFilterCount = Object.values(checkedFilters).flat().length;

  // Combine mock data with real data (show real if available, else mock)
  const displayProjects = dbProblems.length > 0 ? dbProblems : allProjects;

  const sorted = useMemo(() => {
    let list = [...displayProjects];
    if (activeTab === 'Most Stars') list.sort((a, b) => (b.stars_n || 0) - (a.stars_n || 0));
    else if (activeTab === 'Recent') list.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    else if (activeTab === 'Trending') list.sort((a, b) => (b.stars_n || 0) - (a.stars_n || 0));
    return list;
  }, [activeTab, displayProjects]);

  const filtered = useMemo(() => {
    let list = sorted;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || (p.author || '').toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q)));
    }
    const langs = checkedFilters['Languages'] || [];
    if (langs.length) list = list.filter(p => langs.includes(p.lang));
    const topics = checkedFilters['Topics'] || [];
    if (topics.length) list = list.filter(p => topics.includes(p.topic));
    return list;
  }, [sorted, checkedFilters, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* TOP NAV WRAPPER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <nav style={{
          height: navOpen ? 57 : 0,
          overflow: 'hidden',
          background: 'rgba(13,17,23,.95)',
          borderBottom: navOpen ? '1px solid var(--border)' : 'none',
          display: 'flex', alignItems: 'center',
          padding: navOpen ? '0 clamp(12px,3vw,20px)' : '0',
          gap: 8,
          backdropFilter: 'blur(12px)',
          transition: 'height .35s cubic-bezier(.4,0,.2,1), padding .35s',
          animation: 'slideDown .4s ease',
        }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, fontSize:15, color:'var(--text)', marginRight:8, whiteSpace:'nowrap', textDecoration:'none' }}>
            <div style={{ width:28, height:28, background:'var(--blue)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>⊞</div>
            Built On It
          </Link>
          <button className="topnav-link active" style={{ background:'var(--bg4)', color:'var(--text)', padding:'5px 12px', borderRadius:6, border:'none', cursor:'pointer', fontSize:14 }}>Explore</button>
          <div style={{ flex:1, maxWidth:380, position:'relative', marginLeft:8 }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text3)', fontSize:13 }}>🔍</span>
            <input className="input" placeholder="Search projects, stacks, or authors..." style={{ paddingLeft:32, height:34 }} value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
            <button className="btn-icon">🔔</button>
            <div className="avatar-placeholder">L</div>
            {/* Nav toggle */}
            <button onClick={() => setNavOpen(false)} title="Hide navigation"
              style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg3)', border:'1px solid var(--border2)', color:'var(--text2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, transition:'all .18s', fontSize:14 }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--bg4)'; e.currentTarget.style.boxShadow='0 0 0 2px rgba(47,129,247,.3)'; e.currentTarget.style.color='var(--text)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.color='var(--text2)'; }}>↑</button>
          </div>
        </nav>
        {/* Restore tab */}
        <div style={{ position:'absolute', top:0, left:'50%', transform:`translateX(-50%) translateY(${navOpen ? '-100%' : '0'})`, transition:'transform .35s cubic-bezier(.4,0,.2,1)', zIndex:101 }}>
          <button onClick={() => setNavOpen(true)} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 16px', background:'rgba(13,17,23,.97)', border:'1px solid var(--border2)', borderTop:'none', borderRadius:'0 0 10px 10px', color:'var(--text2)', fontSize:12, fontWeight:600, cursor:'pointer', backdropFilter:'blur(12px)', boxShadow:'0 4px 20px rgba(0,0,0,.4)', transition:'all .18s', letterSpacing:'.3px' }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(47,129,247,.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,.4)'; }}>
            <span style={{ fontSize:11 }}>↓</span> Built On It
          </button>
        </div>
      </div>

      <div style={{ display:'flex' }}>
        {/* FILTER SIDEBAR + TOGGLE WRAPPER */}
        <div style={{ position:'relative', display:'flex', flexShrink:0 }}>
          <aside style={{
            width: sidebarOpen ? 240 : 0,
            padding: sidebarOpen ? '20px 16px' : 0,
            borderRight: sidebarOpen ? '1px solid var(--border)' : 'none',
            position: 'sticky',
            top: navOpen ? 57 : 0,
            height: navOpen ? 'calc(100vh - 57px)' : '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            flexShrink: 0,
            animation: 'fadeInLeft .4s ease',
            transition: 'width .35s cubic-bezier(.4,0,.2,1), padding .35s, top .35s, height .35s',
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <span style={{ fontWeight:600, fontSize:13, whiteSpace:'nowrap' }}>
                FILTERS {activeFilterCount > 0 && <span style={{ background:'var(--blue)', color:'#fff', borderRadius:10, padding:'1px 6px', fontSize:10, marginLeft:4 }}>{activeFilterCount}</span>}
              </span>
              <button className="btn-ghost" onClick={clearAll} style={{ color:'var(--blue)', fontSize:12, padding:'2px 6px', whiteSpace:'nowrap' }}>Clear all</button>
            </div>
            {Object.entries(filterOptions).map(([section, items]) => (
              <div key={section} style={{ marginBottom:4 }}>
                <button onClick={() => setOpenFilter(openFilter === section ? null : section)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px', background: openFilter===section ? 'rgba(47,129,247,.1)' : 'transparent', border:'none', borderRadius:6, cursor:'pointer', color: openFilter===section ? 'var(--blue)' : 'var(--text2)', fontSize:13, fontWeight:500, transition:'all .15s' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span>{section==='Languages' ? '‹›' : section==='Frameworks' ? '◈' : section==='Popularity' ? '★' : section==='License' ? '⚖' : '◆'}</span>
                    {section}
                    {(checkedFilters[section]||[]).length > 0 && <span style={{ background:'var(--blue)', color:'#fff', borderRadius:10, padding:'0px 5px', fontSize:9 }}>{(checkedFilters[section]||[]).length}</span>}
                  </span>
                  <span style={{ fontSize:10, transition:'transform .2s', transform: openFilter===section ? 'rotate(180deg)' : 'none' }}>▼</span>
                </button>
                {openFilter === section && (
                  <div style={{ padding:'4px 8px 8px 24px', animation:'fadeIn .2s ease' }}>
                    {items.map(item => (
                      <label key={item} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 6px', cursor:'pointer', color: (checkedFilters[section]||[]).includes(item) ? 'var(--text)' : 'var(--text2)', fontSize:12, borderRadius:4 }}>
                        <input type="checkbox" checked={(checkedFilters[section]||[]).includes(item)} onChange={() => toggleFilter(section, item)} style={{ accentColor:'var(--blue)' }} />
                        {item}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop:20 }}>
              <div style={{ fontWeight:600, fontSize:11, color:'var(--text3)', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>POPULAR TAGS</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {['React','TypeScript','Python','Rust','Tailwind','AI'].map(t => (
                  <span key={t} className="tag tag-blue" style={{ cursor:'pointer', padding:'3px 10px' }} onClick={() => setSearch(t)}>{t}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* Sidebar toggle tab */}
          <div style={{ position:'sticky', top: navOpen ? 57 : 0, alignSelf:'flex-start', height:0, transition:'top .35s cubic-bezier(.4,0,.2,1)', zIndex:50 }}>
            <button onClick={() => setSidebarOpen(o => !o)} title={sidebarOpen ? 'Collapse filters' : 'Expand filters'}
              style={{ position:'absolute', left:0, top:20, width:20, height:52, background:'var(--bg2)', border:'1px solid var(--border2)', borderLeft:'none', borderRadius:'0 8px 8px 0', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--text2)', fontSize:12, fontWeight:700, transition:'all .18s', boxShadow:'2px 0 8px rgba(0,0,0,.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.color='var(--text)'; e.currentTarget.style.boxShadow='2px 0 12px rgba(47,129,247,.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg2)'; e.currentTarget.style.color='var(--text2)'; e.currentTarget.style.boxShadow='2px 0 8px rgba(0,0,0,.3)'; }}>
              {sidebarOpen ? '‹' : '›'}
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main style={{ flex:1, padding:'20px 24px', animation:'fadeIn .4s ease .1s both', minWidth:0 }}>
          {/* TABS + CONTROLS */}
<div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
  <div style={{ display:'flex', gap:4 }}>
    {tabs.map(t => (
      <button key={t} onClick={() => { setActiveTab(t); setPage(1); }} style={{ padding:'6px 16px', borderRadius:100, border:'none', cursor:'pointer', fontSize:13, fontWeight: activeTab===t ? 600 : 400, background: activeTab===t ? 'var(--text)' : 'transparent', color: activeTab===t ? 'var(--bg)' : 'var(--text2)', transition:'all .18s' }}>{t}</button>
    ))}
  </div>
  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
    <span style={{ color:'var(--text2)', fontSize:12 }}>Showing {filtered.length} projects</span>
    <div style={{ display:'flex', border:'1px solid var(--border)', borderRadius:6, overflow:'hidden' }}>
      {[['⊞','grid'],['☰','list']].map(([ic, v]) => (
        <button key={v} onClick={() => setView(v)} style={{ padding:'5px 10px', border:'none', cursor:'pointer', background: view===v ? 'var(--bg4)' : 'var(--bg2)', color: view===v ? 'var(--text)' : 'var(--text2)', fontSize:14, transition:'all .15s' }}>{ic}</button>
      ))}
    </div>
    <Link to="/submit" className="btn btn-primary btn-sm" style={{ whiteSpace:'nowrap' }}>
      + Submit Problem
    </Link>
  </div>
</div>

          {/* PROJECTS */}
          {paginated.length === 0 ? (
            <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text2)' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
              <div style={{ fontWeight:600 }}>No projects match your filters</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop:16 }} onClick={clearAll}>Clear filters</button>
            </div>
          ) : view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16, marginBottom:32 }}>
              {paginated.map((p, i) => (
                <Link to={`/project/${p.id}`} key={p.id} className="card" style={{ padding:0, overflow:'hidden', textDecoration:'none', display:'block', animation:`fadeIn .4s ease ${i * 0.07}s both` }}>
                  <div style={{ height:120, position:'relative', overflow:'hidden' }}>
                    <img src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .3s' }} onMouseEnter={e => e.target.style.transform='scale(1.05)'} onMouseLeave={e => e.target.style.transform='scale(1)'} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.7))' }} />
                    <span className={`badge ${badgeColors[p.badge]||'badge-blue'}`} style={{ position:'absolute', top:10, left:10 }}>{p.badge}</span>
                  </div>
                  <div style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontWeight:700, fontSize:14, color:'var(--text)' }}>{p.title}</span>
                      <span style={{ color:'var(--orange)', fontSize:12, display:'flex', alignItems:'center', gap:3 }}>⭐ {p.stars}</span>
                    </div>
                    <p style={{ color:'var(--text2)', fontSize:12, lineHeight:1.5, marginBottom:10 }}>{p.desc}</p>
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                      {p.tags.map(t => <span key={t} className={`tag ${tagColors[t]||'tag-gray'}`}>{t}</span>)}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:11, color:'var(--text3)' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:18, height:18, borderRadius:'50%', background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9 }}>👤</div>
                        <span>{p.author}</span>
                      </div>
                      <span>Updated {p.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:32 }}>
              {paginated.map((p, i) => (
                <Link to={`/project/${p.id}`} key={p.id} className="card" style={{ padding:'14px 18px', textDecoration:'none', display:'flex', alignItems:'center', gap:16, animation:`fadeIn .3s ease ${i * 0.05}s both` }}>
                  <img src={p.img} alt={p.title} style={{ width:72, height:52, objectFit:'cover', borderRadius:6, flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                      <span style={{ fontWeight:700, fontSize:14 }}>{p.title}</span>
                      <span className={`badge ${badgeColors[p.badge]||'badge-blue'}`} style={{ fontSize:9 }}>{p.badge}</span>
                    </div>
                    <p style={{ color:'var(--text2)', fontSize:12, marginBottom:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.desc}</p>
                    <div style={{ display:'flex', gap:5 }}>
                      {p.tags.map(t => <span key={t} className={`tag ${tagColors[t]||'tag-gray'}`}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
                    <span style={{ color:'var(--orange)', fontSize:13 }}>⭐ {p.stars}</span>
                    <span style={{ color:'var(--text3)', fontSize:11 }}>{p.time}</span>
                    <span style={{ color:'var(--text2)', fontSize:11 }}>{p.lang}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginBottom:40 }}>
              <button className="btn btn-outline btn-sm" style={{ padding:'5px 10px' }} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ width:34, height:34, borderRadius:6, border:`1px solid ${page===p ? 'var(--blue)' : 'var(--border)'}`, background: page===p ? 'var(--blue)' : 'transparent', color: page===p ? '#fff' : 'var(--text2)', cursor:'pointer', fontSize:13, transition:'all .15s' }}>{p}</button>
              ))}
              <button className="btn btn-outline btn-sm" style={{ padding:'5px 10px' }} disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>›</button>
            </div>
          )}

          {/* FOOTER */}
          <footer style={{ borderTop:'1px solid var(--border)', paddingTop:40 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:24, marginBottom:24 }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontWeight:700, marginBottom:10 }}>
                  <div style={{ width:22, height:22, background:'var(--blue)', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11 }}>⊞</div>
                  Built On It
                </div>
                <p style={{ color:'var(--text2)', fontSize:12, lineHeight:1.6 }}>The ultimate discovery platform for high-quality open source projects and developer resources.</p>
                <div style={{ display:'flex', gap:8, marginTop:10 }}>
                  {['🌐','📧','💬'].map(ic => <button key={ic} className="btn-icon" style={{ fontSize:13 }}>{ic}</button>)}
                </div>
              </div>
              {[
                { t:'PRODUCT', l:['Project Search','Top Developers','Collections','Analytics'] },
                { t:'COMMUNITY', l:['Contribute','Showcase','Forums','Sponsorship'] },
                { t:'LEGAL', l:['Privacy Policy','Terms of Service','Cookie Policy'] },
              ].map(col => (
                <div key={col.t}>
                  <div style={{ fontWeight:600, fontSize:11, color:'var(--text3)', textTransform:'uppercase', letterSpacing:1, marginBottom:10 }}>{col.t}</div>
                  {col.l.map(l => <div key={l} style={{ color:'var(--text2)', fontSize:13, marginBottom:7, cursor:'pointer' }}>{l}</div>)}
                </div>
              ))}
            </div>
            <div style={{ borderTop:'1px solid var(--border)', paddingTop:16, textAlign:'center' }}>
              <span style={{ color:'var(--text3)', fontSize:12 }}>© 2024 Built On It Inc. Built for developers by developers.</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
