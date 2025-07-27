import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalogo from './componentes/Catalogo';
import DetalleProducto from './componentes/DetalleProducto';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Catalogo />} />
                <Route path="/detalles/:id" element={<DetalleProducto />} />
            </Routes>
        </Router>
    );
}

export default App;
