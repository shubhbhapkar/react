import React from "react";
import { Link, NavLink } from "react-router-dom";
const Footer = () =>{
    return(
        <>
   

<div className="text-white bg-dark">
  <div className="container py-5">
    {/* Contact Information Row */}
    <div className="row mb-4 text-center text-md-start">
      <div className="col-12 col-md-4 mb-3 mb-md-0">
        <img 
          src={`${process.env.PUBLIC_URL}/images/linkedin-icon.png`} 
          alt="LinkedIn" 
          className="me-2" 
          width="20" 
        />
        <NavLink href="/about" className="text-white text-decoration-none">Loram Ipsum Hosting Web</NavLink>
      </div>
      <div className="col-12 col-md-4 mb-3 mb-md-0">
        <img 
          src={`${process.env.PUBLIC_URL}/images/call-icon.png`} 
          alt="Phone" 
          className="me-2" 
          width="20" 
        />
        <NavLink href="/about" className="text-white text-decoration-none">Call: +7586656566</NavLink>
      </div>
      <div className="col-12 col-md-4">
        <img 
          src={`${process.env.PUBLIC_URL}/images/mail-icon.png`} 
          alt="Email"
          className="me-2" 
          width="20" 
        />
        <NavLink href="/about" className="text-white text-decoration-none">demo@gmail.com</NavLink>
      </div>
    </div>

    {/* Footer Links Section */}
    <div className="row text-center text-md-start">
      {/* Useful Links */}
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <h5 className="text-uppercase mb-3">Useful Links</h5>
        <ul className="list-unstyled">
          <li><NavLink href="index.html" className="text-white">Home</NavLink></li>
          <li><Link to="/about" className="text-white">About</Link></li>
          <li><NavLink href="repair.html" className="text-white">Service</NavLink></li>
          <li><Link to="/contact" className="text-white">Contact Us</Link></li>
        </ul>
      </div>

      {/* Our Products */}
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <h5 className="text-uppercase mb-3">Our Products</h5>
        <p>Many companies work under us.</p>
      </div>

      {/* Connect With Us */}
      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
        <h5 className="text-uppercase mb-3">Connect With Us</h5>
        <div className="d-flex justify-content-center justify-content-md-start">
          <NavLink href="/about" className="me-3">
            <img src={`${process.env.PUBLIC_URL}/images/twitter-icon.png`} alt="Twitter" width="20" />
          </NavLink>
          <NavLink href="/about" className="me-3">
            <img src={`${process.env.PUBLIC_URL}/images/linkedin-icon.png`} alt="LinkedIn" width="20" />
          </NavLink>
          <NavLink href="/about" className="me-3">
            <img src={`${process.env.PUBLIC_URL}/images/mail-icon.png`} alt="Email" width="20" />
          </NavLink>
          <NavLink href="/about" className="me-3">
            <img src={`${process.env.PUBLIC_URL}/images/youtub-icon.png`} alt="YouTube" width="20" />
          </NavLink>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="text-center py-3">
      <p className="mb-0">&copy; 2024 YourBrand. Shubham Bhapkar All rights reserved.</p>
    </div>
  </div>
</div>


  </>
    )
}

export default Footer;