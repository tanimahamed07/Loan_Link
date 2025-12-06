import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import { FaUser, FaEnvelope, FaLock, FaImage, FaUserTag } from 'react-icons/fa';

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Added watch to observe image field
  } = useForm();
  
  // Watch image field to show custom file input text if needed
  const watchedImage = watch("image");

  const onSubmit = async (data) => {
    setLoading(true); // Manually set loading true at the start of submission
    const { name, image, email, password, role } = data;

    if (!role) {
      toast.error("Please select a role");
      setLoading(false);
      return;
    }

    const imageFile = image[0];

    // --- Custom Password Validation ---
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (!uppercasePattern.test(password)) {
      toast.error("Password must have at least one uppercase letter");
      setLoading(false);
      return;
    }
    if (!lowercasePattern.test(password)) {
      toast.error("Password must have at least one lowercase letter");
      setLoading(false);
      return;
    }
    // --- End Validation ---

    try {
      // Image upload
      let imageURL = imageFile ? await imageUpload(imageFile) : null;
      
      // 1. Create user
      await createUser(email, password);

      // 2. Save/update user in database
      await saveOrUpdateUser({ name, email, image: imageURL, role });
      
      // 3. Update Firebase profile
      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success("Signup Successful");

    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      
      // Default role for Google sign-in is Borrower
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: "borrower",
      });
      
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err?.message || "Google sign-in failed.");
    }
  };

  // --- Common Input Field Component ---
  const InputField = ({ label, name, type = "text", icon: Icon, register, errors, placeholder, requiredMessage, pattern, maxLength }) => (
    <div>
      <label htmlFor={name} className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500">
          <Icon className="w-5 h-5" />
        </span>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className={`
            w-full px-12 py-3 border rounded-xl 
            bg-gray-50 dark:bg-neutral-800 dark:text-white 
            focus:outline-none focus:ring-2 transition-colors duration-200
            ${
              errors[name]
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 dark:border-neutral-700 focus:ring-amber-400'
            }
          `}
          {...register(name, {
            required: requiredMessage,
            pattern: pattern,
            maxLength: maxLength,
          })}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
  
  // Custom Select Field Component
  const SelectField = ({ label, name, icon: Icon, register, errors, requiredMessage, options }) => (
    <div>
      <label htmlFor={name} className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 dark:text-gray-500 z-10">
          <Icon className="w-5 h-5" />
        </span>
        <select
          id={name}
          defaultValue=""
          className={`
            w-full px-12 py-3 border rounded-xl appearance-none
            bg-gray-50 dark:bg-neutral-800 dark:text-white 
            focus:outline-none focus:ring-2 transition-colors duration-200
            ${
              errors[name]
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 dark:border-neutral-700 focus:ring-amber-400'
            }
          `}
          {...register(name, { required: requiredMessage })}
        >
          <option value="" disabled className="dark:bg-neutral-900">Select your role</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="dark:bg-neutral-900">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );


  return (
    // Main Container with dark mode background
    <div className="bg-base-100 dark:bg-base-300 min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300">
      <div 
        className="
          w-full max-w-lg p-8 lg:p-10 
          bg-white dark:bg-neutral-900/90 
          rounded-2xl shadow-2xl dark:shadow-[0_0_20px_rgba(251,191,36,0.1)] 
          border border-gray-200 dark:border-amber-400/30 relative z-10
        "
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-3">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Join LoanLink and get instant microloans
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name */}
          <InputField
            label="Name"
            name="name"
            icon={FaUser}
            register={register}
            errors={errors}
            requiredMessage="Name is required"
            maxLength={{ value: 20, message: "Name cannot exceed 20 characters" }}
            placeholder="Enter your name"
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            icon={FaEnvelope}
            register={register}
            errors={errors}
            requiredMessage="Email is required"
            pattern={{ value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" }}
            placeholder="example@email.com"
          />

          {/* Profile Image (Custom styled input) */}
          <div>
            <label htmlFor="image" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <FaImage className="w-5 h-5 text-amber-500" />
                <span>Profile Image (Optional)</span>
              </div>
            </label>
            <div className="relative border border-gray-300 dark:border-neutral-700 rounded-xl bg-gray-50 dark:bg-neutral-800 p-3 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {watchedImage && watchedImage.length > 0 ? watchedImage[0].name : "Choose an image file"}
                </span>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    {...register("image")}
                />
                <span className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-1 rounded-lg transition-colors duration-200 cursor-pointer">
                    Browse
                </span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">PNG, JPG, JPEG (optional)</p>
          </div>

          {/* Role */}
          <SelectField
            label="Select Role"
            name="role"
            icon={FaUserTag}
            register={register}
            errors={errors}
            requiredMessage="Role is required"
            options={[{value: "borrower", label: "Borrower"}, {value: "manager", label: "Manager"}]}
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            icon={FaLock}
            register={register}
            errors={errors}
            requiredMessage="Password is required"
            placeholder="Min 6 chars, 1 Uppercase, 1 Lowercase"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3.5 mt-8 
              bg-gradient-to-r from-amber-500 to-orange-600 
              hover:from-amber-600 hover:to-orange-700 
              text-white dark:text-gray-900 font-bold text-lg
              rounded-xl shadow-lg shadow-amber-500/30 
              transition-all duration-300 ease-in-out
              flex items-center justify-center
            "
          >
            {loading ? <TbFidgetSpinner className="animate-spin h-6 w-6" /> : "Sign Up"}
          </button>
        </form>

        {/* Social Signup */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300 dark:border-neutral-700" />
          <span className="mx-3 text-gray-400 dark:text-gray-500 text-sm font-medium">
            OR
          </span>
          <hr className="flex-1 border-gray-300 dark:border-neutral-700" />
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`
            w-full flex items-center justify-center space-x-3 py-3 rounded-xl 
            font-medium border border-gray-300 dark:border-neutral-700 
            transition-all duration-200
            ${!loading ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800' : 'cursor-not-allowed bg-gray-100 dark:bg-neutral-700/50'}
            text-gray-700 dark:text-gray-300
          `}
        >
          <FcGoogle size={24} />
          <span>Continue with Google (as Borrower)</span>
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-amber-600 dark:text-amber-400 hover:underline font-semibold transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;