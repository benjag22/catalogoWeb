import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FiltroProductos from './FiltroProductos';
import GetTallas from './GetTallas';
import GetMarcas from './GetMarcas';
import GetTipo from './GeTipo'
import GetRegiones from './GetRegiones';
import "./catalogoStyle.css";

const Catalogo = () => {
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/detalles/${id}`);
  };

  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    type: [],
    size: [],
    region: [],
    commune: [],
    brand: [],
    color: '',
    sortByPrice: '',
    sortByName: ''
  });
  
  const regiones = GetRegiones();
  const brands = GetMarcas();
  const types = GetTipo();
  const sizes = GetTallas();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const queryString = buildQueryString(filters);
        const response = await fetch(`http://localhost:5001/api/v1/products${queryString}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(`http://localhost:5001/api/v1/products${queryString}`)
        console.log(data)

        setProductos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    cargarProductos();
  }, [filters]);

  const buildQueryString = (filters) => {
    const query = Object.entries(filters)
      .filter(([key, value]) => value && value.length > 0)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=${value.join(',')}`;
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');
    return query ? `?${query}` : '';
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSortChange = (attribute, order) => {
    setFilters({
      ...filters,
      sortByName: attribute === 'nombre' ? order : filters.sortByName,
      sortByPrice: attribute === 'precio' ? order : filters.sortByPrice
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(productos.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationControls = () => (
    <div className="pagination">
      <button
        onClick={() => handlePageChange('prev')}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange('next')}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="catalog-container">
      <FiltroProductos
        filtros={filters}
        onChange={handleFilterChange}
        onSortChange={handleSortChange}
        tallas={sizes}
        tipos={types}
        marcas={brands}
        regiones={regiones}
      />
      <div className="product-list">
        {currentItems.map(productos => (
          <div key={productos.sku} className="product-item">
            <span>Nombre: {productos.name}</span>
            <span>Precio: ${productos.price} CLP</span>
            <span className={`availability ${productos.eliminado ? 'agotado' : ''}`}>
              {productos.eliminado ? 'Agotado' : 'Disponible'}
            </span>
            <button onClick={() => handleDetailsClick(productos.sku)}>Detalles</button>
          </div>
        ))}
      </div>

      {renderPaginationControls()}
    </div>
  );
};

export default Catalogo;
