const ProblemList = require("../models/problemList");


const AddProblem = async (req, res) => {
  try {
    const { problem } = req.body;

    if (!problem) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const addProblem = new ProblemList({ problem });

    await addProblem.save();
    res.status(201).json({ message: "Problem added successfully" });
  } catch (error) {
    console.error("Error adding problem:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getProblems = async (req, res) => {
  try {
    const problems = await ProblemList.find();
    res.status(200).json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const editProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { problem } = req.body;

    if (!problem) {
      return res.status(400).json({ message: "Problem field is required" });
    }

    const updatedProblem = await ProblemList.findByIdAndUpdate(id, { problem }, { new: true });

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({ message: "Problem updated successfully", updatedProblem });
  } catch (error) {
    console.error("Error updating problem:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProblem = await ProblemList.findByIdAndDelete(id);

    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    console.error("Error deleting problem:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { AddProblem, getProblems, editProblem, deleteProblem };
