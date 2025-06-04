import { useRef } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
  }
  return (
    <div className="bg-gray-200 flex justify-center h-screen items-center">
      <div className="bg-white shadow-sm rounded-lg   h-[600px] w-[600px] p-1 border gap-2 p-6 mt-4">
        <h2 className="flex justify-center text-4xl font-bold   mt-8">
          Signup
        </h2>
        <div className="mt-14">
          <div className="pb-2 pl-1">
            <label>Username</label>
          </div>
          <Input reference={usernameRef} placeholder="username" />
        </div>
        <div className="pb-2 pl-1">
          <label>password</label>
        </div>
        <Input reference={passwordRef} placeholder="password" />
        <div className="mt-8">
          <Button
            onClick={signup}
            variant="primary"
            text="Signup"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
