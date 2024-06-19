import React, { useState } from 'react';
import "./FiltroProductos.css";

const FiltroProductos = ({ filtros, onChange, onSortChange, tallas, tipos, marcas, regiones }) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');

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

  const handleCheckboxChange = (e, name) => {
    const { value, checked } = e.target;
    const updatedValues = checked
      ? [...filtros[name], value]
      : filtros[name].filter(item => item !== value);
    onChange(name, updatedValues);
  };

  const handleRegionChange = (e) => {
    const { value } = e.target;
    setSelectedRegion(value);
    onChange('region', value);
  };

  const handleCommuneChange = (e) => {
    const { value } = e.target;
    onChange('commune', value);
  };

  const filteredComunas = regiones.find(region => region.number === parseInt(selectedRegion))?.communes || [];

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
        <div className="checkbox-group">
          <span>Tallas:</span>
          {tallas.map(talla => (
            <label key={talla.id}>
              <input
                type="checkbox"
                value={talla.id}
                checked={filtros.size.includes(talla.id)}
                onChange={(e) => handleCheckboxChange(e, 'size')}
              />
              {talla.name}
            </label>
          ))}
        </div>
        <div className="checkbox-group">
          <span>Tipos:</span>
          {tipos.map(tipo => (
            <label key={tipo.id}>
              <input
                type="checkbox"
                value={tipo.id}
                checked={filtros.type.includes(tipo.id)}
                onChange={(e) => handleCheckboxChange(e, 'type')}
              />
              {tipo.name}
            </label>
          ))}
        </div>
        <div className="checkbox-group">
          <span>Marcas:</span>
          {marcas.map(marca => (
            <label key={marca.id}>
              <input
                type="checkbox"
                value={marca.id}
                checked={filtros.brand.includes(marca.id)}
                onChange={(e) => handleCheckboxChange(e, 'brand')}
              />
              {marca.name}
            </label>
          ))}
        </div>
        <select name="region" value={selectedRegion} onChange={handleRegionChange}>
          <option value=''>Seleccione una región</option>
          {regiones.map(region => (
            <option key={region.number} value={region.number}>{region.name}</option>
          ))}
        </select>
        <select
          name="commune"
          value={selectedCommune}
          onChange={handleCommuneChange}
          disabled={!selectedRegion}
        >
          <option value="">Seleccione una comuna</option>
          {filteredComunas.map(comuna => (
            <option key={comuna.number} value={comuna.id}>{comuna.name}</option>
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