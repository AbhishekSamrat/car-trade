import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Sample Car Data
const carData = {
  
  popular: [
    { id: 1, name: "Toyota Corolla", price: "$20,000", image: "/images/toyota.png" },
    { id: 2, name: "Honda Civic", price: "$22,000", image: "/images/honda.png" },
    { id: 3, name: "Ford Focus", price: "$19,500", image: "/images/ford.png" },
  ],
  upcoming: [
    { id: 4, name: "Tesla Model Y", price: "Coming Soon", image: "/images/tesla.png" },
    { id: 5, name: "BMW i4", price: "Coming Soon", image: "/images/bmw.png" },
    { id: 5, name: "BMW i4", price: "Coming Soon", image: "/images/ferrari.png" },
  ],
  latest: [
    { id: 6, name: "Hyundai Ioniq 5", price: "$45,000", image: "/images/hyundai.png" },
    { id: 7, name: "Mercedes EQB", price: "$50,000", image: "/images/mercedes.png" },
    { id: 5, name: "BMW i4", price: "Coming Soon", image: "/images/lamborghini.png" },
  ],
};

const CarShowcase = () => {
  const [activeTab, setActiveTab] = useState("popular");

  return (
    <section className="py-10 px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Car Showcase</h2>
        <p className="text-gray-500 mt-2">Find the best deals on used, upcoming, and new cars.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mt-6">
        {["popular", "upcoming", "latest"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
              activeTab === tab ? "bg-blue-600 text-white scale-105 shadow-md" : "bg-gray-200 text-gray-700 hover:bg-blue-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "popular" ? "Popular Cars" : tab === "upcoming" ? "Upcoming Cars" : "Latest Launches"}
          </button>
        ))}
      </div>

      {/* Car Grid with Animation */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {carData[activeTab].map((car) => (
            <motion.div
              key={car.id}
              className="bg-white p-4 rounded-lg shadow-md overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-3">{car.name}</h3>
              <p className="text-gray-500">{car.price}</p>
              <div className="flex justify-center mt-6">
  <Link
    to="dealer-call"
    className="bg-blue-600 text-white px-6 py-1 rounded-md hover:bg-blue-700 transition text-lg font-semibold shadow-md"
  >
    Buy Now
  </Link>
</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CarShowcase;
