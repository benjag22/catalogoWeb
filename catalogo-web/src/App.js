import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Catalogo from './componentes/Catalogo';
import DetalleProducto from './componentes/DetalleProducto';
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Catalogo} />
                <Route path="/detalles/:id" component={DetalleProducto} />
            </Switch>
        </Router>
    );
}

export default App;