"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Correct spelling
import {jwtDecode} from "jwt-decode"; // Correct import
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/FirebaseConfig";

function AddHotelImages() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<null | string>(null);
  const [caption, setCaption] = useState("");
  const [ hotelId , sethotelId] = useState("");

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

    const imageRef = ref(storage, `HotelImage/${image.name}`); // Create a reference for the image

    try {
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      setDownloadURL(url);
      console.log("Image uploaded to", url);
      window.alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, item: any) => {
    e.preventDefault();

    if (!downloadURL) {
      window.alert("Please upload an image first");
      return;
    }



    const data = {
      caption: caption,
      url: downloadURL,
      hotelId: item.id,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/userother/AddImagesHotel",
        data
      );
      console.log(response);
      window.alert(response.data);
    } catch (error) {
      window.alert("Error submitting profile data");
      console.log("Error submitting profile data", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("HOTEL_FIRST_VILLA");
      if (!token) {
        window.alert("No token found");
        return;
      }

      const decoded: any = jwtDecode(token);
      const ID = decoded.id;

      try {
        const response = await axios.get(
          "http://localhost:8000/userother/gethotelDetails/",
          {
            params: {
              id: ID,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        window.alert("Error fetching data: " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Add Hotel Images</h3>

      <div className="py-10">
        {data.map((item: any) => (
          <div key={item.id} className="py-10 px-5">
            <h3>{item.name}</h3>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Description:</strong> {item.description}
            </p>

            {/* Moved form outside of the description block */}
            <form onSubmit={(e) => handleSubmit(e, item)}>
              <input type="file" onChange={handleFileChange} />
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>

              <label>Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />

              <button type="submit" disabled={!downloadURL}>
                Submit
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddHotelImages;
