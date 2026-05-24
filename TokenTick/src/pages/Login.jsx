import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoFull from '../assets/logotick.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Activar spinner
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // ✅ Captura correcta del error — siempre suelta el loading
      const msg =
        err?.response?.data?.message ||  // Error del backend { message: "..." }
        err?.message ||                   // Error de red o JS
        'Credenciales incorrectas. Inténtalo de nuevo.';
      setError(msg);
    } finally {
      setLoading(false); // ✅ Siempre se desactiva, tanto si va bien como si falla
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center tt-card shadow" style={{ maxWidth: '450px', padding: '3rem 2rem' }}>
        <img src={logoFull} alt="TokenTick Logo" className="img-fluid mb-4" />

        {error && (
          <div className="alert alert-danger p-2 small" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-3">
            <label className="form-label small text-sub">Email de IT</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-control"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small text-sub">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-control"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-gold w-100 mt-2 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Verificando...
              </>
            ) : 'Acceder al Sistema'}
          </button>
        </form>

        <div className="mt-3">
          <p className="small text-muted">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#c5a059' }}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;