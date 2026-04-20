import { useRef } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Add Link import

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(
      `[signup] attempt - username=${username} time=${new Date().toISOString()}`
    );
    try {
      const resp = await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });
      console.log(
        `[signup] success - username=${username} status=${resp.status}`
      );
      navigate("/signin");
    } catch (err: unknown) {
      // Don't log passwords. Log a helpful error and server message when available.
      const message = axios.isAxiosError(err)
        ? err.message
        : err instanceof Error
        ? err.message
        : String(err);
      console.error(
        `[signup] error - username=${username} message=${message}`
      );
      if (axios.isAxiosError(err) && err.response?.data) {
        console.error("[signup] server response:", err.response.data);
      }
      // Re-throw or optionally show UI feedback. For now, keep it simple.
    }
  }

  return (
    <div className="bg-gray-200 flex justify-center min-h-screen items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[500px] mx-auto p-6 border">
        <h2 className="text-center text-3xl md:text-4xl text-purple-700 font-bold mt-4 mb-8">
          Create Account
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Username:
            </label>
            <Input reference={usernameRef} placeholder="username" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Password:
            </label>
            <Input reference={passwordRef} placeholder="password" />
          </div>

          <div className="pt-4">
            <Button
              onClick={signup}
              variant="primary"
              text="Sign Up"
              fullWidth={true}
            />
          </div>

          <div className="text-center pt-2">
            <Link
              to="/signin"
              className="text-purple-500 hover:text-purple-600 transition-colors underline"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
