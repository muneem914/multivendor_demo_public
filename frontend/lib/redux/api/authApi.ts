import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authApi.endpoints.getProfile.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    getAllSellers: builder.query({
      query: () => '/sellers',
    }),
    getAllCustomers: builder.query({
      query: () => '/customers',
    }),
    getProfile: builder.query({
      query: () => '/me',
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (updatedData) => ({
        url: '/me/update-profile',
        method: "PUT",
        body: updatedData,
        credentials: "include"
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
        credentials: "include"
      }),
      invalidatesTags: ["User"],
    })
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllCustomersQuery,
  useGetAllSellersQuery,
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateUserProfileMutation,
  useUpdateUserPasswordMutation,
  useUpdateNotificationPreferencesMutation
} = authApi;