import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ManageLoanDataRow = ({ loan, refetch }) => {
  const handleUpdate = () => {
    console.log("update btn");


  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/loan-delete/${id}`
      );

      if (res.data.deletedCount > 0) {
        toast.success("Loan deleted successfully!");
        refetch();
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to delete loan. Try again.");
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="px-5 py-4 bg-white text-sm text-center">
        <img
          src={loan.image}
          alt={loan.title}
          className="w-12 h-12 object-cover rounded"
        />
      </td>

      <td className="px-5 py-4 bg-white text-sm font-medium text-center">
        {loan.title}
      </td>

      <td className="px-5 py-4 bg-white text-sm text-center">
        {loan.interestRate}%
      </td>

      <td className="px-5 py-4 bg-white text-sm text-center">
        {loan.category}
      </td>

      <td className="px-5 py-4 bg-white text-sm text-center">
        <div className="flex justify-center items-center gap-2">
          <Link
            to={`update-loan/${loan._id}`}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </Link>

          <button
            onClick={() => handleDelete(loan._id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManageLoanDataRow;
