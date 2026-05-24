import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const TicketDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  const isTech = ['helpdesk', 'tic', 'admin'].includes(user?.role);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const [ticketRes, commentsRes] = await Promise.all([
          api.get(`/tickets/${id}`),
          api.get(`/tickets/${id}/comments`)
        ]);
        setTicket(ticketRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Error al cargar el ticket:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketData();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSending(true);
    try {
      const res = await api.post(`/tickets/${id}/comments`, { body: newComment });
      setComments(prev => [...prev, res.data]);
      setNewComment('');
    } catch {
      alert('Error al enviar el comentario');
    } finally {
      setSending(false);
    }
  };

  const handleUpdatePriority = async (newPriority) => {
    try {
      await api.patch(`/tickets/${id}`, { priority: newPriority });
      setTicket(prev => ({ ...prev, priority: newPriority }));
    } catch {
      alert('No se pudo actualizar la prioridad');
    }
  };

  const handleResolveTicket = async () => {
    if (!window.confirm('¿Estás seguro de marcar esta incidencia como resuelta?')) return;
    try {
      await api.patch(`/tickets/${id}/resolve`);
      navigate('/tickets'); 
    } catch {
      alert('Error al resolver el ticket');
    }
  };

  const handleEscalate = async () => {
    if (!window.confirm('¿Estás seguro de que deseas escalar esta incidencia? Al hacerlo, perderás el acceso a ella.')) return;
    try {
      await api.patch(`/tickets/${id}/escalate`);
      navigate('/tickets'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Error al escalar el ticket');
    }
  };

  const getRoleColor = (role) => {
    const map = { admin: '#dc3545', tic: '#fd7e14', helpdesk: '#0d6efd', user: '#6c757d' };
    return map[role] || '#6c757d';
  };

  if (loading) return <div className="p-5 text-center">Cargando detalles de la incidencia...</div>;
  if (!ticket) return <div className="p-5 text-center">Incidencia no encontrada.</div>;

  return (
    <div className="container mt-4">
      {/* Cabecera */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item"><Link to="/tickets">Tickets</Link></li>
              <li className="breadcrumb-item active">#{ticket.id}</li>
            </ol>
          </nav>
          <h2 className="fw-bold">{ticket.title}</h2>
        </div>
        <Link to="/tickets" className="btn btn-outline-secondary btn-sm">Volver</Link>
      </div>

      <div className="row g-4">
        {/* COLUMNA IZQUIERDA: descripción + chat */}
        <div className="col-lg-8">

          {/* Descripción */}
          <div className="tt-card shadow-sm p-4 mb-4">
            <h5 className="text-sub mb-3">Descripción del problema</h5>
            <div className="p-3 bg-light rounded border">{ticket.description}</div>
            {ticket.attachment_path && (
              <div className="mt-3">
                <img
                  src={`http://localhost:3000/${ticket.attachment_path.replace('src/', '')}`}
                  alt="Adjunto"
                  className="img-fluid rounded border"
                  style={{ maxHeight: '250px' }}
                />
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="tt-card shadow-sm p-4">
            <h5 className="text-sub mb-4">Comunicación del ticket</h5>

            {/* Mensajes */}
            <div
              className="mb-4 pe-1"
              style={{ maxHeight: '420px', overflowY: 'auto' }}
            >
              {comments.length === 0 ? (
                <p className="text-center text-muted my-4">No hay mensajes aún. ¡Escribe el primero!</p>
              ) : (
                comments.map((c, idx) => {
                  const isOwn = c.User?.name === user?.name;
                  const isSystem = c.body?.startsWith('SISTEMA:');

                  if (isSystem) {
                    return (
                      <div key={c.id || idx} className="mb-3 p-2 rounded bg-warning-subtle border-start border-warning border-4">
                        <small className="text-muted fw-semibold">{c.body}</small>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={c.id || idx}
                      className={`mb-3 d-flex ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                      <div style={{ maxWidth: '75%' }}>
                        {/* Autor */}
                        <div className={`d-flex align-items-center gap-1 mb-1 ${isOwn ? 'justify-content-end' : ''}`}>
                          <small className="fw-bold" style={{ color: getRoleColor(c.User?.role) }}>
                            {c.User?.name || 'Desconocido'}
                          </small>
                          <small className="text-muted">({c.User?.role})</small>
                          {c.is_internal && (
                            <span className="badge bg-warning text-dark" style={{ fontSize: '0.65rem' }}>Interno</span>
                          )}
                        </div>
                        {/* Burbuja */}
                        <div
                          className="p-2 px-3 rounded-3"
                          style={{
                            backgroundColor: isOwn ? '#c9a84c' : '#f0f0f0',
                            color: isOwn ? '#fff' : '#222',
                          }}
                        >
                          {c.body}
                        </div>
                        <div className={`d-flex ${isOwn ? 'justify-content-end' : ''}`}>
                          <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                            {new Date(c.created_at).toLocaleString('es-ES', {
                              day: '2-digit', month: '2-digit',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input envío */}
            {isTech && (
              <div className="form-check form-switch mb-2 small">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="internalSwitch"
                />
                <label className="form-check-label text-muted" htmlFor="internalSwitch">
                  Nota interna (no visible para el usuario)
                </label>
              </div>
            )}
            <form onSubmit={handleAddComment}>
              <div className="input-group">
                <textarea
                  className="form-control"
                  placeholder="Escribe una actualización o respuesta..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  rows={2}
                  required
                />
                <button className="btn btn-gold px-4" type="submit" disabled={sending}>
                  {sending ? '...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: panel de control */}
        <div className="col-lg-4">
          <div className="tt-card shadow-sm p-4 sticky-top" style={{ top: '90px' }}>
            <h5 className="mb-4 border-bottom pb-2">Panel de Control</h5>

            <div className="mb-3">
              <label className="form-label small text-muted d-block">Estado Actual</label>
              <span className={`badge p-2 w-100 ${ticket.status === 'resolved' ? 'bg-success' : ticket.status === 'in_progress' ? 'bg-primary' : 'bg-secondary'}`}>
                {ticket.status.toUpperCase().replace('_', ' ')}
              </span>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted d-block">Nivel de Soporte</label>
              <b className="text-gold h4">{ticket.support_level}</b>
            </div>

            {/* 👈 Añadido: Muestra de forma clara quién tiene asignado el ticket actualmente */}
            <div className="mb-3">
              <label className="form-label small text-muted d-block">Técnico Asignado</label>
              <span className="fw-bold text-secondary">
                {ticket.asignado?.name ? `👤 ${ticket.asignado.name}` : '⏳ Pendiente de asignación'}
              </span>
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">Prioridad / Urgencia</label>
              <select
                className="form-select"
                value={ticket.priority}
                onChange={e => handleUpdatePriority(e.target.value)}
                disabled={!isTech}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
                <option value="critical">Crítica / Urgente</option>
              </select>
            </div>

            <hr />

            {/* Acciones técnicas */}
            {isTech && ticket.status !== 'resolved' && (
              <>
                {ticket.support_level !== 'L3' && (
                  <button className="btn btn-warning w-100 py-2 mb-2" onClick={handleEscalate}>
                    ⬆ Escalar a {ticket.support_level === 'L1' ? 'L2 (TIC)' : 'L3 (Admin)'}
                  </button>
                )}
                <button className="btn btn-success w-100 py-2 mb-2" onClick={handleResolveTicket}>
                  ✔ Resolver Incidencia
                </button>
              </>
            )}

            <div className="text-center mt-3">
              <small className="text-muted">ID de Seguimiento: #{ticket.id}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;