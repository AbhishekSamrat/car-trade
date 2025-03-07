import React from "react";
import { useLocation } from "react-router-dom";


const Search = () => {
  const location = useLocation(); //search
  const searchResults = location.state?.results || [];
  
  console.log("searchResultsssssss",searchResults);// ✅ Get data from `navigate()`

  return (
    <div className="p-20 mt-20">
      {searchResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-center text-red-600 font-bold text-lg mb-4">
            No products found
          </h3>
          <h1>Try searching for a different brand.</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow-lg">
              <img src={product.image} alt={product.brand} className="h-40 mx-auto" />
              <h2 className="text-lg font-semibold mt-2">{product.brand}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
