import { useState } from "react";
import LoanDetailsModal from "../../Modal/LoanDetailsModal";

const CustomerOrderDataRow = ({ myLoan }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const handleCancelLoan = () => {
    console.log("Cancel loan:", myLoan.loanId);
    // Call your backend API to cancel loan if status is "Pending"
  };

  const handlePayFee = () => {
    console.log("Pay application fee:", myLoan.loanId);
    // Trigger Stripe payment flow
  };

  return (
    <tr>
      {/* Loan ID */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{myLoan.loanId}</p>
      </td>

      {/* Loan Info (Title + First Name + Last Name) */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 font-semibold">{myLoan.loanTitle}</p>
        <p className="text-gray-600 text-sm">
          {myLoan.firstName} {myLoan.lastName}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${myLoan.loanAmount}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`${
            myLoan.status === "Pending"
              ? "text-orange-500"
              : myLoan.status === "Approved"
              ? "text-green-500"
              : "text-gray-500"
          } font-semibold`}
        >
          {myLoan.status}
        </p>
      </td>

      {/* Actions */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm space-x-2">
        {/* View Details */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-medium"
        >
          View Details
        </button>

        {/* Cancel Loan (only if Pending) */}
        {myLoan.status === "Pending" && (
          <button
            onClick={handleCancelLoan}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium"
          >
            Cancel
          </button>
        )}

        {/* Pay Application Fee */}
        {myLoan.applicationFeeStatus === "Unpaid" ? (
          <button
            onClick={handlePayFee}
            className="px-3 py-1 bg-lime-600 text-white rounded text-sm font-medium"
          >
            Pay $10 Fee
          </button>
        ) : (
          <span className="text-green-600 font-semibold">Fee Paid</span>
        )}

        {/* Details Modal */}
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
