import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './slider.css'; // Custom CSS file for styling

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  

  const products = [
    {
      id: 1,
      image: "https://img.freepik.com/free-psd/flat-design-sale-template-banner_23-2149201133.jpg",
      title: 'Product 1',
      description: 'A high-quality item designed with precision and durability.',
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-vector/electronics-store-template-design_23-2151143812.jpg",
      title: 'Product 2',
      description: 'Elegance and functionality combined in one piece.',
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-psd/gradient-fashion-youtube-cover-template_23-2150014572.jpg",
      title: 'Product 3',
      description: 'Perfect for daily use, crafted with care and precision.',
    },
  ];

  

  // Handle Next Slide
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // Handle Previous Slide
  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Handle Slide Select (for manual controls if needed)
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // Auto Slide Logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically go to the next slide
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [products.length]); // Re-run if product length changes

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={handleSelect}
      controls={false} // Disable default controls, we'll use custom ones
      indicators={false} // Disable indicators
      interval={null} // Disable default auto-cycling
      fade
    >
      {products.map((product, index) => (
        <Carousel.Item key={product.id}>
          <div className="carousel-image-wrapper">
            <div className="carousel-image">
              <img
                className="d-block w-100 rounded-3"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div
              className={`carousel-caption-wrapper ${
                activeIndex === index ? "show" : ""
              }`}
            >
              <div className="carousel-caption">
                <h5 className="carousel-title">{product.title}</h5>
                <p className="carousel-description">{product.description}</p>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}

      {/* Basic Previous Button */}
      <button
        className="carousel-control-prev"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <span>&lt;</span> {/* Basic left arrow */}
      </button>

      {/* Basic Next Button */}
      <button
        className="carousel-control-next"
        onClick={handleNext}
        aria-label="Next"
      >
        <span>&gt;</span> {/* Basic right arrow */}
      </button>
      </Carousel>
  );
};

export default Slider;
