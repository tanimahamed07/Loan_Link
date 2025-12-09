import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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


  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12">
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
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} 
        >
          {loans.map((loan) => (
            <motion.div key={loan._id} variants={cardVariants}>
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Loan;
