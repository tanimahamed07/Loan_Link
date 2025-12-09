import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ManageUserDataRow from "../../../components/Dashboard/TableRows/ManageUserDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const USERS_PER_PAGE = 1;

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Search, filter, pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // React Query v5 useQuery
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", user?.email, currentPage, searchTerm, filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          page: currentPage,
          limit: USERS_PER_PAGE,
          search: searchTerm,
          role: filterRole,
        },
      });
      return res.data; // { users: [...], totalPages: number, currentPage: number }
    },
    keepPreviousData: true, // keeps old data while loading next page
  });

  if (isLoading) return <LoadingSpinner />;

  const { users = [], totalPages = 1 } = data || {};

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page
          }}
          className="border p-2 rounded w-64"
        />

        <select
          value={filterRole}
          onChange={(e) => {
            setFilterRole(e.target.value);
            setCurrentPage(1); // reset page
          }}
          className="border p-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="borrower">Borrower</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-white border-b">Name</th>
                <th className="px-5 py-3 bg-white border-b">Email</th>
                <th className="px-5 py-3 bg-white border-b">Role</th>
                <th className="px-5 py-3 bg-white border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <ManageUserDataRow
                    key={user._id}
                    myLoan={user}
                    refetch={refetch}
                    user={user}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === idx + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
