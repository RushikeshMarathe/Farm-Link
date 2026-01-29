import api from "./api";

export const addReview = ({ equipmentId, rating, comment }) =>
  api.post("/reviews", {
    equipmentId,
    rating,
    comment,
  });

export const updateReview = (reviewId, payload) =>
  api.put(`/reviews/${reviewId}`, payload);

export const getReviewsByEquipment = (equipmentId) =>
  api.get(`/reviews/equipment/${equipmentId}`);

export const getAverageRating = (equipmentId) =>
  api.get(`/reviews/equipment/${equipmentId}/avg`);
