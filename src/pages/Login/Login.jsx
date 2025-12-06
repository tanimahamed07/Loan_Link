import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'
import { FaLock, FaEnvelope } from 'react-icons/fa' // Added icons

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  // Local form errors (for UI consistency, though you can also use react-hook-form)
  const [formErrors, setFormErrors] = useState({})

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value.trim()
    const password = form.password.value.trim()

    let errors = {}
    if (!email) errors.email = 'Email is required'
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      errors.email = 'Invalid email address'

    if (!password) errors.password = 'Password is required'

    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
    }
  }

  // --- Common Input Field Component ---
  const InputField = ({ label, name, type, icon: Icon, error, placeholder }) => (
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
          name={name}
          placeholder={placeholder}
          className={`
            w-full px-12 py-3 border rounded-xl 
            bg-gray-50 dark:bg-neutral-800 dark:text-white 
            focus:outline-none focus:ring-2 transition-colors duration-200
            ${
              error
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 dark:border-neutral-700 focus:ring-amber-400'
            }
          `}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );

  return (
    // Main Container with dark mode background
    <div className="bg-base-100 dark:bg-base-300 min-h-screen flex items-center justify-center py-12 px-4 transition-colors duration-300">
      <div 
        className="
          w-full max-w-md p-8 lg:p-10 
          bg-white dark:bg-neutral-900/90 
          rounded-2xl shadow-2xl dark:shadow-[0_0_20px_rgba(251,191,36,0.1)] 
          border border-gray-200 dark:border-amber-400/30 relative z-10
        "
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Email */}
          <InputField
            label="Email address"
            name="email"
            type="email"
            icon={FaEnvelope}
            error={formErrors.email}
            placeholder="example@email.com"
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            type="password"
            icon={FaLock}
            error={formErrors.password}
            placeholder="Minimum 6 characters"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3.5 mt-2 
              bg-gradient-to-r from-amber-500 to-orange-600 
              hover:from-amber-600 hover:to-orange-700 
              text-white dark:text-gray-900 font-bold text-lg
              rounded-xl shadow-lg shadow-amber-500/30 
              transition-all duration-300 ease-in-out
              flex items-center justify-center
            "
          >
            {loading ? <TbFidgetSpinner className="animate-spin h-6 w-6" /> : 'Log In'}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-right mt-3">
          <button
            type="button"
            className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline cursor-pointer transition-colors"
            onClick={() => toast('Forgot password functionality not implemented yet')}
          >
            Forgot password?
          </button>
        </div>

        {/* Or continue with */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300 dark:border-neutral-700" />
          <span className="mx-3 text-gray-400 dark:text-gray-500 text-sm font-medium">
            OR
          </span>
          <hr className="flex-1 border-gray-300 dark:border-neutral-700" />
        </div>

        {/* Google SignIn */}
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
          <span>Continue with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link 
            to="/signup" 
            className="text-amber-600 dark:text-amber-400 hover:underline font-semibold transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login