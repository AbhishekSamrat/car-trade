import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const DealerPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carModel: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { width, height } = useWindowSize();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect to home after 5 seconds
  };

  return (
    <div
  className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative overflow-hidden"
  style={{
    backgroundImage: "url('https://i.pinimg.com/originals/fc/89/f7/fc89f7f892cb91cc9d15290ac191e564.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>

      {submitted ? (
        <>
          {/* Confetti Effect */}
          <Confetti width={width} height={height} numberOfPieces={300} />

          {/* Balloons Floating Animation */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -height, opacity: 1 }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: "3rem",
              }}
            >
              🎈
            </motion.div>
          ))}

          {/* Congratulations Message */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-xl text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Your request has been submitted successfully. A dealer will
              contact you soon!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-3 text-lg bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Go Back Home
            </button>
          </motion.div>
        </>
      ) : (
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            Get a Call from Dealer
          </h1>
          <p className="text-gray-600 mb-6">
            Enter your details and a dealer will contact you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="carModel"
              placeholder="Car Model"
              value={formData.carModel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-md font-bold shadow-md hover:from-purple-500 hover:to-blue-500 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Submit Request
            </motion.button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DealerPage;
