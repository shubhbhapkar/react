import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        message: ""
    });
    const [statusMessage, setStatusMessage] = useState("");

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setStatusMessage("");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch("http://localhost:8000/user/contact/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setStatusMessage("Message sent successfully!");
                setFormData({ name: "", subject: "", message: "" }); // Reset the form
            } else {
                const errorData = await response.json();
                setStatusMessage(`Failed to send message: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            setStatusMessage("An error occurred while sending the message.");
            console.error(error);
        }
    };

    return (
        <>
          <div
  className="container-fluid text-white py-5"
  style={{
    backgroundImage:`url('https://img.freepik.com/free-photo/3d-dark-grunge-display-background-with-smoky-atmosphere_1048-16218.jpg?semt=ais_hybrid')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="text-center mb-5">
    <h1 className="text-primary display-4 fw-bold">Contact Us</h1>
    <p className="lead text-light mt-lg-3 mt-sm-0">
      Have any questions? We're here to help! Reach out using the form below.
    </p>
  </div>

  <div className="row justify-content-center">

    <div className="col-12 col-md-5 col-lg-4 mb-4 mt-xl-5">
      <div style={{  padding: "30px", borderRadius: "10px" }}>
      
        <div className="mb-4">
            <h4
                title="open location"
                className="text-warning"
                onClick={() => window.open('https://www.google.com/maps?q=Pandit+Colony,+Nashik+414101', '_blank')}
                style={{ cursor: 'pointer' }} 
            >
                <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                Address
            </h4>
            <p className="text-info mb-0">
                Eaglbypte Pvt Ltd Pandit Colony, <br />
                Nashik 414101
            </p>
         </div>


   
        <div className="mb-4">
          <h4 style={{ color: "#50C878" }}>
            <FontAwesomeIcon icon={faPhone} className="me-2" />
            Phone
          </h4>
          <p className="text-info mb-0">+91 9359477699</p>
        </div>


        <div>
          <h4 className="text-danger">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Email
          </h4>
          <p className="text-info">shubhambhapkar0@gmail.com</p>
        </div>
      </div>
    </div>


    <div className="col-12 col-md-7 col-lg-6">
      <div style={{  padding: "30px", borderRadius: "10px" }}>
        <form onSubmit={handleSubmit}>
          <h3 className="text-primary mb-4 text-center">Get in Touch</h3>
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Your subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
          <textarea
            className="form-control mb-3"
            placeholder="Your Message"
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <button className="btn btn-primary w-100" type="submit">
            Send Message
          </button>
        </form>
        {statusMessage && (
          <div className="mt-3 text-center">
            <p className="text-danger">{statusMessage}</p>
          </div>
        )}
      </div>
    </div>
  </div>
  <div className="text-center">
      <iframe 
      title="location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.7964807682683!2d73.7734876!3d20.0020625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb8b9c3d14a9%3A0xad6f158a306dd206!2sManasvi%20Tech%20Solutions!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
      width="600" 
      height="450" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
</div>

        </>
    );
};

export default Contact;
