import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./styles/wop-theme.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import Countries from "./pages/Countries";
import Partnerships from "./pages/Partnerships";
import Organizers from "./pages/Organizers";
import FAQ from "./pages/faq";
import Contact from "./pages/Contact";

/* AUTH */
import CulinaryLogin from "./pages/CulinaryLogin";
import CulinaryRegister from "./pages/CulinaryRegister";
import PendingApproval from "./pages/PendingApproval";

/* DASHBOARDS */
import CulinaryDashboard from "./pages/CulinaryDashboard";
import AdminDashboard from "./pages/AdminDashboard";

/* ADMIN */
import AdminPage from "./pages/AdminPage";

import Registration from "./pages/Registration";


export default function App() {
  return (
    <BrowserRouter>

      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/organizers" element={<Organizers />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

        {/* AUTH */}
        <Route path="/auth/login" element={<CulinaryLogin />} />
        <Route path="/auth/register" element={<CulinaryRegister />} />
        <Route path="/auth/pending" element={<PendingApproval />} />

        {/* DASHBOARDS */}
        <Route path="/culinary/dashboard" element={<CulinaryDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        

        {/* ADMIN PARTNERSHIPS PAGE */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/registration" element={<Registration />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <ScrollToTopButton />
      <Footer />

    </BrowserRouter>
  );
}
