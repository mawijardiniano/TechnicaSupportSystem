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

  const GET_USERS = "http://localhost:5001/api/user/get-users";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(GET_USERS);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                <TableHead className="p-4">Position</TableHead>
                <TableHead className="p-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="p-4 font-medium">{user.name}</TableCell>
                  <TableCell className="p-4">{user.position}</TableCell>
                  <TableCell className="p-4 text-center space-x-2">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
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
