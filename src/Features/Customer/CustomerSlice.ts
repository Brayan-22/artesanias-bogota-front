import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { STATE_STATUS } from "../responseStatus";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../../app/store";




export interface CustomerAddress {
  id: number;
  address: string;
}

export interface NewCustomerAddress {
  address: string;
}

export interface Customer {
  id: string;
  userName: string;
  pwd: string;
  email: string;
  addresses: CustomerAddress[];
}



export interface NewCustomer {
  userName: string;
  email: string;
  pwd: string;
  addresses: NewCustomerAddress[];
}


export const defaultCustomer: Customer = {
  id: "1",
  userName: "usuario1",
  pwd: "123",
  email: "usuario@gmail.com",
  addresses: [
    {id:1, address:"mi casa"},
    {id:2, address:"mi casa2"}
  ]

}



interface CustomersState extends EntityState<Customer, string> {
  currentCustomer : Customer;
  status: STATE_STATUS;
  error: string | null;
}

const customerAdapter = createEntityAdapter<Customer>({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const initialState: CustomersState = customerAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
});

const BASE_URL = "commerce/catalogo";

export const apiSliceWithcustomers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getcustomers: builder.query<Customer[], void>({
      query: () => ({url:`${BASE_URL}?page=0&size=10`}),
     
    }),
    getcustomer: builder.query<Customer, string>({
      query: (customerId) => ({url:`${BASE_URL}/customero?nombre=${customerId}`}),
    }),
    addNewcustomer: builder.mutation<Customer, NewCustomer>({
      query: (initialcustomer) => ({
        url: "/customers",
        method: "POST",
        body: initialcustomer,
      }),
    
    }),
    updatecustomer: builder.mutation<Customer, Customer>({
      query: (editedcustomer) => ({
        url: `/customers/${editedcustomer.id}`,
        method: "PATCH",
        body: editedcustomer,
      }),

    }),
    deletecustomer: builder.mutation<Customer, string>({
      query: (customerId) => ({
        url: `/customers/${customerId}`,
        method: "DELETE",
      }),
  
    }),
  }),
});

export const {
  useGetcustomersQuery,
  useGetcustomerQuery,
  useAddNewcustomerMutation,
  useUpdatecustomerMutation,
  useDeletecustomerMutation,
} = apiSliceWithcustomers;

const emptycustomers: Customer[] = [];

export const selectcustomersResult =
  apiSliceWithcustomers.endpoints.getcustomers.select();

export const selectAllcustomers = createSelector(
  selectcustomersResult,
  (customersResult) => customersResult?.data ?? emptycustomers
);

export const selectcustomerById = createSelector(
  selectAllcustomers,
  (_state: RootState, customerId: string) => customerId,
  (customers, customerId) => customers.find((customer) => customer.id === customerId)
);
