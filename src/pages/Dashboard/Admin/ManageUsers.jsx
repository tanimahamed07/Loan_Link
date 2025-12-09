import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ManageUserDataRow from "../../../components/Dashboard/TableRows/ManageUserDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users`);
      return result.data;
    },
  });
  console.log(users);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
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
                  {Array.isArray(users) &&
                    users.map((user) => (
                      <ManageUserDataRow
                        key={user._id}
                        myLoan={user}
                        refetch={refetch}
                        user={user}
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

export default ManageUsers;
