import React, { useState, useEffect } from 'react';

const GetStocks = ({ sku }) => {
  const [stocks, setStocks] = useState([]);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stockResponse = await fetch(`http://localhost:5001/api/v1/products/stocks?sku=${sku}`);
        if (!stockResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const stockData = await stockResponse.json();
        setStocks(stockData);
        console.log(stockData)
      } catch (error) {
        console.error('Error fetching stocks:', error);
        setError(error.message);
      }

      try {
        const productResponse = await fetch(`http://localhost:5001/api/v1/products?sku=${sku}`);
        if (!productResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const productData = await productResponse.json();
        console.log(productData);
        setProductData(productData);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [sku]);

  return { stocks, productData, loading, error };
};

export default GetStocks;
