import { FaInstagram, FaXTwitter, FaMeta } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-600 text-sm mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>

          <p className="text-gray-600 text-sm mb-4">
            Sign up and get 10% off your first order.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="border px-3 py-2 w-full text-sm rounded-l-md outline-none"
            />
            <button className="bg-black text-white px-4 py-2 text-sm rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Men's Top Wear</li>
            <li>Women's Top Wear</li>
            <li>Men's Bottom Wear</li>
            <li>Women's Bottom Wear</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>FAQs</li>
            <li>Features</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

          <div className="flex space-x-4 text-xl mb-6">
            <FaMeta />
            <FaInstagram />
            <FaXTwitter />
          </div>

          <p className="text-gray-600 text-sm mb-2">Call Us</p>

          <div className="flex items-center space-x-2 text-sm font-medium">
            <FiPhone />
            <span>8081648805</span>
          </div>
        </div>
      </div>

      {/* bottom copyright */}
      <div className="border-t text-center py-6 text-gray-500 text-sm">
        © 2024, CompileTab. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;