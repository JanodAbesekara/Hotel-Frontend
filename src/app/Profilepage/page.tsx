"use client";

import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/FirebaseConfig";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";


function Profilepage() {
  useEffect(() => {
    const token = localStorage.getItem("HOTEL_FIRST_VILLA");
    if (token) {
      const decoded: any = jwtDecode(token);

      const id = decoded.id;
      console.log(id);
      setId(id);
    }
  }, []);

  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<null | string>(null);

  // other inputs
  const [Country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [Address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [Id, setId] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);

    const imageRef = ref(storage, `images/${image.name}`); // Create a reference for the image

    try {
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      setDownloadURL(url);
      setProfileImage(url);
      console.log("Image uploaded to", url);
      window.alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setUploading(false);
    }
  };

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      country: Country,
      province: province,
      address: Address,
      profileImage: profileImage,
      userId: Id,
    };

    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/userother/adddetails",
        data
      );
      console.log(response);
      window.alert(response.data);
    } catch (error) {
      window.alert("Error submitting profile data");
      console.log("Error submitting profile data", error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-4xl py-10">Profile details</h2>
      <div>
        <form onSubmit={HandleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="button" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
          <br />
          <br />
          <label>Country:</label>
          <input
            type="text"
            placeholder="Country"
            className="px-2 py-1"
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />
          <br />
          <label>Province:</label>
          <input
            type="text"
            placeholder="Province"
            className="px-2 py-1"
            onChange={(e) => setProvince(e.target.value)}
          />
          <br />
          <br />
          <label>Address:</label>
          <input
            type="text"
            placeholder="Address"
            className="px-2 py-1"
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br></br>
      <button className="bg-white text-black hover:bg-slate-200 px-1 py-2">
        <Link href="/ProfileImage">Click</Link>
      </button>
    </div>
  );
}

export default Profilepage;
