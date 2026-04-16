import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/submit" element={<SubmitProblem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/community" element={<Community />} />
        <Route path="/collab" element={<Collab />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
