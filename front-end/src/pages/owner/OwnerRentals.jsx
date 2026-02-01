import { useEffect, useState } from "react";
import {
  getOwnerRentals,
  approveRental,
  rejectRental
} from "../../services/ownerService";

const PAGE_SIZE = 5;

export default function OwnerRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    setLoading(true);
    try {
      const res = await getOwnerRentals();
      setRentals(res.data || []);
      setPage(1);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await approveRental(id);
    loadRentals();
  };

  const handleReject = async (id) => {
    await rejectRental(id);
    loadRentals();
  };

  const totalPages = Math.max(1, Math.ceil(rentals.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginated = rentals.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        Rental Requests & History
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && paginated.length === 0 && (
        <p className="text-gray-500">No rentals found.</p>
      )}

      <div className="space-y-4">
        {paginated.map(r => (
          <div
            key={r.rentalId}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-green-900">
                {r.equipmentName}
              </h3>

              <p className="text-sm text-gray-600">
                {r.startDate} → {r.endDate}
              </p>

              <p className="text-sm">
                Farmer: <b>{r.farmerName}</b>
              </p>

              {/* 💰 PAYMENT INFO */}
              {r.totalAmount && (
                <p className="text-sm mt-1">
                  Amount: <b>₹{r.totalAmount}</b>{" "}
                  {r.paid ? "✅ Paid" : "❌ Not Paid"}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* STATUS */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${r.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                  ${r.status === "APPROVED" && "bg-green-100 text-green-700"}
                  ${r.status === "REJECTED" && "bg-red-100 text-red-700"}
                  ${r.status === "CANCELLED" && "bg-gray-200 text-gray-700"}
                `}
              >
                {r.status}
              </span>

              {/* ACTIONS */}
              {r.status === "PENDING" && (
                <>
                  <button
                    onClick={() => handleApprove(r.rentalId)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(r.rentalId)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {rentals.length > PAGE_SIZE && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
