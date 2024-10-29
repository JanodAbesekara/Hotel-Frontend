"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

const SOCKET_URL = "http://localhost:8002";

interface NotificationData {
  notification: {
    id: number;
    message: string;
    createdAt: string;
  };
  customerDetails?: {
    customerId: number;
  };
  roomDetails?: {
    roomNumber: string;
    type: string;
    id: number;
  };
  hotelDetails?: {
    name: string;
    location: string;
  };
}

function Notification() {
  const [data, setData] = useState<NotificationData[]>([]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    // Request initial notifications data
    socket.emit("getAllNotifications");

    // Listen for the list of all notifications
    socket.on("allNotifications", (notifications: NotificationData[]) => {
      setData(notifications);
      console.log(notifications);
    });

    // Listen for new notifications added
    socket.on("newNotification", (notification: NotificationData) => {
      setData((prevData) => [...prevData, notification]);
    });

    // Listen for notifications deletion updates
    socket.on("notificationDeleted", (id: number) => {
      setData((prevData) =>
        prevData.filter((item) => item.notification.id !== id)
      );
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDelete = (id: number) => {
    const socket: Socket = io(SOCKET_URL);
    socket.emit("deleteNotification", id);
  };

  const handlechangethestates = async (id: number) => {
    try {
      const request = await axios.post(
        `http://localhost:8000/hotel/RemoveBooking?roomId=${id}`
      );
      window.alert(request.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
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
          {/* <td>{item.notification.id}</td> */}
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
                  ? `${item.roomDetails.roomNumber}, ${item.roomDetails.type} ${item.roomDetails.id}`
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
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    item.roomDetails?.id !== undefined &&
                    handlechangethestates(item.roomDetails.id)
                  }
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
