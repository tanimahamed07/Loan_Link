import React, { useState } from "react";
import ApplicationViewDetails from "../../Modal/ApplicationViewDetailsModal";

const ApprovedLoanDataRow = ({ loan }) => {
      const [isViewOpen, setIsViewOpen] = useState(false);
    
   const handleView = () => {
     setIsViewOpen(true);
   }
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

      {/* Actions (Manager Requirements) */}
      <td className="px-5 py-5 border-b bg-white text-sm space-x-2">
        {/* 3. View Button */}
        <button
          onClick={handleView}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition duration-150"
        >
          View Details
        </button>
        {isViewOpen && (
          <ApplicationViewDetails
            myLoan={loan}
            isOpen={isViewOpen} // correct prop
            closeModal={() => setIsViewOpen(false)} // separate close
          />
        )}
      </td>
    </tr>
  );
};

export default ApprovedLoanDataRow;
