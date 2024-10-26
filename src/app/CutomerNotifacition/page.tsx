"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fix the import here

function CustomerNotification() {
  const [data, setData] = useState<any[]>([]); // Added state for data

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("HOTEL_FIRST_VILLA");
      if (token) {
        const decoded: any = jwtDecode(token);
        const id = decoded.id;

        try {
          const response = await axios.post(
            `http://localhost:8000/Notifacition/GetbookingUnique?customerId=${id}`
          );
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-center p-10">Notifications</h2>

      <div>
        {data.map(
          (
            item: {
              hotelDetails: { name: string; location: string }[] | null;
              roomDetails: { roomNumber: string; type: string }[] | null;
              notification: { message: string; createdAt: string }[] | null;
            },
            index: React.Key
          ) => (
            <div key={index} className="notification-item">
              <p>
                In the{" "}
                {item.hotelDetails && item.hotelDetails.length > 0
                  ? item.hotelDetails[0]?.name
                  : "Unknown Hotel"}{" "}
                located in{" "}
                <span>
                  {item.hotelDetails && item.hotelDetails.length > 0
                    ? item.hotelDetails[0]?.location
                    : "Unknown Location"}
                </span>
                , Room Number{" "}
                {item.roomDetails && item.roomDetails.length > 0
                  ? item.roomDetails[0]?.roomNumber
                  : "N/A"}{" "}
                -{" "}
                {item.roomDetails && item.roomDetails.length > 0
                  ? item.roomDetails[0]?.type
                  : "N/A"}{" "}
                type room{" "}
                {item.notification && item.notification.length > 0
                  ? item.notification[0]?.message
                  : "No message available"}{" "}
                on{" "}
                {item.notification && item.notification.length > 0
                  ? new Date(item.notification[0].createdAt)
                      .toISOString()
                      .split("T")[0]
                  : "N/A"}
              </p>
              <button>Delete</button>
              <button>View</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CustomerNotification;
