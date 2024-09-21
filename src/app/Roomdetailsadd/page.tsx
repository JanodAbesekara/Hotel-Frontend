"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AddRoomDetailsComponent from "./AddRoomDetalis";
import DisplayAllrooms from "./DisplayAllrooms";

interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  url: string;
}

function Roomdetailsadd() {
  const [data, setData] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      const token = localStorage.getItem("HOTEL_FIRST_VILLA");
      if (!token) {
        window.alert("No token found");
        return;
      }

      const decoded: any = jwtDecode(token);
      const ID = decoded.id;

      try {
        const response = await axios.get(
          "http://localhost:8000/userother/gethotelDetails/",
          {
            params: { id: ID },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching hotel data", error);
        window.alert("Error fetching data: " + error);
      }
    };

    fetchHotelData();
  }, []);

  return (
    <div>
      <h3 className="text-center my-16">Add Room details</h3>

      <div>
        {data.map((item) => (
          <div key={item.id} className="my-14 mx-14 border border-black  p-4">
            <h3>Hotel Name: {item.name}</h3>
            <h3>Hotel Location: {item.location}</h3>
            <h3>Hotel Description: {item.description}</h3>
            <h3 >Hotel id: {item.id}</h3>

            <AddRoomDetailsComponent data={item.id} />
          </div>
        ))}
      </div>
 
 <DisplayAllrooms />
       
    </div>
  );
}

export default Roomdetailsadd;
