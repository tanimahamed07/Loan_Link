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
    <section className="py-16 bg-base-100 text-base-content">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold dark:text-gray-100">
          Customer Feedback
        </h2>
        <p className="text-gray-base mt-2">Hear from our satisfied borrowers</p>
      </div>

      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="px-4">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 relative border border-gray-200 dark:border-gray-700">
                {/* Header (Avatar + Name + Role) */}
                <div className="flex gap-4 items-center">
                  <img
                    src={feedback.avatar}
                    alt={feedback.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {feedback.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feedback.role}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-300 italic mt-4">
                  "{feedback.message}"
                </p>

                {/* Rating */}
                <div className="flex text-yellow-500 mt-4">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} className="mr-1" />
                    ))}
                </div>

                {/* Share Icon */}
                <FaShareSquare className="absolute bottom-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Feedback;
