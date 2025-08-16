import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Shield, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold">Western International Bank</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted financial partner since 1985. We provide comprehensive banking solutions 
              with a commitment to security, innovation, and exceptional customer service.
            </p>
            <div className="flex items-center space-x-4">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">FDIC Insured • Equal Housing Lender</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Personal Banking</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Business Banking</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Loans & Mortgages</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Investment Services</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white transition-colors">Credit Cards</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300">+1(323) 419-2943</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-300">support@westernbank.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-yellow-500 mt-1" />
                <span className="text-gray-300">
                  249 E Ocean Blvd<br />
                  Long Beach, CA 90802
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <Link to="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="#" className="text-gray-300 hover:text-white text-sm transition-colors">Security</Link>
              <Link to="#" className="text-gray-300 hover:text-white text-sm transition-colors">Accessibility</Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">256-bit SSL Encryption</span>
              </div>
              <Link 
                to="/admin" 
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            © 2025 Western International Bank. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;