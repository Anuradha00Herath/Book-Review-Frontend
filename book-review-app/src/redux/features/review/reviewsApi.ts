import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: 'include',
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({

    //post review
    postReview: builder.mutation({
      query: ({ bookId, review }) => ({
        url: `/post-review/${bookId}`, 
        method: "POST", 
        body: review,
      }),
      invalidatesTags: ( { bookId }) => [
        { type: "Reviews", id: bookId }, 
      ],
    }),

    //get reviews
    getReviews: builder.query({
      query: (bookId) => ({
        url: `/get-review/${bookId}`,
        method: 'GET',
      }),
      providesTags: (result, error, bookId) => [{ type: 'Reviews', id: bookId }],
    }),

    getMyReview: builder.query({
      query:(bookId)=>({
        url:`/get-my-review/${bookId}`,
        method:'GET',
      }),
      providesTags: (result, error, bookId) => [{ type: 'Reviews', id: bookId }],
    }),

    deleteReview: builder.mutation({
      query: ({ reviewId }) => ({
        url: `/delete-review`,
        method: 'DELETE',
        body: { reviewId }, // Assuming the backend expects JSON with the reviewId
      }),
      invalidatesTags: (result, error, { reviewId }) =>
        result ? [{ type: 'Reviews', id: reviewId }] : [],
    }),    
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsQuery,
  useDeleteReviewMutation,
  useGetMyReviewQuery
} = reviewApi;

export default reviewApi;
