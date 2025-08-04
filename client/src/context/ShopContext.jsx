import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "USD"; 
  const deliveryCost = 5.99;   

  const value = {
    products, currency, deliveryCost,
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;