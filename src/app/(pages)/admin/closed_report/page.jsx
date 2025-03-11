"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Report() {
  const [report, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedStatuses, setUpdatedStatuses] = useState({});
  const [viewModal, setViewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    severity: "",
    problem: "",
    search: "",
  });

  const GET = "http://localhost:5001/api/report/get-report";
  const UPDATE = "http://localhost:5001/api/report/update-status";

  const getReports = async () => {
    try {
      const response = await axios.get(GET);
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  const updateStatus = async (id, index) => {
    const selectedStatus = updatedStatuses[index];

    if (!selectedStatus) {
      alert("Please select a status before saving.");
      return;
    }

    try {
      await axios.put(
        `${UPDATE}/${id}`,
        { status: selectedStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      setEditingIndex(null);
      setUpdatedStatuses((prev) => ({ ...prev, [index]: "" }));
      getReports();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
  let filtered = report.filter((r) => r.status == "Closed"); 

  if (filters.status) {
    filtered = filtered.filter((r) => r.status === filters.status);
  }

  if (filters.severity) {
    filtered = filtered.filter((r) => r.severityLevel === filters.severity);
  }

  if (filters.problem) {
    filtered = filtered.filter((r) => r.problem === filters.problem);
  }

  if (filters.search) {
    filtered = filtered.filter((r) =>
      r.problem.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  setFilteredReports(filtered);
}, [filters, report]);


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold pb-4">Reports</h1>
      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h1 className="text-2xl font-bold pb-2">Filter Reports</h1>
          <div className="flex justify-between">
            <input
              className="border border-gray-200 w-96 py-1 px-2 rounded-md"
              placeholder="Search report"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
            <select
              className="border p-2 rounded w-40"
              onChange={(e) => handleFilterChange("status", e.target.value)}
              value={filters.status}
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="On Hold">On Hold</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              className="border p-2 rounded w-40"
              onChange={(e) => handleFilterChange("severity", e.target.value)}
              value={filters.severity}
            >
              <option value="">Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <select
              className="border p-2 rounded w-40"
              onChange={(e) => handleFilterChange("problem", e.target.value)}
              value={filters.problem}
            >
              <option value="">Problem</option>
              <option value="Network Issue">Network Issue</option>
              <option value="System Crash">System Crash</option>
              <option value="Data Loss">Data Loss</option>
              <option value="Security Breach">Security Breach</option>
            </select>
          </div>
        </div>

        {filteredReports.length > 0 ? (
          <div className="bg-white rounded-md border p-4 max-h-[500px] overflow-y-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead
                    colSpan={10}
                    className="text-2xl font-bold py-4 text-black"
                  >
                    Report List
                  </TableHead>
                </TableRow>
                <TableRow className="bg-gray-200">
                  <TableHead className="w-[50px] p-4">ID</TableHead>
                  <TableHead className="p-4">Name</TableHead>
                  <TableHead className="p-4">Problem</TableHead>
                  <TableHead className="p-4">Description</TableHead>
                  <TableHead className="p-4">Severity</TableHead>
                  <TableHead className="p-4">Affected</TableHead>
                  <TableHead className="w-40">Status</TableHead>
                  <TableHead className="p-4 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((reports, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="p-4 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="p-4">{reports.user?.name}</TableCell>
                    <TableCell className="p-4">{reports.problem}</TableCell>
                    <TableCell className="p-4">
                      {reports.problemDescription}
                    </TableCell>
                    <TableCell className="p-4">
                      {reports.severityLevel}
                    </TableCell>
                    <TableCell className="p-4">{reports.affected}</TableCell>
                    <TableCell className="w-40">
                      {editingIndex === index ? (
                        <select
                          className="border p-2 rounded"
                          value={updatedStatuses[index] || reports.status}
                          onChange={(e) =>
                            setUpdatedStatuses((prev) => ({
                              ...prev,
                              [index]: e.target.value,
                            }))
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Closed">Closed</option>
                        </select>
                      ) : (
                        reports.status || "Pending"
                      )}
                    </TableCell>
                    <TableCell className="p-4 text-center flex flex-row justify-center gap-2 items-center">
                      <button
                        className="bg-white border rounded w-36 py-2"
                        onClick={() => {
                          setViewModal(true);
                          setSelectedReport(reports);
                        }}
                      >
                        View Report
                      </button>
                      {editingIndex === index ? (
                        <button
                          onClick={() => updateStatus(reports._id, index)}
                          className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-700 w-36"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingIndex(index)}
                          className="bg-black text-white py-2 px-4 w-36 rounded-sm hover:bg-gray-800"
                        >
                          Update Status
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {viewModal && selectedReport && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                      <h2 className="text-lg font-bold mb-4">Report Details</h2>
                      {selectedReport ? (
                        <>
                          <p>
                            <strong>Report ID:</strong>{" "}
                            {selectedReport?._id || "N/A"}
                          </p>
                          <p>
                            <strong>Name:</strong>{" "}
                            {selectedReport?.user?.name || "Unknown"}
                          </p>
                          <p>
                            <strong>Problem Type:</strong>{" "}
                            {selectedReport?.problem || "N/A"}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {selectedReport?.problemDescription || "N/A"}
                          </p>
                          <p>
                            <strong>Severity Level:</strong>{" "}
                            {selectedReport?.severityLevel || "N/A"}
                          </p>
                          <p>
                            <strong>Affected:</strong>{" "}
                            {selectedReport?.affected || "N/A"}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {selectedReport?.location || "N/A"}
                          </p>
                          <p>
                            <strong>Contact Information:</strong>{" "}
                            {selectedReport?.contactInformation || "N/A"}
                          </p>
                          <p>
                            <strong>Attachment:</strong>{" "}
                            {selectedReport?.attachment || "No attachment"}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {selectedReport?.status || "Pending"}
                          </p>
                        </>
                      ) : (
                        <p>No Data Available</p>
                      )}
                      <button
                        onClick={() => setViewModal(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-sm mt-4 hover:bg-red-700 w-full"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No reports found</p>
        )}
      </div>
    </div>
  );
}
