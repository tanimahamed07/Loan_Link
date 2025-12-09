import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ManageLoanDataRow from "../../../components/Dashboard/TableRows/ManageLoanDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllLoan = () => {
  const axiosSecure = useAxiosSecure()
  const {
    data: allLoans = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const result = await axiosSecure(`/all-loans`);
      return result.data;
    },
  });
  if (isLoading) {
    <LoadingSpinner></LoadingSpinner>;
  }
    const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b">Image</th>
                  <th className="px-5 py-3 bg-white border-b">Title </th>
                  <th className="px-5  py-3 bg-white border-b">Interest</th>
                  <th className="px-5  py-3 bg-white border-b">Category</th>
                  <th className="px-5 py-3 bg-white border-b">Actions</th>
                </tr>
              </thead>

              <tbody>
                {allLoans.map((loan) => (
                  <ManageLoanDataRow
                    key={loan._id}
                    loan={loan}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLoan;
