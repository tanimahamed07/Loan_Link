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
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.02 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05 },
  };

  const badges = ["100% Secure", "No Hidden Fees", "24/7 Support"];

  return (
    <section className="py-16 md:py-24 overflow-hidden relative text-base-content transition-colors duration-500">
      <div className="absolute inset-0 opacity-50 dark:opacity-40 pointer-events-none">
        <div className="absolute inset-0 transition-colors duration-500" />
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="lg:w-6/12 text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 leading-tight text-gray-900 dark:text-white"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Get Microloans <br />
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-300 dark:to-orange-400 bg-clip-text text-transparent inline-block">
              Instantly
            </span>{" "}
            with LoanLink
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            No paperwork. No waiting. Apply in 2 minutes, get approved in
            seconds. Focus on what matters, we handle the rest.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => navigate("/all-loans")}
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white dark:text-gray-900 font-bold text-lg px-8 py-3.5 rounded-xl shadow-xl shadow-amber-500/40 transition-all duration-300"
              whileHover="hover"
              variants={buttonVariants}
            >
              <span className="relative z-10"> Explore All Loans →</span>
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-base text-gray-600 dark:text-gray-400">
            {badges.map((text, index) => (
              <motion.div
                key={text}
                className="flex items-center gap-2"
                custom={index}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
              >
                <svg
                  className="w-5 h-5 text-green-500 dark:text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          className="lg:w-6/12 mt-12 lg:mt-0 flex justify-center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <img
            src="https://wemabank.com/assets/Wema%20Bank%20Salary%20Based%20Loan-WuTcJiQp.jpg"
            alt="Instant Loan Approval"
            className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-gray-400/50 dark:shadow-neutral-950/70 transition-transform duration-500 border-4 border-white/50 dark:border-neutral-800/50"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
