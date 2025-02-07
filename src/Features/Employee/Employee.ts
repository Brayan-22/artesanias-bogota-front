import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from "@reduxjs/toolkit";
import { STATE_STATUS } from "../responseStatus";
import { apiSlice } from "../api/apiSlice";
import { RootState } from "../../app/store";

export interface Rol {
  id: number;
  name: "admin" | "manager";
}

export interface EmployeeShopAddress {
  id: number;
  address: string;
}

export interface employee {
  id: string;
  userName: string;
  pwd: string;
  email: string;
  addresses: EmployeeShopAddress;
  rol: Rol;

}

/* export interface Newemployee {
  userName: string;
  email: string;
  pwd: string;
  addresses: EmployeeShopAddress;
} */

export const defaultemployeeAdmin: employee = {
  id: "1",
  userName: "Administrador1",
  pwd: "123",
  email: "administrador@gmail.com",
  addresses:  { id: 1, address: "mi tienda" },
  rol: {id:1 , name:"admin"}
  
};

export const defaultemployeeManager: employee = {
  id: "1",
  userName: "Gerente1",
  pwd: "123",
  email: "gerente@gmail.com",
  addresses:  { id: 1, address: "mi sistema" },
  rol: {id:2 , name:"manager"}
  
};

interface employeesState extends EntityState<employee, string> {
  currentemployee: employee;
  status: STATE_STATUS;
  error: string | null;
}

const employeeAdapter = createEntityAdapter<employee>({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const initialState: employeesState = employeeAdapter.getInitialState({
  status: STATE_STATUS.IDLE,
  error: null,
});

const BASE_URL = "commerce/catalogo";

export const apiSliceWithemployees = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getemployees: builder.query<employee[], void>({
      query: () => `${BASE_URL}?page=0&size=10`,
      /* providesTags: ["employees", "Categories"], */
    }),
    getemployee: builder.query<employee, string>({
      query: (employeeId) => `${BASE_URL}/employeeo?nombre=${employeeId}`,
    }),
    /* addNewemployee: builder.mutation<employee, Newemployee>({
      query: (initialemployee) => ({
        url: "/employees",
        method: "POST",
        body: initialemployee,
      }),
      invalidatesTags: ["employees"],
    }),
    updateemployee: builder.mutation<employee, employee>({
      query: (editedemployee) => ({
        url: `/employees/${editedemployee.id}`,
        method: "PATCH",
        body: editedemployee,
      }),
      invalidatesTags: ["employees"],
    }),
    deleteemployee: builder.mutation<employee, string>({
      query: (employeeId) => ({
        url: `/employees/${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }), */
  }),
});

export const {
  useGetemployeesQuery,
  useGetemployeeQuery,
  /* useAddNewemployeeMutation,
  useUpdateemployeeMutation,
  useDeleteemployeeMutation, */
} = apiSliceWithemployees;

const emptyemployees: employee[] = [];

export const selectemployeesResult =
  apiSliceWithemployees.endpoints.getemployees.select();

export const selectAllemployees = createSelector(
  selectemployeesResult,
  (employeesResult) => employeesResult?.data ?? emptyemployees
);

export const selectemployeeById = createSelector(
  selectAllemployees,
  (_state: RootState, employeeId: string) => employeeId,
  (employees, employeeId) =>
    employees.find((employee) => employee.id === employeeId)
);
