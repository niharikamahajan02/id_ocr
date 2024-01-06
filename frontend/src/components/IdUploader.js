import React, { useState } from 'react';

const IdUploader = ({ onIdUploadReq }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [err, setErr] = useState(null);

  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/jpg_large', 'image/jpeg_large', 'image/png_large'];
  const maxSize = 2 * 1024 * 1024;

  const handleIdChange = (event) => {
    const uploadedId = event.target.files[0];

    // checks to image
    if(uploadedId && !allowedTypes.includes(uploadedId.type.toLowerCase())) {
      setErr('Only PNG, JPG, & JPEG supported.');
    } else if(uploadedId && uploadedId.size > maxSize) {
      setErr('Please upload file smaller than 2 MB.');
    } else {
      setSelectedId(uploadedId);
      setErr(null);
    }

    setSelectedId(uploadedId);
  };

  const handleUpload = () => {
    // Call the parent component's function to handle the image upload
    if(!err && selectedId) {
      onIdUploadReq(selectedId);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleIdChange} />
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <button onClick={handleUpload}>Upload Thai ID</button>
    </div>
  );
};

export default IdUploader;