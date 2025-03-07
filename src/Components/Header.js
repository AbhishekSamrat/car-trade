import { useEffect, useState, useMemo } from "react";
import { FiMenu, FiUser, FiChevronDown } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ products }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ Memoized search filter
  const searchResults = useMemo(() => {
    if (!products || !search.trim()) return [];
    return products.filter((item) =>
      item.brand?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  // ✅ Navigate to search results when user types
  useEffect(() => {
    if (searchResults.length > 0) {
      navigate("/search", { state: { results: searchResults } });
      setTimeout(() => {
        setSearch("");
      }, 3000);
    }
  }, [searchResults, navigate]);

  // ✅ Handle dropdown toggle
  const handleDropdown = (menuName) => {
    setDropdownOpen(dropdownOpen === menuName ? null : menuName);
  };

  // ✅ Handle "New Cars" Click - Navigate to NewCars page
  const handleNewCarsClick = () => {
    const filteredCars = products?.filter((car) => car.category === "new cars");
    navigate("/new-cars", { state: { newCars: filteredCars } });
  };

  // ✅ Handle "Used Cars" Click - Navigate to UsedCars page
  const handleUsedCarsClick = () => {
    const filteredCars = products?.filter((car) => car.category === "used cars");
    navigate("/used-cars", { state: { usedCars: filteredCars } });
  };

  return products ? (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CarTrade
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { name: "Buy", subMenu: ["New Cars", "Used Cars", "Compare Cars"] },
            { name: "Sell", subMenu: ["Sell Car", "Car Valuation"] },
            { name: "Services", subMenu: ["Car Loan", "Insurance"] },
            { name: "Reviews", subMenu: [] },
            { name: "More", subMenu: ["News", "Guides"] },
          ].map((item, index) => (
            <div className="relative group" key={index}>
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                onClick={() => handleDropdown(item.name)}
              >
                {item.name} {item.subMenu.length > 0 && <FiChevronDown />}
              </button>

              {item.subMenu.length > 0 && dropdownOpen === item.name && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                  {item.subMenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={
                        subItem === "New Cars"
                          ? handleNewCarsClick
                          : subItem === "Used Cars"
                          ? handleUsedCarsClick
                          : null
                      }
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search Bar */}
        <form className="hidden md:flex items-center border rounded-full px-3 py-1" onSubmit={(e) => e.preventDefault()}>
          <AiOutlineSearch className="text-gray-500" />
          <input
            type="text"
            value={search}
            placeholder="Search cars..."
            className="outline-none px-2 text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* User Icon */}
        <button className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
          <FiUser className="text-xl" />
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          {[
            { name: "Buy", subMenu: ["New Cars", "Used Cars", "Compare Cars"] },
            { name: "Sell", subMenu: ["Sell Car", "Car Valuation"] },
            { name: "Services", subMenu: ["Car Loan", "Insurance"] },
            { name: "Reviews", subMenu: [] },
            { name: "More", subMenu: ["News", "Guides"] },
          ].map((item, index) => (
            <div key={index} className="py-2">
              <button
                onClick={() => handleDropdown(item.name)}
                className="flex justify-between items-center w-full text-left text-gray-700 hover:text-blue-600"
              >
                {item.name} {item.subMenu.length > 0 && <FiChevronDown />}
              </button>

              {item.subMenu.length > 0 && dropdownOpen === item.name && (
                <div className="pl-4 mt-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={
                        subItem === "New Cars"
                          ? handleNewCarsClick
                          : subItem === "Used Cars"
                          ? handleUsedCarsClick
                          : null
                      }
                      className="block py-1 text-gray-700 hover:text-blue-600"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  ) : (
    <p>Loading...</p>
  );
};

export default Header;
