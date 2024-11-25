


import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./Navbar";
import addToCart from "./add to cart";
import ProductCard from "./productcard";
import CartCount from "./cartCount";

const ProductDisplay = () => {
  const {cartCount,setCartCount,updateCartCount} = CartCount();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);  // State for selected color

  // const [cartCount, setCartCount] = useState(0);

  // const updateCartCount = () => {
  //   setCartCount( cartCount + 1);
  //   console.log("cartcountupdated",cartCount)
  // };

//   useEffect(() => {
//     const fetchCartCount = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/user/cartcount/', {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             const data = await response.json();
//             console.log('API Response:', data);

//             // Simulate delay for debugging
//             setTimeout(() => {
//                 setCartCount(data.cart_count);
//                 console.log('Cart count updated after delay:', data.cart_count);
//             }, 1000);
//         } catch (error) {
//             console.error('Error fetching cart count:', error);
//         }
//     };

//     fetchCartCount();
// }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/getproduct/${productId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setSelectedColor(data.product_colors[0]);  // Set the default color to the first one
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch related products whenever `product` updates
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (product && product.category) {
        try {
          const relatedResponse = await fetch(
            `http://localhost:8000/user/products/category/${product.category.name}/`
          );
          if (!relatedResponse.ok) {
            throw new Error("Failed to fetch related products");
          }
          const relatedData = await relatedResponse.json();
          setRelatedProducts(relatedData);
        } catch (error) {
          console.error("Fetch error for related products:", error);
        }
      }
    };

    fetchRelatedProducts();
  }, [product]); // Runs when `product` changes

  const handleColorChange = (color) => {
    const selected = product.product_colors.find(c => c.color === color);
    setSelectedColor(selected);
  };

  const StarRating = ({ rating, totalStars = 5 }) => (
    <div className="d-flex justify-content-center my-3">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <i
            key={index}
            className={`bi ${starValue <= rating ? "bi-star-fill text-warning" : "bi-star text-muted"}`}
            style={{ fontSize: "2rem" }}
          ></i>
        );
      })}
      <p className="ms-3 mt-3">Rating: {rating}</p>
    </div>
  );



  return (
    <>
      <Navbar cartCount = {cartCount}  setCartCount = {setCartCount} updateCartCount = {updateCartCount} />
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border border-secondary rounded shadow-lg">
                <div className="row g-0">
                  <aside className="col-lg-6">
                    <div className="d-flex justify-content-center align-items-center p-3 bg-light h-100 rounded-start overflow-hidden">
                      {product ? (
                        <NavLink href={selectedColor?.image_url} target="_blank" rel="noopener noreferrer" className="w-100 h-100">
                          <img
                            src={`http://127.0.0.1:8000${selectedColor?.image_url}`}
                            alt={product.productname}
                            className="w-100 h-100 rounded border border-secondary"
                            style={{ objectFit: "cover" }}
                          />
                        </NavLink>
                      ) : (
                        <p>Loading image...</p>
                      )}
                    </div>
                  </aside>

                  <main className="col-lg-6">
                    <div className="p-5">
                      <h3 className="text-dark mb-2">{product ? product.productname : "Loading..."}</h3>

                      <h5 className="text-muted mb-3">
                        Brand: <span className="text-dark fw-semibold">{product ? product.productbrand : ""}</span>
                      </h5>

                      <p className="text-muted">
                        Category: <span className="text-primary fw-semibold">{product && product.category ? product.category.name : ""}</span>
                      </p>

                      {/* Color selection dropdown */}
                      {product && product.product_colors.length > 1 && (
                        <div className="mb-3">
                          <label htmlFor="colorSelect" className="form-label">Choose Color</label>
                          <select
                            id="colorSelect"

                            className="form-select"
                            value={selectedColor?.color}
                            onChange={(e) => handleColorChange(e.target.value)}
                          >
                            {product.product_colors.map((colorOption) => (
                              <option key={colorOption.color} value={colorOption.color}>
                                {colorOption.color.charAt(0).toUpperCase() + colorOption.color.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="d-flex align-items-center my-4">
                        <span
                          className={`badge fs-6 ${product && product.stock_quantity ? "bg-success" : "bg-danger"} me-3 py-2 px-3`}
                        >
                          {product && product.stock_quantity ? "In stock" : "Out of stock"}
                        </span>
                        <h4 className="text-primary mb-0">
                          ${product ? product.discounted_price : "0.00"}
                        </h4>
                        <small className="text-muted ms-2">/ per box</small>
                      </div>

                      <p className="text-muted mb-4">
                        {product ? product.description : "Loading product description..."}
                      </p>

                      <hr />

                      <div className="d-flex align-items-center mt-4">
                        {product ? (
                          <StarRating rating={product.rating} totalStars={5} />
                        ) : (
                          <p>Loading rating...</p>
                        )}
                      </div>

                      <div className="d-flex mt-5">
                        <NavLink href="/home/" className="btn btn-warning btn-lg me-3">
                          Buy now
                        </NavLink>
                        <NavLink href="/home/" className="btn btn-outline-primary btn-lg"
                        onClick={() => {addToCart(product);updateCartCount(1)}}
                        >
                          <i className="bi bi-cart me-2"></i>Add to cart
                        </NavLink>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#eee' }}>
      <div className="text-center container py-5">
        <h4 className="mt-4 mb-5">
          <strong>Similar Products</strong>
        </h4>
        <div className="row">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} updateCartCount={updateCartCount} />
          ))}
        </div>
      </div>
    </section>

    </>
  );
};

export default ProductDisplay;
