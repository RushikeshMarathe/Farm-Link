import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

export default function OwnerSidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isDashboard = location.pathname === "/owner";

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  const go = (path) => {
    navigate(path);
    setOpen(false); // close sidebar on mobile
  };

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-green-900 text-white px-4 py-3">
        <h2 className="text-lg font-bold">🏭 FarmLink Owner</h2>
        <button
          onClick={() => setOpen(true)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      {/* ================= OVERLAY (mobile) ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:fixed
          top-0 left-0 z-50
          h-screen w-64
          bg-green-900 text-white
          flex flex-col
          px-6 py-8
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-8 hidden md:block">
          🏭 FarmLink Owner
        </h2>

        {/* MENU */}
        <nav className="space-y-3 text-sm font-medium flex-1 overflow-y-auto">
          <SidebarItem
            label="Dashboard"
            active={isDashboard}
            onClick={() => go("/owner")}
          />

          <SidebarItem
            label="My Equipments"
            active={isActive("/owner/equipments")}
            onClick={() => go("/owner/equipments")}
          />

          <SidebarItem
            label="Rental Requests"
            active={isActive("/owner/rentals")}
            onClick={() => go("/owner/rentals")}
          />

          <SidebarItem
            label="Payments"
            active={isActive("/owner/payments")}
            onClick={() => go("/owner/payments")}
          />

          <SidebarItem
            label="Profile"
            active={isActive("/owner/profile")}
            onClick={() => go("/owner/profile")}
          />

          <SidebarItem
            label="Settings"
            active={isActive("/owner/settings")}
            onClick={() => go("/owner/settings")}
          />
        </nav>

        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="mt-6 text-red-200 hover:text-white text-sm font-semibold"
        >
          ⏻ Logout
        </button>
      </aside>
    </>
  );
}
