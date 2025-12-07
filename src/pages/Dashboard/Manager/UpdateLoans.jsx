import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const UpdateLoans = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/loan-details/${id}`
        );
        setLoan(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load loan data.");
        setLoading(false);
      }
    };
    fetchLoan();
  }, [id]);

  // 2️⃣ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = loan.image;

      if (selectedImage) {
        imageURL = await imageUpload(selectedImage);
      }

      const updatedData = {
        title: e.target.title.value,
        category: e.target.category.value,
        description: e.target.description.value,
        interestRate: parseFloat(e.target.interestRate.value),
        maxLimit: parseFloat(e.target.maxLimit.value),
        emiPlans: e.target.emiPlans.value
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        requiredDocuments: e.target.requiredDocuments.value
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        image: imageURL,
        showOnHome: e.target.showOnHome.checked,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-loan/${id}`,
        updatedData
      );
      toast.success("Loan updated successfully!");
      navigate("/dashboard/manage-loans");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update loan.");
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (!loan) return <p className="text-center mt-12">Loan not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Update Loan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Title</span>
          </label>
          <input
            name="title"
            defaultValue={loan.title}
            placeholder="Loan title"
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
              name="category"
              defaultValue={loan.category}
              placeholder="Category"
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
              name="interestRate"
              type="number"
              step="0.1"
              defaultValue={loan.interestRate}
              placeholder="Interest Rate"
              className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Max Limit */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Max Limit
            </span>
          </label>
          <input
            name="maxLimit"
            type="number"
            defaultValue={loan.maxLimit}
            placeholder="Max Limit"
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
            name="description"
            defaultValue={loan.description}
            placeholder="Description"
            className="textarea textarea-bordered w-full h-28 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
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
            name="emiPlans"
            defaultValue={loan.emiPlans.join(", ")}
            placeholder="3 Months, 6 Months"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Required Documents */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">
              Required Documents (comma separated)
            </span>
          </label>
          <input
            name="requiredDocuments"
            defaultValue={loan.requiredDocuments.join(", ")}
            placeholder="NID, Passport"
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="input input-bordered w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          />
          <p className="text-gray-400 text-sm mt-1">
            Current image will remain if no file is selected.
          </p>
          {loan.image && (
            <img
              src={loan.image}
              alt="Current Loan"
              className="mt-2 w-32 h-20 object-cover rounded-md border"
            />
          )}
        </div>

        {/* Show on Home */}
        <div className="form-control flex items-center mt-4">
          <input
            type="checkbox"
            name="showOnHome"
            defaultChecked={loan.showOnHome}
            className="checkbox checkbox-primary mr-2"
          />
          <label className="label-text font-semibold text-gray-700 cursor-pointer">
            Show on Home
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg mt-6 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateLoans;
