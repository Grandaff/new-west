import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Smartphone, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Define the global init callback Google expects
    (window as any).googleTranslateElementInit = function () {
      const w = window as any;
      if (w.google && w.google.translate) {
        new w.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,zh-CN,ar,hi,pt,ru,ja',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // Avoid injecting multiple times
    const existing = document.getElementById('google-translate-script');
    if (!existing) {
      const gtScript = document.createElement('script');
      gtScript.id = 'google-translate-script';
      gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      gtScript.async = true;
      document.body.appendChild(gtScript);
    } else {
      // If script already present, try init immediately
      (window as any).googleTranslateElementInit?.();
    }

    return () => {
      // Do not remove the script to preserve widget across navigations.
      // If you want to fully clean up, you could remove the element here.
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      {/* Google Translate widget container */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-end">
          <div id="google_translate_element" className="text-sm" />
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Banking Made
                <span className="text-yellow-400 block">Simple & Secure</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Experience modern banking with Western International Bank. From mobile check deposits 
                to instant transfers, manage your finances with confidence and ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Open Account Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center"
                >
                  Login to Your Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a full suite of banking services designed to simplify your financial life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile Banking",
                description: "Deposit checks, transfer funds, and manage your accounts anytime, anywhere with our award-winning mobile app."
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description: "Your money and data are protected with 256-bit encryption, fraud monitoring, and multi-factor authentication."
              },
              {
                icon: CreditCard,
                title: "Digital Payments",
                description: "Pay bills, send money to friends, and make purchases with our secure digital payment solutions."
              },
              {
                icon: TrendingUp,
                title: "Investment Tools",
                description: "Grow your wealth with our investment platform featuring real-time market data and expert guidance."
              },
              {
                icon: Users,
                title: "24/7 Support",
                description: "Get help whenever you need it with our round-the-clock customer support via phone, chat, or email."
              },
              {
                icon: Award,
                title: "Award-Winning Service",
                description: "Recognized for excellence in customer service and innovative banking solutions year after year."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  if (feature.title === "Mobile Banking") {
                    alert("Mobile Banking - Download our app from the App Store or Google Play");
                  } else if (feature.title === "Bank-Level Security") {
                    alert("Security - Learn more about our advanced security measures");
                  } else if (feature.title === "Digital Payments") {
                    alert("Digital Payments - Explore our payment solutions");
                  } else if (feature.title === "24/7 Support") {
                    alert("24/7 Support - Contact us at +1(323) 419-2943");
                  } else if (feature.title === "Award-Winning Service") {
                    alert("Award-Winning Service - See our awards and recognition");
                  }
                }}
              >
                <div className="bg-blue-700 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Banking Products & Services
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our comprehensive range of financial products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DollarSign,
                title: "Checking Accounts",
                description: "No monthly fees, unlimited transactions",
                rate: "0.05% APY"
              },
              {
                icon: TrendingUp,
                title: "Savings Accounts",
                description: "High-yield savings with competitive rates",
                rate: "4.25% APY"
              }
            ].map((product, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  window.location.href = '/signup';
                }}
              >
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <product.icon className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="text-blue-700 font-semibold">{product.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Western International Bank 
            with their financial future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Open Your Account
            </Link>
            <Link
              to="#"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Schedule Appointment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;