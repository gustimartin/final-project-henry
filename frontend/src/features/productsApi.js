import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    // baseUrl: 'https://backendpf-production-b9df.up.railway.app/',
  }),
  endpoints: (builder) => ({
    // getAllProducts: builder.query({
    //   query: () => "/products",
    // }),
    getProductDetail: builder.query({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query({
      query: () => "/category",
    }),
    getProductCategory: builder.query({
      query: () => "/products",
      //   // transformResponse: Response.filter((el) =>el.category === id  )
    }),
    getCategory: builder.query({
      query: () => "/category",
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailQuery,
  useGetCategoriesQuery,
  useGetProductCategoryQuery,
  useGetCategoryQuery,
} = productsApi;
