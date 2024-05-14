import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getCategories } from './fetcher';
import ProductDetails from './Components/ProductDetails';
import Layout from './Components/Layout';
import Basket from './Components/Basket';
import Checkout from './Components/Checkout';
import Category from './Components/Category';
import Home from './Components/Home';
import OrderConfirmation from './Components/OrderConfirmation';
import SearchResults from './Components/SearchResults';

function App() {
  const [categories,setCategories] = useState({
    errorMessage:'',
    data:[]
  });
  
  useEffect(()=>{
    const fetchData = async () =>{
      const responseObject =await getCategories();
      setCategories(responseObject);
    };
    fetchData();
  },[]);

  
  
  return (
  <>
  <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout categories={categories}/>}>
                        <Route index element={<Home />} />
                        <Route path="basket" element={<Basket />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="orderconfirmation" element={<OrderConfirmation />} />
                        <Route path="search" element={<SearchResults/>}/>
                        <Route path="categories/:categoryId" element={<Category />} />
                        <Route path="products/:productId" element={<ProductDetails />} />
                    </Route>
                </Routes>
            </BrowserRouter>
  </>
  );
}
// --watch src/db/db.json --port 3001
export default App;
