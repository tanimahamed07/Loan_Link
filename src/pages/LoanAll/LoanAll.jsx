import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import LoanCard from '../../components/Shared/LoanCard/LoanCard';

const LoanAll = () => {
      const { data: allLoans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loans`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  console.log(allLoans);

  return (

    <section className="py-12 ">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold  dark:text-gray-900">
           All Available Loans
          </h2>
          <p className="text-gray-base t-2 dark:text-gray-900">
            Explore our top microloan options tailored to your needs
          </p>
        </div>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* LoanCard Components */}
          {allLoans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanAll;