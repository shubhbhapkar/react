import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/user/viewcat/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials (cookies) in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data); // Assuming `data` is an array of categories
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/products/${categoryName}`); // Navigate to the category page
  };

  return (
    <div className="container my-5">
    <h1 className="text-center mb-4 text-primary">Explore Product Categories</h1>
    <div className="row">
      {categories.map((category) => (
        <div
          className="col-md-4 mb-4"
          key={category.id} // Use unique ID from the API response
        >
          <div
            className="card h-100 shadow-lg border-0"
            onClick={() => handleCategoryClick(category.name)}
            style={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #FF6F61, #FFA69E)", // Gradient colors
              color: "#fff",
              borderRadius: "10px",
            }}
          >
            <div className="card-body text-center p-4">
              {/* Display category image */}
              <img
                src={category.image || "placeholder-image.jpg"} // Replace with your placeholder if image is missing
                alt={category.name}
                className="img-fluid mb-3"
                style={{
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "2px solid #fff",
                }}
              />
              <h5 className="card-title mb-2" style={{ fontWeight: "bold" }}>
                {category.name}
              </h5>
              <p
                className="card-text"
                style={{ fontSize: "14px", opacity: "0.9" }}
              >
                {category.description || "Discover the best products here!"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default ProductCategories;


