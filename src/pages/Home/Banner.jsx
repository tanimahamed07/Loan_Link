import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const HeroBanner = () => {
  const navigate = useNavigate();

  // Variants
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2 } }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: { scale: 1.02 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.05 },
  };

  const badges = ["100% Secure", "No Hidden Fees", "24/7 Support"];

  return (
    <section className="relative w-full py-10 lg:py-16 overflow-hidden bg-transparent transition-colors duration-500 min-h-fit flex items-center">
      {/* Background Decorator - আরও সূক্ষ্ম করা হয়েছে */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none -z-10">
        <div className="absolute top-0 right-[10%] w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-[10%] w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6">
          {/* Left Content */}
          <div className="w-full lg:w-7/12 text-center lg:text-left z-10">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 leading-[1.15] text-gray-900 dark:text-white tracking-tight">
                Get Microloans <br />
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent inline-block">
                  Instantly
                </span>{" "}
                with LoanLink
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
                transition={{ delay: 0.2 }}
              >
                No paperwork. No waiting. Apply in 2 minutes, get approved in
                seconds. Focus on what matters, we handle the rest.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={buttonVariants}
              >
                <motion.button
                  onClick={() => navigate("/all-loans")}
                  className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95"
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore All Loans{" "}
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Badges Section - সাইজ কিছুটা ছোট করা হয়েছে */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                {badges.map((text, index) => (
                  <motion.div
                    key={text}
                    className="flex items-center gap-2 bg-white/50 dark:bg-neutral-800/40 px-3 py-1 rounded-full border border-gray-100 dark:border-neutral-700 backdrop-blur-sm"
                    custom={index}
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-green-500 font-bold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Image Section - Height Adjusted */}
          <motion.div
            className="w-full lg:w-5/12 flex justify-center lg:justify-end"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative group w-full max-w-sm lg:max-w-md">
              {/* Subtle Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2rem] blur-lg opacity-20 transition duration-1000"></div>

              <img
                src="https://wemabank.com/assets/Wema%20Bank%20Salary%20Based%20Loan-WuTcJiQp.jpg"
                alt="Instant Loan Approval"
                className="relative w-full h-[280px] sm:h-[350px] object-cover rounded-[1.8rem] shadow-xl border-4 border-white dark:border-neutral-800 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
