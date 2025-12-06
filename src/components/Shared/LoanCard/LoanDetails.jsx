import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import useRole from "../../../hooks/useRole";

const LoanDetails = () => {
  const { id } = useParams();
  const [role, isRoleLoading] = useRole(); // Get user's role

  // Fetch loan details
  const { data: details = {}, isLoading } = useQuery({
    queryKey: ["loan-details", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/loan-details/${id}`
      );
      return result.data;
    },
  });

  if (isLoading || isRoleLoading) return <LoadingSpinner />;

  return (
    <section className="container mx-auto p-6 sm:p-10">
      {/* Loan Image and Title */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        <img
          src={details.image}
          alt={details.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {details.title}
          </h1>
          <p className="text-base mb-4">{details.description}</p>

          {/* Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-semibold">Category: </span>
              {details.category}
            </div>
            <div>
              <span className="font-semibold">Interest Rate: </span>
              {details.interestRate}%
            </div>
            <div>
              <span className="font-semibold">Max Limit: </span>$
              {details.maxLimit?.toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Created By: </span>
              {details.createdBy}
            </div>
          </div>

          {/* Required Documents */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Required Documents:</h2>
            <ul className="list-disc list-inside">
              {details.requiredDocuments?.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          {/* EMI Plans */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Available EMI Plans:</h2>
            <ul className="flex flex-wrap gap-2">
              {details.emiPlans?.map((plan, idx) => (
                <li
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {plan}
                </li>
              ))}
            </ul>
          </div>

          {/* Apply Now Button */}
          <button
            disabled={role !== "borrower"} // Disable if not borrower
            className={`${
              role === "borrower"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-200"
            } font-semibold px-6 py-3 rounded-lg transition-colors`}
          >
            Apply Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoanDetails;
