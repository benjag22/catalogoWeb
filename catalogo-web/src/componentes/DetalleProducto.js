import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./detalleStyle.css";

function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const redirectToPage = () => {
        navigate("/");
    };

    return (
        <div className="product-detail-container">
            <h1>Producto {id}</h1>
            <div className="product-info">
                <p><strong>Precio:</strong> $XX.XX</p>
                <p><strong>Descripción:</strong> Esta es la descripción del producto {id}.</p>
                <p><strong>SKU:</strong> 123456</p>
            </div>
            <div className="store-stock">
                <h2>Tiendas y Stock</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Tienda</th>
                            <th>Dirección</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tienda 1</td>
                            <td>Dirección 1</td>
                            <td>Stock 1</td>
                        </tr>
                        <tr>
                            <td>Tienda 2</td>
                            <td>Dirección 2</td>
                            <td>Stock 2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={redirectToPage}>Volver al Catálogo</button>
        </div>
    );
}

export default DetalleProducto;
