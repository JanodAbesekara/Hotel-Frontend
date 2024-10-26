"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Notification() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/Notifacition/getallnotifacition"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          (error as any).response?.data || (error as any).message
        );
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/Notifacition/Deletenotifacition?id=${id}`
      );
      console.log(response.data);
      window.alert("Notification deleted successfully");
      setData(data.filter((item) => item.notification.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div>
      <h2>Notification</h2>
      <table className="mx-12 p-20">
        <thead>
          <tr>
            <th>ID</th>
            <th>Notification Date</th>
            <th>Message</th>
            <th>Customer ID</th>
            <th>Room Details</th>
            <th>Hotel Details</th>
            <th>Delete</th>
            <th>Viewed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.notification.id}>
              <td>{item.notification.id}</td>
              <td>
                {item.notification.createdAt
                  ? new Date(item.notification.createdAt)
                      .toISOString()
                      .split("T")[0]
                  : "N/A"}
              </td>
              <td>{item.notification.message}</td>
              <td>{item.customerDetails?.customerId || "N/A"}</td>
              <td>
                {item.roomDetails
                  ? `${item.roomDetails.roomNumber}, ${item.roomDetails.type}`
                  : "No Room Data"}
              </td>
              <td>
                {item.hotelDetails
                  ? `${item.hotelDetails.name}, ${item.hotelDetails.location}`
                  : "No Hotel Data"}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item.notification.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  // onClick={() => handleViewed(item.notification.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Viewed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Notification;
