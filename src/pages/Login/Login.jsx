import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-3">
          Log In
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-gray-700" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 ${
                formErrors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-yellow-400'
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 ${
                formErrors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-yellow-400'
              }`}
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-orange-500 shadow-lg transition-all duration-300"
          >
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : 'Log In'}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-right mt-3">
          <button
            type="button"
            className="text-xs text-yellow-500 hover:underline cursor-pointer"
            onClick={() => toast('Forgot password functionality not implemented yet')}
          >
            Forgot password?
          </button>
        </div>

        {/* Or continue with */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google SignIn */}
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200"
        >
          <FcGoogle size={28} />
          <span>Continue with Google</span>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-yellow-500 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
