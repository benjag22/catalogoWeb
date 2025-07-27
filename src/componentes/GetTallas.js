import React, { useState, useEffect } from 'react';

const GetTallas = () => {
  const [tallas, setTallas] = useState([]);

  useEffect(() => {
    const fetchTallas = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/products/sizes');
        if (!response.ok) {
            console.log(response)
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTallas(data);
      } catch (error) {
        console.error('Error fetching tallas:', error);
      }
    };

    fetchTallas();
  }, []);

  return tallas;
};

export default GetTallas;
