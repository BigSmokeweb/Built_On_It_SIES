import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import Layout from './components/Layout';
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
        <Route path="/categories" element={<Layout><Categories /></Layout>} />
        <Route path="/project/:id" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/submit" element={<Layout><SubmitProblem /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/tutorials" element={<Layout><Tutorials /></Layout>} />
        <Route path="/tutorial/:id" element={<Layout><TutorialDetail /></Layout>} />
        <Route path="/community" element={<Layout><Community /></Layout>} />
        <Route path="/collab" element={<Layout><Collab /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

