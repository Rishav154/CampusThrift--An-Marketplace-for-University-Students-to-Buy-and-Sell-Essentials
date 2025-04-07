import { Link } from "react-router-dom"
import { Mail } from "lucide-react"

function VerifyEmail() {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <Mail size={32} className="text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>

        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify
          your account.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <p className="text-yellow-800 text-sm">If you don't see the email, please check your spam folder.</p>
        </div>

        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 text-center"
          >
            Go to Login
          </Link>

          <Link
            to="/"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail

