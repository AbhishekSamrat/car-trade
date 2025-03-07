import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";



const BrandSearch = ({products}) => {
  return (
    <section className="py-10 px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Search New Cars by Brand</h2>
        <p className="text-gray-500 mt-2">Choose your favorite car brand and explore models.</p>
      </div>

      {/* Brand Grid */}
      <motion.div 
        className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {products.map((brand) => (
        <Link to={`/product/${brand._id}`}>
              <motion.div
            key={brand._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition"
            whileHover={{ scale: 1.1 }}
          >
            <img src={brand.image} alt={brand.brand} className="w-20 h-20 object-contain" />
            <h3 className="text-lg font-semibold mt-3">{brand.models}</h3>
          </motion.div>
        </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default BrandSearch;
