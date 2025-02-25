"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) return; // If no token, exit

        const response = await fetch("http://localhost:5001/api/user/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserName(data.name); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <p className="text-4xl font-bold">Welcome, {userName || "DOST Staff"}</p>
        <button className="bg-black py-2 px-4 rounded-md text-white">Submit Report</button>
      </div>
      <div className="border">
        <div className="p-4">
          <h1>Your Reports</h1>
        </div>
      </div>
    </div>
  );
}
