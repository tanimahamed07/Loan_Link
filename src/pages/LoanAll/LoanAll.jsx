import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import LoanCard from "../../components/Shared/LoanCard/LoanCard";
import LoanCardSkeleton from "../../components/Shared/LoanCard/LoanCardSkeleton";

const LoanAll = () => {
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading } = useQuery({
    queryKey: ["all-loans", search, sort, page],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/loans`,
        {
          params: { search, sort, page, limit },
        }
      );
      return data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchRef.current.value);
    setPage(1);
  };

  const loans = data?.loans || [];
  const totalPages = data?.totalPages || 1;

  return (
    <section className="py-12 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 mb-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4"
          >
            Available <span className="text-amber-500">Loans</span>
          </motion.h2>
          <div className="h-1.5 bg-amber-500 w-20 mx-auto rounded-full mb-6" />
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

        {/* Filters & Search Bar */}
        <div className="bg-white dark:bg-neutral-900/90 border border-gray-200 dark:border-amber-400/20 p-5 rounded-2xl shadow-xl flex flex-col lg:flex-row gap-4 items-center justify-between mb-12">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full lg:max-w-md relative">
            <input
              type="text"
              placeholder="Search by loan title..."
              ref={searchRef}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all dark:text-white"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1.5 bg-amber-500 text-black px-4 py-1.5 rounded-lg font-bold hover:bg-amber-600 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Sort Filter */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:block">Sort By:</span>
            <select
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 outline-none focus:border-amber-500 dark:text-white cursor-pointer"
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              value={sort}
            >
              <option value="newest">Newest First</option>
              <option value="lowToHigh">Limit: Low to High</option>
              <option value="highToLow">Limit: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        {isLoading ? (
          /* --- Skeleton Loading Grid --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <LoanCardSkeleton key={i} />
            ))}
          </div>
        ) : loans.length > 0 ? (
          /* --- Real Data Grid --- */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {loans.map((loan) => (
              <LoanCard key={loan._id} loan={loan} />
            ))}
          </motion.div>
        ) : (
          /* --- No Data State --- */
          <div className="text-center py-24 bg-white dark:bg-neutral-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-neutral-700">
            <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">No loans found for "{search}"</p>
            <button 
              onClick={() => {
                setSearch(""); 
                if(searchRef.current) searchRef.current.value = "";
              }} 
              className="mt-4 bg-amber-500/10 text-amber-600 px-6 py-2 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 ${
                  page === i + 1
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-110"
                    : "bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-neutral-800 hover:border-amber-500"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LoanAll;