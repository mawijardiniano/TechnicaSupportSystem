"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const GET_LOGGED = "http://localhost:5001/api/authentication/me";
  const GET_REPORT = (id) => `http://localhost:5001/api/report/get-report/${id}`;

  useEffect(() => {
    const fetchUserAndReports = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const userResponse = await axios.get(GET_LOGGED, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const user = userResponse.data;
        console.log("user", user)
        setUserName(user.name || "DOST Staff");
        setUserId(user.userId);

        console.log("Fetched user ID:", user._id);

        if (!user.userId) {
          setError("User ID not found.");
          setLoading(false);
          return;
        }

        const reportResponse = await axios.get(GET_REPORT(user.userId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReports(reportResponse.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndReports();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between pb-6">
        <p className="text-4xl font-bold">Welcome, {userName}</p>
        <button className="bg-black py-2 px-4 rounded-md text-white">
          Submit Report
        </button>
      </div>

      <div className="border rounded-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold pb-4">Your Recent Reports</h1>
          {loading ? (
            <p>Loading reports...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : reports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report._id}>
                    <TableCell className="font-medium">{report._id}</TableCell>
                    <TableCell>{report.status || "Pending"}</TableCell>
                    <TableCell>{report.reportDescription || "No Description"}</TableCell>
                    <TableCell className="text-right">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
