// import PlantDataRow from "../../../components/Dashboard/TableRows/PlantDataRow";

import { useQuery } from "@tanstack/react-query";

import PendingLoanDataRow from "../../../components/Dashboard/TableRows/PendingLoanDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import ManageLoanDataRow from "../../../components/Dashboard/TableRows/ManageLoanDataRow";

const PendingLoans = () => {
  const axiosSecure = useAxiosSecure()
   const {
    data: pendingLoans = [],
    refetch,
  } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const result = await axiosSecure(`/pending-loans`);
      return result.data;
    },
  });
  console.log(pendingLoans)
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b"> Loan ID</th>
                  <th className="px-5 py-3 bg-white border-b">User Info </th>
                  <th className="px-5  py-3 bg-white border-b">Amount</th>
                  <th className="px-5  py-3 bg-white border-b">Date</th>
                  <th className="px-5 py-3 bg-white border-b">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pendingLoans.map((loan) => (
                  <PendingLoanDataRow
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
    </>
  );
};

export default PendingLoans;
