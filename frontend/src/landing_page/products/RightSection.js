// frontend/src/landing_page/products/RightSection.js
import React from "react";

function RightSection({ imageURL, productName, productDescription, learnMore }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-5 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          {learnMore && (
            <a href={learnMore} style={{ textDecoration: "none" }}>
              Learn More <i className="fa-solid fa-arrow-right-long"></i>
            </a>
          )}
        </div>
        <div className="col-1"></div>
        <div className="col-6">
          <img src={imageURL} alt={productName} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
