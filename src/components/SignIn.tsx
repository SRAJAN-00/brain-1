import axios from "axios";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "./config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  }

  return (
    <div className="bg-gray-200 flex justify-center min-h-screen items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md mx-auto p-6 border">
        <h2 className="text-center text-3xl md:text-4xl text-purple-700 font-bold mt-4 mb-8">
          Login
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter the Username:
            </label>
            <Input reference={usernameRef} placeholder="username" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter the Password:
            </label>
            <Input reference={passwordRef} placeholder="password" />
          </div>
          
          <div className="pt-4">
            <Button
              onClick={signin}
              variant="primary"
              text="Login"
              fullWidth={true}
            />
          </div>
          
          <div className="text-center pt-2">
            <a 
              href="/signup" 
              className="text-purple-500 hover:text-purple-600 transition-colors underline"
            >
              Create a new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
