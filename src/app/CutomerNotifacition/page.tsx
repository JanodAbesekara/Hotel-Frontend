"use client";

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const SOCKET_URL = "http://localhost:8002";
const socket: Socket = io(SOCKET_URL);

interface NotificationData {
  notification: {
    id: number;
    bookingId: number;
    message: string;
    createdAt: string;
  }[];
  customerDetails?: {
    customerId: number;
    roomId: number;
  };
  roomDetails?: {
    roomNumber: string;
    type: string;
    hotelId: number;
  }[];
  hotelDetails?: {
    name: string;
    location: string;
  }[];
}

function CustomerNotification() {
  const [data, setData] = useState<NotificationData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");

    if (token) {
      const decoded: any = jwtDecode(token);
      const customerId = decoded.id;
      console.log("Customer ID:", customerId);

      // Emit event to request unique notifications for the customer
      socket.emit("getUniqueNotifications", customerId);

      // Listen for unique notifications
      socket.on("uniqueNotifications", (notifications: NotificationData[]) => {
        setData(notifications);
        console.log("Received notifications:", notifications);
      });

      // Listen for notifications deletion updates
      socket.on("notificationDeleted", (id: number) => {
        setData((prevData) =>
          prevData.filter((item) => item.notification[0].id !== id)
        );
        console.log("Notification deleted:", id);
      });
    } else {
      console.error("No token found in localStorage");
    }

    // Cleanup on unmount
    return () => {
      socket.off("uniqueNotifications");
      socket.off("notificationDeleted");
      
      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
    };
  }, []);

  const handleDelete = (id: number) => {
    socket.emit("deleteNotification", id);
  };

  return (
    <div>
      <h2 className="text-center p-10">Notifications</h2>
      <div>
        {data.map((item, index) => (
          <div key={index} className="notification-item">
            {item.notification.map((notif) => (
              <p key={notif.id}>
                In the {item.hotelDetails?.[0]?.name || "Unknown Hotel"} located
                in {item.hotelDetails?.[0]?.location || "Unknown Location"},
                Room Number {item.roomDetails?.[0]?.roomNumber || "N/A"} -{" "}
                {item.roomDetails?.[0]?.type || "N/A"} type room{" "}
                {notif.message || "No message available"} on{" "}
                {notif.createdAt
                  ? new Date(notif.createdAt).toISOString().split("T")[0]
                  : "N/A"}
              </p>
            ))}
            <button
              onClick={() => handleDelete(item.notification[0].id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Viewed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerNotification;
