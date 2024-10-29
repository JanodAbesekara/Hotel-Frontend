"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8002";
const socket: Socket = io(SOCKET_URL);

function BookingRoom() {
  interface Room {
    id: number;
    roomNumber: string;
    type: string;
    price: number;
    availabilityStatus: boolean;
  }

  interface Image {
    id: number;
    url: string;
    caption?: string;
  }

  interface Hotel {
    id: number;
    name: string;
    location: string;
    description: string;
    rooms: Room[];
    images: Image[];
  }

  const [hotelData, setHotelData] = useState<Hotel[]>([]);
  const [submited, setSubmited] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [clicked, setClicked] = useState(false);
  const [bookingdetalsID, setBookingdetalsID] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/hotel/roomHoteldetails"
        );
        setHotelData(response.data);
      } catch (error) {
        console.error("Error fetching hotel data", error);
      }
    };

    fetchHotelData();

    socket.on("newNotification", (notification: any) => {
      console.log("New Notification", notification);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const bookingRoom = async (id: number) => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");
    if (!token) return;

    const decoded: any = jwtDecode(token);
    const customerId = decoded.id;

    const data = {
      roomId: id,
      customerId,
      bookingDate: new Date(),
      checkInDate,
      checkOutDate,
      status: "Booked",
    };

    setSubmited(true);
    setClicked(true);
    try {
      await axios.post("http://localhost:8000/hotel/BookingRooms", data);
      findTheBookingId(data.roomId, data.customerId);
      alert("Room booked successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  const findTheBookingId = async (roomId: number, customerId: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/hotel/GetBookingID",
        {
          roomId,
          customerId,
        }
      );

      setBookingdetalsID(response.data.id);

      console.log("Booking ID:", response.data.id);

      const token = localStorage.getItem("HOTEL_FIRST_VILLA");
      if (!token) return;

      const decoded: any = jwtDecode(token);
      const message = `Room Booked By ${decoded.firstname}`;
      const bookingId = response.data.id;

      const data = { bookingId, message };

      socket.emit("addNotification", data);

      return response.data.id;
    } catch (error) {
      console.error("Error finding the booking id", error);
    }
  };

  const bookingRoomCancel = async (id: number) => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decoded: any = jwtDecode(token);
    const customerId = decoded.id;

    try {
      await axios.post("http://localhost:8000/hotel/BookingRoomsCancel", {
        roomId: id,
        customerId,
      });
      alert("Room canceled successfully");

      const bookingId = await findTheBookingId(id, customerId);

      const details = {
        bookingId: bookingId,
        message: `Room Booking Canceled By ${decoded.firstname}`,
      };

      console.log("Cancel Details:", details);
      socket.emit("canceledBooking", details);

       window.location.reload();
    } catch (error) {
      console.error("Error canceling room booking:", error);
    }
  };

  return (
    <div>
      <div className="float-right p-10">
        <Link href="/CutomerNotifacition">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Click Me
          </button>
        </Link>
      </div>

      <h1 className="text-center my-11">Room Details by Hotel</h1>

      {hotelData.map((hotel) => (
        <div key={hotel.id} className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">{hotel.name}</h2>
          <h4>{hotel.location}</h4>
          <p>{hotel.description}</p>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>Room Number</th>
                <th>Type</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Images</th>
                <th>Book Room</th>
                <th>Cancel Room</th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((room) => (
                <tr key={room.id}>
                  <td>Room {room.roomNumber}</td>
                  <td>{room.type}</td>
                  <td>${room.price}</td>
                  <td>
                    {room.availabilityStatus ? "Available" : "Not Available"}
                  </td>
                  <td>
                    {hotel.images.length > 0 ? (
                      hotel.images.map((image) => (
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noreferrer"
                          key={image.id}
                        >
                          <img
                            src={image.url}
                            alt={image.caption || "Hotel Image"}
                            className="w-20 h-20"
                          />
                          {image.caption}
                        </a>
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </td>
                  <td>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => bookingRoom(room.id)}
                    >
                      Book Room
                    </button>
                    {clicked && (
                      <div>
                        <label>Check-in Date</label>
                        <input
                          type="date"
                          onChange={(e) => setCheckInDate(e.target.value)}
                        />
                        <label>Check-out Date</label>
                        <input
                          type="date"
                          onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => bookingRoomCancel(room.id)}
                    >
                      Cancel Room
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default BookingRoom;
