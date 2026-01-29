import { useState } from "react";
import { addReview } from "../../services/reviewService";
import { successToast, errorToast } from "../../utils/toast";

export default function ReviewModal({ rental, onClose, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ equipmentId FROM rental
  const equipmentId =rental.rentalId;
    // rental.equipment?.id;
 console.log("equpiment data "+equipmentId);
  const submit = async () => {
    if (!equipmentId) {
      errorToast("Equipment id missing ❌");
      return;
    }

    if (comment.trim().length < 5) {
      errorToast("Comment must be at least 5 characters");
      return;
    }

    try {
      setLoading(true);

      await addReview({
        equipmentId,
        rating,
        comment,
      });

      successToast("Review added successfully ⭐");
      onSuccess();
    } catch (err) {
      errorToast(
        err.response?.data?.message ||
        "Failed to add review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          Review {rental.equipmentName}
        </h2>

        {/* ⭐ RATING */}
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border px-4 py-2 rounded mb-3"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>

        {/* 💬 COMMENT */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border px-4 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
