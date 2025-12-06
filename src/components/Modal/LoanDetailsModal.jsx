import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

const LoanDetailsModal = ({ closeModal, isOpen, myLoan }) => {
  if (!myLoan) return null;

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "N/A";

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFeeBadge = (fee) => (fee === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl transition-all">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Loan Application Details
                  </DialogTitle>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-semibold">Loan ID:</span> {myLoan.loanId}
                  </div>
                  <div>
                    <span className="font-semibold">Loan Title:</span> {myLoan.loanTitle}
                  </div>
                  <div>
                    <span className="font-semibold">Borrower Name:</span> {myLoan.firstName} {myLoan.lastName}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {myLoan.userEmail}
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span> {myLoan.phone}
                  </div>
                  <div>
                    <span className="font-semibold">NID / Passport:</span> {myLoan.nidOrPassport}
                  </div>
                  <div>
                    <span className="font-semibold">Loan Amount:</span>{" "}
                    <span className="font-bold">${myLoan.loanAmount}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Interest Rate:</span> {myLoan.interestRate}%
                  </div>
                  <div>
                    <span className="font-semibold">Income Source:</span> {myLoan.incomeSource}
                  </div>
                  <div>
                    <span className="font-semibold">Monthly Income:</span> ${myLoan.monthlyIncome}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusBadge(myLoan.status)}`}>
                      {myLoan.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Application Fee:</span>{" "}
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getFeeBadge(myLoan.applicationFeeStatus)}`}>
                      {myLoan.applicationFeeStatus}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Created At:</span> {formatDate(myLoan.createdAt)}
                  </div>
                  {myLoan.approvedAt && (
                    <div>
                      <span className="font-semibold">Approved At:</span> {formatDate(myLoan.approvedAt)}
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <span className="font-semibold">Address:</span> {myLoan.address}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold">Reason:</span> {myLoan.reason}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold">Notes:</span> {myLoan.notes || "N/A"}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoanDetailsModal;
