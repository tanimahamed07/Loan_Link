
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddLoanForm = () => {
  const axiosSecure = useAxiosSecure()
  const { register, handleSubmit } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      setUploading(true);

      let imageURL = data.image; 
      if (selectedImage) {
        imageURL = await imageUpload(selectedImage);
      }


      const documentsArray = data.requiredDocuments
        ? data.requiredDocuments.split(",").map((doc) => doc.trim())
        : [];

      const emiPlansArray = data.emiPlans
        ? data.emiPlans.split(",").map((plan) => plan.trim())
        : [];


      const loanData = {
        title: data.title,
        description: data.description,
        category: data.category,
        interestRate: Number(data.interestRate),
        maxLimit: Number(data.maxLimit),
        image: imageURL,
        showOnHome: data.showOnHome || false,
        requiredDocuments: documentsArray,
        emiPlans: emiPlansArray,
        createdAt: new Date().toISOString(),
      };


      const res = await axiosSecure.post(
        `/loans`,
        loanData
      );

      if (res.data.insertedId || res.data.acknowledged) {
        toast.success("Loan Added Successfully!");
        navigate('/')
        setSelectedImage(null);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to submit loan.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create New Loan
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Loan Title
            </span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="e.g. Personal Loan"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Category & Interest Rate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Category
              </span>
            </label>
            <input
              {...register("category", { required: true })}
              type="text"
              placeholder="e.g. Business"
              className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">
                Interest Rate (%)
              </span>
            </label>
            <input
              {...register("interestRate", { required: true })}
              type="number"
              step="0.1"
              placeholder="e.g. 5.5"
              className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Max Limit */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Max Loan Limit
            </span>
          </label>
          <input
            {...register("maxLimit", { required: true })}
            type="number"
            placeholder="e.g. 500000"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Description
            </span>
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Loan details..."
            className="textarea textarea-bordered w-full h-28 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          ></textarea>
        </div>

        {/* Required Documents */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Required Documents (comma separated)
            </span>
          </label>
          <input
            {...register("requiredDocuments")}
            type="text"
            placeholder="e.g. NID, Passport, Bank Statement"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* EMI Plans */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              EMI Plans (comma separated)
            </span>
          </label>
          <input
            {...register("emiPlans")}
            type="text"
            placeholder="e.g. 3 Months, 6 Months, 1 Year"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Loan Image
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
          <p className="text-gray-400 text-sm mt-1">
            Leave blank to use image URL or existing image.
          </p>
        </div>

        {/* Show on Home Toggle */}
        <div className="form-control flex items-center mt-4">
          <input
            {...register("showOnHome")}
            type="checkbox"
            className="checkbox checkbox-primary mr-2"
          />
          <label className="label-text font-semibold text-gray-700 cursor-pointer">
            Show on Home Page
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg mt-6 transition duration-300 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Add Loan"}
        </button>
      </form>
    </div>
  );
};

export default AddLoanForm;
