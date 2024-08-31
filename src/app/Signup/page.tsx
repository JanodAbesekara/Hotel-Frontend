import { useState } from "react";
import Image from "next/image";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8000/users/signin", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div className="py-6">
      <div className="grid grid-cols-4 gap-4 py-6">
        <div className="col-span-2 h-full">
          <Image src="/Login.jpg" alt="hero" width={600} height={600} />
        </div>
        <div className="col-span-2 h-full">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-5xl text-gray-50 py-8">LOGIN</h2>
            <h3 className="text-2xl py-6">Email</h3>
            <input
              type="email"
              className="py-3 px-3 w-full"
              placeholder="Enter User name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Add required to ensure input is not empty
            />
            <h3 className="text-2xl py-6">Password</h3>
            <input
              type="password"
              className="py-3 px-3 w-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // Add required to ensure input is not empty
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-6"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
