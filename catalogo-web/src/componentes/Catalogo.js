import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FiltroProductos from './FiltroProductos';
import "./catalogoStyle.css";

const Catalogo = () => {
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/detalles/${id}`);
  };

  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({
    talla: '',
    tipo: '',
    marca: '',
    region: '',
    comuna: '',
    nombre: '',
    precio: '',
    sucursal: ''
  });
  const [sortOrder, setSortOrder] = useState({ attribute: 'nombre', order: 'asc' });

  const [tallas, setTallas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch('/productos.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data);

        const uniqueTallas = [...new Set(data.map(producto => producto.id_talla))];
        const uniqueTipos = [...new Set(data.map(producto => producto.id_tipo))];
        const uniqueMarcas = [...new Set(data.map(producto => producto.id_marca))];

        setTallas(uniqueTallas);
        setTipos(uniqueTipos);
        setMarcas(uniqueMarcas);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    cargarProductos();
  }, []);

  const handleFiltroChange = (name, value) => {
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const handleSortChange = (attribute, order) => {
    setSortOrder({ attribute, order });
  };

  const filtrarProductos = () => {
    let filteredProducts = productos.filter(producto => {
      const cumpleFiltros =
        (!filtros.talla || producto.id_talla === parseInt(filtros.talla)) &&
        (!filtros.tipo || producto.id_tipo === parseInt(filtros.tipo)) &&
        (!filtros.marca || producto.id_marca === parseInt(filtros.marca)) &&
        (!filtros.region || producto.region === filtros.region) &&
        (!filtros.comuna || producto.comuna === filtros.comuna) &&
        (!filtros.nombre || producto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
        (!filtros.precio || producto.precio <= parseFloat(filtros.precio)) &&
        (!filtros.sucursal || producto.sucursal === filtros.sucursal);

      return cumpleFiltros;
    });

    if (sortOrder.attribute && sortOrder.order) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sortOrder.attribute === 'precio') {
          return sortOrder.order === 'asc' ? a.precio - b.precio : b.precio - a.precio;
        } else {
          const nameA = a.nombre.toLowerCase();
          const nameB = b.nombre.toLowerCase();
          if (nameA < nameB) return sortOrder.order === 'asc' ? -1 : 1;
          if (nameA > nameB) return sortOrder.order === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }

    return filteredProducts;
  };

  return (
    <div className="catalog-container">
      <FiltroProductos
        filtros={filtros}
        onChange={handleFiltroChange}
        onSortChange={handleSortChange}
        tallas={tallas}
        tipos={tipos}
        marcas={marcas}
      />

      <div className="product-list">
        {filtrarProductos().map(producto => (
          <div key={producto.sku} className="product-item">
            <span>{producto.nombre}</span>
            <span>Precio: ${producto.precio}</span>
            <span className={`availability ${producto.eliminado ? 'agotado' : ''}`}>
              {producto.eliminado ? 'Agotado' : 'Disponible'}
            </span>
            <button onClick={() => handleDetailsClick(producto.sku)}>Detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
