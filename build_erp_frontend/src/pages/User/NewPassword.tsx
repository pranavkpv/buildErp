import { updatePasswordAPI } from "../../api/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewPassword() {
  const otpEmail = localStorage.getItem('otpEmail');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hide, setHide] = useState(false);
  const [chide, setChide] = useState(false);

  const passRef = useRef<HTMLParagraphElement>(null);
  const cpassRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*^])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!passCheck.test(password)) {
      if (passRef.current) {
        passRef.current.innerText = 'Password must include uppercase, lowercase, number, special character, and be 8+ characters long.';
      }
      hasError = true;
    } else {
      if (passRef.current) {
        passRef.current.innerText = '';
      }
    }

    if (password !== confirmPassword) {
      if (cpassRef.current) {
        cpassRef.current.innerText = 'Passwords do not match.';
      }
      hasError = true;
    } else {
      if (cpassRef.current) {
        cpassRef.current.innerText = '';
      }
    }
    if (!otpEmail) {
      toast.error("User does not exist");
      return;
    }

    if (hasError) {
      return;
    }

    const response = await updatePasswordAPI({ email: otpEmail, password });
    if (response.success) {
      toast.success(response.message);
      localStorage.removeItem("otpEmail");
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6">
      <form
        onSubmit={changePassword}
        className="relative bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-sm border border-gray-200 space-y-4"
      >
        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-10 rounded-lg blur-md"></div>

        <h1 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Reset Password
        </h1>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            New Password
          </label>
          <div className="relative">
            <input
              type={hide ? "text" : "password"}
              id="password"
              placeholder="Enter your new password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full pl-4 pr-12 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-sm"
              aria-label="New password"
            />
            <button
              type="button"
              onClick={() => setHide(!hide)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={hide ? "Hide password" : "Show password"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                {hide ? (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.39 4.172 5.325 7.178 9.963 7.178 4.638 0 8.573-3.007 9.963-7.178a10.477 10.477 0 0 0-2.046-3.777m-6.917.557a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.095-2.223L3.98 8.223"
                  />
                )}
              </svg>
            </button>
          </div>
          <p ref={passRef} className="text-red-500 text-xs min-h-[1rem]"></p>
        </div>

        <div className="space-y-1">
          <label htmlFor="confirmpassword" className="block text-sm font-semibold text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={chide ? "text" : "password"}
              id="confirmpassword"
              placeholder="Confirm your new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="w-full pl-4 pr-12 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-sm"
              aria-label="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setChide(!chide)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={chide ? "Hide confirm password" : "Show confirm password"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                {chide ? (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.39 4.172 5.325 7.178 9.963 7.178 4.638 0 8.573-3.007 9.963-7.178a10.477 10.477 0 0 0-2.046-3.777m-6.917.557a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6.095-2.223L3.98 8.223"
                  />
                )}
              </svg>
            </button>
          </div>
          <p ref={cpassRef} className="text-red-500 text-xs min-h-[1rem]"></p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Submit new password"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPassword;