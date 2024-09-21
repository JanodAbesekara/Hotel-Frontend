"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Room {
  id: number;
  roomNumber: string;
  type: string;
  price: number;
  hotelId: number;
  availabilityStatus: boolean;
  hotelname: string;
}

function DisplayAllrooms() {
  const [roomData, setRoomData] = useState<Room[]>([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/hotel/getRoomdetails"
        );
        console.log(response.data);
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching hotel data", error);
        window.alert("Error fetching data: " + error);
      }
    };

    fetchHotelData();
  }, []);

  const DeleteRoomdetails = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/hotel/deleteRoom`, {
        params: { id: id },
      });
      window.alert("Room details deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting room details:", error);
    }
  };

  return (
    <div>
      <h1 className="my-10 text-center">Display All added Rooms</h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Room Name
            </th>
            <th scope="col" className="px-6 py-3">
              Room Type
            </th>
            <th scope="col" className="px-6 py-3">
              Room Price
            </th>
            <th scope="col" className="px-6 py-3">
              Room Number
            </th>
            <th scope="col" className="px-6 py-3 to-cyan-900">
              Availability Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {roomData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 ">{item.hotelname}</td>
              <td className="px-6 py-4">{item.roomNumber}</td>
              <td className="px-6 py-4">{item.type}</td>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">
                {item.availabilityStatus ? "Available" : "Not Available"}
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full my-6"
                  onClick={() => DeleteRoomdetails(item.id)}
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

export default DisplayAllrooms;
