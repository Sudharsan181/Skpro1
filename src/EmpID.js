import React, { useState } from 'react';
import './internal.css'

const EmployeeIDCard = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [photo, setPhoto] = useState('');
  const [dob, setDOB] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [Contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // create ID card image using input values
    // setPhoto with the image data
  };

  return (
    <div className="employee-id-card-container">
      <h1 className="employee-id-card-heading">Employee ID Card</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="photo" className="employee-id-card-label">Photo:</label>
        <input
          type="file"
          id="photo"
          className="employee-id-card-input"
          onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
        />
        <br />

        {photo && <img src={photo} alt="Employee Photo" className="employee-id-card-photo" />}

        <br />
        <br />

        <label htmlFor="name" className="employee-id-card-label">Name:</label>
        <input
          type="text"
          id="name"
          className="employee-id-card-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label htmlFor="designation" className="employee-id-card-label">Designation:</label>
        <input
          type="text"
          id="designation"
          className="employee-id-card-input"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <br />

        <label htmlFor="department" className="employee-id-card-label">Department:</label>
        <input
          type="text"
          id="department"
          className="employee-id-card-input"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <br />

        <label htmlFor="dob" className="employee-id-card-label">DOB:</label>
        <input
          type="date"
          id="dob"
          className="employee-id-card-input"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
        />
        <br />

        <label htmlFor="bloodGroup" className="employee-id-card-label">Blood Group:</label>
        <input
          type="text"
          id="bloodGroup"
          className="employee-id-card-input"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        />
        <br />

        <label htmlFor="Contact" className="employee-id-card-label">Contact:</label>
        <input
          type="Contact"
          id="Contact"
          className="employee-id-card-input"
          value={Contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <br />

        <label htmlFor="address" className="employee-id-card-label">Address:</label>
        <textarea
          id="address"
          className="employee-id-card-textarea"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />

        <button type="submit" className="employee-id-card-button">Create ID Card</button>
      </form>
      {/* ID card image */}
      {name && photo && (
        <div className="employee-id-card">
          <img src={photo} alt="Employee Photo" className="employee-id-card-photo" />
          <div className="employee-id-card-details">
            <h2 className="employee-id-card-name">{name}</h2>
            <p className="employee-id-card-label"><b>Designation:&nbsp;</b> {designation}</p>
            <hr className="employee-id-card-hr" />
            <p className="employee-id-card-label"><b>Department: &nbsp;</b> {department}</p>
            <p className="employee-id-card-label"><b>DOB:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> {dob}</p>
            <p className="employee-id-card-label"><b>Blood Group:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> {bloodGroup}</p>
            <p className="employee-id-card-label"><b>Contact:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> {Contact}</p>
            <p className="employee-id-card-label"><b>Address:&nbsp;</b>{address}</p>
          </div>
        </div>
      )}
      

</div>
  )}

export default EmployeeIDCard;
