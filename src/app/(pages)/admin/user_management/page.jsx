"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const GET_USERS = "http://localhost:5001/api/authentication/get-users";
  const DELETE_USER = (id) =>
    `http://localhost:5001/api/authentication/delete/${id}`;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(GET_USERS);
      const filteredUsers =
        response.data?.filter((user) => user.accountType === "user") || [];
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(DELETE_USER(id));
      setUsers(users.filter((user) => user._id !== id));
      setDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {users.length > 0 ? (
        <div className="border p-4 rounded-md bg-white">
          <h2 className="text-2xl font-bold mb-2">User List</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className=" p-4">Users</TableHead>
                <TableHead className="p-4">Email</TableHead>
                <TableHead className="p-4">Position</TableHead>
                <TableHead className="p-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="p-4 font-medium">{user.name}</TableCell>
                  <TableCell className="p-4">{user.email}</TableCell>
                  <TableCell className="p-4">{user.position}</TableCell>
                  <TableCell className="p-4 text-center space-x-2">
                    <button  onClick={() => {
                        setEditModal(true);
                        setSelected(user._id);
                      }} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    {editModal && selected && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg">
                          <p className="text-lg">
                            Are you sure you want to edit this user?
                          </p>
                          <div className="flex justify-end space-x-4 mt-4">
                            <button
                              onClick={() => setEditModal(false)}
                              className="bg-gray-300 px-4 py-2 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(selected)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setSelected(user._id);
                      }}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                    {deleteModal && selected && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg">
                          <p className="text-lg">
                            Are you sure you want to delete this user?
                          </p>
                          <div className="flex justify-end space-x-4 mt-4">
                            <button
                              onClick={() => setDeleteModal(false)}
                              className="bg-gray-300 px-4 py-2 rounded"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDelete(selected)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
}
