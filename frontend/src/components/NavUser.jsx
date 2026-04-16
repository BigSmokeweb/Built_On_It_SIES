/**
 * NavUser — smart top-right nav widget
 * Shows the user's avatar (→ /profile) if logged in,
 * or a "Sign Up →" pill if guest/unauthenticated.
 */
import { Link, useNavigate } from 'react-router-dom';

const GRADIENTS = [
  ['#2f81f7','#bc8cff'], ['#3fb950','#00bcd4'], ['#f85149','#e3b341'],
  ['#bc8cff','#f472b6'], ['#e3b341','#f97316'], ['#00bcd4','#2f81f7'],
];

export default function NavUser() {
  const navigate  = useNavigate();
  const stored    = JSON.parse(localStorage.getItem('boi_user') || 'null');
  const isGuest   = !stored && !!localStorage.getItem('boi_guest');

  const handleLogout = () => {
    localStorage.removeItem('boi_user');
    localStorage.removeItem('boi_guest');
    navigate('/login');
  };

  if (stored) {
    /* Resolve avatar gradient */
    const [a, b] = Array.isArray(stored.avatarGrad)
      ? stored.avatarGrad
      : (GRADIENTS[stored.avatarGrad ?? 0] || GRADIENTS[0]);
    const initials = stored.initials || stored.name?.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase() || '?';

    return (
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <Link to="/profile" style={{ textDecoration:'none' }}>
          <div title={stored.name}
            style={{ width:32, height:32, borderRadius:'50%', background:`linear-gradient(135deg,${a},${b})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff', cursor:'pointer', transition:'box-shadow .2s, transform .2s', flexShrink:0 }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 0 0 2px ${a}`; e.currentTarget.style.transform='scale(1.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
            {initials}
          </div>
        </Link>
        <button onClick={handleLogout} title="Sign out"
          style={{ padding:'4px 10px', borderRadius:6, border:'1px solid rgba(248,81,73,.3)', background:'rgba(248,81,73,.08)', color:'#ff7b72', fontSize:11, fontWeight:600, cursor:'pointer', transition:'all .18s', whiteSpace:'nowrap' }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(248,81,73,.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(248,81,73,.08)'; }}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      {isGuest && (
        <span style={{ fontSize:11, color:'var(--text3)', fontWeight:500 }}>Guest</span>
      )}
      <Link to="/login" style={{ textDecoration:'none' }}>
        <button
          style={{ padding:'6px 14px', borderRadius:20, border:'1.5px solid rgba(47,129,247,.5)', background:'rgba(47,129,247,.1)', color:'#58a6ff', fontWeight:700, fontSize:12, cursor:'pointer', whiteSpace:'nowrap', transition:'all .2s', fontFamily:"'Inter',sans-serif" }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(47,129,247,.2)'; e.currentTarget.style.borderColor='#2f81f7'; }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(47,129,247,.1)'; e.currentTarget.style.borderColor='rgba(47,129,247,.5)'; }}>
          Sign Up →
        </button>
      </Link>
    </div>
  );
}
