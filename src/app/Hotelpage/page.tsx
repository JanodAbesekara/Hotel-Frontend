import React from 'react'

function Hotel() {
  return (
    <div>
        <h2>Add details</h2>
        <label>Hotel Name :- </label>
        <input type="text" placeholder="Hotel Name" className="px-2 py-1" />
        <br />
        <br />
        <label>Hotel Address :- </label>
        <input type="text" placeholder="Hotel Address" className="px-2 py-1" />
        <br />
        <br />
        <label>Hotel Location :- </label>
        <input type="text" placeholder="Hotel Location" className="px-2 py-1" />
        <br />
        <br />
        <label>Hotel Image :- </label>
        <input type="file" />
    </div>
  )
}

export default Hotel