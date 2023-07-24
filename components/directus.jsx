import React from "react";

const DirectusDataComponent = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Email: {item.email}</p>
          <p>Phone: {item.phone}</p>
          {/* Render the content of galleryImgs and channelImgs here */}
          <pre>Gallery Images: {JSON.stringify(item.galleryImgs)}</pre>
          <pre>Channel Images: {JSON.stringify(item.channelImgs)}</pre>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DirectusDataComponent;
