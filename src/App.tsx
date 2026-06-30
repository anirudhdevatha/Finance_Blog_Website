import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ReportPage from "./pages/ReportPage";
import CreatePostPage from "./pages/CreatePostPage";
import AboutPage from "./pages/AboutPage";
import ResearchArchivePage from "./pages/ResearchArchivePage";
import PositionPage from "./pages/PositionPage";
import SectorPage from "./pages/SectorPage";
import PerformancePage from "./pages/PerformancePage";
import Layout from "./components/Layout";
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
        <Route path="/admin/new" element={<CreatePostPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
