import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: "include",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    
    //get all books
    fetchAllBooks: builder.query({
      query: () => "/all-books",
      providesTags: ["Books"],
    }),

    //get user added books
    fetchBooksByUser: builder.query({
      query: () => "/user-books",
      providesTags: ["Books"],
    }),

    //get book by id
    fetchBookById: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: (id) => [{ type: "Books", id }],
    }),

    // add new book
    addBook: builder.mutation({
      query: (book) => ({
        url: "/post-book",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),

    //update book review
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-book/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Books"],
    }),

    //delete book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [{ type: "Books", id }],
    }),

    //get recently added books
    fetchRecentBooks: builder.query({
      query: () => "/recent-books",
      providesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useFetchRecentBooksQuery,
  useFetchBooksByUserQuery,
} = booksApi;

export default booksApi;
