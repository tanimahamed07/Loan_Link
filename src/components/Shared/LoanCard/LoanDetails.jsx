import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import useRole from "../../../hooks/useRole";
import {
  FaMoneyBillWave,
  FaPercentage,
  FaTags,
  FaCalendarAlt,
} from "react-icons/fa";

const LoanDetails = () => {
  const { id } = useParams();
  const [role, isRoleLoading] = useRole();

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
    <section className="py-12 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Hero Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-neutral-800">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left: Bigger Image */}
            <div className="lg:col-span-2">
              <img
                src={details.image}
                alt={details.title}
                className="w-full h-80 sm:h-96 lg:h-full object-cover"
              />
            </div>

            {/* Right: Content - Perfectly Centered */}
            <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
              {/* Title & Description */}
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  {details.title}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {details.description}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {details.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Interest Rate
                  </p>
                  <p className="mt-1 text-xl font-bold text-red-600 dark:text-red-400">
                    {details.interestRate}%
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Max Limit
                  </p>
                  <p className="mt-1 text-xl font-bold text-green-600 dark:text-green-400">
                    ${details.maxLimit?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Since
                  </p>
                  <p className="mt-1 text-base font-medium text-gray-700 dark:text-gray-300">
                    {new Date(details.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-10">
                {role === "borrower" ? (
                  <Link
                    to={`/loan-form/${id}`}
                    className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 
                         hover:from-amber-600 hover:to-orange-700 text-white font-bold 
                         px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 
                         transition-all duration-200 text-lg"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block bg-gray-200 dark:bg-neutral-700 text-gray-500 
                         px-10 py-4 rounded-xl cursor-not-allowed font-medium"
                  >
                    Borrowers Only
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Documents + EMI */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 container mx-auto">
          {/* Required Documents */}
          <div className="p-6 bg-white dark:bg-neutral-900/90 rounded-xl shadow-md border border-gray-200 dark:border-neutral-700">
            <h2 className="font-bold text-2xl mb-4 border-b pb-2 text-gray-900 dark:text-white">
              Required Documents 📄
            </h2>

            <ul className="space-y-3">
              {details.requiredDocuments?.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-gray-700 dark:text-gray-300"
                >
                  <span className="mr-3 text-amber-500 font-bold">
                    {idx + 1}.
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* EMI Plans */}
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              EMI Options
            </h2>
            <div className="p-6 bg-white dark:bg-neutral-900/90 rounded-xl shadow-md border border-gray-200 dark:border-neutral-700">
              <h2 className="font-bold text-2xl mb-4 border-b pb-2 text-gray-900 dark:text-white">
                Available EMI Plans 📅
              </h2>

              <div className="flex flex-wrap gap-3">
                {details.emiPlans?.map((plan, idx) => (
                  <span
                    key={idx}
                    className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 
                  px-4 py-1.5 rounded-full text-sm font-medium shadow-sm"
                  >
                    {plan}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanDetails;
