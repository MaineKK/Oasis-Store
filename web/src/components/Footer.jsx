import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; 

function Footer () {
    return (
      <footer className="bg-red-50 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <a href="#" className="text-xl text-gray-800 hover:text-red-600">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl text-gray-800 hover:text-red-600">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl text-gray-800 hover:text-red-600">
              <FaTwitter /> 
            </a>
          </div>
    
          <div className="text-gray-800">
          <ul className="flex space-x-4">
            <li><a href="#">Support</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">API Status</a></li>
          </ul>
          <ul className="flex space-x-4">
            <li><a href="#">Company</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
          <ul className="flex space-x-4">
            <li><a href="#">Legal</a></li>
            <li><a href="#">Claim</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer