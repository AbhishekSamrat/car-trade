
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



function App() {

  const dispatch = useDispatch()
    const {products,status,error} = useSelector((state)=> state.items)//
    
    console.log("productsssss",products);
   
   
    useEffect(() => {
      dispatch(fetchproducts()); // Fetch data when the component mounts
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
  </Routes>
  <Footer />
    </BrowserRouter>
  );
}

export default App;
