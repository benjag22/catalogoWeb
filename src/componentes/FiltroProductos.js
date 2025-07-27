import React, { useState, useEffect } from 'react';
import "./FiltroProductos.css";

const FiltroProductos = ({ filtros, onChange, onSortChange, tallas, tipos, marcas, regiones }) => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCommunes, setSelectedCommunes] = useState(filtros.commune || []);

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
    const { value, checked } = e.target;
    const updatedRegions = checked
      ? [...selectedRegions, value]
      : selectedRegions.filter(region => region !== value);

    setSelectedRegions(updatedRegions);
    onChange('region', updatedRegions);
  };

  const handleCommuneChange = (e) => {
    const { value, checked } = e.target;
    const updatedCommunes = checked
      ? [...selectedCommunes, value]
      : selectedCommunes.filter(commune => commune !== value);

    setSelectedCommunes(updatedCommunes);
    onChange('commune', updatedCommunes);
  };

  const filteredCommunes = regiones
    .filter(region => selectedRegions.length === 0 || selectedRegions.includes(region.number.toString()))
    .flatMap(region => region.communes);

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
        <div className="checkbox-group-container">
          <div className="checkbox-group-title">Tallas:</div>
          <div className="checkbox-group-content">
            {tallas.map(talla => (
              <label key={talla.id}>
                <input
                  type="checkbox"
                  value={talla.id}
                  checked={filtros.size.includes(talla.id.toString())}
                  onChange={(e) => handleCheckboxChange(e, 'size')}
                />
                {talla.name}
              </label>
            ))}
          </div>
        </div>
        <div className="checkbox-group-container">
          <div className="checkbox-group-title">Tipos:</div>
          <div className="checkbox-group-content">
            {tipos.map(tipo => (
              <label key={tipo.id}>
                <input
                  type="checkbox"
                  value={tipo.id}
                  checked={filtros.type.includes(tipo.id.toString())}
                  onChange={(e) => handleCheckboxChange(e, 'type')}
                />
                {tipo.name}
              </label>
            ))}
          </div>
        </div>
        <div className="checkbox-group-container">
          <div className="checkbox-group-title">Marcas:</div>
          <div className="checkbox-group-content">
            {marcas.map(marca => (
              <label key={marca.id}>
                <input
                  type="checkbox"
                  value={marca.id}
                  checked={filtros.brand.includes(marca.id.toString())}
                  onChange={(e) => handleCheckboxChange(e, 'brand')}
                />
                {marca.name}
              </label>
            ))}
          </div>
        </div>
        <div className="checkbox-group-container">
          <div className="checkbox-group-title">Regiones:</div>
          <div className="checkbox-group-content">
            {regiones.map(region => (
              <label key={region.number}>
                <input
                  type="checkbox"
                  value={region.number}
                  checked={selectedRegions.includes(region.number.toString())}
                  onChange={handleRegionChange}
                />
                {region.name}
              </label>
            ))}
          </div>
        </div>
        <div className="checkbox-group-container">
          <div className="checkbox-group-title">Comunas:</div>
          <div className="checkbox-group-content">
            {filteredCommunes.map(comuna => (
              <label key={comuna.id}>
                <input
                  type="checkbox"
                  value={comuna.id}
                  checked={selectedCommunes.includes(comuna.id.toString())}
                  onChange={handleCommuneChange}
                />
                {comuna.name}
              </label>
            ))}
          </div>
        </div>
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
