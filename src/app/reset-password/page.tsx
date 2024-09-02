"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      window.alert("Invalid or missing token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/reset-password", {
        token: token,
        newPassword: newPassword,
      });

      window.alert(response.data.message);
      router.push("/Signup");
    } catch (error) {
      console.error("Password reset failed:", error);
      window.alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-center text-5xl py-10">Reset Password</h2>
      <form className="justify-center align-middle display-flex" onSubmit={handleSubmit}>
        <label className="px-5 py-8">New Password</label>
        <input
          type="password"
          className="px-2 py-1"
          placeholder="Enter New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <label className="px-5 py-8">Confirm Password</label>
        <input
          type="password"
          className="px-2 py-1"
          placeholder="Enter Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-6"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
