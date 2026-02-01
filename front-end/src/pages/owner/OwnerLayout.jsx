// pages/owner/OwnerLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import OwnerSidebar from "../../components/sidebar/OwnerSidebar";

export default function OwnerLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/auth", { replace: true });
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* ===== SIDEBAR (responsive) ===== */}
      <OwnerSidebar onLogout={handleLogout} />

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="
          pt-16 md:pt-0        /* mobile top bar space */
          md:ml-64            /* sidebar width on desktop */
          min-h-screen
          p-4 sm:p-6 md:p-8
          overflow-y-auto
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
