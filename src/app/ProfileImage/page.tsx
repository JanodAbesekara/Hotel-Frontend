"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function ProfileImage() {
  const router = useRouter();

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

  return (
    <div>
      <div className="float-right px-10 py-10">
        <button
          className="bg-white text-black hover:bg-slate-200 px-1 py-2"
          onClick={handleLogout}
        >
          SignOut
        </button>
      </div>
    </div>
  );
}

export default ProfileImage;
