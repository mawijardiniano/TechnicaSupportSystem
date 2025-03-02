'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function History() {
  const GET_REPORT = (id) => `http://localhost:5001/api/report/get-report/${id}`;

  const [reports, setReports] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const getHistory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }

      const response = await axios.get(GET_REPORT(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Error fetching reports.");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found.");
          return;
        }

        const userResponse = await axios.get("http://localhost:5001/api/authentication/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const user = userResponse.data;
        setUserId(user.userId);

        if (user.userId) {
          getHistory(user.userId);
        } else {
          setError("User ID not found.");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Error fetching user.");
      }
    };

    fetchUser();
  }, []);

  const statusColors = {
    pending: "bg-yellow-500",
    resolved: "bg-green-500",
    rejected: "bg-red-500",
  };

  return (
    <div className="flex justify-center px-4 md:px-8">
      <div className="max-w-7xl w-full">
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Report History</h1>

        {reports.length === 0 && !error ? (
          <p className="text-gray-500 text-center">No reports found.</p>
        ) : (
          <div className="space-y-4 w-full mx-auto">
            {reports.map((report, index) => (
              <div 
                key={index} 
                className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
                  <h2 className="text-md font-semibold text-gray-800 truncate col-span-2">{report.problem}</h2>
                  <span
                    className={`px-3 py-1 text-sm font-medium text-white rounded-full ${statusColors[report.status] || "bg-gray-500"}`}
                  >
                    {report.status}
                  </span>
                  <p className="text-gray-700"><strong>Severity:</strong> {report.severityLevel}</p>
                  <p className="text-gray-700"><strong>Affected:</strong> {report.affected}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {report.location}</p>
                  <p className="text-gray-700"><strong>Contact:</strong> {report.contactInformation}</p>
                  <p className="text-gray-700"><strong>Created:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
