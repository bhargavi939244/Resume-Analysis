
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import NewAnalysisPage from './pages/NewAnalysisPage';
import AnalysisResultPage from './pages/AnalysisResultPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import BlogsPage from './pages/BlogsPage';
import AboutUsPage from './pages/AboutUsPage';
import ResumeServicesPage from './pages/ResumeServicesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analyze" element={<NewAnalysisPage />} />
            <Route path="/analysis/:id" element={<AnalysisResultPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/services" element={<ResumeServicesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
