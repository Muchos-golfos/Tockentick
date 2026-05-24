import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tickets')
      .then(res => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar tickets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-5 text-center">Cargando incidencias...</div>;

  return (
    <div className="container-fluid p-4 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-sub">Gestión de Incidencias</h4>
        <Link to="/create-ticket" className="btn btn-gold">+ Nuevo Ticket</Link>
      </div>

      {tickets.length === 0 ? (
        <div className="tt-card shadow-sm p-5 text-center">
          <p className="text-muted">No hay incidencias registradas en este momento.</p>
          <Link to="/create-ticket" className="btn btn-outline-gold mt-2">Crear mi primera incidencia</Link>
        </div>
      ) : (
        <div className="tt-card shadow-sm p-0 overflow-hidden">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Asunto</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Nivel</th>
                <th className="text-end pe-4">Acción</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} style={{ verticalAlign: 'middle' }}>
                  <td className="ps-4 text-muted small">#{t.id}</td>
                  <td><span className="fw-bold">{t.title}</span></td>
                  <td>
                    <span className={`badge ${t.priority === 'critical' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td>
                    <span className="badge rounded-pill border text-dark bg-white">
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td><b className="text-gold">{t.support_level}</b></td>
                  <td className="text-end pe-4">
                    <Link to={`/tickets/${t.id}`} className="btn btn-sm btn-outline-secondary">Ver detalle</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTickets;