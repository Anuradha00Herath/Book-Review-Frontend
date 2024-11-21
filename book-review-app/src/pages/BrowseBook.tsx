import React, { useState } from "react";
import Navbar from "../components/NavBar";
import ReviewCard from "../components/ReviewCard";
import MyReviewsSection from "../components/MyReviewCard";
import {
  useAddBookMutation,
  useFetchAllBooksQuery,
  useFetchBooksByUserQuery,
} from "../redux/features/book/booksApi";
const date = new Date();

const BookReviewPage: React.FC = () => {
  // use State
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    rating: 1,
    comment: '',
    addedOn: date
  });

  //RTK queries
  const { data: userBooks = [] } = useFetchBooksByUserQuery({});
  const { data: allBooks = [], isLoading: loadingBooks } = useFetchAllBooksQuery({});
  const [addBook, { isLoading: isAdding }] = useAddBookMutation();


  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.comment) {
      alert("All fields are required!");
      return;
    }
    const book = { ...newBook };
    try {
      await addBook(book).unwrap();
      setNewBook({ title: '', author: '', rating: 1, comment: '',addedOn:date });
      alert("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Book Reviews</h1>
        <MyReviewsSection bookReviews={userBooks} />
        <section className="bg-white shadow-md p-6 rounded-lg mb-8">
          
            <form onSubmit={handleAddBook}>
              <h2 className="text-2xl font-bold mb-4">Add a Book</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Book Title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  className="border p-3 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  className="border p-3 rounded-lg"
                />
                <select
                  value={newBook.rating}
                  onChange={(e) =>
                    setNewBook({ ...newBook, rating: Number(e.target.value) })
                  }
                  className="border p-3 rounded-lg"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Star{rating > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Opinion (short review)"
                  value={newBook.comment}
                  onChange={(e) =>
                    setNewBook({ ...newBook, comment: e.target.value })
                  }
                  className="border p-3 rounded-lg md:col-span-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className={`bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 ${
                  isAdding ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add Book"}
              </button>
            </form>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
          {loadingBooks ? (
            <p>Loading reviews...</p>
          ) : allBooks.length === 0 ? (
            <p className="text-gray-600">No reviews found.</p>
          ) : (<div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allBooks.map((book: { _id: string; title: string; author: string; rating: number; comment: string; addedOn: string; }) => (
                <ReviewCard
                  id={book._id}
                  title={book.title || "Untitled"}
                  author={book.author || "Unknown"}
                  rating={book.rating || 1}
                  comment={book.comment || "No opinion provided"}
                  addedOn={book.addedOn || "Unknown"}
                />
              ))}
            </div>
          </div>
            
          )}
        </section>
      </div>
    </div>
  );
};

export default BookReviewPage;
