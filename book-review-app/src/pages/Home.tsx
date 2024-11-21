import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchRecentBooksQuery } from "../redux/features/book/booksApi"; 
import ReviewCard from "../components/ReviewCard";

const HomePage: React.FC = () => {
  const { data: recentBooks = [], isLoading, isError } = useFetchRecentBooksQuery({});
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load recent books.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Book Review Hub</h1>
          <p className="text-lg mb-6">
            Discover your next favorite book through community reviews.
          </p>
          <div>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 mr-4"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/books")}
              className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600"
            >
              Explore Books
            </button>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Featured Books</h2>
          {recentBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentBooks.map((book: { _id: string; title: string; author: string; rating: number; comment: string; addedOn: string; }) => (
                <ReviewCard
                  id={book._id}
                  title={book.title}
                  author={book.author}
                  rating={book.rating}
                  comment={book.comment}
                  addedOn={book.addedOn}               />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No books available at the moment.</p>
          )}
        </div>
      </section>

      {/* Action Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Community</h2>
          <p className="mb-6">Sign up today and start sharing your book reviews!</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
