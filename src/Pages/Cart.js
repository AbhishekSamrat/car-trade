import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeItem } from "../ReduxToolKit/Slices/cartSlice";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems = [], loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (itemId) => dispatch(removeItem(itemId));

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  if (loading)
    return <p className="text-lg text-gray-600 text-center">Loading cart...</p>;

  if (error) {
    return (
      <p className="text-red-600 text-center">
        {typeof error === "string"
          ? error
          : error.message || "An error occurred."}
      </p>
    );
  }

  return (
    <div className=" mx-auto p-6">
      {/* Hero Image Banner */}
      <div
        className="relative w-full h-64 bg-cover bg-center rounded-md overflow-hidden"
        style={{
          backgroundImage: `url('https://th.bing.com/th/id/OIP.GbDa7ZT8GzdrKPg8xmDJJgHaB2?rs=1&pid=ImgDetMain')`, // Change to your image path
        }}
      >
    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white p-6">
  <h1 className="text-3xl font-bold drop-shadow-lg">🚗 Your Dream Car Awaits! 🚀</h1>
  <p className="text-lg mt-2 drop-shadow-md">
    Find the perfect ride and make it yours today!
  </p>
</div>

      </div>

      <h2 className="text-3xl text-center font-bold my-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                className="p-4 bg-white shadow-md rounded-md flex items-center space-x-4"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-contain rounded-md bg-white"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-bold">
                    {item.brand} - {item.models}
                  </h3>
                  <p className="text-gray-600">
                    $ {item.price?.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  {/* Buy Now Button */}
                  <Link
                    to="/dealer-call"
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                  >
                    Buy Now
                  </Link>

                  {/* Remove Button */}
                  <button
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex justify-center items-center w-10 h-10"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Price Section */}
          <div className="mt-6 p-4 bg-gray-100 rounded-md flex justify-between items-center">
            <h3 className="text-xl font-bold">Total:</h3>
            <p className="text-2xl font-semibold text-green-600">
              $ {totalPrice.toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
