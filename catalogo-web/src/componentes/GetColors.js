import React, { useState, useEffect } from 'react';

const GetColors = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/products/colors');
        if (!response.ok) {
            console.log(response)
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setColors(data);
      } catch (error) {
        console.error('Error fetching tallas:', error);
      }
    };

    fetchColors();
  }, []);

  return colors;
};

export default GetColors;
