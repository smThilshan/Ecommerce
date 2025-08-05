import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className='my-10 px-4 sm:px-6 md:px-12'>
      {/* Title and description */}
      <div className='text-center py-6 text-2xl sm:text-3xl md:text-4xl font-semibold'>
        <Title text1="LATEST" text2="COLLECTION" />
        <p className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 m-auto text-sm sm:text-base text-gray-600 mt-3'>
          Discover our newest arrivals – carefully selected to bring you the latest in fashion and lifestyle. Shop the trendiest pieces before they’re gone!
        </p>
      </div>

      {/* Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
