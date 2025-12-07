import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const MyLoan = () => {
  const { user } = useAuth();
  console.log(user);
  const { data: myLoans = [], isLoading, refetch } = useQuery({
    queryKey: ["my-loans", user?.email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/my-loan/${user?.email}`
      );
      return result.data;
    },
  });


  console.log(myLoans);
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Loan ID
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Loan Info
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {myLoans.map((myLoan) => (
                    <CustomerOrderDataRow myLoan={myLoan} refetch={refetch} />
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

export default MyLoan;
