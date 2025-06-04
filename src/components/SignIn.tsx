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
    <div className="bg-gray-200 flex justify-center h-screen items-center">
      <div className="bg-white shadow-sm rounded-lg   h-[500px] w-[500px] p-1 border gap-2 p-6 mt-4">
        <h2 className="flex justify-center text-4xl text-purple-700 font-bold  b mt-8">
          Login
        </h2>
        <div className="mt-14">
          <div className="pb-2 pl-1">
            <label> Enter the Username :</label>
          </div>
          <Input reference={usernameRef} placeholder="username" />
        </div>
        <div className="pb-2 pl-1">
          <label> Enter the password :</label>
        </div>
        <Input reference={passwordRef} placeholder="password" />
        <div className="mt-8">
          <Button
            onClick={signin}
            variant="primary"
            text="login"
            fullWidth={true}
          />
         
        </div>
         <div className=" flex  justify-center text-purple-500 item-center pt-2 hover:text-purple-600 ">
        <a href="/signup">create a new account</a>
        </div>
      </div>
    </div>
  );
}
