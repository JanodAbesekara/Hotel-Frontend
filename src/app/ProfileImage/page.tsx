"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function ProfileImage() {
  const router = useRouter();

  const [Data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    PhoneNumber: "",
    profile: {
      country: "",
      province: "",
      address: "",
      profileImage: "",
    },
  });

  const handleLogout = async () => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");

    if (!token) {
      return router.replace("/Signup");
    }

    try {
      await axios.get("http://localhost:8000/users/signout");
      localStorage.removeItem("HOTEL_FIRST_VILLA");
      sessionStorage.clear();
      localStorage.clear();
      router.replace("/Signup");
      window.location.replace("/Signup");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");
    const decoded: any = jwtDecode(token as string);
    const ID = decoded.id;
    console.log(ID);

    const response = axios
      .get("http://localhost:8000/userother/getdetails", {
        params: {
          id: ID,
        },
      })

      .then((response) => {
        const Data = response.data;
        setData(Data);
        console.log(Data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Profile fetch failed:", error);
      });
  }, []);

  return (
    <div>
      <button
        className="bg-white text-black hover:bg-slate-200 px-1 py-2 my-10 mx-5 left-10"
        onClick={handleLogout}
      >
        SignOut
      </button>

      <h2 className="text-center">Details I Filled</h2>

      <div>
        <h3>Firstname: {Data.firstname}</h3>
        <h3>Lastname: {Data.lastname}</h3>
        <h3>Email: {Data.email}</h3>
        <h3>Phone Number: {Data.PhoneNumber}</h3>
        <h3>Country: {Data.profile.country}</h3>
        <h3>Province: {Data.profile.province}</h3>
        <h3>Address: {Data.profile.address}</h3>
        {Data.profile.profileImage && (
          <img src={Data.profile.profileImage} alt="Profile" />
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
