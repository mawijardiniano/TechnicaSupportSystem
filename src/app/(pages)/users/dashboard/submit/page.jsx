"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const initialFormData = {
    user: "",
    problem: "",
    problemDescription: "",
    severityLevel: "",
    affected: "",
    location: "",
    contactInformation: "",
    attachments: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setFormData((prev) => ({ ...prev, user: storedUserId }));
    }
  }, []);

  const SUBMIT_REPORT = "http://localhost:5001/api/report/send-report";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userId) {
      setMessage("You must be logged in to submit a report.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to submit a report.");
        return;
      }

      const dataToSend = { ...formData };
      if (!dataToSend.attachments) {
        delete dataToSend.attachments;
      }

      await axios.post(SUBMIT_REPORT, dataToSend, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Your request has been submitted successfully!");
      setFormData((prev) => ({ ...initialFormData, user: userId }));
    } catch (error) {
      console.error("Error submitting report:", error);
      setMessage(error?.response?.data?.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6 text-center">Submit a Technical Problem</h2>
          {message && <div className="mb-4 text-green-600 text-center">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="problem" className="block text-sm font-medium">
                Problem
              </label>
              <select
                id="problem"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a problem</option>
                <option value="software issue">Software Issue</option>
                <option value="hardware malfunction">Hardware Malfunction</option>
                <option value="network connectivity">Network Connectivity</option>
              </select>
            </div>

            <div>
              <label htmlFor="problemDescription" className="block text-sm font-medium">
                Problem Description
              </label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="severityLevel" className="block text-sm font-medium">
                Severity Level
              </label>
              <select
                id="severityLevel"
                name="severityLevel"
                value={formData.severityLevel}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select severity level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label htmlFor="affected" className="block text-sm font-medium">
                Affected System
              </label>
              <input
                id="affected"
                name="affected"
                type="text"
                value={formData.affected}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="contactInformation" className="block text-sm font-medium">
                Contact Information
              </label>
              <input
                id="contactInformation"
                name="contactInformation"
                type="text"
                value={formData.contactInformation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="attachments" className="block text-sm font-medium">
                Attachments (Optional)
              </label>
              <input
                id="attachments"
                name="attachments"
                type="text"
                value={formData.attachments}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
