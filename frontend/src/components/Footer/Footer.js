import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container footer-sec">
        <div className="copy-right-sec d-flex justify-content-between">
          <p className="copy-right">
            &copy; 2025 Deshavath Venkateswara Naik. All Rights Reserved.
          </p>
          <div>
            {/* Social Media Logos with Links */}
            <a
              href="https://www.facebook.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-logo"
                src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1706617641/Wabeler/ktzoghgtys5x4al7o3wb.png"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-logo"
                src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1706617641/Wabeler/nmdcgqxcn2b60f7fokbq.png"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-logo"
                src="https://res.cloudinary.com/dpcfyn3si/image/upload/v1706617641/Wabeler/ulntztj0icjfivajoctb.png"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
