import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import PaymentDetailsModal from "../../Modal/PaymentDetailsModal";
import ApplicationViewDetails from "../../Modal/ApplicationViewDetailsModal";
import { FaCheck, FaEye, FaMoneyBillWave, FaTimes } from "react-icons/fa";

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
      <td className="px-5 text-center py-5 border-b bg-white text-sm">
        <p className="font-semibold">{myLoan.loanTitle}</p>
        <p className="text-gray-600 text-sm">
          {myLoan.firstName} {myLoan.lastName}
        </p>
      </td>

      {/* Amount */}
      <td className="px-5 text-center py-5 border-b bg-white text-sm">
        <p>${myLoan.loanAmount}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 text-center border-b bg-white text-sm">
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
      <td className="px-5 py-5 text-center border-b bg-white text-sm">
        <div className="flex items-center justify-center gap-3 whitespace-nowrap">
          {/* View Details */}
          <button
            onClick={() => setIsViewOpen(true)}
            className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs md:text-sm"
          >
            {/* Mobile Icon */}
            <span className="md:hidden text-sm">
              <FaEye />
            </span>
            {/* Desktop Text */}
            <span className="hidden md:inline">View Details</span>
          </button>

          {/* Cancel Button */}
          {myLoan.status === "Pending" && (
            <button
              onClick={handleCancelLoan}
              className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-xs md:text-sm"
            >
              <span className="md:hidden text-sm">
                <FaTimes />
              </span>
              <span className="hidden md:inline">Cancel</span>
            </button>
          )}

          {/* Pay Fee */}
          {myLoan.applicationFeeStatus === "Unpaid" ? (
            <button
              onClick={handlePayment}
              className="flex items-center gap-1 px-2 py-1 bg-lime-600 text-white rounded text-xs md:text-sm"
            >
              <span className="md:hidden text-sm">
                <FaMoneyBillWave />
              </span>
              <span className="hidden md:inline">Pay $10 Fee</span>
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs md:text-sm"
            >
              <span className="md:hidden text-sm">
                <FaCheck/>
              </span>
              <span className="hidden md:inline">Paid</span>
            </button>
          )}

          {/* Modals */}
          {isViewOpen && (
            <ApplicationViewDetails
              myLoan={myLoan}
              isOpen={isViewOpen}
              closeModal={() => setIsViewOpen(false)}
            />
          )}

          {isOpen && (
            <PaymentDetailsModal
              myLoan={myLoan}
              isOpen={isOpen}
              closeModal={() => setIsOpen(false)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
