// pages/admin/AdminLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  const navItem = (label, path) => (
    <button
      key={path}
      onClick={() => navigate(path)}
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
    <div className="bg-gray-100 min-h-screen">
      {/* ===== FIXED SIDEBAR ===== */}
      <aside
        className="
          fixed top-0 left-0
          h-screen w-64
          bg-gray-900 text-white
          p-6 flex flex-col
        "
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

      {/* ===== SCROLLABLE CONTENT ===== */}
      <main
        className="
          ml-64
          min-h-screen
          p-6 sm:p-8
          overflow-y-auto
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
