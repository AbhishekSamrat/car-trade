import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ products }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Store filtered results
  const navigate = useNavigate();

  // ✅ Handle search on button click
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!search.trim()) {
      setSearchResults([]); // Reset if empty input
      return;
    }

    // Filter products based on search term
    const filteredResults = products.filter((item) =>
      item.brand?.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  // ✅ Navigate when searchResults update
  useEffect(() => {
    if (searchResults.length === 1) {
      navigate("/search", { state: { results: searchResults } }); // ✅ Passing filtered data via state
      setSearch(""); // Reset input after navigation
    }
  }, [searchResults, navigate]);

  return (
    <section
      className="relative bg-cover bg-center h-[500px] md:h-[600px] flex items-center justify-center text-center px-4"
      style={{ backgroundImage: "url('/h1.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Find Your Dream Car Easily
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Browse through thousands of cars and choose the perfect one for you.
        </p>

        {/* Search Bar */}
        <form
          className="mt-6 flex items-center bg-white rounded-full p-2 shadow-md max-w-md mx-auto"
          onSubmit={handleSearch}
        >
          <AiOutlineSearch className="text-gray-500 text-xl ml-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand, model..."
            className="w-full p-2 outline-none text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full z-50"
          >
            Search
          </button>
        </form>

        {/* Display Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4 bg-white p-4 rounded-md shadow-md text-gray-800">
            <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
            <ul>
              {searchResults.map((car) => (
                <li key={car.id} className="py-1">
                  {car.brand} - {car.model}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
