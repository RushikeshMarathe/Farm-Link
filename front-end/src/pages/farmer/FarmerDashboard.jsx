import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import DashboardCard from "../../components/common/DashboardCard";
import FarmerRentalCard from "../../components/common/FarmerRentalCard";
import PaymentModal from "../../components/modals/PaymentModal";
import ReviewModal from "../../components/modals/ReviewModal";

export default function FarmerDashboard() {
  const [allRentals, setAllRentals] = useState([]);
  const [recentRentals, setRecentRentals] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedRental, setSelectedRental] = useState(null); // 💳 payment
  const [reviewRental, setReviewRental] = useState(null);     // ⭐ review

  const navigate = useNavigate();

  // ================= LOAD DASHBOARD =================
  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [rentalsRes, farmerRes] = await Promise.all([
        api.get("/rentals/farmer"),
        api.get("/farmers/profile"),
      ]);

      const rentals = Array.isArray(rentalsRes.data)
        ? rentalsRes.data
        : [];

      setAllRentals(rentals);

      // 🔹 recent 3 rentals
      const recent = [...rentals]
        .sort(
          (a, b) =>
            new Date(b.createdAt || b.startDate) -
            new Date(a.createdAt || a.startDate)
        )
        .slice(0, 3);

      setRecentRentals(recent);
      setFarmer(farmerRes.data);
    } catch (err) {
      console.error("Failed to load farmer dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ================= STATS =================
  const totalRequests = allRentals.length;

  const approvedCount = allRentals.filter(
    r => r.status === "APPROVED"
  ).length;

  const pendingCount = allRentals.filter(
    r => r.status === "PENDING"
  ).length;

  const completedCount = allRentals.filter(
    r => r.status === "COMPLETED"
  ).length;

  // ================= ACTIONS =================
  const handlePay = (rental) => {
    setSelectedRental(rental);
  };

  const handleReview = (rental) => {
    setReviewRental(rental);
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">
          Hello {farmer?.firstName || "Farmer"} 👨‍🌾
        </h1>
        <p className="text-gray-600 mt-1">
          Manage rentals, payments & reviews
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <DashboardCard title="Total Requests" value={totalRequests} />
        <DashboardCard title="Approved Rentals" value={approvedCount} />
        <DashboardCard title="Pending Requests" value={pendingCount} />
        <DashboardCard title="Completed Rentals" value={completedCount} />
      </div>

      {/* ===== RECENT RENTALS ===== */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Recent Rental Requests
          </h2>

          <button
            onClick={() => navigate("/farmer/rentals")}
            className="text-green-700 text-sm font-semibold hover:underline"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : recentRentals.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No rental requests yet.
          </p>
        ) : (
          <div className="space-y-4">
            {recentRentals.map((rental) => (
              <FarmerRentalCard
                key={rental.rentalId || rental.id}
                rental={rental}
                onPay={handlePay}
                onCancel={loadDashboard}
                onReview={handleReview}   // ⭐ review hook
              />
            ))}
          </div>
        )}
      </div>

      {/* ===== PAYMENT MODAL ===== */}
      {selectedRental && (
        <PaymentModal
          rental={selectedRental}
          onClose={() => setSelectedRental(null)}
          onSuccess={() => {
            setSelectedRental(null);
            loadDashboard();
          }}
        />
      )}

      {/* ===== REVIEW MODAL ===== */}
      {reviewRental && (
        <ReviewModal
          rental={reviewRental}
          onClose={() => setReviewRental(null)}
          onSuccess={() => {
            setReviewRental(null);
            loadDashboard();
          }}
        />
      )}
    </>
  );
}
