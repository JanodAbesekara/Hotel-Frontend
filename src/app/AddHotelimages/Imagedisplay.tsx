"use client";
import React from "react";
import axios from "axios";

interface ImageData {
  id: number;
  hotelName: string;
  caption: string;
  url: string;
}

function Imagedisplay({ GEtdata }: { GEtdata: ImageData[] }) {
  console.log(GEtdata);

  const DeleteImage = (id: number) => {
    try {
      const respond = axios.delete(
        `http://localhost:8000/userother/Deletethepost/`,
        {
          params: { id: id },
        }
      );

      window.alert("Delete Succcessfully ");
      window.location.reload();
    } catch (error) {
      window.alert("Error" + error);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-80 text-center">
        Hotel Images
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Hotel Name
            </th>
            <th scope="col" className="px-6 py-3">
              Caption
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {GEtdata?.map((getD) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={getD.id}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {getD.hotelName}
              </td>
              <td className="px-6 py-4">{getD.caption}</td>
              <td className="px-6 py-4">
                <img
                  src={getD.url}
                  alt={getD.caption}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="px-5">
                <button onClick={() => DeleteImage(getD.id)}> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Imagedisplay;
