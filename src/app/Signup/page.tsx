"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/users/signin", {
        email,
        password,
      });
      router.push("/ProfileImage");
      const { token } = response.data;
      localStorage.setItem("HOTEL_FIRST_VILLA", JSON.stringify(token));
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", (error as any).response?.data);
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
            />
            <h3 className="text-2xl py-6">Password</h3>
            <input
              type="password"
              className="py-3 px-3 w-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-6"
              type="submit"
            >
              Submit
            </button>
          </form>
          <Link href="/Registation">
            <button className="bg-purple-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full my-6">
              SignIn
            </button>
          </Link>

          <Link href="/Forgetpassword">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-6">
              Forget Password
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
