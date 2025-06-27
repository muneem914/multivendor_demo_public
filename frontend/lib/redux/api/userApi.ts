import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setLoading, setUser } from '../slices/authSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ["User", "Admin-User", "Seller", "Customer"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/me',
      providesTags: ["User"],
    }),
    getAllSellers: builder.query({
      query: () => '/admin/sellers',
      providesTags: ["Seller", "Admin-User"]
    }),
    getAllCustomers: builder.query({
      query: () => '/admin/customers',
      providesTags: ["Customer", "Admin-User"]
    }),
    getSellerById: builder.query({
      query: (id) => `/admin/sellers/${id}`,
    }),
    getCustomerById: builder.query({
      query: (id) => `/admin/customers/${id}`,
    }),
    updateUserProfile: builder.mutation({
      query: (updatedData) => ({
        url: '/me/update-profile',
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserPassword: builder.mutation({
      query: (updatedData) => ({
        url: '/me/update-password',
        method: "PUT",
        body: updatedData
      })
    }),
    updateNotificationPreferences: builder.mutation({
      query: (notificationData) => ({
        url: '/me/update-notification',
        method: 'PUT',
        body: notificationData,
      }),
      invalidatesTags: ["User"],
    }),
    verifySeller: builder.mutation({
      query: (id) => ({
        url: `/admin/sellers/${id}/verify`,
        method: 'PUT',
      }),
      invalidatesTags: ['Seller']
    }),
    invalidateSeller: builder.mutation({
      query: (id) => ({
        url: `/admin/sellers/${id}/invalidate`,
        method: 'PUT',
      }),
      invalidatesTags: ['Seller']
    }),
    addNewAddress: builder.mutation({
      query: (data) => ({
        url: '/address/new',
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"]
    }),
    updateAddress: builder.mutation({
      query: ({id, data}) => ({
        url: `/address/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ["User", "Customer"]
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["User"]
    }),
    setDefaultAddress: builder.mutation({
      query: ({id, data}) => ({
        url: `/address/default/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ["User"]
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/admin/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin-User"]
    }) 
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetAllSellersQuery,
  useGetProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserPasswordMutation,
  useUpdateNotificationPreferencesMutation,
  useVerifySellerMutation, useInvalidateSellerMutation,
  useGetSellerByIdQuery, useGetCustomerByIdQuery,
  useAddNewAddressMutation, useUpdateAddressMutation, useDeleteAddressMutation, useSetDefaultAddressMutation,
  useDeleteUserByIdMutation,
} = userApi;