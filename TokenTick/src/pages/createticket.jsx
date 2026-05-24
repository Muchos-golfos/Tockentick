import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Se envía directamente el objeto form en formato JSON
      await api.post('/tickets', {
        title: form.title,
        description: form.description,
        priority: form.priority
      });

      navigate('/tickets');
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Error al crear la incidencia.');
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions = [
    { value: 'low',      label: '🟢 Baja — No es urgente' },
    { value: 'medium',   label: '🟡 Media — Afecta a mi trabajo' },
    { value: 'high',     label: '🔴 Alta — Bloquea mi trabajo' },
  ];

  return (
    <div className="container mt-5" style={{ maxWidth: '680px' }}>
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/tickets">Tickets</Link></li>
          <li className="breadcrumb-item active">Nueva Incidencia</li>
        </ol>
      </nav>

      <div className="tt-card shadow-sm p-4">
        <h4 className="mb-4 fw-bold">Reportar Nueva Incidencia</h4>

        {error && <div className="alert alert-danger p-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div className="mb-3">
            <label className="form-label small fw-semibold">
              Título <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Ej: El ordenador no arranca"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descripción */}
          <div className="mb-3">
            <label className="form-label small fw-semibold">
              Descripción detallada <span className="text-danger">*</span>
            </label>
            <textarea
              name="description"
              className="form-control"
              rows={5}
              placeholder="Explica el problema: qué ocurre, cuándo empezó, qué has intentado..."
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Prioridad */}
          <div className="mb-3">
            <label className="form-label small fw-semibold">Prioridad</label>
            <div className="d-flex flex-column gap-2">
              {priorityOptions.map(opt => (
                <label
                  key={opt.value}
                  className={`p-3 rounded border d-flex align-items-center gap-3 cursor-pointer ${form.priority === opt.value ? 'border-warning bg-warning bg-opacity-10' : 'border-light-subtle'}`}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={opt.value}
                    checked={form.priority === opt.value}
                    onChange={handleChange}
                    className="form-check-input mt-0"
                  />
                  <span className="small">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-gold px-4" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" />Enviando...</>
              ) : 'Enviar Incidencia'}
            </button>
            <Link to="/tickets" className="btn btn-outline-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;