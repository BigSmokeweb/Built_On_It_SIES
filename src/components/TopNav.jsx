import { Link, useLocation } from 'react-router-dom';

export default function TopNav({ variant = 'default' }) {
  const loc = useLocation();

  const icons = {
    grid: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/></svg>,
    bell: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917z"/></svg>,
    gear: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/></svg>,
    share: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/></svg>,
  };

  return (
    <nav className="topnav" style={{ animation: 'slideDown .4s ease' }}>
      <Link to="/" className="topnav-logo">
        <div className="topnav-logo-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 3h12v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z"/>
          </svg>
        </div>
        Built On It
      </Link>

      {variant === 'explore' && (
        <div className="topnav-links">
          <Link to="/explore" className="topnav-link active" style={{ animationDelay: '0s' }}>Explore</Link>
        </div>
      )}

      {variant === 'submit' && (
        <div className="topnav-links">
          {['Projects','Feed','Showcase'].map(l => (
            <Link key={l} to="#" className="topnav-link">{l}</Link>
          ))}
        </div>
      )}

      <div className="topnav-search" style={{ marginLeft: variant === 'default' ? '0' : 'auto', marginRight: 'auto' }}>
        <span className="topnav-search-icon">🔍</span>
        <input placeholder={
          variant === 'explore' ? 'Search projects, stacks, or authors...' :
          variant === 'submit' ? 'Search...' :
          'Search projects, vaults, or devs...'
        } />
      </div>

      <div className="topnav-right">
        {variant === 'default' && (
          <>
            <button className="btn-icon">{icons.share}</button>
          </>
        )}
        {(variant === 'explore' || variant === 'categories') && (
          <button className="btn-icon">{icons.bell}</button>
        )}
        {variant === 'submit' && (
          <button className="btn-icon">{icons.bell}</button>
        )}
        <div className="avatar-placeholder">L</div>
      </div>
    </nav>
  );
}
