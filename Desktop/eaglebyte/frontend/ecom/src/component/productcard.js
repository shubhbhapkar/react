// src/components/ProductCard.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, addToCart,updateCartCount}) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
      <div className="card h-100 border border-3">
        <div
          className="bg-image hover-zoom ripple "
          data-mdb-ripple-color="light"
          style={{
            width: '100%',
            height: '250px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={`http://127.0.0.1:8000${product.product_colors[0].image_url}`}
            className="w-100 h-100 object-fit-cover border border-3"
            alt=""
          />

          {/* Discount Badge */}
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-danger">{product.discount}% off</span>
          </div>

          {/* "Add to Cart" Button */}
          <div className="position-absolute bottom-0 end-0 m-2">
            <button
              className="btn btn-outline-dark rounded-pill px-3 py-2 d-flex align-items-center shadow-sm"
              title="Add to cart"
              onClick={() => {
                addToCart(product); // First function
                updateCartCount(1);// Second function
              }}
              
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            </button>
          </div>
        </div>

        <div className="card-body">
          <Link to={`/product/${product.id}`} className="text-reset">
            <h5 className="card-title mb-3">{product.productname}</h5>
          </Link>
          <NavLink to={`/products/${product.category.name}`} className="text-warning">
            <p>{product.category.name}</p>
          </NavLink>
          <h6 className="mb-3">
            <s>${product.price}</s>
            <strong className="ms-2 text-danger">${product.discounted_price}</strong>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
