// pages/SamplePage.js

import React, { useState } from 'react';

const SamplePage = () => {
  const [response, setResponse] = useState(null);
  
  const handleClick = async () => {
    const apiEndpoint = "https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/actions";
    const token = "123456789";

    // Payload data
    const payload = {
      field1: "value1",
      field2: "value2"
    };

    // Headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      // Make the POST request
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Sample Page</h1>
      <button onClick={handleClick}>Make API Request</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SamplePage;
