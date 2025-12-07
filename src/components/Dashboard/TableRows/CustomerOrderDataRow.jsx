import { useState } from "react";
import LoanDetailsModal from "../../Modal/LoanDetailsModal";
import Swal from "sweetalert2";
import axios from "axios";

const CustomerOrderDataRow = ({ myLoan, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  // ---------- Cancel Loan ----------
  const handleCancelLoan = async () => { // ✅ async added here
    Swal.fire({
      title: "Are you sure?",
      text: "You can cancel only pending loan applications.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/loan-application/${myLoan._id}`
          );

          Swal.fire({
            title: "Cancelled!",
            text: "Your loan request has been cancelled.",
            icon: "success",
            confirmButtonColor: "#16a34a",
          });

          refetch(); // 🔥 Refetch data instead of reload
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to cancel loan.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      {/* Loan ID */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>{myLoan.loanId}</p>
      </td>

      {/* Loan Info */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p className="font-semibold">{myLoan.loanTitle}</p>
        <p className="text-gray-600 text-sm">
          {myLoan.firstName} {myLoan.lastName}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p>${myLoan.loanAmount}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p
          className={`font-bold ${
            myLoan.status === "Pending"
              ? "text-orange-500"
              : myLoan.status === "Approved"
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {myLoan.status}
        </p>
      </td>

      {/* Actions */}
      <td className="px-5 py-5 border-b bg-white text-sm space-x-2">
        {/* View Details */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          View Details
        </button>

        {/* Cancel Button (Only Pending) */}
        {myLoan.status === "Pending" && (
          <button
            onClick={handleCancelLoan} // ✅ async handled
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Cancel
          </button>
        )}

        {/* Pay Fee */}
        {myLoan.applicationFeeStatus === "Unpaid" ? (
          <button className="px-3 py-1 bg-lime-600 text-white rounded text-sm">
            Pay $10 Fee
          </button>
        ) : (
          <span className="text-green-600 font-semibold">Fee Paid</span>
        )}

        {/* Modal */}
        <LoanDetailsModal
          myLoan={myLoan}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
