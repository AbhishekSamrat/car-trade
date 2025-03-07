import React from "react";
import { motion } from "framer-motion";

// Sample car comparison data
const comparisons = [
  {
    id: 1,
    car1: { name: "Porsche ", image: "/images/porsche.png" },
    car2: { name: "jaguar Endeavour", image: "/images/jaguar.png" },
  },
  {
    id: 2,
    car1: { name: "Lexus Ca", image: "/images/lexus.png" },
    car2: { name: "subaru Seltos", image: "/images/subaru.png" },
  },
  {
    id: 3,
    car1: { name: "volkswagen City", image: "/images/volkswagen.png" },
    car2: { name: "mazda Virtus", image: "/images/mazda.png" },
  },
  {
    id: 4,
    car1: { name: "kia St", image: "/images/kia.png" },
    car2: { name: "hyundai Altroz", image: "/images/hyundai.png" },
  },
];

const CarComparison = () => {
  return (
    <section className="py-10 px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Popular New Cars Comparisons</h2>
        <p className="text-gray-500 mt-2">Compare the best cars and choose the right one for you.</p>
      </div>

      {/* Comparison Grid */}
      <motion.div
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {comparisons.map((comp) => (
          <motion.div
            key={comp.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex justify-center items-center space-x-4">
              {/* Car 1 */}
              <div className="flex flex-col items-center">
                <img src={comp.car1.image} alt={comp.car1.name} className="w-32 h-20 object-contain" />
                <h3 className="text-md font-semibold mt-2">{comp.car1.name}</h3>
              </div>
              <span className="text-lg font-bold text-gray-600">VS</span>
              {/* Car 2 */}
              <div className="flex flex-col items-center">
                <img src={comp.car2.image} alt={comp.car2.name} className="w-32 h-20 object-contain" />
                <h3 className="text-md font-semibold mt-2">{comp.car2.name}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CarComparison;
