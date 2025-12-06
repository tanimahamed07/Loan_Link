import React from "react";

const ExtraSections = () => {
  return (
    <div className="space-y-24">
      {/* Section 1: Our Mission */}
      <section className="pt-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Mission</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Empower Borrowers
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                We aim to make microloans easily accessible for individuals and
                small businesses, helping them grow, rebuild, or move forward.
              </p>

              <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            {/* Card 2 */}
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Transparent Process
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                Our mission is to build trust with every user by offering a
                clear, honest, and zero-hidden-charge loan system.
              </p>

              <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            {/* Card 3 */}
            <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Faster Loan Approval
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                We strive to reduce waiting times by offering a seamless loan
                request, verification, and approval experience.
              </p>

              <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Us */}
      <section className=" bg-base-100 text-base-content">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Fast Approval",
                desc: "Get your loan approved within 24 hours with our efficient verification process.",
              },
              {
                title: "Transparent Process",
                desc: "We maintain complete transparency with no hidden fees or confusing terms.",
              },
              {
                title: "Customer Support",
                desc: "Our team is available 24/7 to assist you and answer all your queries.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  {item.desc}
                </p>

                {/* Decorative corner dot like feedback card */}
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
