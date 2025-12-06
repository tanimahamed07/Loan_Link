import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import useRole from "../../../hooks/useRole";
import { FaMoneyBillWave, FaPercentage, FaTags, FaUser } from "react-icons/fa";

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

  // Component for displaying key metrics
  const DetailItem = ({ icon, label, value, colorClass = "text-amber-500" }) => (
    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg shadow-sm">
      <div className={`${colorClass} p-2 rounded-full bg-gray-200 dark:bg-neutral-700 flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
        {/* Ensures value text is limited to one line and doesn't overflow easily */}
        <p className="text-lg font-bold text-gray-900 dark:text-white truncate">{value}</p> 
      </div>
    </div>
  );

  return (
    // Main Section container with dark mode background
    <section className="bg-base-100 dark:bg-base-300 min-h-screen py-10 transition-colors duration-300">
      <div className="container mx-auto p-6 sm:p-10 max-w-6xl">

        {/* Loan Image and Header Content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start bg-white dark:bg-neutral-900/90 p-8 rounded-2xl shadow-xl dark:shadow-[0_0_15px_rgba(251,191,36,0.1)] border border-gray-200 dark:border-amber-400/30">
          
          {/* Image */}
          <div className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0">
            <img
              src={details.image}
              alt={details.title}
              className="w-full h-auto max-h-80 object-cover rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
          
          {/* Title & Description */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-gray-900 dark:text-amber-400">
              {details.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 border-l-4 border-amber-400 pl-4 italic">
              {details.description}
            </p>

            {/* Quick Metrics */}
            {/* Added lg:grid-cols-4 back for desktop view */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <DetailItem
                icon={<FaTags className="w-5 h-5" />} // Added size to icons
                label="Category"
                value={details.category}
              />
              <DetailItem
                icon={<FaPercentage className="w-5 h-5" />}
                label="Interest Rate"
                value={`${details.interestRate}%`}
                colorClass="text-red-500"
              />
              <DetailItem
                icon={<FaMoneyBillWave className="w-5 h-5" />}
                label="Max Limit"
                value={`$${details.maxLimit?.toLocaleString()}`}
                colorClass="text-green-500"
              />
            </div>

            {/* Apply Now Button (Primary CTA) */}
            {role === "borrower" ? (
              <Link
                to={`/loan-form/${id}`}
                className="
                  inline-block w-full sm:w-auto text-center
                  bg-gradient-to-r from-amber-500 to-orange-600 
                  hover:from-amber-600 hover:to-orange-700 
                  text-white dark:text-gray-900 font-bold 
                  px-8 py-3 rounded-xl text-lg
                  shadow-lg shadow-amber-500/30 transition-all duration-300
                "
              >
                Apply Now
              </Link>
            ) : (
              <button
                disabled
                className="
                  inline-block w-full sm:w-auto text-center
                  bg-gray-400 dark:bg-neutral-700 cursor-not-allowed 
                  text-gray-200 dark:text-gray-400 font-semibold 
                  px-8 py-3 rounded-xl text-lg transition-colors duration-300
                "
              >
                Apply Now (Borrower only)
              </button>
            )}
          </div>
        </div>
        
        {/* --- Separator --- */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-neutral-700" />
        
        {/* Additional Sections (Required Documents & EMI Plans) */}
        <div className="grid md:grid-cols-2 gap-10 mt-6">
            
            {/* Required Documents */}
            <div className="p-6 bg-white dark:bg-neutral-900/90 rounded-xl shadow-md border border-gray-100 dark:border-neutral-800">
              <h2 className="font-bold text-2xl mb-4 border-b pb-2 text-gray-900 dark:text-white">
                Required Documents 📄
              </h2>
              <ul className="space-y-3">
                {details.requiredDocuments?.map((doc, idx) => (
                  <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="mr-3 text-amber-500 font-bold">{idx + 1}.</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* EMI Plans */}
            <div className="p-6 bg-white dark:bg-neutral-900/90 rounded-xl shadow-md border border-gray-100 dark:border-neutral-800">
              <h2 className="font-bold text-2xl mb-4 border-b pb-2 text-gray-900 dark:text-white">
                Available EMI Plans 📅
              </h2>
              <div className="flex flex-wrap gap-3">
                {details.emiPlans?.map((plan, idx) => (
                  <span
                    key={idx}
                    className="
                      bg-amber-100 dark:bg-amber-900 
                      text-amber-800 dark:text-amber-300 
                      px-4 py-1.5 rounded-full text-sm font-medium shadow-sm
                    "
                  >
                    {plan}
                  </span>
                ))}
              </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default LoanDetails;