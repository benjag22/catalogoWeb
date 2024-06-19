import React, { useState } from 'react';
import "./FiltroProductos.css";

const FiltroProductos = ({ filtros, onChange, onSortChange, tallas, tipos, marcas, regiones }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    onChange(name, selectedValues);
  };

  const handleSortChange = (e) => {
    const [attribute, order] = e.target.value.split('-');
    onSortChange(attribute, order);
  };

  const handleRegionChange = (e) => {
    const { value } = e.target;
    setSelectedRegion(value);
    onChange('region', value);
    onChange('comuna', '');  // Clear comuna when region changes
  };

  const handleCommuneChange = (e) => {
    const { value } = e.target;
    onChange('comuna', value);
  };

  const filteredComunas = regiones.find(region => region.name === selectedRegion)?.communes || [];

  return (
    <div className="filter-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscador"
          name="name"
          value={filtros.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-options">
        <input
          type="number"
          placeholder="Precio Mínimo"
          name="minPrice"
          value={filtros.minPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Precio Máximo"
          name="maxPrice"
          value={filtros.maxPrice}
          onChange={handleInputChange}
        />
        <select name="size" value={filtros.size} onChange={handleSelectChange} multiple>
          {tallas.map(talla => (
            <option key={talla.id} value={talla.name}>{talla.name}</option>
          ))}
        </select>
        <select name="type" value={filtros.type} onChange={handleSelectChange} multiple>
          {tipos.map(tipo => (
            <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
          ))}
        </select>
        <select name="brand" value={filtros.brand} onChange={handleSelectChange} multiple>
          {marcas.map(marca => (
            <option key={marca.id} value={marca.name}>{marca.name}</option>
          ))}
        </select>
        <select name="region" value={filtros.region} onChange={handleRegionChange}>
          {regiones.map(region => (
            <option key={region.number} value={region.number}>{region.name}</option>
          ))}
        </select>
        <select
          name="commune"
          value={filtros.commune}
          onChange={handleCommuneChange}
          disabled={!filtros.region}
        >
          {filteredComunas.map(comuna => (
            <option key={comuna.name} value={comuna.name}>{comuna.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Color"
          name="color"
          value={filtros.color}
          onChange={handleInputChange}
        />
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
