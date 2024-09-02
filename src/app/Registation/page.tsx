"use client";
import React, { useState } from "react";
import Axios from "axios";

function Registation() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = Axios.post("http://localhost:8000/users/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        PhoneNumber: PhoneNumber,
        password: password,
      });

      window.alert((await response).data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-center text-4xl py-8">Registation Form</h2>
      <form onSubmit={handlesubmit}>
        <label className="text-center text-lg py-4 px-8">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          className="px-2 py-1"
          onChange={(e) => setfirstname(e.target.value)}
        />
        <br></br>
        <br></br>
        <label className="text-center text-lg py-4 px-8">Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          className="px-2 py-1"
          onChange={(e) => setlastname(e.target.value)}
        />
        <br></br>
        <br></br>
        <label className="text-center text-lg py-4 px-8">PhoneNumber</label>
        <input
          type="number"
          placeholder="PhoneNumber"
          className="px-2 py-1"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br></br>
        <br></br>
        <label className="text-center text-lg py-4 px-8">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="px-2 py-1"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <label className="text-center text-lg py-4 px-8">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="px-2 py-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button
          type="submit"
          className="bg-purple-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full my-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Registation;
