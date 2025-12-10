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

  // Container: handles stagger
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,  // Faster stagger
        delayChildren: 0.05,   // Reduced delay
      },
    },
  };

  // Cards Animation: Optimized fade-up
  const cardVariants = {
    hidden: { opacity: 0, y: 30 }, // Reduced lift (y)
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }, // Faster, smoother duration and ease
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

        {/* Loans Grid - Optimized for ONE-TIME Scroll Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // *** THE KEY FIX IS HERE ***
          viewport={{ 
            once: true, // This ensures the animation plays only ONE time
            amount: 0.2 // Animation starts when 20% of the element is visible
          }}   
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-5 sm:px-0"
        >
          {allLoans.map((loan) => (
            <motion.div
              key={loan._id}
              variants={cardVariants}
              className="w-full"
              // *** Removed viewport prop from here as it's redundant and conflicting ***
            >
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LoanAll;