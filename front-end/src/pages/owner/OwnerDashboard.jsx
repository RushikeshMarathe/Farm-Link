import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../../components/common/DashboardCard";
import RentalCard from "../../components/common/FarmerRentalCard";
import { getOwnerRentals } from "../../services/ownerService";

export default function OwnerDashboard() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      setLoading(true);
      const res = await getOwnerRentals();
      setRentals(res.data || []);
    } catch (err) {
      console.error("Failed to load owner rentals", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= STATS =================
  const totalRentals = rentals.length;
  const pendingRequests = rentals.filter(
    r => r.status === "PENDING"
  ).length;
  const approvedRentals = rentals.filter(
    r => r.status === "APPROVED"
  ).length;

  // ================= RECENT =================
  const recentRentals = [...rentals]
    .sort((a, b) => b.rentalId - a.rentalId)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto">
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-900">
          Owner Dashboard 🏭
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Manage your equipments and rental requests
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="
        grid gap-4 sm:gap-6 mb-10
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      ">
        <DashboardCard
          title="Total Rentals"
          value={totalRentals}
        />
        <DashboardCard
          title="Pending Requests"
          value={pendingRequests}
        />
        <DashboardCard
          title="Approved Rentals"
          value={approvedRentals}
        />
      </div>

      {/* ===== RECENT RENTALS ===== */}
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">
            Recent Rental Requests
          </h2>

          <button
            onClick={() => navigate("/owner/rentals")}
            className="text-green-700 text-sm font-semibold hover:underline"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Loading rentals...
          </div>
        ) : recentRentals.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No rental requests yet
          </div>
        ) : (
          <div className="grid gap-4">
            {recentRentals.map(rental => (
              <RentalCard
                key={rental.rentalId}
                rental={rental}
                role="OWNER"
                onAction={loadRentals}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
