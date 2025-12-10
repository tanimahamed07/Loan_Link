import React from "react";
import Slider from "react-slick";
import { FaStar, FaShareSquare } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const feedbackData = [
  {
    id: 1,
    name: "John Doe",
    role: "Borrower",
    message:
      "LoanLink made the loan process incredibly simple and fast. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Borrower",
    message:
      "The verification process was quick, and I received my funds within 24 hours.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Ali Khan",
    role: "Borrower",
    message: "Excellent platform for microloans, very user-friendly interface.",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    id: 4,
    name: "Sarah Lee",
    role: "Borrower",
    message: "Amazing support! Helped me throughout the entire process.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Feedback = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Mobile = 1 Card
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 text-base-content transition-colors duration-300">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Customer Feedback
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          What our clients say about us
        </p>
      </div>

      {/* Carousel */}
      <div className="container mx-auto px-2 sm:px-4">
        <Slider {...settings} className="pb-8">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="px-2 sm:px-4 py-2">
              <div
                className="
                  relative 
                  bg-white dark:bg-neutral-900/90 
                  border border-gray-200 dark:border-amber-400/30 
                  shadow-lg dark:shadow-[0_0_10px_rgba(251,191,36,0.15)] 
                  backdrop-blur-xl
                  rounded-2xl p-4 sm:p-8 text-center 
                  hover:scale-[1.02] sm:hover:scale-[1.03]
                  transition-all duration-300
                  hover:shadow-xl dark:hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]
                "
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start text-center sm:text-left">
                  <img
                    src={feedback.avatar}
                    alt={feedback.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-amber-300">
                      {feedback.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {feedback.role}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className="italic mt-3 sm:mt-4 text-gray-600 dark:text-gray-200 leading-relaxed text-sm sm:text-base text-left">
                  "{feedback.message}"
                </p>

                {/* Stars + Share */}
                <div className="flex justify-between items-center mt-4 sm:mt-6">
                  <div className="flex text-amber-400 text-xs sm:text-sm">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} className="mr-1" />
                      ))}
                  </div>

                  <FaShareSquare
                    className="text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 cursor-pointer transition-colors text-base sm:text-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Feedback;
