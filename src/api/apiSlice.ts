import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "@interfaces/category.interface";
import { Product } from "@interfaces/product.interface";
import { User } from "@interfaces/user.interface";
import { Order } from "@interfaces/order.interface";

export const appSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store-server-iii2.onrender.com",
  }),
  tagTypes: ["Products", "Categories", "Orders"],
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
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    //Orders
    getOrders: builder.query<Order[], undefined>({
      query: () => "/orders",
      transformResponse: (response: { result: Order[] }) => response.result,
      providesTags: ["Orders", "Products", "Categories"],
    }),
    updateOrder: builder.mutation({
      query: (payload: { id: string; sent: boolean }) => ({
        url: `/update-order/${payload.id}`,
        method: "PUT",
        body: {
          sent: payload.sent,
        },
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrderNotPaid: builder.mutation({
      query: (orderId: string) => ({
        url: `/delete-order-not-paid/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
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
  //Order
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderNotPaidMutation,
} = appSlice;
