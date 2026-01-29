import { useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar({ onLogout }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const item = (label, path) => (
    <button
      key={path}
      onClick={() => navigate(path)}
      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition
        ${
          pathname === path
            ? "bg-green-700 text-white shadow"
            : "text-gray-200 hover:bg-green-800"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <aside
      className="
        fixed top-0 left-0
        h-screen w-64
        bg-green-900 text-white
        p-6 flex flex-col
      "
    >
      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-8">
        🛡 Admin Panel
      </h2>

      {/* MENU */}
      <div className="space-y-2">
        {item("📊 Dashboard", "/admin")}
        {item("👨‍🌾 Owners", "/admin/owners")}
        {item("🚜 Farmers", "/admin/farmers")}
        {item("📝 Reviews", "/admin/reviews")}
        {item("⚙️ Settings", "/admin/settings")}
      </div>

      {/* FOOTER */}
      <button
        onClick={onLogout}
        className="mt-auto text-red-200 hover:text-white text-sm font-semibold"
      >
        ⏻ Logout
      </button>
    </aside>
  );
}
