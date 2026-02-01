import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import { logout } from "../../redux/slices/authSlice";

export default function FarmerLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // ⭐ mobile toggle

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="bg-green-50 min-h-screen flex">
      
      {/* ===== MOBILE OVERLAY ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-green-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar onLogout={handleLogout} />
      </aside>

      {/* ===== CONTENT ===== */}
      <div className="flex-1 lg:ml-64">
        
        {/* TOP BAR (mobile only) */}
        <div className="lg:hidden bg-white shadow px-4 py-3 flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="text-2xl font-bold"
          >
            ☰
          </button>
          <span className="ml-3 font-semibold text-green-900">
            Farmer Panel
          </span>
        </div>

        {/* SCROLLABLE CONTENT */}
        <main className="h-[calc(100vh-56px)] lg:h-screen overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
