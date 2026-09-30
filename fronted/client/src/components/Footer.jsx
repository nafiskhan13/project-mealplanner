import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-500 bg-gradient-to-b text-black py-10 mt-2 rounded-t-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-4">Meal Planner</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-gray-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-gray-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="text-center">
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">
                <FaFacebook/>
              </a>
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">
                
                <FaTwitter/>
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">
                <FaInstagram/>
              </Link>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <form className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-center md:justify-end">
              <input
                type="text"
                placeholder="Enter your message"
                className=" bg-white px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-black">
          <p>&copy; {new Date().getFullYear()} Meal Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;