import { useEffect, useState, useMemo } from "react";
import { FiMenu, FiUser, FiChevronDown, FiLogOut, FiShoppingCart } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../ReduxToolKit/Slices/cartSlice";

const Header = ({ products }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const dispatch = useDispatch();
  const { cartItems = [], loading, error } = useSelector((state) => state.cart); // Ensure cartItems is always an array

  let cartlength = cartItems?.length > 0 ? cartItems.length : "";

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const searchResults = useMemo(() => {
    if (!products || !search.trim()) return [];
    return products.filter((item) =>
      item.brand?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  useEffect(() => {
    if (searchResults.length > 0) {
      navigate("/search", { state: { results: searchResults } });
      setTimeout(() => {
        setSearch("");
      }, 3000);
    }
  }, [searchResults, navigate]);

  const handleNewCarsClick = () => {
    const filteredCars = products?.filter((car) => car.category === "new cars");
    navigate("/new-cars", { state: { newCars: filteredCars } });
  };

  const handleUsedCarsClick = () => {
    const filteredCars = products?.filter((car) => car.category === "used cars");
    navigate("/used-cars", { state: { usedCars: filteredCars } });
  };

  return (
    <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">CarTrade</Link>

        <nav className="hidden md:flex items-center space-x-6">
          {[
            { name: "Buy", subMenu: ["New Cars", "Used Cars"] },
            { name: "Sell", subMenu: ["Sell Car", "Car Valuation"] },
            { name: "Services", subMenu: ["Car Loan", "Insurance"] },
            { name: "Reviews", subMenu: [] },
            { name: "More", subMenu: ["News", "Guides"] },
          ].map((item, index) => (
            <div className="relative group" key={index}>
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
              >
                {item.name} <FiChevronDown />
              </button>
              {dropdownOpen === item.name && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                  {item.subMenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={
                        subItem === "New Cars" ? handleNewCarsClick :
                        subItem === "Used Cars" ? handleUsedCarsClick :
                        null
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

        <div className="flex items-center gap-4">
          {/* Add to Cart Button */}
          <Link to="/cart" className="relative">
            {cartlength && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartlength}
              </span>
            )}
            <FiShoppingCart className="text-2xl text-gray-700 hover:text-blue-600" />
          </Link>

          {isLoggedIn ? (
            <button
              className="text-gray-700 hover:text-red-600 border border-gray-300 px-4 py-1 rounded-md flex items-center"
              onClick={handleLogout}
            >
              <FiLogOut className="text-xl" />
              <span className="ml-2">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center text-gray-700 hover:text-blue-600 border border-gray-300 px-4 py-1 rounded-md"
            >
              <FiUser className="text-xl" />
              <span className="ml-2">Login</span>
            </Link>
          )}
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
