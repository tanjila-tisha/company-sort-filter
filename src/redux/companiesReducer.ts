import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CompaniesState, Company } from "../types";

const initialState: CompaniesState = {
  companies: [],
  loading: false,
  error: "",
};

export const loadCompanies = createAsyncThunk("companies/load", async () => {
  const response = await (
    await fetch(
      "https://my-json-server.typicode.com/capcito/frontend-ws/companies"
    )
  ).json();
  return response;
});

const CompaniesReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadCompanies.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(loadCompanies.fulfilled, (state, action) => {
    state.loading = false;
    state.companies = action.payload;
  });
  builder.addCase(loadCompanies.rejected, (state, action) => {
    state.loading = false;
    state.error =
      "Error, something went wrong. Contact support if problem persis";
  });
});

// Selectors
export const getCompanies = (
  state: RootState,
  filterByType: string,
  sortOrder: string = "desc",
  search: string = ""
): Company[] => {
  let companyList = state.companies.companies;

  //Serach
  if (search) {
    companyList = companyList.filter(
      (company) =>
        company.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }
  //Filter
  if (filterByType) {
    companyList = companyList.filter(
      (company) => company.type === filterByType
    );
  }
  //sort
  companyList = companyList
    .slice()
    .sort((a, b) => (sortOrder === "desc" ? b.id - a.id : a.id - b.id));

  return companyList;
};
export const getLoading = (state: RootState): boolean =>
  state.companies.loading;
export const getError = (state: RootState): string => state.companies.error;

export default CompaniesReducer;
