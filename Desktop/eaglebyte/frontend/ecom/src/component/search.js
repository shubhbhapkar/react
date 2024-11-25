// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import addToCart from "./add to cart";  // Ensure this is correctly exported from './addToCart.js'
// import ProductCard from "./productcard"; // Ensure correct file path

// const Search = ({updateCartCount}) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]);
//   const [message, setMessage] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleSearch = async (event) => {
//     event.preventDefault();

//     if (!searchTerm.trim()) {
//       setMessage("Please enter a product name to search.");
//       setProducts([]);
//       setHasSearched(false);
//       return;
//     }

//     setMessage("");
//     setHasSearched(true);

//     try {
//       const response = await axios.get(`http://localhost:8000/user/serchproduct/`, {
//         params: { q: searchTerm },
//       });
//       if (response.data.length === 0) {
//         setMessage("No products found for your search.");
//       }
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setMessage("An error occurred while fetching results. Please try again.");
//     }
//   };

//   useEffect(() => {
//     console.log("Updated products:", products);
//   }, [products]);

//   return (
//     <>
//       <div className="d-flex justify-content-center align-items-center py-5" style={{ backgroundColor: "#f8f9fa" }}>
//         <form onSubmit={handleSearch} className="form form-inline d-flex shadow-sm p-3 rounded" style={{ backgroundColor: "#fff", width: "60%" }}>
//           <input
//             type="text"
//             className="form-control rounded-pill me-2"
//             placeholder="What are you searching for?.."
//             style={{ flex: 1 }}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" className="btn btn-primary rounded-pill px-4">Search</button>
//         </form>
//       </div>

//       {hasSearched && message && <div className="alert alert-info text-center">{message}</div>}

//       {hasSearched && products.length > 0 && (
//         <section style={{ backgroundColor: "#eee" }}>
//           <div className="text-center container py-5">
//             <h4 className="mt-4 mb-5"><strong>Search Results</strong></h4>
//             <div className="row">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} addToCart={addToCart} updateCartCount={updateCartCount} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default Search;




import React, { useState, useEffect } from "react";
import axios from "axios";

import addToCart from "./add to cart"; // Ensure this is correctly exported
import ProductCard from "./productcard"; // Ensure correct file path

const Search = ({ updateCartCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Price filter state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Default max price
  const [currentMin, setCurrentMin] = useState(0);
  const [currentMax, setCurrentMax] = useState(1000);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setMessage("Please enter a product name to search.");
      setProducts([]);
      setHasSearched(false);
      return;
    }

    setMessage("");
    setHasSearched(true);

    try {
      const response = await axios.get(`http://localhost:8000/user/serchproduct/`, {
        params: { q: searchTerm },
      });

      if (response.data.length === 0) {
        setMessage("No products found for your search.");
      }

      const uniqueProducts = [...new Map(response.data.map(item => [item.id, item])).values()];

      setProducts(uniqueProducts);
      setOriginalProducts(uniqueProducts);

      // Dynamically determine min and max price for the search results
      const prices = uniqueProducts.map((p) => p.discounted_price || p.price);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      setCurrentMin(Math.min(...prices));
      setCurrentMax(Math.max(...prices));

    } catch (error) {
      console.error("Error fetching search results:", error);
      setMessage("An error occurred while fetching results. Please try again.");
    }
  };

  // Filter products by price range
  const handleFilter = () => {
    const filtered = originalProducts.filter(product => {
      const price = product.discounted_price || product.price;
      return price >= currentMin && price <= currentMax;
    });
    setProducts(filtered);
  };

  // Reset filters
  const handleReset = () => {
    setProducts(originalProducts);
    setCurrentMin(minPrice);
    setCurrentMax(maxPrice);
  };

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);

  return (
    <>
      {/* Search Bar */}
      <div className="d-flex justify-content-center align-items-center py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <form onSubmit={handleSearch} className="form form-inline d-flex shadow-sm p-3 rounded" style={{ backgroundColor: "#fff", width: "60%" }}>
          <input
            type="text"
            className="form-control rounded-pill me-2"
            placeholder="What are you searching for?.."
            style={{ flex: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary rounded-pill px-4">Search</button>
        </form>
      </div>

      {/* Message */}
      {hasSearched && message && <div className="alert alert-info text-center">{message}</div>}

      {/* Search Results */}
      {hasSearched && products.length > 0 && (
        <section style={{ backgroundColor: "#eee" }}>
          <div className="text-center container py-5">
            <h4 className="mt-4 mb-5"><strong>Search Results</strong></h4>

            {/* Price Filter */}
            <div className="row mb-4 align-items-center">
              <div className="col-md-3 text-center">
                <label htmlFor="minRange" className="form-label fw-bold">
                  Min Price: <span className="text-primary">${currentMin}</span>
                </label>
                <div className="d-flex justify-content-between">
                  
                </div>
                <input
                  id="minRange"
                  type="range"
                  className="form-range"
                  min={minPrice}
                  max={maxPrice}
                  value={currentMin}
                  onChange={(e) => setCurrentMin(Number(e.target.value))}
                />
              </div>
              <div className="col-md-3 text-center">
                <label htmlFor="maxRange" className="form-label fw-bold">
                  Max Price: <span className="text-primary">${currentMax}</span>
                </label>
                
                <input
                  id="maxRange"
                  type="range"
                  className="form-range"
                  min={minPrice}
                  max={maxPrice}
                  value={currentMax}
                  onChange={(e) => setCurrentMax(Number(e.target.value))}
                />
              </div>
              <div className="col-md-6 text-center mt-3 mt-md-0">
                <button className="btn btn-primary me-2" onClick={handleFilter}>
                  Apply Filter
                </button>
                <button className="btn btn-outline-secondary" onClick={handleReset}>
                  Reset Filter
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <div className="row">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} updateCartCount={updateCartCount} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Search;
