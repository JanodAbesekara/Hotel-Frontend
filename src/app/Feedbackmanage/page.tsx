"use client";
import React, { useEffect } from "react";
import axios from "axios";

function Feedbackmanage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/feedback/getFeedback"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching feedback data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Feedbacks</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Booking ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Feedback 1</td>
            <td>Rating 1</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Feedbackmanage;
