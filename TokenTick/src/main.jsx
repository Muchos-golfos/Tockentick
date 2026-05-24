import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// 1. Primero importamos los estilos base de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. Importamos el JS de Bootstrap (para que funcionen botones y menús)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 3. ¡IMPORTANTE! Importamos tus estilos después de Bootstrap
// Esto permite que el color dorado de .btn-gold gane a los colores de Bootstrap
import './styles/custom.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);