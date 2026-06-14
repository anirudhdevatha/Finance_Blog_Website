import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ReportPage from "./pages/ReportPage";
import CreatePostPage from "./pages/CreatePostPage";
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reports/:slug" element={<ReportPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/new" element={<CreatePostPage />} />
    </Routes>
  );
}