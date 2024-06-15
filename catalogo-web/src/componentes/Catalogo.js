import React from 'react';
import { Link } from 'react-router-dom';
import "./catalogoStyle.css";

function Catalogo() {
    return (
        <div className="catalog-container">
            <div className="search-bar">
                <input type="text" placeholder="Buscador" />
                <button>
                    <img src="images/filter-icon.png" alt="Filtrar" />
                </button>
                <button>
                    <img src="images/sort-icon.png" alt="Ordenar" />
                </button>
            </div>
            <div className="product-list">
                <div className="product-item">
                    <span>Producto 1</span>
                    <span>Precio</span>
                    <span className="availability">Disponible</span>
                    <Link to="/detalles/1">
                        <button>Detalles</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Catalogo;