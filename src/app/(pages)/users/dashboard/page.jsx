"use client";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Page() {
  const [userName, setUserName] = useState("");
  const GET_LOGGED = "http://localhost:5001/api/authentication/me";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(GET_LOGGED, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserName(response.data.name || "DOST Staff");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <p className="text-4xl font-bold">Welcome, {userName}</p>
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
