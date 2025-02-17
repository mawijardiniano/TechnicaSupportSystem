"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Report() {
  const [report, setReports] = useState([]);
  const GET = "http://localhost:5001/api/report/get-report";

  const getReports = async () => {
    try {
      const response = await axios.get(GET);
      setReports(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getReports();
  }, []);
  return (
    <div>
      {report.length > 0 &&
        report.map((reports, index) => (
          <div key={index}>
            <p>{reports.problem}</p>
            <p>{reports.problemDescription}</p>
          </div>
        ))}
    </div>
  );
}
