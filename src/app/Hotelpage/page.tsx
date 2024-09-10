"use client";

import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Hotel() {
  const [Hotelname, setHotelname] = useState("");
  const [HotelAddress, setHotelAddress] = useState("");
  const [HotelLocation, setHotelLocation] = useState("");

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");
    const decoded: any = jwtDecode(token as string);
    const ID = decoded.id;

    try {
      const response = axios.post(
        "http://localhost:8000/userother/addhotelDetails",
        {
          name: Hotelname,
          description: HotelAddress,
          location: HotelLocation,
          adminId: ID,
        }
      );
      window.alert("Hotel details added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add details</h2>

      <form onSubmit={handelSubmit}>
        <label>Hotel Name :- </label>
        <input
          type="text"
          placeholder="Hotel Name"
          className="px-2 py-1"
          onChange={(e) => setHotelname(e.target.value)}
        />
        <br />
        <br />
        <label>Hotel Discription :- </label>
        <textarea
          placeholder="Hotel Discription"
          className="px-2 py-1"
          onChange={(e) => setHotelAddress(e.target.value)}
        >
          {" "}
        </textarea>
        <br />
        <br />
        <label>Hotel Location :- </label>
        <input
          type="text"
          placeholder="Hotel Location"
          className="px-2 py-1"
          onChange={(e) => setHotelLocation(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Hotel;
