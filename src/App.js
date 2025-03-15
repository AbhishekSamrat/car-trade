
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./Components/Header";

import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import ProductDetail from "./Pages/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "./ReduxToolKit/Slices/Fetchproducts";
import { useEffect } from "react";
import NewCars from "./Pages/NewCars";
import UsedCars from "./Pages/UsedCar";
import DealerPage from "./Pages/DealerPage";
import LoginPage from "./Pages/LogIn";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";



function App() {

  const dispatch = useDispatch()
    const {products,status,error} = useSelector((state)=> state.items)//
    
    console.log("productsssss",products);


    async function getData(){
      let res = await fetch('localhost://5000/data');
      let data= await res.json();
      console.log(data);
    }
   
   
    useEffect(() => {
      dispatch(fetchproducts()); // Fetch data when the component mounts
      // getData();
  }, [dispatch]);
   
    if(status === "loading"){
      return  <p>loading</p>
    }if(status === "rejected"){
     return <p>Error,{error}</p>
    }
  
 

  return (
    <BrowserRouter>
    <Header products={products} />
     <Routes>
    <Route path="/"  element={<Home products={products} />}  />
    <Route path="/product/:_id"  element={<ProductDetail />}  />
    <Route path="/search"  element={<Search />}  />
    <Route path="/new-cars" element={<NewCars />} />
    <Route path="/used-cars" element={<UsedCars />} />
    <Route path="/dealer-call" element={<DealerPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
  <Footer />
    </BrowserRouter>
  );
}

export default App;
