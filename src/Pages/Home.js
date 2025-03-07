import React from 'react'
 import HeroSection from '../Components/Hero';
import PopularNewCars from "../Components/PopularNewCar";
import CarShowcase from "../Components/Popularusedcar";
import CarComparison from "../Components/CarComparison";
import BrandSearch from "../Components/BrandSearch";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {fetchproducts} from "../ReduxToolKit/Slices/Fetchproducts";

const Home = ({products}) => {
    
  return (
    <div>
        <HeroSection products = {products} />
       <PopularNewCars products={products} />
       <CarShowcase />
       <BrandSearch  products = {products} />
       <CarComparison  />
    </div>
  )
}

export default Home