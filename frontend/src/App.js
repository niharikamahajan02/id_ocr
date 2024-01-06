import React, { useState } from 'react';
import './App.css';
import IdUploader from './components/IdUploader';
import JsonOutput from './components/JsonOutput';
import axios from 'axios';

const App = () => {
  const [uploadId, setUploadId] = useState(null);
  const [ocrData, setOCRData] = useState({});
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [userData, setUserData] = useState([]);

  const [updateData, setUpdateData] = useState({
    // Initialize with default values or use an empty object
    name: '',
    last_name: '',
    identification_number: '',
    date_of_birth: '',
    date_of_issue: '',
    date_of_expiry: '',
  });

  const handleUpdateDataChange = (field, value) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/${identificationNumber}`, updateData);
      const updatedUser = response.data.data;
  
      // Update the userData array with the new data
      setUserData((prevUsers) => {
        // Replace the existing user with the updated user
        return prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
  

  const handleIdUpload = async (image) => {
    setUploadId(image);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setOCRData(response.data.data);

      // Assuming response.data.data contains the identification_number
      setIdentificationNumber(response.data.data.identification_number);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/${identificationNumber}`);
      setUserData([response.data.data]);
    } catch (error) {
      console.error('Error getting user by ID:', error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/');
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error getting all users:', error);
    }
  };

  const deleteUserById = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/${identificationNumber}`);
      // Filter out the deleted user from the existing userData state
      setUserData((prevData) => prevData.filter((user) => user.identification_number !== identificationNumber));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  const updateUserData = async () => {
    // Assuming you have a form or modal to collect updated user data
    const updatedData = {
      // Updated fields from your form
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/${identificationNumber}`, updatedData);
      setUserData([response.data.data]);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="container">
      <h1>THAI ID CARD OCR</h1>

      <div>
        <IdUploader onIdUploadReq={handleIdUpload} />
        {uploadId && <img className="uploaded-image" src={URL.createObjectURL(uploadId)} alt="Uploaded"  style={{ maxWidth: '50%', height: 'auto' }}/>}
        <JsonOutput ocrData={ocrData} />
      </div>

      <div className="user-actions">
        <label>Identification Number: </label>
        <input
          type="string"
          value={identificationNumber}
          onChange={(e) => setIdentificationNumber(e.target.value)}
        />
        <button className="action-button" onClick={getUserById}>Get User By ID</button>
        <button className="action-button" onClick={getAllUsers}>Get All Users</button>
      </div>

      {userData.length === 0 ? (
        <p>No users in the database</p>
      ) : (
        userData.map((user) => (
          <div key={user._id} className="user-details">
            {/* Display user details */}
            <p>Name: {user.name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>ID: {user.identification_number}</p>
            <p>Date of birth: {user.date_of_birth}</p>
            <p>Date of Issue: {user.date_of_issue}</p>
            <p>Date of Expiry: {user.date_of_expiry}</p>

          {/* Display other user details similarly */}
          <button className="action-button" onClick={deleteUserById}>Delete User</button>

          {/* Update User Form */}
          <form className="update-form">
            <label>Name: </label>
            <input
              type="text"
              value={updateData.name}
              onChange={(e) => handleUpdateDataChange('name', e.target.value)}
            />
            {/* Add similar input fields for other attributes */}
            <button type="button" className="action-button" onClick={handleUpdate}>
                Save Updated Data
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  );
};


export default App;
