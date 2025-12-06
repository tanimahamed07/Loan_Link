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
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16  text-base-content transition-colors duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Customer Feedback
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
            What our clients say about us
        </p>
      </div>

      <div className="container mx-auto px-4">
        <Slider {...settings} className="pb-10">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="px-4 py-2">
              <div 
                className="
                  relative 
                  bg-white dark:bg-neutral-900/90 
                  border border-gray-200 dark:border-amber-400/30 
                  shadow-lg dark:shadow-[0_0_10px_rgba(251,191,36,0.15)] 
                  backdrop-blur-xl
                  rounded-2xl p-8 text-center 
                  hover:scale-[1.03] transition-all duration-300
                  hover:shadow-xl dark:hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]
                "
              >
                {/* Header (Avatar + Name + Role) */}
                <div className="flex gap-4 items-center text-left">
                  <img
                    src={feedback.avatar}
                    alt={feedback.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-amber-300">
                      {feedback.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feedback.role}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className="italic mt-4 text-gray-600 dark:text-gray-200 leading-relaxed text-left">
                  "{feedback.message}"
                </p>

                {/* Rating & Share */}
                <div className="flex justify-between items-center mt-6">
                    {/* Stars */}
                    <div className="flex text-amber-400 text-sm">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <FaStar key={i} className="mr-1" />
                        ))}
                    </div>

                    {/* Share Icon */}
                    <FaShareSquare 
                        className="text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 cursor-pointer transition-colors text-lg" 
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