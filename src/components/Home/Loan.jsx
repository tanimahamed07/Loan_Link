import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import LoadingSpinner from "../Shared/LoadingSpinner";
import LoanCard from "../Shared/LoanCard/LoanCard";
import LoanCardSkeleton from "../Shared/LoanCard/LoanCardSkeleton";

const Loan = () => {
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loans-home`);
      return result.data;
    },
  });
if(isLoading){
  return <LoadingSpinner></LoadingSpinner>
} 

  // এনিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className=" bg-transparent transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* --- Section Header: টাইটেল ও স্পেসিং ঠিক করা হয়েছে --- */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white"
          >
            Available <span className="text-amber-500">Loans</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-1.5 bg-amber-500 mx-auto rounded-full mt-4 mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-200 font-medium leading-relaxed"
          >
            Explore our top microloan options tailored to your business and
            personal needs. Simple application, instant approval.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {loans.map((loan) => (
            <motion.div
              key={loan._id}
              variants={cardVariants}
              className="flex justify-center h-full"
            >
              <div className="w-full max-w-sm sm:max-w-none">
                <LoanCard loan={loan} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* লোন না থাকলে একটি মেসেজ (Optional) */}
        {loans.length === 0 && (
          <div className="text-center py-20 text-gray-500 italic">
            No loans available at the moment. Please check back later.
          </div>
        )}
      </div>
    </section>
  );
};

export default Loan;
