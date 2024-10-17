"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
  }, []);

  const [submited, setSubmited] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [clicked, setClicked] = useState(false);

  const bookingRoom = async (id: number) => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");
    const decoded: any = jwtDecode(token as string);
    const IDCUS = decoded.id;

    const data = {
      roomId: id,
      customerId: IDCUS,
      bookingDate: new Date(),
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      status: "Booked",
    };

    setSubmited(true);
    setClicked(true);
    try {
      console.log(data);
      await axios.post("http://localhost:8000/hotel/BookingRooms", data);
      findthebookingid(data.roomId, data.customerId);
      window.alert("Room booked successfully");
      console.log("Room booked successfully", data);
      window.location.reload();
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  const findthebookingid = async (roomId: number, customerId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/hotel/GetBookingID`,
        { roomId: roomId, customerId: customerId }
      );
      console.log("Booking ID", response.data);

      try {
        const token = localStorage.getItem("HOTEL_FIRST_VILLA");
        const decoded: any = jwtDecode(token as string);
        const Fname = decoded.firstname;
        const Lname = decoded.lastname;
        const data = {
          bookingId: response.data.id,
          message: `Room Booked By ${Fname}`,
        };
        const request = await axios.post(
          `http://localhost:8000/Notifacition/NotifacitonAdd`,
          data
        );
      } catch (error) {
        console.error("Error in adding the notifacation", error);
      }
    } catch (error) {
      console.error("Error finding the booking id", error);
    }
  };

  const bookingRoomcansel = async (id: number) => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");
    const decoded: any = jwtDecode(token as string);
    const IDCUS = decoded.id;

    const data = {
      roomId: id,
      customerId: IDCUS,
    };

    try {
      console.log(data);
      await axios.post("http://localhost:8000/hotel/BookingRoomsCancel", data);
      window.alert("Room Canceled successfully");
      console.log("Room Canceled successfully", data);
      window.location.reload();
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center my-11">Room Details by Hotel</h1>

      {hotelData.map((hotel) => (
        <div key={hotel.id} className="my-8">
          <h2 className="text-2xl font-bold text-center mb-4">{hotel.name}</h2>
          <h4>{hotel.location}</h4>
          <p>{hotel.description}</p>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Room Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3">
                  Images
                </th>
                <th scope="col" className="px-6 py-3">
                  Book Room
                </th>
                <th scope="col" className="px-6 py-3">
                  Cancel Room
                </th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4">Room {room.roomNumber}</td>
                  <td className="px-6 py-4">{room.type}</td>
                  <td className="px-6 py-4">${room.price}</td>
                  <td className="px-6 py-4">
                    {room.availabilityStatus ? "Available" : "Not Available"}
                  </td>

                  {/* Hotel Images */}
                  <td className="px-6 py-4">
                    {hotel.images.length > 0 ? (
                      <ul>
                        {hotel.images.map((image) => (
                          <li key={image.id}>
                            <a
                              href={image.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={image.url}
                                alt={image.caption || "Hotel Image"}
                                className="w-20 h-20"
                              />
                              {image.caption}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No images available</p>
                    )}
                  </td>

                  {/* Booking and Cancel Room Actions */}
                  <td className="px-6 py-4">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={(e) => bookingRoom(room.id)}
                    >
                      Book Room
                    </button>
                    {clicked ? (
                      <div>
                        <label>Check-in Date</label>
                        <input
                          type="date"
                          onChange={(e) => setCheckInDate(e.target.value)}
                          placeholder="Check-in Date"
                        />
                        <label>Check-out Date</label>
                        <input
                          type="date"
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          placeholder="Check-out Date"
                        />
                      </div>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={(e) => bookingRoomcansel(room.id)}
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
