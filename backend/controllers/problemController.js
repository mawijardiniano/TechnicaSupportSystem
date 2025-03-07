const Problem = require("../models/problemModel");

const reportProblem = async (req, res) => {
  try {
    const {
      user,
      problem,
      problemDescription,
      severityLevel,
      affected,
      location,
      contactInformation,
      attachments,
    } = req.body;

    if (
      !problem ||
      !problemDescription ||
      !severityLevel ||
      !affected ||
      !location ||
      !contactInformation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const problemReport = new Problem({
      user,
      problem,
      problemDescription,
      severityLevel,
      affected,
      location,
      contactInformation,
      attachments,
      status: "Pending",
    });

    await problemReport.save();
    res.status(201).json({ message: "Problem reported successfully" });
  } catch (error) {
    console.error("Error reporting problem:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Problem.find().populate("user", "name email");
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getReportByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const reports = await Problem.find({ user: id });
    if (!reports) {
      return res.status(404).json({ message: "No reports found for this user" });
    }
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports by user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: "Report ID and status are required" });
    }

    const updatedReport = await Problem.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({ message: "Status updated successfully", updatedReport });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { reportProblem, getReports, updateStatus, getReportByUser };