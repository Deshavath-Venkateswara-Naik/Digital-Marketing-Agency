// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import BlogPage from './components/Blog/BlogPage';
import BlogPostDetail from './components/Blog/BlogPostDetail';
import AdminBlog from './components/Blog/AdminBlog';
import ServicesPage from './components/Services/Services';
import ServiceDetailsPage from './components/Services/ServiceDetail';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import ContactForm from './components/ContactForm/ContactUsForm';
import PricingPage from './components/Pricing/PricingPage';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostDetail />} />
        <Route path="/adminblog" element={<AdminBlog />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactForm />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
