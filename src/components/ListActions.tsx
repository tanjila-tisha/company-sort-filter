import { getTypes } from "../utils";

interface ListActionsProps {
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  setSearch: (search: string) => void;
}

const ListActions = ({
  sortOrder,
  setSortOrder,
  filter,
  setFilter,
  setSearch,
}: ListActionsProps): JSX.Element => {
  return (
    <div className="grid gap-6 mb-6 md:grid-cols-3">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Company Name"
      />

      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">Filter by type</option>
        {getTypes().map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>
      <button
        className="bg-zinc-400 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          sortOrder === "desc" ? setSortOrder("asc") : setSortOrder("desc");
        }}
      >
        {sortOrder === "desc" ? "Sort ASC" : "Sort DESC"}
      </button>
    </div>
  );
};

export default ListActions;
