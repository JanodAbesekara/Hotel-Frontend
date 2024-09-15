"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define Admin interface for type safety
interface Admin {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  PhoneNumber?: string;  // Optional field
  profileImage?: string; // Optional field
}

function Manageadmin() {
  const [data, setData] = useState<Admin[]>([]); // State with Admin type array

  // Fetch admin data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Admin[]>(`http://localhost:8000/users/AdminData`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle admin deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/users/deleteAdmin/${id}`);
      // Update the UI after deleting
      setData((prevData) => prevData.filter((admin) => admin.id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div>


        <h2 className="text-center">Creat Admin</h2>
        
      <h2 className="text-center py-10">Admin Details</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-4">
          <tr>
            <th scope="col" className="px-6 py-3">Profile</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Phone Number</th>
            <th scope="col" className="px-6 py-3">Remove</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((admin) => (
            <tr key={admin.id}>
              <td>
                <img
                  src={admin.profileImage || "/default-profile.png"}
                  alt={`${admin.firstname}'s profile`}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td>{admin.firstname} {admin.lastname}</td>
              <td>{admin.email}</td>
              <td>{admin.PhoneNumber || "N/A"}</td>
              <td>
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Manageadmin;
