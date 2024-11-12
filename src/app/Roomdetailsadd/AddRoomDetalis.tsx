"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/FirebaseConfig";

function AddRoomDetalis({ data }: any) {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<null | string>(null);
  const [profileImage, setProfileImage] = useState("");
  const [caption , setcaption] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      console.log(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    setUploading(true);

    const imageRef = ref(storage, `RoomImage/${imageFile.name}`); // Create a reference for the image

    try {
      await uploadBytes(imageRef, imageFile);
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

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior

    // Check data before sending
    console.log({
      roomNumber,
      type: roomType,
      price: roomPrice,
      hotelId: data,
      url: profileImage,
      caption,
    });

    try {
      const response = await axios.post(
        `http://localhost:8000/hotel/addRoomdetails`,
        {
          roomNumber: roomNumber,
          type: roomType,
          price: roomPrice,
          hotelId: data,
          url: profileImage,
          caption,
        }
      );
      window.alert("Room details added successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding room details:", error);
      window.alert("Error adding room details: " + error);
    }
  };

  return (
    <div>
      <h3 className="my-7 text-center">AddRoomDetalis</h3>

      <form onSubmit={handelSubmit}>
        <label>Room Number</label>
        <input
          type="text"
          placeholder="Room Number"
          className="px-2 py-1"
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <br />
        <br />

        <label>Room Type</label>
        <input
          type="text"
          placeholder="Room Type"
          className="px-2 py-1"
          onChange={(e) => setRoomType(e.target.value)}
        />

        <br />
        <br />

        <label>Room Price</label>
        <input
          type="number"
          placeholder="Room Price"
          className="px-2 py-1"
          onChange={(e) => setRoomPrice(Number(e.target.value))}
        />

        <br />
        <br />

        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        <br />
        <br/>
        <input type="text" 
         onChange={(e) => setcaption(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddRoomDetalis;
