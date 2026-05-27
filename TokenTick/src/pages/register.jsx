import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpiar error cuando el usuario empieza a escribir
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/auth/register', formData);
      console.log('Registro exitoso:', response.data);
      
      // Mostrar mensaje de éxito
      setSuccess('¡Usuario registrado con éxito! Redirigiendo al login...');
      
      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Error en registro:', err);
      
      // Obtener el mensaje de error específico del Backend
      let errorMessage = 'Error al registrarse. Intenta de nuevo.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 400) {
        errorMessage = 'El email ya está registrado o los datos son inválidos';
      } else if (err.response?.status === 500) {
        errorMessage = 'Error del servidor. Intenta más tarde.';
      } else if (err.message === 'Network Error') {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      }
      
      setError(errorMessage);
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
              <strong>Error:</strong> {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>¡Éxito!</strong> {success}
              <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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

