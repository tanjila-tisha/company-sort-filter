import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  getError,
  getLoading,
  loadCompanies,
} from "../redux/companiesReducer";
import { AppDispatch, RootState } from "../store";
import ListActions from "./ListActions";

const CompanyList = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [filterByType, setFilterByType] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const companyList = useSelector((state: RootState) =>
    getCompanies(state, filterByType, sortOrder, search)
  );
  const isLoading = useSelector(getLoading);
  const isError = useSelector(getError);

  useEffect(() => {
    dispatch(loadCompanies());
  }, [dispatch]);

  return (
    <div className="company-container">
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <>
          <ListActions
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filter={filterByType}
            setFilter={setFilterByType}
            setSearch={setSearch}
          />
          <div className="grid gap-6 mb-6 md:grid-cols-1">
            <table className="table-auto border-separate border-spacing-1 border border-slate-400">
              <thead className="bg-zinc-300">
                <tr>
                  <th className="border border-slate-300 px-8">Id</th>
                  <th className="border border-slate-300 px-8">Name</th>
                  <th className="border border-slate-300 px-8">Type</th>
                </tr>
              </thead>
              <tbody>
                {companyList.map((company) => (
                  <tr key={company.id}>
                    <td className="border border-slate-300 px-8">
                      {company.id}
                    </td>
                    <td className="border border-slate-300 px-8">
                      {company.name}
                    </td>
                    <td className="border border-slate-300 px-8">
                      {company.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyList;
