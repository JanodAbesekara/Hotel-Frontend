"use client";
import React, { useState } from "react";
import axios from "axios";

function Forgetpassword() {
  const [email, setEmail] = useState("");

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/users/forgot-password",
        {
          email: email,
        }
      );
      window.alert((await response).data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-center text-4xl py-8">Forget Password</h2>
      <form onSubmit={handlesubmit}>
        <label className="text-center text-lg py-4 px-8">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          className="px-2 py-1"
          onChange={(e) => setEmail(e.target.value)}
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

export default Forgetpassword;
