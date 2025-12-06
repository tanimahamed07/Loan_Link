import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';

// Helper Component for consistent styling
const DetailItem = ({ label, value, strong = false, fullWidth = false, statusType }) => {
    
    // Function to get badge styles
    const getBadgeStyle = (type) => {
        switch (type) {
            case 'green':
                return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
            case 'red':
                return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300';
            case 'amber':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-300';
        }
    };
    
    const displayValue = (
        statusType ? (
            <span className={`mt-1 inline-block px-3 py-1 text-sm rounded-md font-medium ${getBadgeStyle(statusType)}`}>
                {value}
            </span>
        ) : (
            <span className={`mt-1 ${strong ? 'font-bold text-gray-900 dark:text-white' : 'font-medium'}`}>
                {value}
            </span>
        )
    );

    return (
        <div className={`flex flex-col ${fullWidth ? 'md:col-span-2' : ''}`}>
            <span className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">{label}</span>
            {displayValue}
        </div>
    );
};


const LoanDetailsModal = ({ closeModal, isOpen, myLoan }) => {
  if (!myLoan) return null; // Safeguard

  // Helper to format date/time
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={closeModal}
      >
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
          <div className="fixed inset-0 bg-black/40 dark:bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-2xl transition-all">
                
                {/* Header & Close Button */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-neutral-700 pb-3 mb-4">
                    <DialogTitle className="text-xl font-extrabold text-gray-900 dark:text-white">
                        Loan Application Details
                    </DialogTitle>
                    <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        aria-label="Close"
                    >
                        <IoClose className="w-6 h-6" />
                    </button>
                </div>
                

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm dark:text-gray-300 text-gray-700">
                  
                  {/* Loan Information */}
                  <DetailItem label="Loan Title" value={myLoan.loanTitle} />
                  <DetailItem label="Loan ID" value={myLoan.loanId} />
                  <DetailItem label="Loan Amount" value={`$${myLoan.loanAmount}`} strong={true} />
                  <DetailItem label="Interest Rate" value={`${myLoan.interestRate}%`} />
                  
                  {/* Borrower Details */}
                  <DetailItem label="Borrower Name" value={`${myLoan.firstName} ${myLoan.lastName}`} />
                  <DetailItem label="Email" value={myLoan.userEmail} />
                  <DetailItem label="Phone" value={myLoan.phone} />
                  <DetailItem label="NID / Passport" value={myLoan.nidOrPassport} />
                  
                  {/* Financials & Status */}
                  <DetailItem label="Income Source" value={myLoan.incomeSource} />
                  <DetailItem label="Monthly Income" value={`$${myLoan.monthlyIncome}`} />
                  <DetailItem 
                    label="Application Fee" 
                    value={myLoan.applicationFeeStatus} 
                    statusType={myLoan.applicationFeeStatus === 'Paid' ? 'green' : 'red'} 
                  />
                  <DetailItem 
                    label="Status" 
                    value={myLoan.status} 
                    statusType={myLoan.status === 'Approved' ? 'green' : myLoan.status === 'Pending' ? 'amber' : 'red'} 
                  />

                  {/* Dates */}
                  <DetailItem label="Created At" value={formatDate(myLoan.createdAt)} />
                  {myLoan.approvedAt && (
                      <DetailItem label="Approved At" value={formatDate(myLoan.approvedAt)} />
                  )}
                </div>
                
                {/* Full Width Text Areas */}
                <div className="mt-6 space-y-3 dark:text-gray-300 text-gray-700">
                    <DetailItem label="Address" value={myLoan.address} fullWidth={true} />
                    <DetailItem label="Reason for Loan" value={myLoan.reason} fullWidth={true} />
                    <DetailItem label="Extra Notes" value={myLoan.notes || 'N/A'} fullWidth={true} />
                </div>


                {/* Footer Button */}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
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