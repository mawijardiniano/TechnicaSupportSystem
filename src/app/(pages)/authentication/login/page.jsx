"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const LOGIN = "http://localhost:5001/api/authentication/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    try {
      const response = await axios.post(LOGIN, { email, password });
  
      console.log("Server response:", response.data);
  
      const { status, message, data } = response.data;
  
      if (status === "ok" && data?.accountType) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        
        switch (data.accountType) {
          case "user":
            router.push("/users/dashboard");
            break;
          case "admin":
            router.push("/admin/dashboard");
            break;
          default:
            setMessage("Unknown account type. Please contact support.");
            break;
        }
      } else {
        setMessage(message || "Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border rounded-md shadow-lg p-6 bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border w-full h-10 p-2 rounded-md"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border w-full h-10 p-2 rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <div className="text-red-600">{message}</div>}
          <div className="flex justify-between items-center">
            <a href="/register" className="text-blue-600">
              Create an Account
            </a>
            <button
              type="submit"
              className="bg-black py-2 px-4 text-white rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
