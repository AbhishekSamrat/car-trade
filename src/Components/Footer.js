import React, { useState } from "react";
import { FaLinkedinIn, FaYoutube, FaXTwitter, FaRobot } from "react-icons/fa6";

const Footer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is an AI response. How can I help you?", sender: "ai" },
        ]);
      }, 1000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 - About Company */}
        <div>
          <h2 className="text-xl font-bold">Car Trade</h2>
          <p className="mt-3 text-gray-400">
            Buy and sell cars easily with the best deals in the market. Trusted by millions.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Sell Your Car</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3 - Social Media & Newsletter */}
        <div>
          <h2 className="text-xl font-bold">Stay Connected</h2>
          <p className="mt-3 text-gray-400">Subscribe to our newsletter for the latest updates.</p>

          {/* Newsletter Form */}
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md text-black outline-none w-full"
            />
            {/* <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">
              Subscribe
            </button> */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        © 2025 Car Trade. All rights reserved.
      </div>

      {/* Fixed Social Media Icons */}
      <div className="fixed left-4 bottom-1/3 flex flex-col space-y-3 z-50">
     
      
  
        <a href="https://www.youtube.com/cartrade" className="p-3 bg-red-600 rounded-full text-white shadow-lg hover:scale-110 transition">
          <FaYoutube size={20} />
        </a>
        <a href="https://x.com/Car_Trade" className="p-3 bg-gray-800 rounded-full text-white shadow-lg hover:scale-110 transition">
          <FaXTwitter size={20} />
        </a>
        <a href="https://www.linkedin.com/company/cartrade-com/?originalSubdomain=in" className="p-3 bg-blue-700 rounded-full text-white shadow-lg hover:scale-110 transition">
          <FaLinkedinIn size={20} />
        </a>
      </div>

      {/* AI Chat Support Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition flex items-center"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <FaRobot size={24} />
        </button>
      </div>

      {/* AI Chat Support Popup */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-5 w-80 bg-white text-black shadow-xl rounded-lg p-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-bold">AI Chat Support</h3>
            <button className="text-gray-600 hover:text-red-500" onClick={() => setIsChatOpen(false)}>✖</button>
          </div>
          <div className="h-40 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md text-sm ${
                  msg.sender === "user" ? "bg-blue-500 text-white ml-auto w-fit" : "bg-gray-200 text-black mr-auto w-fit"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-l-md text-black outline-none"
            />
            <button
              className="bg-blue-600 px-4 py-2 text-white rounded-r-md hover:bg-blue-700"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
