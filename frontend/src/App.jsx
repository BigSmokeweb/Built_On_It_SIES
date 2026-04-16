import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import Dashboard from './pages/HomePage';
import Explore from './pages/BrowseProjects';
import Categories from './pages/ProjectCategories';
import ProjectDetail from './pages/ProjectPage';
import SubmitProblem from './pages/UploadProject';
import Profile from './pages/UserProfile';
import Tutorials from './pages/TutorialsPage';
import Community from './pages/AskDev';
import Collab from './pages/BuildTogether';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import FAQ from './pages/FAQPage';
import Privacy from './pages/PrivacyPage';
import Terms from './pages/TermsPage';
import Login from './pages/LoginPage';
import TutorialDetail from './pages/TutorialDetail';

/* ── Session version — bump this to force all users to re-login ── */
const SESSION_VERSION = '2';

/* ── Auth guard: redirect to /login if no valid session ── */
function RootRedirect() {
  // Clear any session that was set before our versioned auth system
  if (localStorage.getItem('boi_session_v') !== SESSION_VERSION) {
    localStorage.removeItem('boi_user');
    localStorage.removeItem('boi_guest');
    localStorage.setItem('boi_session_v', SESSION_VERSION);
  }
  const hasSession = localStorage.getItem('boi_user') || localStorage.getItem('boi_guest');
  return hasSession ? <Dashboard /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/submit" element={<SubmitProblem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorial/:id" element={<TutorialDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/collab" element={<Collab />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

