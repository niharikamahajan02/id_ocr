import React from 'react';

const JsonOutput = ({ ocrData }) => {
  return (
    <div>
      <h2>OCR Output:</h2>
      <ul>
        {Object.entries(ocrData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JsonOutput;
