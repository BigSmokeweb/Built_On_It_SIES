import { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── DATA ───────────────────────────────────────────────────────── */
const allProjects = [
  {
    id: 'p1',
    icon: '⚛️',
    iconColor: '#61dafb',
    title: 'ReactFlow Dashboard',
    desc: 'A modular, drag-and-drop analytics dashboard built with React 18, featuring real-time data widgets and customizable layouts.',
    stars: '1.1k',
    forks: 87,
    lang: 'React',
    langColor: '#61dafb',
    badge: 'Public',
  },
  {
    id: 'p2',
    icon: '🚀',
    iconColor: '#3fb950',
    title: 'NodeVault API',
    desc: 'A RESTful backend framework using Node.js & Express with built-in JWT auth, rate-limiting, and MongoDB integration.',
    stars: '638',
    forks: 44,
    lang: 'Node.js',
    langColor: '#68a063',
    badge: 'Public',
  },
  {
    id: 'p3',
    icon: '🐍',
    iconColor: '#3572A5',
    title: 'PyDataKit',
    desc: 'A lightweight Python toolkit for data preprocessing, cleaning, and visualization — perfect for ML & analytics workflows.',
    stars: '412',
    forks: 29,
    lang: 'Python',
    langColor: '#3572A5',
    badge: 'Public',
  },
  {
    id: 'p4',
    icon: '🎨',
    iconColor: '#bc8cff',
    title: 'CSSArt Studio',
    desc: 'A collection of pure CSS animations, glassmorphism UI components, and design system tokens for modern web UIs.',
    stars: '290',
    forks: 18,
    lang: 'CSS',
    langColor: '#563d7c',
    badge: 'Public',
  },
  {
    id: 'p5',
    icon: '🔐',
    iconColor: '#e3b341',
    title: 'SecureForm.js',
    desc: 'Client-side form validation & encryption library with zero dependencies. Supports XSS prevention and AES-256 field encoding.',
    stars: '175',
    forks: 11,
    lang: 'JavaScript',
    langColor: '#f0db4f',
    badge: 'Public',
  },
];

const bookmarks = [
  {
    id: 'b1', icon: '⚡', iconColor: '#3fb950', title: 'NeuralNexus AI',
    desc: 'Python library for deploying neural networks at the edge.', stars: '54k', forks: 8200,
    lang: 'Python', langColor: '#3572A5', badge: 'Public',
  },
  {
    id: 'b2', icon: '🔗', iconColor: '#00bcd4', title: 'GoScale API',
    desc: 'Scalable microservices framework built in Go.', stars: '19.3k', forks: 2400,
    lang: 'Go', langColor: '#00ADD8', badge: 'Public',
  },
];

const contributions = [
  {
    type: 'push',
    color: '#2f81f7',
    avatar: null,
    content: (<><strong>Milind Sahu</strong> pushed 3 commits to <span style={{ color: '#2f81f7' }}>ReactFlow Dashboard</span></>),
    time: '1 hour ago',
  },
  {
    type: 'pr',
    color: '#bc8cff',
    avatar: null,
    content: (<>Merged Pull Request <span style={{ color: '#2f81f7' }}>#17</span> into <strong>NodeVault API</strong></>),
    time: 'Yesterday',
  },
  {
    type: 'star',
    color: '#e3b341',
    avatar: null,
    content: (<>Starred <span style={{ color: '#2f81f7' }}>NeuralNexus AI</span></>),
    time: '2 days ago',
  },
  {
    type: 'push',
    color: '#2f81f7',
    avatar: null,
    content: (<><strong>Milind Sahu</strong> opened issue <span style={{ color: '#2f81f7' }}>#8</span> in <strong>PyDataKit</strong></>),
    time: '4 days ago',
  },
];

const tabs = ['My Projects', 'Bookmarks', 'Recent Activity'];

/* ─── SVG ICONS ─────────────────────────────────────────────────── */
const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4.166 11.81a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5zm4-8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5zm0 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5z" />
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM2.044 8.087A6.002 6.002 0 0 1 8 2.002a6 6 0 1 1 0 12 6.002 6.002 0 0 1-5.956-5.915z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
);

const ForkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0zM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

/* ─── PROJECT CARD ───────────────────────────────────────────────── */
function ProjectCard({ p, i }) {
  const isString = typeof p.icon === 'string';
  return (
    <Link
      to={`/project/${p.id}`}
      className="card"
      style={{
        padding: '16px 18px',
        textDecoration: 'none',
        display: 'block',
        animation: `scaleIn .3s ease ${i * 0.08}s both`,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: p.iconColor + '22',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: p.iconColor,
            border: `1px solid ${p.iconColor}44`,
            fontSize: isString ? 18 : undefined,
          }}
        >
          {p.icon}
        </div>
        <span
          className="badge"
          style={{
            background: 'rgba(100,110,120,.18)',
            color: 'var(--text2)',
            fontSize: 10,
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '2px 8px',
            fontWeight: 500,
            textTransform: 'none',
            letterSpacing: 0,
          }}
        >
          {p.badge}
        </span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6, color: 'var(--text)' }}>{p.title}</div>
      <p
        style={{
          color: 'var(--text2)',
          fontSize: 12,
          lineHeight: 1.55,
          marginBottom: 14,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {p.desc}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11.5, color: 'var(--text3)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <StarIcon /> {p.stars}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <ForkIcon /> {p.forks}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: p.langColor, display: 'inline-block', flexShrink: 0 }} />
          {p.lang}
        </span>
      </div>
    </Link>
  );
}

/* ─── CONTRIBUTION AVATAR ────────────────────────────────────────── */
function ContribAvatar({ c }) {
  if (c.type === 'push') {
    return (
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
        alt="avatar"
        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--border2)' }}
      />
    );
  }
  if (c.type === 'pr') {
    return (
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(188,140,255,.2)', border: '1px solid rgba(188,140,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#bc8cff">
          <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354z" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(227,179,65,.2)', border: '1px solid rgba(227,179,65,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <StarIcon />
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────── */
export default function Profile() {
  const [activeTab, setActiveTab] = useState('My Projects');
  const [following, setFollowing] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [followers, setFollowers] = useState(450);

  const handleFollow = () => {
    setFollowing(f => !f);
    setFollowers(n => (following ? n - 1 : n + 1));
  };

  const handleMessage = () => {
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 2000);
  };

  const formatNum = n => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP NAV ────────────────────────────────────────────── */}
      <nav
        style={{
          height: 57,
          background: 'rgba(13,17,23,.96)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(12px,3vw,20px)',
          gap: 10,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
          animation: 'slideDown .4s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', flexShrink: 0 }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: 'var(--blue)',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z" />
            </svg>
          </div>
          Built On It
        </Link>

        {/* Search — hidden on small screens via class */}
        <div style={{ flex: 1, maxWidth: 380, position: 'relative', marginLeft: 8, minWidth: 0 }} className="profile-search">
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)', fontSize: 13 }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
            </svg>
          </span>
          <input
            className="input"
            placeholder="Search projects, vaults, or devs..."
            style={{ paddingLeft: 32, height: 34, borderRadius: 20 }}
          />
        </div>

        {/* Right icons */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn-icon" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <GearIcon />
          </button>
          <button className="btn-icon" style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <ShareIcon />
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#2f81f7,#bc8cff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#fff', border: '2px solid var(--border2)', cursor: 'pointer', flexShrink: 0 }}>MS</div>
        </div>
      </nav>

      {/* ── PAGE BODY ──────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(16px,3vw,28px) clamp(14px,3vw,24px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 24,
          alignItems: 'start',
        }}
        className="profile-grid"
      >
        {/* ── LEFT COLUMN ──────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Profile Card */}
          <div className="card" style={{ padding: '24px 22px', animation: 'fadeInLeft .4s ease', textAlign: 'center' }}>

            {/* Avatar */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 14 }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  border: '3px solid var(--blue)',
                  overflow: 'hidden',
                  boxShadow: '0 0 0 3px rgba(47,129,247,.15)',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #2f81f7, #bc8cff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: -1,
                  fontFamily: 'Inter, sans-serif',
                }}>MS</div>
              </div>
              {/* Online dot */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 5,
                  right: 5,
                  width: 14,
                  height: 14,
                  background: '#3fb950',
                  borderRadius: '50%',
                  border: '2.5px solid var(--bg2)',
                }}
              />
            </div>

            {/* Name & handle */}
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 4, color: 'var(--text)' }}>Milind Sahu</h1>
            <div style={{ color: 'var(--blue)', fontSize: 13, marginBottom: 10, fontWeight: 500 }}>@milind_sahu</div>

            {/* Bio */}
            <p style={{ color: 'var(--text2)', fontSize: 12.5, lineHeight: 1.65, marginBottom: 10, textAlign: 'left' }}>
              Full-stack Developer | React &amp; Node.js enthusiast. Building cool stuff and exploring the open-source world. 🚀
            </p>

            {/* Tech Stack badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {['React', 'Node.js', 'Python', 'JavaScript', 'CSS'].map(t => (
                <span key={t} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: 'rgba(47,129,247,.12)', color: 'var(--blue)', border: '1px solid rgba(47,129,247,.25)', fontWeight: 600 }}>{t}</span>
              ))}
            </div>

            {/* Location */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text3)', fontSize: 12, marginBottom: 18, textAlign: 'left' }}>
              <PinIcon />
              India
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 0 }}>
              <button
                onClick={handleFollow}
                className={following ? 'btn btn-secondary' : 'btn btn-primary'}
                style={{ flex: 1, justifyContent: 'center', fontWeight: 600, transition: 'all .2s', fontSize: 14 }}
              >
                {following ? '✓ Following' : 'Follow'}
              </button>
              <button
                onClick={handleMessage}
                className="btn btn-secondary"
                style={{
                  padding: '7px 13px',
                  transition: 'all .2s',
                  background: messageSent ? 'rgba(63,185,80,.15)' : undefined,
                  borderColor: messageSent ? 'var(--green)' : undefined,
                  color: messageSent ? 'var(--green)' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {messageSent ? '✓' : <EnvelopeIcon />}
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '18px 0' }} />

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
              {[
                { n: '5', l: 'PROJECTS' },
                { n: formatNum(followers), l: 'FOLLOWERS' },
                { n: '128', l: 'FOLLOWING' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>{s.n}</div>
                  <div style={{ color: 'var(--text3)', fontSize: 9.5, letterSpacing: 0.8, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="card" style={{ padding: '18px 20px', animation: 'fadeInLeft .4s ease .1s both' }}>
            <div style={{ fontWeight: 600, fontSize: 10.5, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>
              ACHIEVEMENTS
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { emoji: '🏆', color: '#e3b341', title: 'Top Contributor' },
                { icon: 'grid', color: '#2f81f7', title: 'Open Sourcer' },
                { emoji: '📢', color: '#bc8cff', title: 'Community Star' },
              ].map((a, i) => (
                <div
                  key={i}
                  title={a.title}
                  style={{
                    width: 44,
                    height: 44,
                    background: a.color + '22',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: a.emoji ? 20 : undefined,
                    color: a.color,
                    border: `1px solid ${a.color}44`,
                    cursor: 'pointer',
                    transition: 'transform .2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.12)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                >
                  {a.emoji ? (
                    a.emoji
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────── */}
        <div style={{ animation: 'fadeInRight .4s ease .1s both' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 20, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'transparent',
                  color: activeTab === tab ? 'var(--blue)' : 'var(--text2)',
                  fontSize: 13.5,
                  fontWeight: activeTab === tab ? 600 : 400,
                  borderBottom: `2px solid ${activeTab === tab ? 'var(--blue)' : 'transparent'}`,
                  transition: 'all .18s',
                  marginBottom: -1,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── MY PROJECTS TAB ────────────────────────────────── */}
          {activeTab === 'My Projects' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
                {allProjects.map((p, i) => (
                  <ProjectCard key={p.id} p={p} i={i} />
                ))}

                {/* Create New Project - dashed card */}
                <Link
                  to="/submit"
                  className="card"
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px dashed var(--border2)',
                    minHeight: 150,
                    gap: 10,
                    textDecoration: 'none',
                    background: 'transparent',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--blue)';
                    e.currentTarget.style.background = 'rgba(47,129,247,.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border2)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'var(--bg4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border2)',
                      color: 'var(--text2)',
                    }}
                  >
                    <PlusIcon />
                  </div>
                  <span style={{ color: 'var(--text2)', fontSize: 13 }}>Create New Project</span>
                </Link>
              </div>

              {/* Recent Contributions — shown below project grid on My Projects tab */}
              <div className="card" style={{ padding: '20px 22px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, marginBottom: 18, color: 'var(--text)' }}>
                  <ClockIcon /> Recent Contributions
                </h3>
                {contributions.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '10px 0',
                      borderBottom: i < contributions.length - 1 ? '1px solid var(--border)' : 'none',
                      animation: `fadeIn .3s ease ${i * 0.1}s both`,
                    }}
                  >
                    <ContribAvatar c={c} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>{c.content}</div>
                      <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 4 }}>{c.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── BOOKMARKS TAB ─────────────────────────────────── */}
          {activeTab === 'Bookmarks' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
              {bookmarks.map((p, i) => (
                <ProjectCard key={p.id} p={p} i={i} />
              ))}
            </div>
          )}

          {/* ── RECENT ACTIVITY TAB ───────────────────────────── */}
          {activeTab === 'Recent Activity' && (
            <div className="card" style={{ padding: '20px 22px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, marginBottom: 18, color: 'var(--text)' }}>
                <ClockIcon /> Recent Contributions
              </h3>
              {contributions.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: i < contributions.length - 1 ? '1px solid var(--border)' : 'none',
                    animation: `fadeIn .3s ease ${i * 0.1}s both`,
                  }}
                >
                  <ContribAvatar c={c} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text)' }}>{c.content}</div>
                    <div style={{ color: 'var(--text3)', fontSize: 11, marginTop: 4 }}>{c.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(14px,3vw,18px) clamp(14px,3vw,24px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 8,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text2)', fontSize: 13 }}>
          <div
            style={{
              width: 18,
              height: 18,
              background: 'var(--blue)',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z" />
            </svg>
          </div>
          Built On It © 2024
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Contact', '/contact']].map(([l, to]) => (
            <Link key={l} to={to} style={{ color: 'var(--text2)', fontSize: 12.5, cursor: 'pointer', transition: 'color .15s', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text2)')}
            >
              {l}
            </Link>
          ))}
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media(min-width: 769px) {
          .profile-grid { grid-template-columns: 280px minmax(0,1fr) !important; }
        }
        @media(max-width: 768px) {
          .profile-search { display: none !important; }
          .profile-grid { grid-template-columns: 1fr !important; }
        }
        @media(max-width: 480px) {
          .profile-search { display: none !important; }
        }
      `}</style>
    </div>
  );
}
