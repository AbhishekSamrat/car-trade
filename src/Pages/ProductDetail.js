import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const navigate = useNavigate()
  const { _id } = useParams();
  const { products } = useSelector((state) => state.items); // Get products from Redux store
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === _id);
    setProduct(foundProduct);
  }, [_id, products]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 md:p-12 bg-gray-100 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-12">
        {/* Car Image */}
        <motion.div
          className="w-full flex justify-center items-center bg-white rounded-lg shadow-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-96 object-contain rounded-md"
          />
        </motion.div>

        {/* Car Details */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800">{product.brand}</h2>
          <p className="text-gray-500 mt-1">{product.brand} | {product.models}</p>

          <div className="mt-4">
            <p className="text-2xl font-semibold text-blue-600">
              ₹ {product.price ? Number(product.price).toLocaleString() : "N/A"}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-semibold">Fuel Type:</span> {product.fuelType || "Petrol"}</p>
            <p><span className="font-semibold">Transmission:</span> {product.transmission || "Manual"}</p>
            <p><span className="font-semibold">Seating Capacity:</span> {product.seats || "5"}</p>
            <p><span className="font-semibold">Mileage:</span> {product.mileage || "N/A"}</p>
            <p><span className="font-semibold">Year:</span> {product.year || "2023"}</p>
            <p><span className="font-semibold">Condition:</span> {product.condition || "New"}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center items-center">
  <motion.button
    className="cursor-pointer bg-gradient-to-r from-red-500 to-purple-500 text-white px-6 py-2 rounded-md font-semibold shadow-md transition-all hover:from-purple-500 hover:to-red-500 "
    whileHover={{ scale: 1.05 }}
    animate={{ opacity: [1, 0.5, 1] }}
    transition={{ repeat: Infinity, duration: 1 }}
    onClick={() => navigate("/dealer-call")}
  >
    Get a Call from Dealer
  </motion.button>
</div>


        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
