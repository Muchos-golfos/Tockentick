import { Link } from 'react-router-dom'; // Importante para SPA
import { useAuth } from '../../context/AuthContext';
import logoIcon from '../../assets/logotick.png'; // 👈 Corregido: 'from' en lugar de '='

const Navbar = () => {
  const { user, logout } = useAuth();

  // ✅ Comprobamos si el rol del usuario pertenece al equipo técnico
  const isTech = ['helpdesk', 'tic', 'admin'].includes(user?.role);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top px-3">
      <div className="container-fluid">
        {/* Logo y Nombre */}
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <img src={logoIcon} alt="TT" height="30" className="me-2" />
          <span className="font-weight-600 text-gold fs-5">Token<span className="text-sub">Tick</span></span>
        </Link>

        {/* Botón para móviles (Hamburger) */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de Navegación */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tickets">Mis Incidencias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-ticket">Abrir Ticket</Link>
            </li>

            {/* ✅ NUEVO: Pestaña exclusiva para roles técnicos mapeada con vuestro estilo */}
            {isTech && (
              <li className="nav-item">
                <Link className="nav-link fw-bold text-gold" to="/stats">
                  Estadísticas
                </Link>
              </li>
            )}
          </ul>

          {/* Menú de Usuario (Dropdown flotante intacto) */}
          <div className="dropdown">
            <button 
              className="btn btn-gold dropdown-toggle px-3 btn-sm" 
              type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <i className="bi bi-person-circle me-2"></i>
              {user?.name} <span className="small opacity-75">({user?.role.toUpperCase()})</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
              <li className="px-3 py-2 border-bottom">
                <div className="small fw-bold">{user?.name}</div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{user?.email}</div>
              </li>
              <li><Link className="dropdown-item small mt-2" to="/perfil">Mi Perfil</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item small text-danger" onClick={logout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;