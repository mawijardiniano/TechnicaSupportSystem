"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Clock,
  Loader,
  PauseCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function Admin() {
  const GET = "http://localhost:5001/api/report/get-report";

  const [report, setReports] = useState([]);
  const [pendingReports, setPendingReports] = useState(0);
  const [inProgressReports, setInProgressReports] = useState(0);
  const [onHoldReports, setOnHoldReports] = useState(0);
  const [closedReports, setClosedReports] = useState(0);
  const [criticalReports, setCriticalReports] = useState(0);

  const getReports = async () => {
    try {
      const response = await axios.get(GET);
      const reports = response.data;
      setReports(reports);
      setPendingReports(
        reports.filter((report) => report.status === "pending").length
      );
      setInProgressReports(
        reports.filter((report) => report.status === "in-progress").length
      );
      setOnHoldReports(
        reports.filter((report) => report.status === "on-hold").length
      );
      setClosedReports(
        reports.filter((report) => report.status === "closed").length
      );
      setCriticalReports(
        reports.filter((report) => report.status === "critical").length
      );
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="px-8">
      <h1 className="text-4xl pb-4 font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full h-36 border p-6 rounded-sm flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <p>Total Reports</p>
            <BarChart />
          </div>
          <p className="text-3xl font-bold">{report.length}</p>
          <p className="text-gray-400 font-medium text-sm">
            +20.1% from last month
          </p>
        </div>
        <div className="w-full h-36 border p-6 rounded-sm flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <p>Pending Reports</p>
            <Clock />
          </div>
          <p className="text-3xl font-bold">{pendingReports}</p>
          <p className="text-gray-400 font-medium text-sm">
            +15.3% from last month
          </p>
        </div>
        <div className="w-full h-36 border p-6 rounded-sm flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <p>In Progress Reports</p>
            <Loader />
          </div>
          <p className="text-3xl font-bold">{inProgressReports}</p>
          <p className="text-gray-400 font-medium text-sm">
            +10.2% from last month
          </p>
        </div>
        <div className="w-full h-36 border p-6 rounded-sm flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <p>On Hold Reports</p>
            <PauseCircle />
          </div>
          <p className="text-3xl font-bold">{onHoldReports}</p>
          <p className="text-gray-400 font-medium text-sm">
            +5.4% from last month
          </p>
        </div>
        <div className="w-full h-36 border p-6 rounded-sm flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <p>Closed Reports</p>
            <CheckCircle />
          </div>
          <p className="text-3xl font-bold">{closedReports}</p>
          <p className="text-gray-400 font-medium text-sm">
            +8.7% from last month
          </p>
        </div>
        <div className="w-full h-36 border p-6 rounded-sm flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <p>Critical Reports</p>
            <AlertTriangle />
          </div>
          <p className="text-3xl font-bold">{criticalReports}</p>
          <p className="text-gray-400 font-medium text-sm">
            +12.9% from last month
          </p>
        </div>
      </div>
    </div>
  );
}
