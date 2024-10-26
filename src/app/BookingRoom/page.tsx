"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

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
      <div className="float-right p-10">
        <Link href="/CutomerNotifacition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="50"
            height="50"
            viewBox="0 0 50 50"
          >
            <path d="M 25 0 C 22.800781 0 21 1.800781 21 4 C 21 4.515625 21.101563 5.015625 21.28125 5.46875 C 15.65625 6.929688 12 11.816406 12 18 C 12 25.832031 10.078125 29.398438 8.25 31.40625 C 7.335938 32.410156 6.433594 33.019531 5.65625 33.59375 C 5.265625 33.878906 4.910156 34.164063 4.59375 34.53125 C 4.277344 34.898438 4 35.421875 4 36 C 4 37.375 4.84375 38.542969 6.03125 39.3125 C 7.21875 40.082031 8.777344 40.578125 10.65625 40.96875 C 13.09375 41.472656 16.101563 41.738281 19.40625 41.875 C 19.15625 42.539063 19 43.253906 19 44 C 19 47.300781 21.699219 50 25 50 C 28.300781 50 31 47.300781 31 44 C 31 43.25 30.847656 42.535156 30.59375 41.875 C 33.898438 41.738281 36.90625 41.472656 39.34375 40.96875 C 41.222656 40.578125 42.78125 40.082031 43.96875 39.3125 C 45.15625 38.542969 46 37.375 46 36 C 46 35.421875 45.722656 34.898438 45.40625 34.53125 C 45.089844 34.164063 44.734375 33.878906 44.34375 33.59375 C 43.566406 33.019531 42.664063 32.410156 41.75 31.40625 C 39.921875 29.398438 38 25.832031 38 18 C 38 11.820313 34.335938 6.9375 28.71875 5.46875 C 28.898438 5.015625 29 4.515625 29 4 C 29 1.800781 27.199219 0 25 0 Z M 25 2 C 26.117188 2 27 2.882813 27 4 C 27 5.117188 26.117188 6 25 6 C 23.882813 6 23 5.117188 23 4 C 23 2.882813 23.882813 2 25 2 Z M 27.34375 7.1875 C 32.675781 8.136719 36 12.257813 36 18 C 36 26.167969 38.078125 30.363281 40.25 32.75 C 41.335938 33.941406 42.433594 34.6875 43.15625 35.21875 C 43.515625 35.484375 43.785156 35.707031 43.90625 35.84375 C 44.027344 35.980469 44 35.96875 44 36 C 44 36.625 43.710938 37.082031 42.875 37.625 C 42.039063 38.167969 40.679688 38.671875 38.9375 39.03125 C 35.453125 39.753906 30.492188 40 25 40 C 19.507813 40 14.546875 39.753906 11.0625 39.03125 C 9.320313 38.671875 7.960938 38.167969 7.125 37.625 C 6.289063 37.082031 6 36.625 6 36 C 6 35.96875 5.972656 35.980469 6.09375 35.84375 C 6.214844 35.707031 6.484375 35.484375 6.84375 35.21875 C 7.566406 34.6875 8.664063 33.941406 9.75 32.75 C 11.921875 30.363281 14 26.167969 14 18 C 14 12.261719 17.328125 8.171875 22.65625 7.21875 C 23.320313 7.707031 24.121094 8 25 8 C 25.886719 8 26.679688 7.683594 27.34375 7.1875 Z M 21.5625 41.9375 C 22.683594 41.960938 23.824219 42 25 42 C 26.175781 42 27.316406 41.960938 28.4375 41.9375 C 28.792969 42.539063 29 43.25 29 44 C 29 46.222656 27.222656 48 25 48 C 22.777344 48 21 46.222656 21 44 C 21 43.242188 21.199219 42.539063 21.5625 41.9375 Z"></path>
          </svg>
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
