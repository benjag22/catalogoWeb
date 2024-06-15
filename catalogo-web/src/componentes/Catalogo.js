import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./catalogoStyle.css";

function Catalogo() {
    const navigate = useNavigate();

    const handleDetailsClick = (id) => {
        navigate(`/detalles/${id}`);
    };

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
                    <button onClick={() => handleDetailsClick(1)}>Detalles</button>
                </div>
            </div>
        </div>
    );
}

export default Catalogo;
