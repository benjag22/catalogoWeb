import React, { useState, useEffect } from 'react';

const GetTipo = () => {
  const [tipo, setTipo] = useState([]);

  useEffect(() => {
    const fetchTipo = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/products/types');
        if (!response.ok) {
            console.log(response)
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTipo(data);
      } catch (error) {
        console.error('Error fetching tallas:', error);
      }
    };

    fetchTipo();
  }, []);

  return tipo;
};

export default GetTipo;
