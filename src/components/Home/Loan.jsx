import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import LoanCard from "../Shared/LoanCard/LoanCard";
const Loan = () => {
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loans-home`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  console.log(loans);

  return (
    <section className="py-12  ">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
           Available Loans
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
           Explore our top microloan options tailored to your needs
        </p>
        </div>


        {/* Loans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* LoanCard Components */}
          {loans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loan;
