import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GetStocks from './GetStocks';
import "./detalleStyle.css";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stocks, productData, loading, error } = GetStocks({ sku: id });
  const [detailedStocks, setDetailedStocks] = useState([]);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      const storeDataPromises = stocks.map(async (stock) => {
        const storeResponse = await fetch(`http://localhost:5001/api/v1/stores?id=${stock.idStore}`);
        if (!storeResponse.ok) {
          throw new Error(`Error fetching store info: ${storeResponse.statusText}`);
        }
        const storeInfo = await storeResponse.json();
        console.log(storeInfo)
        return {
          ...stock,
          storeName: storeInfo.storeName,
          address: storeInfo.address,
        };
      });

      const stocksWithStoreInfo = await Promise.all(storeDataPromises);
      setDetailedStocks(stocksWithStoreInfo);
    };

    if (stocks.length > 0) {
      fetchStoreDetails();
    }
  }, [stocks]);

  const redirectToPage = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>Producto {productData.name}</h1>
      <div className="product-info">
        <p><strong>Precio:</strong> ${productData.price}</p>
        <p><strong>Descripción:</strong> {productData.description}</p>
        <p><strong>SKU:</strong> {id}</p>
      </div>
      <div className="store-stock">
        <h2>Tiendas y Stock</h2>
        <table>
          <thead>
            <tr>
              <th>Tienda</th>
              <th>Dirección</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {detailedStocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.storeName}</td>
                <td>{stock.address || 'N/A'}</td>
                <td>{stock.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={redirectToPage}>Volver al Catálogo</button>
    </div>
  );
}

export default DetalleProducto;
