"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddRoomDetalis({ data }: any) {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState<number | null>(null);

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
  
    // Check data before sending
    console.log({
      roomNumber,
      type: roomType,
      price: roomPrice,
      hotelId: data,
    });
  
    try {
      const response = await axios.post(
        `http://localhost:8000/hotel/addRoomdetails`,
        {
          roomNumber: roomNumber,
          type: roomType,
          price: roomPrice,
          hotelId: data,
        }
      );
      window.alert("Room details added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding room details:", error);
      window.alert("Error adding room details: " + error);
    }
  };
  

  return (
    <div>
      <h3 className="my-7 text-center">AddRoomDetalis</h3>

      <form onSubmit={handelSubmit}>
        <label>Room Number</label>
        <input
          type="text"
          placeholder="Room Number"
          className="px-2 py-1"
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <br />
        <br />

        <label>Room Type</label>
        <input
          type="text"
          placeholder="Room Type"
          className="px-2 py-1"
          onChange={(e) => setRoomType(e.target.value)}
        />

        <br />
        <br />

        <label>Room Price</label>
        <input
          type="number"
          placeholder="Room Price"
          className="px-2 py-1"
          onChange={(e) => setRoomPrice(Number(e.target.value))}
        />

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRoomDetalis;
