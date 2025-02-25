"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
  const LOGIN = "http://localhost:5001/api/user/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    try {
      const response = await fetch(LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Server response:", data); 
  
      if (response.ok && data.status === "ok") {
        setMessage("Login successful!");
        localStorage.setItem("token", data.data.token); 
        router.push("/users/dashboard");
      } else {
        setMessage(data.message || "Login failed. Please check your credentials and try again.");
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
