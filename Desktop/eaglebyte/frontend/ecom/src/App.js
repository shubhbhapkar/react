// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/login';
import RegistrationPage from './component/registration';
import HomePage from './component/Home';
import About from './component/about';
import Contact from './component/contact';
import ProductDisplay from './component/productdetails';
import Mycart from './component/mycart';
import Category from './component/categoryproduct';
import Profile from './component/profile';
import PasswordReset from './component/forgetpassemail';
import PasswordResetForm from './component/passreset';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/product/:productId' element={<ProductDisplay/>}/>
                <Route path='/Mycart' element={<Mycart/>}/>
                <Route path="/products/:category_name" element={<Category/>}/>
                <Route path='/user/' element={<Profile/>}/>
                <Route path='/password/' element={<PasswordReset/>}/>
                <Route path="/password-reset/:uid/:token" element={<PasswordResetForm />} />
               
            </Routes>
            
        </Router>
    );
};

export default App;
