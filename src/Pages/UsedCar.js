import { useLocation } from "react-router-dom";

const UsedCars = () => {
  const location = useLocation();
  const usedCars = location.state?.usedCars || [];

  return (
    <div className="container mx-auto p-12 mt-12">
      <h1 className="text-2xl font-bold mb-4">Used Cars</h1>
      {usedCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {usedCars.map((car, index) => (
            <div key={index} className="border p-4 rounded-md shadow-md">
              <img src={car.image} alt={car.brand} className="w-full h-40 object-cover rounded-md" />
              <h2 className="text-lg font-semibold mt-2">{car.brand}</h2>
              <p className="text-gray-500">{car.model}</p>
              <p className="text-blue-600 font-semibold">$ {car.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No used cars available.</p>
      )}
    </div>
  );
};

export default UsedCars;
