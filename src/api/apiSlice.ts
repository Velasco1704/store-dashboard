import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "@interfaces/category.interface";
import { Product } from "@interfaces/product.interface";
import { User } from "@interfaces/user.interface";

export const appSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  tagTypes: ["Products", "Categories"],
  endpoints: (builder) => ({
    //Auth
    login: builder.mutation({
      query: (user: User) => ({
        url: "/login",
        method: "POST",
        body: {
          user: user.username,
          password: user.password,
        },
      }),
      transformResponse: (response: { token: string }) => response.token,
    }),

    //Category
    getCategories: builder.query<Category[], undefined>({
      query: () => "/categories",
      transformResponse: (response: { result: Category[] }) => response.result,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (newCategoryName: string) => ({
        url: "/new-category",
        method: "POST",
        body: { name: newCategoryName },
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (payload: { id: string; newCategoryName: string }) => ({
        url: `/update-category/${payload.id}`,
        method: "PUT",
        body: { name: payload.newCategoryName },
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    //Product
    getProducts: builder.query<Product[], undefined>({
      query: () => "/products",
      transformResponse: (response: { result: Product[] }) => response.result,
      providesTags: ["Products", "Categories"],
    }),
    createProduct: builder.mutation({
      query: (newProduct: FormData) => ({
        url: "/new-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (payload: { id: string; formData: FormData }) => ({
        url: `/update-product/${payload.id}`,
        method: "PUT",
        body: payload.formData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  //Auth
  useLoginMutation,
  //Category
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  //Product
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = appSlice;