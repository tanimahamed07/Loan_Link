import React from "react";
import { Link } from "react-router";

const LoanCard = ({ loan }) => {
  return (
    <div className="card bg-white shadow-2xl hover:scale-102 transition-transform duration-300 rounded-2xl overflow-hidden relative">
      {/* Optional subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white opacity-0 hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

      <figure>
        <img
          src={loan.image}
          alt={loan.title}
          className="w-full h-52 object-cover"
        />
      </figure>

      <div className="card-body p-6 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-2xl font-extrabold text-gray-900 mb-2">
            {loan.title}
          </h2>
          <p className="text-gray-500 mb-1">Category: {loan.category}</p>
          <p className="text-gray-700 mb-1">
            Interest:{" "}
            <span className="font-semibold">{loan.interestRate}%</span>
          </p>
          <p className="text-gray-700">
            Max Loan Limit:{" "}
            <span className="font-semibold">${loan.maxLimit}</span>
          </p>
        </div>

        <Link
          to={`/loan-details/${loan._id}`}
          className="mt-4 btn btn-gradient w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-black font-bold hover:from-yellow-500 hover:to-orange-500 shadow-lg rounded-xl"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;
