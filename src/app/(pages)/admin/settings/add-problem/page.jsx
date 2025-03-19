"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AddProblem() {
  const [problemList, setProblemList] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [newProblem, setNewProblem] = useState("");

  const GET_PROBLEM = "http://localhost:5001/api/problem/get-problem";
  const ADD_PROBLEM = "http://localhost:5001/api/problem/add-problem";
  const EDIT_PROBLEM = (id) =>
    `http://localhost:5001/api/problem/edit-problem/${id}`;
  const DELETE_PROBLEM = (id) =>
    `http://localhost:5001/api/problem/delete-problem/${id}`;

  const getProblem = async () => {
    try {
      const res = await axios.get(GET_PROBLEM);
      setProblemList(res.data);
    } catch (error) {
      console.error("Error fetching problem list:", error);
    }
  };

  useEffect(() => {
    getProblem();
  }, []);

  const handleEditClick = (problem) => {
    setSelectedProblem(problem);
    setNewProblem(problem.problem);
    setEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(EDIT_PROBLEM(selectedProblem._id), {
        problem: newProblem,
      });
      setEditModal(false);
      getProblem();
    } catch (error) {
      console.error("Error editing problem:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(DELETE_PROBLEM(id));
      getProblem();
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ADD_PROBLEM, { problem: newProblem });
      setAddModal(false);
      getProblem();
    } catch (error) {
      console.error("Error adding problem:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Problem List</h2>
        <button
          onClick={() => setAddModal(true)}
          className="bg-black py-1 px-4 rounded-md text-white font-medium"
        >
          Add Problem
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Problem</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problemList.map((problem, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{problem.problem}</TableCell>
              <TableCell className="font-medium space-x-4">
                <button
                  onClick={() => handleEditClick(problem)}
                  className="bg-green-500 py-1 px-4 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(problem._id)}
                  className="bg-red-500 py-1 px-4 text-white rounded-md"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editModal && selectedProblem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Problem</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Problem</label>
                <input
                  type="text"
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Problem</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Problem</label>
                <input
                  type="text"
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setAddModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
