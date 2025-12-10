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

  // Container handles stagger
  const containerVariants = {
    hidden: { opacity: 1 }, // Note: You can keep opacity 1 here or change to 0 if the whole grid needs to fade in. For staggered children, opacity 1 is fine.
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, // Adjusted stagger for a snappier look
        delayChildren: 0.05,  // Reduced initial delay
      },
    },
  };

  // Each card animation: Fade up and a bit faster
  const cardVariants = {
    hidden: { opacity: 0, y: 30 }, // Reduced y for less jump
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }, // Faster, smoother ease
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

        {/* Loans Grid - Optimized for ONE-TIME Scroll Animation */}
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // *** THE KEY FIX IS HERE ***
          viewport={{ 
            once: true, // Animation runs only ONE time when it enters the viewport
            amount: 0.2 // Animation starts when 20% of the element is visible
          }}   
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-5 sm:px-0"
        >
          {loans.map((loan) => (
            <motion.div
              key={loan._id}
              variants={cardVariants}
              className="w-full"
              // *** Removed viewport prop from here to prevent re-renders/conflicts ***
            >
              <LoanCard loan={loan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Loan;