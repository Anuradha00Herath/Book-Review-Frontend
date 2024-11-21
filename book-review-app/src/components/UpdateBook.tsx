import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateBookMutation, useFetchBookByIdQuery } from "../redux/features/book/booksApi";

const UpdateBookPage = () => {

  //get id from URL
  const { id } = useParams(); 

  //use sates
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: 1,
    comment: "",
  });

  //RTK queries
  const { data: book, isLoading } = useFetchBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        rating: book.rating,
        comment: book.comment,
      });
    }
  }, [book]);
  console.log(book)

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await updateBook({ id, ...formData }).unwrap();
      alert("Book updated successfully!");
      navigate("/review-book");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book.");
    }
  };

  if (isLoading) return <div>Loading book data...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Update Book</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
        <input
          type="text"
          placeholder="Book Title"
          value={formData.title}
          readOnly
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-3 rounded-lg w-full mb-4"
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          readOnly
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="border p-3 rounded-lg w-full mb-4"
        />
        <select
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          className="border p-3 rounded-lg w-full mb-4"
        >
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Star{rating > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Opinion (short review)"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="border p-3 rounded-lg w-full mb-4"
        ></textarea>
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 ${
            isUpdating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBookPage;
