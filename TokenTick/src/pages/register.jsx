import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpiar error cuando el usuario empieza a escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', formData);
      console.log('Registro exitoso:', response.data);
      alert('¡Usuario registrado con éxito!');
      navigate('/login');
    } catch (err) {
      console.error('Error en registro:', err);
      
      // Mostrar el mensaje específico del Backend
      const errorMessage = err.response?.data?.message || 'Error al registrarse. Revisa los datos.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow" style={{ width: '400px', border: 'none', borderRadius: '15px' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4" style={{ color: '#c5a059' }}>Crear Cuenta</h3>
          
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input 
                type="text" 
                className="form-control" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-gold w-100 mt-2"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
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

