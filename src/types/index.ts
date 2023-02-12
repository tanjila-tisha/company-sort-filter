export interface Company {
  id: number;
  name: string;
  type: string;
}

export interface CompaniesState {
  companies: Array<Company>;
  loading: boolean;
  error: string;
}
