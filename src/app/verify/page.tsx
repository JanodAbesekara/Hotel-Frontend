"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import axios from "axios";

export default function Verify() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null); // Explicitly declare token state

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Extract the token from the URL using window.location.search
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    setToken(tokenParam);

    if (tokenParam) {
      axios
        .get(`http://localhost:8000/users/verify-email?token=${tokenParam}`)
        .then(() => {
          setTimeout(() => {
            setVerified(true);
            router.push("/Signup");
          }, 500);
        })
        .catch((err) => {
          console.log(err.response);
          setError(true);
        });
    } else {
      setError(true);
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">
          {error
            ? "Verification failed. Please check the link or try again."
            : verified
            ? "You are verified!"
            : "Verifying, please wait..."}
        </h2>
      </div>
    </div>
  );
}
