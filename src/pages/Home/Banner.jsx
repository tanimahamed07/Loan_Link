import { useNavigate } from "react-router";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    // Main Section container with background control
    <section className="py-16 md:py-24 overflow-hidden relative text-base-content transition-colors duration-500">
      
      {/* Background Amber/Gold Glow Effect */}
      <div className="absolute inset-0 opacity-50 dark:opacity-40 pointer-events-none">
        <div
          className="
            absolute inset-0 
            transition-colors duration-500
          "
        />
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content (Text & CTAs) */}
        <div className="lg:w-6/12 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 leading-tight text-gray-900 dark:text-white">
            Get Microloans <br />
            <span
              className="
                bg-gradient-to-r from-amber-500 to-orange-500 
                dark:from-amber-300 dark:to-orange-400 
                bg-clip-text text-transparent
                inline-block
              "
            >
              Instantly
            </span>{" "}
            with LoanLink
          </h1>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
            No paperwork. No waiting. Apply in 2 minutes, get approved in
            seconds. Focus on what matters, we handle the rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            
            {/* Primary CTA: Apply Now */}
            <button
              onClick={() => navigate("/apply-loan")}
              className="
                group relative overflow-hidden 
                bg-gradient-to-r from-amber-500 to-orange-600
                hover:from-amber-600 hover:to-orange-700
                text-white dark:text-gray-900 font-bold text-lg px-8 py-3.5 
                rounded-xl shadow-xl shadow-amber-500/40 
                hover:scale-[1.03] 
                transition-all duration-300
              "
            >
              <span className="relative z-10">Apply for Loan Now</span>
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Secondary CTA: Explore All Loans */}
            <button
              onClick={() => navigate("/all-loans")}
              className="
                border-2 border-amber-400/60 dark:border-amber-400/40 
                text-gray-800 dark:text-amber-300
                hover:bg-amber-100/70 dark:hover:bg-neutral-800/80
                font-semibold text-lg px-8 py-3.5 
                rounded-xl transition-all duration-300
                shadow-md hover:shadow-lg
              "
            >
              Explore All Loans →
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-base text-gray-600 dark:text-gray-400">
            {["100% Secure", "No Hidden Fees", "24/7 Support"].map((text) => (
              <div key={text} className="flex items-center gap-2">
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
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-6/12 mt-12 lg:mt-0 flex justify-center">
          <img
            src="https://wemabank.com/assets/Wema%20Bank%20Salary%20Based%20Loan-WuTcJiQp.jpg"
            alt="Instant Loan Approval"
            className="
              w-full max-w-lg mx-auto rounded-3xl 
              shadow-2xl shadow-gray-400/50 dark:shadow-neutral-950/70
              transition-transform duration-500 hover:scale-[1.01] 
              border-4 border-white/50 dark:border-neutral-800/50
            "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;