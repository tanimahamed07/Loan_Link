import { FaFileAlt, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const steps = [
  {
    id: 1,
    // Icon color updated for better contrast in both modes
    icon: <FaFileAlt className="w-12 h-12 text-amber-500 dark:text-amber-400" />,
    title: "Submit Application",
    description:
      "Fill out a simple loan application with your personal and financial details. Takes less than 2 minutes.",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="w-12 h-12 text-amber-600 dark:text-amber-500" />,
    title: "Get Verified",
    description:
      "Our team quickly verifies your information to ensure smooth and fast approval.",
  },
  {
    id: 3,
    icon: <FaMoneyBillWave className="w-12 h-12 text-orange-600 dark:text-orange-500" />,
    title: "Receive Funds",
    description:
      "Once approved, the loan amount is transferred instantly to your account.",
  },
];

export default function HowItWorks() {
  return (
    // Section background adjusted for dark mode
    <section className="py-16 text-base-content transition-colors duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-base mt-2 text-gray-600 dark:text-gray-400">
          A simple 3-step process to get your microloan quickly
        </p>
      </div>

      <div className="container mx-auto px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            // Card styling updated to match the amber theme and dark mode
            className="
              relative 
              bg-white dark:bg-neutral-900/90 
              border border-gray-200 dark:border-amber-400/30 
              shadow-lg dark:shadow-[0_0_10px_rgba(251,191,36,0.15)] 
              rounded-2xl p-8 text-center 
              hover:scale-[1.03] transition-all duration-300 
              hover:shadow-xl dark:hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]
            "
          >
            {/* Icon */}
            <div className="flex justify-center mb-5">{step.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-amber-300">
              {step.title}
            </h3>

            {/* Description */}
            <p className="leading-relaxed italic text-gray-600 dark:text-gray-200">
              {step.description}
            </p>

            {/* Step Number Display (as a circle/dot) */}
            <div className="absolute top-4 right-4 w-7 h-7 bg-amber-400 dark:bg-amber-500 text-white flex items-center justify-center rounded-full text-sm font-bold shadow-md">
                {step.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}