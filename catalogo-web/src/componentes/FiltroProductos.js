import React from 'react';
import "./FiltroProductos.css"

const FiltroProductos = ({ filtros, onChange, onSortChange, tallas, tipos, marcas }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSortChange = (e) => {
    const [attribute, order] = e.target.value.split('-');
    onSortChange(attribute, order);
  };

  return (
    <div className="filter-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscador"
          name="nombre"
          value={filtros.nombre}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-options">
        <select name="talla" value={filtros.talla} onChange={handleInputChange}>
          <option value="">Talla</option>
          {tallas.map(talla => (
            <option key={talla} value={talla}>{talla}</option>
          ))}
        </select>
        <select name="tipo" value={filtros.tipo} onChange={handleInputChange}>
          <option value="">Tipo</option>
          {tipos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
        <select name="marca" value={filtros.marca} onChange={handleInputChange}>
          <option value="">Marca</option>
          {marcas.map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
        <select name="region" value={filtros.region} onChange={handleInputChange}>
          <option value="">Región</option>
        </select>
        <select name="comuna" value={filtros.comuna} onChange={handleInputChange}>
          <option value="">Comuna</option>
        </select>
        <input
          type="number"
          placeholder="Precio Máximo"
          name="precio"
          value={filtros.precio}
          onChange={handleInputChange}
        />
        <select name="sucursal" value={filtros.sucursal} onChange={handleInputChange}>
          <option value="">Sucursal</option>
        </select>
      </div>
      <div className="sort-options">
        <select onChange={handleSortChange}>
          <option value="nombre-asc">A-Z</option>
          <option value="nombre-desc">Z-A</option>
          <option value="precio-asc">Menor a Mayor</option>
          <option value="precio-desc">Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
};

export default FiltroProductos;
