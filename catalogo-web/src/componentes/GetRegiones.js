import React, { useState, useEffect } from 'react';

const GetRegiones = () => {
  const [regiones, setRegiones] = useState([]);

  useEffect(() => {
    const fetchTallas = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/regions');
        if (!response.ok) {
            console.log(response)
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setRegiones(data);
      } catch (error) {
        console.error('Error fetching tallas:', error);
      }
    };

    fetchTallas();
  }, []);

  return regiones;
};

export default GetRegiones;
