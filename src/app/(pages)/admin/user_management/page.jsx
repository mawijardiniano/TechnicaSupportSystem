'use client'
import axios from "axios"
import { useState, useEffect } from "react"

export default function Users() {
    const GET = "http://localhost:5001/api/user/get-users"
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const response = await axios.get(GET)
            setUsers(response.data)
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="p-6">
            {users.length > 0 && (
                <table className="border border-gray-300 w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2 text-center">Users</th>
                            <th className="border border-gray-400 px-4 py-2 text-center">Position</th>
                            <th className="border border-gray-400 px-4 py-2 text-center w-60">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-400 flex items-center justify-center space-x-4 px-4 py-2 w-60">
                                    <button className="bg-green-500 py-1 px-4 rounded-md hover:bg-green-400 text-white">Edit</button>
                                    <button className="bg-red-500 py-1 px-4 rounded-md hover:bg-red-700 text-white">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
