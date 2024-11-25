// src/LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './slider.css'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = { username, password };
        console.log('Logging in with:', loginData);

        try {
            const response = await fetch('http://localhost:8000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
                credentials:'include',
            });
            if (response.ok) {
                const data = await response.json();

                sessionStorage.setItem('user', JSON.stringify({ username: data.username, isLoggedIn: true }));

                console.log('Login successful:', data);

                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
            if (!response.ok) {
                setMessage("Enter correct username or password")
                throw new Error('Login failed!');
                
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div  style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", margin: "0" ,backgroundColor: "#f4f7fc"}}>
            <div className="text-center bg-white backdrop-blur shadow-lg" style={{ width: "90%", maxWidth: "400px", padding: "2rem", borderRadius: "20px", boxSizing: "border-box" }}>
                <h2 className="text-dark">Login</h2>
                
                <form onSubmit={handleLogin}>
                    <label className="text-black mt-5">Username:</label><br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value);setMessage("")}}
                        required
                        placeholder="....."
                        className="text-center rounded"
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                    <br />
                    <label className="mt-4">Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value);setMessage('')}}
                        required
                        placeholder="....."
                        className="text-center rounded"
                        style={{ width: "100%", padding: "0.5rem" }}
                    />
                    <br />
                    <button type="submit" className="mt-4 rounded bg-black text-white" style={{ width: "48%", margin: "1% 1%" }}>Login</button>
                    <button type="button" className="mt-4 rounded bg-black text-white" style={{ width: "48%", margin: "1% 1%" }} onClick={() => { setUsername(''); setPassword(''); }}>Clear</button>
                </form>
                <span className='text-danger mt-5'>{message}</span>
                <p className="mt-5">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
                <p>
                    <Link to="/password" className="text-decoration-none text-blue text-decoration-underline">Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
