import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/ui/StatsCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tickets')
      .then(res => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Ajuste dinámico de los contadores basados en lo que inyecta el backend por rol
  const getStatsValue = (cardType) => {
    if (user.role === 'admin') {
      if (cardType === 'L1') return tickets.filter(t => t.support_level === 'L1' && t.status !== 'resolved').length;
      if (cardType === 'L2') return tickets.filter(t => t.support_level === 'L2' && t.status !== 'resolved').length;
      if (cardType === 'L3') return tickets.filter(t => t.support_level === 'L3' && t.status !== 'resolved').length;
    }
    // Si no es admin, el backend ya le mandó exclusivamente lo suyo y sin resolver
    return tickets.length;
  };

  // Tomamos los últimos 5 tickets recibidos para el resumen (ya pre-filtrados por el backend)
  const recentTickets = [...tickets].slice(0, 5);

  return (
    <div className="container-fluid p-4 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 font-weight-600">
          Hola {user?.name}, ¿Qué incidencias IT gestionamos hoy?
        </h3>
        
        <div className="d-flex gap-2">
          <Link to="/tickets" className="btn btn-outline-gold px-4">
            Mis Tickets
          </Link>
          <Link to="/create-ticket" className="btn btn-gold px-4">
            <i className="bi bi-plus-lg me-2"></i> Crear Incidencia
          </Link>
        </div>
      </div>
      
      {/* Tarjetas de estadísticas adaptadas al rol */}
      <div className="row g-3 mb-4">
        { (user.role === 'helpdesk' || user.role === 'admin') && (
          <div className="col-12 col-md-4">
            <StatsCard title="Nivel 1 (Helpdesk) Pendientes" value={getStatsValue('L1')} color="tt-state-open" />
          </div>
        )}
        { (user.role === 'tic' || user.role === 'admin') && (
          <div className="col-12 col-md-4">
            <StatsCard title="Nivel 2 (TIC Especialistas) Abiertos" value={getStatsValue('L2')} color="tt-state-progress" />
          </div>
        )}
        { user.role === 'admin' && (
          <div className="col-12 col-md-4">
            <StatsCard title="Nivel 3 (Crítico Admins)" value={getStatsValue('L3')} color="tt-state-critical" />
          </div>
        )}
      </div>

      {/* Resumen de Actividad */}
      <div className="tt-card shadow-sm p-4">
        <h5 className="mb-4 text-sub border-bottom pb-2">Resumen de Actividad Reciente</h5>
        
        {loading ? (
          <p className="text-center py-3">Cargando actividad...</p>
        ) : recentTickets.length === 0 ? (
          <p className="text-muted small">No hay tickets pendientes para mostrar.</p>
        ) : (
          <div className="list-group list-group-flush">
            {recentTickets.map(t => (
              <div key={t.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center bg-transparent">
                <div>
                  <Link 
                    to={`/tickets/${t.id}`} 
                    className="fw-bold text-decoration-none h6 mb-1 d-block"
                    style={{ color: '#212529' }}
                  >
                    {t.title}
                  </Link>
                  <small className="text-muted">
                    ID: #{t.id} • Nivel: <span className="text-gold fw-bold">{t.support_level}</span> • 
                    Estado: {t.status.replace('_', ' ')}
                  </small>
                </div>
                <Link to={`/tickets/${t.id}`} className="btn btn-sm btn-light border">
                  Ver detalle
                </Link>
              </div>
            ))}
          </div>
        )}
        
        {tickets.length > 5 && (
          <div className="mt-3 text-center">
            <Link to="/tickets" className="small text-gold fw-bold text-decoration-none">
              Ver todos los tickets →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;