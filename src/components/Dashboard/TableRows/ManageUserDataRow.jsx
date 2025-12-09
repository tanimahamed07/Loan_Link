import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";
import UserSuspendModal from "../../Modal/UserSuspendModal";
// import SuspendModal from "./SuspendModal";

const ManageUsersRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  return (
    <tr className="border-b ">
      <td className="px-5 text-center py-4">{user.name}</td>
      <td className="px-5 text-center py-4">{user.email}</td>
      <td className="px-5 text-center py-4 capitalize">{user.role}</td>
      <td className="px-5 py-4 text-center space-x-2">
        {/* Update Role */}
        <span onClick={() => setIsOpen(true)} className="">
          <span className="px-3  py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Update Role
          </span>
        </span>

        {/* Suspend */}
        {user.status === "suspended" ? (
          <span className="px-3 py-1 bg-red-500 text-white rounded">
            Suspended
          </span>
        ) : (
          <span
            onClick={() => setIsViewOpen(true)}
            className="px-3  py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Suspend
          </span>
        )}

        {/* Role Modal */}
        <UpdateUserRoleModal
          user={user}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />

        {/* Suspend Modal */}
        {isViewOpen && (
          <UserSuspendModal
            user={user}
            isOpen={isViewOpen} // correct prop
            closeModal={() => setIsViewOpen(false)}
          />
        )}
      </td>
    </tr>
  );
};

export default ManageUsersRow;
