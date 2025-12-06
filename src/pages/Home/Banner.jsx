import { useNavigate } from "react-router";

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 overflow-hidden relative bg-base-100 text-base-content">
      {/* Light mode glow + dark amber glow */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="
      absolute inset-0 
      bg-[radial-gradient(circle_at_50%_50%,#ffe8a3,transparent_70%)]
      dark:bg-[radial-gradient(circle_at_50%_50%,#fbbf24,transparent_70%)]
    "
        />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            Get Microloans <br />
            <span
              className="
          bg-gradient-to-r from-amber-500 to-orange-500 
          dark:from-amber-300 dark:to-orange-400 
          bg-clip-text text-transparent
        "
            >
              Instantly
            </span>{" "}
            with LoanLink
          </h1>

          <p className="text-base sm:text-lg text-base-content/70 mb-8 max-w-2xl mx-auto lg:mx-0">
            No paperwork. No waiting. Apply in 2 minutes, get approved in
            seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {/* Primary CTA */}
            <button
              onClick={() => navigate("/apply-loan")}
              className="
            group relative overflow-hidden 
            bg-gradient-to-r from-amber-400 to-orange-500
            hover:scale-105 
            text-black font-bold text-base px-6 py-3 
            rounded-xl shadow-xl
            transition-all duration-300
          "
            >
              <span className="relative z-10">Apply for Loan Now</span>
              <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-50 transition-opacity" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => navigate("/all-loans")}
              className="
            border-2 border-amber-400/60 
            hover:bg-amber-400/20 shadow 
            backdrop-blur-md
            font-semibold text-base px-6 py-3 
            rounded-xl transition-all duration-300
          "
            >
              Explore All Loans →
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start text-sm text-base-content/70">
            {["100% Secure", "No Hidden Fees", "24/7 Support"].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-success"
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
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <img
            src="https://wemabank.com/assets/Wema%20Bank%20Salary%20Based%20Loan-WuTcJiQp.jpg"
            alt="Instant Loan Approval"
            className="
          w-full max-w-xl mx-auto rounded-2xl 
          shadow-2xl hover:scale-[1.03] 
          transition-transform 
        "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
