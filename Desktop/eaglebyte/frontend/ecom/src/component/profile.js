import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
    });

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // Track edit mode

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("http://localhost:8000/user/profile/", {
                    withCredentials: true,
                });
    
                // Check and log the response to verify the data structure
                console.log("Full Response:", response);
    
                const userData = Array.isArray(response.data) ? response.data[0] : response.data;
                if (userData) {
                    setUser({
                        id: userData.id || "",
                        username: userData.username || "",
                        first_name: userData.first_name || "",
                        last_name: userData.last_name || "",
                        email: userData.email || "",
                        phone_number: userData.phone_number || "",
                        address: userData.address || "",
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setLoading(false);
            }
        };
    
        fetchUserProfile();
    }, []); 

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };



    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const csrfToken = getCookie("csrftoken");



    const handleSaveClick = async () => {
        try {
            axios.patch("http://localhost:8000/user/profileUpdate/", user, {
                headers: {
                    "X-CSRFToken": csrfToken, // Include the CSRF token in the header
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
           
            
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow-lg rounded">
                    <div className="card-header bg-primary text-white text-center">
                        <h4>My Profile</h4>
                    </div>
                    <div className="card-body bg-light">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    value={user.username}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    className="form-control"
                                    value={user.first_name}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    className="form-control"
                                    value={user.last_name}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    className="form-control"
                                    value={user.phone_number}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea
                                    id="address"
                                    className="form-control"
                                    rows="3"
                                    value={user.address}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
    
                            {isEditing ? (
                                <button type="button" className="btn btn-success w-100 py-2 fs-5 mt-3" onClick={handleSaveClick}>
                                    Save Profile
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary w-100 py-2 fs-5 mt-3" onClick={handleEditClick}>
                                    Edit Profile
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
    
    );
};

export default Profile;
