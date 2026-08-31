import { Routes, Route } from "react-router-dom";
import { RequireAdmin } from "./components/RequireAdmin";
import Layout from "./components/Layout";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ReportPage from "./pages/ReportPage";
import CreatePostPage from "./pages/CreatePostPage";
import AboutPage from "./pages/AboutPage";
import ResearchArchivePage from "./pages/ResearchArchivePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import PositionPage from "./pages/PositionPage";
import SectorPage from "./pages/SectorPage";
import PerformancePage from "./pages/PerformancePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import "./index.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/research" element={<ResearchArchivePage />} />
        <Route path="/positions/:ticker" element={<PositionPage />} />
        <Route path="/sectors/:sector" element={<SectorPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/reports/:slug" element={<ReportPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route
          path="/admin/new"
          element={
            <RequireAdmin>
              <CreatePostPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboardPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <RequireAdmin>
              <CreatePostPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/create-post"
          element={
            <RequireAdmin>
              <CreatePostPage />
            </RequireAdmin>
          }
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
