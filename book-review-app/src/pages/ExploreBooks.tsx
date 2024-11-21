import React, { useState } from "react";
import Navbar from "../components/explore-books/NavBar";
import ReviewCard from "../components/ReviewCard";
import {
  useFetchAllBooksQuery,
} from "../redux/features/book/booksApi";

const ExploreBookPage: React.FC = () => {

//use states
  const [ratingFilter, setRatingFilter] = useState(0); 
  const [sortBy, setSortBy] = useState("rating"); 

//RTK queris
  const { data: allBooks = [], isLoading: loadingBooks } = useFetchAllBooksQuery({});

  // Filter books
  const filteredBooks = allBooks.filter((book: { rating: number; }) => book.rating >= ratingFilter);

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title); 
    } else if (sortBy === "dateAdded") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">All Book Reviews</h2>

          {/* Rating Filter */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <label htmlFor="rating-filter" className="block mb-2 font-medium">
                Filter by Rating:
              </label>
              <select
                id="rating-filter"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="border border-gray-300 rounded px-4 py-2"
              >
                <option value={0}>All Ratings</option>
                <option value={1}>1 Star & Above</option>
                <option value={2}>2 Stars & Above</option>
                <option value={3}>3 Stars & Above</option>
                <option value={4}>4 Stars & Above</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>

            {/* Sorting Options */}
            <div>
              <label htmlFor="sort-by" className="block mb-2 font-medium">
                Sort By:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
              >
                <option value="rating">Rating (High to Low)</option>
                <option value="title">Title (A-Z)</option>
                <option value="dateAdded">Date Added (Newest First)</option>
              </select>
            </div>
          </div>

          {/* Book Reviews */}
          {loadingBooks ? (
            <p>Loading reviews...</p>
          ) : sortedBooks.length === 0 ? (
            <p className="text-gray-600">No reviews match the selected criteria.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedBooks.map((book) => (
                <ReviewCard
                  key={book._id}
                  id={book._id}
                  title={book.title || "Untitled"}
                  author={book.author || "Unknown"}
                  rating={book.rating || 1}
                  comment={book.comment || "No opinion provided"}
                  addedOn={book.addedOn || "Unknown"}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ExploreBookPage;
