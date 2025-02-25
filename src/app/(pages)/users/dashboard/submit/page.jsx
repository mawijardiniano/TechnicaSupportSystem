"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    description: "",
    severity: "low",
    system: "",
    location: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.success) {
      setMessage("Your request has been submitted successfully!");
      setFormData({
        description: "",
        severity: "low",
        system: "",
        location: "",
        contact: "",
      });
    } else {
      setMessage("Failed to submit your request. Please try again.");
    }
  };

  return (
    <div className="">
      <Card className="w-full max-w-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6">
            Submit a Technical Problem
          </h2>
          {message && <div className="mb-4 text-green-600">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Problem Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="severity" className="block text-sm font-medium">
                Severity
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Moderate</option>
                <option value="high">Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor="system" className="block text-sm font-medium">
                Affected System
              </label>
              <input
                id="system"
                name="system"
                type="text"
                value={formData.system}
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
              <label htmlFor="contact" className="block text-sm font-medium">
                Contact Information
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md"
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
