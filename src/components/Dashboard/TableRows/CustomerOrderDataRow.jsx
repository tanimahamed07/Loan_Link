import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import PaymentDetailsModal from "../../Modal/PaymentDetailsModal";
import ApplicationViewDetails from "../../Modal/ApplicationViewDetailsModal";

const CustomerOrderDataRow = ({ myLoan, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
//   const closePaymentModal = () => setIsOpen(false);
// const closeViewModal = () => setIsViewOpen(false);

  const { user } = useAuth();

  const handlePayment = async () => {
    const paymentInfo = {
      loanApplicationId: myLoan._id,
      loanTitle: myLoan.loanTitle,
      quantity: 1,
      image: myLoan.image,
      loanAmount: myLoan.loanAmount,
      amount: 10,
      currency: "usd",
      borrower: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data.url;
  };

  const handleCancelLoan = async () => {
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

          refetch();
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
          onClick={() => setIsViewOpen(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          View Details
        </button>

        {/* Cancel Button (Only Pending) */}
        {myLoan.status === "Pending" && (
          <button
            onClick={handleCancelLoan}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Cancel
          </button>
        )}

        {/* Pay Fee */}
        {myLoan.applicationFeeStatus === "Unpaid" ? (
          <button
            onClick={handlePayment}
            className="px-3 py-1 bg-lime-600 text-white rounded text-sm"
          >
            Pay $10 Fee
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Paid
          </button>
        )}

        {/* Application Details Modal */}
        {isViewOpen && (
          <ApplicationViewDetails
            myLoan={myLoan}
            isOpen={isViewOpen} // correct prop
            closeModal={() => setIsViewOpen(false)} // separate close
          />
        )}

        {/* Payment Details Modal */}
        {isOpen && (
          <PaymentDetailsModal
            myLoan={myLoan}
            isOpen={isOpen} // correct prop
            closeModal={() => setIsOpen(false)} // separate close
          />
        )}
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
