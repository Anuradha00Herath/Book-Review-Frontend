import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  usePostReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
  useGetMyReviewQuery,
} from "../redux/features/review/reviewsApi";
import { useFetchBookByIdQuery } from "../redux/features/book/booksApi";
import Navbar from "../components/NavBar";

const BookDetailsPage = () => {

  //get id from url
  const { id } = useParams();

  //use states
  const [newReview, setNewReview] = useState({
    rating: 1,
    comment: "",
  });

  //RTK queries
  const { data: book, isLoading: bookLoading } = useFetchBookByIdQuery(id);
  const { data: reviews, isLoading: reviewsLoading, refetch } = useGetReviewsQuery(id);
  const { data: myreviews, isLoading: myreviewsLoading } = useGetMyReviewQuery(id);
  const [addReview, { isLoading: isAdding }] = usePostReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  
  const handleAddReview = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newReview.comment || !newReview.rating) {
      alert("Please fill out both the comment and rating.");
      return;
    }
    try {
      await addReview({ bookId: id, review: newReview }).unwrap();
      alert("Review added successfully!");
      setNewReview({ rating: 1, comment: "" });
      refetch(); 
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review. Please try again.");
    }
  };

  const handleDeleteReview = async () => {
    if (!myreviews) return;
    const confirmDelete = window.confirm("Are you sure you want to delete your review?");
    if (!confirmDelete) return;

    try {
      const reviewId = myreviews._id;
      await deleteReview({reviewId}).unwrap();
      alert("Review deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
    }
  };

  if (bookLoading || reviewsLoading || myreviewsLoading) return <div>Loading...</div>;
  const rating = parseInt(book.rating);

  return (
    <div>
      <Navbar/>
      <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{book.title}</h1>
      <div className="bg-white shadow-md p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold">Author: {book.author}</h2>
        <p className="text-yellow-500 ">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </p>
        <p className="text-gray-600 mt-4">{book.comment}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Review</h2>
        {myreviews ? (
          <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold">Rating: {myreviews.rating}</p>
              <p>{myreviews.comment}</p>
              <p className="text-sm text-gray-500">By: You</p>
            </div>
            <button
              onClick={handleDeleteReview}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ) : (
          <p className="text-gray-600">You haven't reviewed this book yet.</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Other Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews from other users yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review: { _id: string; rating: string; comment:string; username:string }) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-bold">Rating: {review.rating}</p>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500">By: {review.username}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
        <form onSubmit={handleAddReview} className="bg-white shadow-md p-6 rounded-lg">
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            className="border p-3 rounded-lg w-full mb-4"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Star{rating > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Your review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="border p-3 rounded-lg w-full mb-4"
          ></textarea>
          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 ${
              isAdding ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isAdding}
          >
            {isAdding ? "Adding Review..." : "Add Review"}
          </button>
        </form>
      </section>
    </div>
    </div>
  );
};

export default BookDetailsPage;
