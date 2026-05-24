import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada a tu backend (asegúrate de que existe el endpoint /auth/register)
      await api.post('/auth/register', formData);
      alert('¡Usuario registrado con éxito!');
      navigate('/login'); // Una vez registrado, le mandamos al login
    } catch (err) {
      console.error(err);
      alert('Error al registrarse. Revisa los datos.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow" style={{ width: '400px', border: 'none', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4" style={{ color: '#c5a059' }}>Crear Cuenta</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-gold w-100 mt-2">
              Registrarse
            </button>
          </form>

          <p className="text-center mt-3 small">
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#c5a059', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;