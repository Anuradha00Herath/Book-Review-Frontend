import React from "react";
import ReviewCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation } from "../redux/features/book/booksApi";

interface Review {
  _id: string;
  title: string;
  author: string;
  rating: number;
  comment: string;
  addedOn: string;
}

interface MyReviewsSectionProps {
  bookReviews?: Review[];
}

const MyReviewsSection: React.FC<MyReviewsSectionProps> = ({
  bookReviews = [],
}) => {
  const reviews = bookReviews;

  //RTK queries
  const [deleteReview] = useDeleteBookMutation();

  const navigate = useNavigate();

  const handleEditClick = (id: string) => {
    navigate(`/review-book/${id}`);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id).unwrap();
        alert("Review deleted successfully!");
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete the review. Please try again.");
      }
    }
  };

  return (
    <section className="mb-8 cursor-pointer">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">You haven't added any reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="relative">
              <ReviewCard
                id={review._id}
                title={review.title}
                author={review.author}
                rating={review.rating}
                comment={review.comment}
                addedOn={review.addedOn}
              />
              <div className="mt-4">
                <button
                  onClick={() => handleEditClick(review._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(review._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyReviewsSection;
