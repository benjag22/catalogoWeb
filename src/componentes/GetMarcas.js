import React, { useState, useEffect } from 'react';

const GetMarcas = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/products/brands');
        if (!response.ok) {
            console.log(response)
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMarcas(data);
      } catch (error) {
        console.error('Error fetching tallas:', error);
      }
    };

    fetchMarcas();
  }, []);

  return marcas;
};

export default GetMarcas;
