"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/FirebaseConfig";
import Imagedisplay from "./Imagedisplay";
import Link from "next/link";

function AddHotelImages() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<null | string>(null);
  const [caption, setCaption] = useState("");
  const [GEtdata, setGetData] = useState([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    const imageRef = ref(storage, `HotelImage/${image.name}`);

    try {
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      setDownloadURL(url);
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

    if (!item.id) {
      window.alert("Please select a hotel first");
      return;
    }

    if (!caption) {
      window.alert("Please enter a caption");
      return;
    }

    const data = {
      caption: caption,
      url: downloadURL,
      hotelId: item.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/userother/AddImagesHotel",
        data
      );
      window.alert("Uplod Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting profile data", error);
      window.alert("Error submitting profile data");
    }
  };

  useEffect(() => {
    const fetchHotelData = async () => {
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
            params: { id: ID },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching hotel data", error);
        window.alert("Error fetching data: " + error);
      }
    };

    fetchHotelData();
  }, []);

  useEffect(() => {
    const fetchHotelImages = async (hotel: any) => {
      if (data?.length > 0) {
        try {
          const hotelId = hotel.id;
          const response = await axios.get(
            "http://localhost:8000/userother/getHotelImages/",
            {
              params: { id: hotelId },
            }
          );
          setGetData((prev: any) => {
            // console.log("Prev:", prev);

            // Check if an item with the same id already exists
            const exists = prev.some((item: any) => item.id === hotelId);

            if (!exists) {
              // If it doesn't exist, add the new item
              const arr = [...prev, { ...hotel, data: response.data }];
              // console.log("Arr:", arr);
              return arr;
            }

            // If it exists, return the previous state as it is
            console.log("Item with same id already exists:", hotelId);
            return prev;
          });
        } catch (error) {
          console.error("Error fetching hotel images", error);
          window.alert("Error fetching data: " + error);
        }
      }
    };

    console.log("Data:", data);

    data.forEach((hotel: any) => {
      fetchHotelImages(hotel);
    });

    // console.log("Get Data:", GEtdata);
  }, [data]);
  return (
    <div>
      <h3>Add Hotel Images</h3>

      <div className="py-10">
        {GEtdata?.map((item: any) => (
          <div key={item.id} className="py-10 px-5">
            <h3>{item.name}</h3>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Description:</strong> {item.description}
            </p>

            <form onSubmit={(e) => handleSubmit(e, item)}>
              <input type="file" onChange={handleFileChange} />
              <button type="button" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
              </button>

              <label>Caption</label>
              <input type="text" onChange={(e) => setCaption(e.target.value)} />

              <button type="submit" disabled={!downloadURL}>
                Submit
              </button>
            </form>
            <Imagedisplay GEtdata={item?.data} />
          </div>
        ))}
      </div>

      <Link href="/Roomdetailsadd">
        <button>Click to add Rooms</button>
      </Link>

      <Link href="/Feedbackmanage">
        <button>Click to go Feedback</button>
      </Link>
    </div>
  );
}

export default AddHotelImages;
