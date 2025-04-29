// services/blogApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/blog' }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => 'allBlogs', 
    }),
    getSingleBlog: builder.query({
      query: (slug) => `/${slug}`,  
    }),
    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    
  }),
});

export const { useGetAllBlogsQuery,useGetSingleBlogQuery,useUpdateBlogMutation } = blogApi;
