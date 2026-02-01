import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useState } from "react";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false); // ⭐ mobile toggle

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  const navItem = (label, path) => (
    <button
      key={path}
      onClick={() => {
        navigate(path);
        setOpen(false); // close on mobile click
      }}
      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition
        ${
          pathname === path
            ? "bg-green-700 text-white shadow"
            : "text-gray-300 hover:bg-gray-800"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex">
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
          bg-gray-900 text-white
          p-6 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold mb-8">
          🛡 Admin Panel
        </h2>

        <nav className="space-y-2">
          {navItem("📊 Dashboard", "/admin")}
          {navItem("👨‍🌾 Owners", "/admin/owners")}
          {navItem("🚜 Farmers", "/admin/farmers")}
          {navItem("📝 Reviews", "/admin/reviews")}
          {navItem("⚙️ Settings", "/admin/settings")}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto text-red-400 hover:text-white text-sm font-semibold"
        >
          ⏻ Logout
        </button>
      </aside>

      {/* ===== CONTENT AREA ===== */}
      <div className="flex-1 lg:ml-64">
        {/* TOP BAR (mobile only) */}
        <div className="lg:hidden bg-white shadow px-4 py-3 flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="text-2xl font-bold"
          >
            ☰
          </button>
          <span className="ml-3 font-semibold">Admin Panel</span>
        </div>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
