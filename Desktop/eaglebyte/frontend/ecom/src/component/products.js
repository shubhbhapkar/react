

import React, { useEffect, useState } from "react";
import axios from "axios";
import addToCart from "./add to cart";
import ProductCard from "./productcard";

const Products = ({ updateCartCount }) => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentMin, setCurrentMin] = useState(0);
  const [currentMax, setCurrentMax] = useState(1000);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async (page = 1) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/user/product/?page=${page}`,
          { withCredentials: true }
        );

        setProducts(data.results); // Set current page products
        setOriginalProducts(data.results); // Use results for filtering
        setTotalPages(Math.ceil(data.count / 10)); // Assume 10 products per page

        const prices = data.results.map((p) => p.discounted_price || p.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setCurrentMin(Math.min(...prices));
        setCurrentMax(Math.max(...prices));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(currentPage);
  }, [currentPage]);

  const handleFilter = () => {
    const filtered = originalProducts.filter((product) => {
      const price = product.discounted_price || product.price;
      return price >= currentMin && price <= currentMax;
    });
    setProducts(filtered);
  };

  const handleReset = () => {
    setProducts(originalProducts);
    setCurrentMin(minPrice);
    setCurrentMax(maxPrice);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="text-center container py-5 text-primary">
        <h1 className="mt-4 mb-5 text-left">
          <strong>Bestsellers</strong>
        </h1>

        {/* Filters */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-3 text-center">
            <label htmlFor="minRange" className="form-label fw-bold text-dark">
              Min Price: <span className="text-warning">${currentMin}</span>
            </label>
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
            <label htmlFor="maxRange" className="form-label fw-bold text-dark">
              Max Price: <span className="text-warning">${currentMax}</span>
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
            <button className="btn btn-warning me-2" onClick={handleFilter}>
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
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              updateCartCount={updateCartCount}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls mt-4">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
