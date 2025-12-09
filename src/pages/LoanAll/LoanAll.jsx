import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import LoanCard from "../../components/Shared/LoanCard/LoanCard";

const LoanAll = () => {
  const { data: allLoans = [], isLoading } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loans`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Variants for container (stagger) and individual cards
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }, // stagger each child by 0.1s
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="py-12">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            All Available Loans
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore our all microloan options tailored to your needs
          </p>
        </div>

        {/* Loans Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // animate when scrolled into view
        >
          {allLoans.map((loan) => (
            <motion.div key={loan._id} variants={cardVariants}>
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LoanAll;
