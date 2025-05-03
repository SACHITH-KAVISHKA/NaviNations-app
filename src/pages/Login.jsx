import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (success) {
      setLoginError("");
      navigate("/");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-blue-50 rounded-2xl shadow-md overflow-hidden border border-blue-100">

        <div className="p-8">
          {/* Brand Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-2">
              <span className="font-bold text-blue-500 font-[poppins]">
                NaviNations
              </span>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
          </div>

          {/* Login Form */}
          {loginError && (
            <p className="text-red-500 mb-4 text-center text-sm">
              {loginError}
            </p>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                User Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 font-[poppins]"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 font-[poppins]"
                  placeholder="Enter Password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              onClick={(e) => handleLoginSubmit(e)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign in
            </button>
          </div>

          {/* Alternative Sign In */}
          <div className="mt-6 flex justify-center space-x-4">
            {/* Google */}
            <button
              onClick={() => console.log("Google sign-in clicked")}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Sign in with Google"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
              </svg>
            </button>

            {/* Facebook */}
            <button
              onClick={() => console.log("Facebook sign-in clicked")}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Sign in with Facebook"
            >
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.88v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.26V12h2.3l-.37 3H14v7A10 10 0 0 0 22 12z" />
              </svg>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => console.log("LinkedIn sign-in clicked")}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Sign in with LinkedIn"
            >
              <svg
                className="w-6 h-6 text-blue-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.45 20.45h-3.56v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.96v5.7h-3.56V9h3.42v1.56h.05c.48-.91 1.64-1.87 3.37-1.87 3.61 0 4.28 2.38 4.28 5.48v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.56 20.45h3.56V9H3.56v11.45z" />
              </svg>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
