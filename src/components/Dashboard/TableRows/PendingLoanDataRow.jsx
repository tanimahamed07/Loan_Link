import { useState } from "react";
import ApplicationViewDetails from "../../Modal/ApplicationViewDetailsModal";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";

const PendingLoanDataRow = ({ loan, refetch }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const updateStatus = (status) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/update-status/${loan._id}`, {
        status,
      })
      .then((res) => console.log(res));
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this loan!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus("Approved");
        refetch();
        Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Loan has been approved successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  const handleReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this loan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus("Rejected");
        refetch();
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "Loan has been rejected.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleView = () => {
    console.log("click");
    setIsViewOpen(true);
  };
  return (
    <tr>
      {/* Loan ID */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>{loan.loanId}</p>
      </td>

      {/* Loan Info (User Email & Name) */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p className="font-semibold">{loan.userEmail}</p>
        <p className="text-gray-600 text-sm">
          {loan.firstName} {loan.lastName}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>${loan.loanAmount}</p>
      </td>

      {/* Date */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>{new Date(loan.createdAt).toLocaleDateString()}</p>
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
  <div className="flex flex-wrap justify-center gap-2">

    {/* Approve */}
    <button
      onClick={handleApprove}
      className="flex items-center gap-1 px-2 py-1
                 bg-green-500 hover:bg-green-600
                 text-white rounded text-xs md:text-sm"
    >
      {/* Mobile Icon */}
      <span className="md:hidden text-sm"><FaCheck /></span>
      {/* Desktop Text */}
      <span className="hidden md:inline">Approve</span>
    </button>

    {/* Reject */}
    <button
      onClick={handleReject}
      className="flex items-center gap-1 px-2 py-1
                 bg-red-500 hover:bg-red-600
                 text-white rounded text-xs md:text-sm"
    >
      <span className="md:hidden text-sm"><FaTimes /></span>
      <span className="hidden md:inline">Reject</span>
    </button>

    {/* View */}
    <button
      onClick={handleView}
      className="flex items-center gap-1 px-2 py-1
                 bg-blue-500 hover:bg-blue-600
                 text-white rounded text-xs md:text-sm"
    >
      <span className="md:hidden text-sm"><FaEye /></span>
      <span className="hidden md:inline">View Details</span>
    </button>

    {/* Modal */}
    {isViewOpen && (
      <ApplicationViewDetails
        myLoan={loan}
        isOpen={isViewOpen}
        closeModal={() => setIsViewOpen(false)}
      />
    )}
  </div>
</td>

    </tr>
  );
};

export default PendingLoanDataRow;
