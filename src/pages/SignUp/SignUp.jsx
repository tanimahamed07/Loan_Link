import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Full form data:", data); // debug: see all fields including role
    const { name, image, email, password, role } = data;

    if (!role) {
      toast.error("Please select a role");
      return;
    }

    const imageFile = image[0];

    // Password validation
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    if (!uppercasePattern.test(password)) {
      toast.error("Password must have at least one uppercase letter");
      return;
    }
    if (!lowercasePattern.test(password)) {
      toast.error("Password must have at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const imageURL = await imageUpload(imageFile);

      // 1. Create user
      const result = await createUser(email, password);

      // 2. Save/update user in database
      await saveOrUpdateUser({ name, email, image: imageURL, role });
      console.log(role);
      // 3. Update Firebase profile
      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success("Signup Successful");
      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: "borrower",
      });
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="bg-base-100 dark:bg-base-300 min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300">
      <div
        className="w-full max-w-md p-8 lg:p-10 
          bg-white dark:bg-neutral-900/90 
          rounded-2xl shadow-2xl dark:shadow-[0_0_20px_rgba(251,191,36,0.1)] 
          border border-gray-200 dark:border-amber-400/30 relative z-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-3">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join LoanLink and get instant microloans
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-gray-500"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-12 py-3 border rounded-xl 
                  bg-gray-50 dark:bg-neutral-800 dark:text-white 
                  focus:outline-none focus:ring-2 transition-colors duration-200"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:border-0 file:bg-yellow-100 file:text-yellow-700 file:rounded-lg hover:file:bg-yellow-200"
              {...register("image")}
            />
            <p className="text-gray-400 text-xs mt-1">
              PNG, JPG, JPEG (max 2MB)
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-12 py-3 border rounded-xl 
                  bg-gray-50 dark:bg-neutral-800 dark:text-white 
                  focus:outline-none focus:ring-2 transition-colors duration-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Role
            </label>
            <select
              id="role"
              defaultValue=""
              className="w-full px-12 py-3 border rounded-xl 
                  bg-gray-50 dark:bg-neutral-800 dark:text-white 
                  focus:outline-none focus:ring-2 transition-colors duration-200"
              {...register("role", { required: "Role is required" })}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full px-12 py-3 border rounded-xl 
                  bg-gray-50 dark:bg-neutral-800 dark:text-white 
                  focus:outline-none focus:ring-2 transition-colors duration-200"
              {...register("password", { required: "Password is required" })}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-orange-500 shadow-lg transition-all duration-300"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Social Signup */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200"
        >
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
