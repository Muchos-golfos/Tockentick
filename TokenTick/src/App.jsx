import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/register';
import Dashboard from './pages/Dashboard';
import MyTickets from './pages/MyTickets';
import CreateTicket from './pages/createticket.jsx';
import TicketDetail from './pages/TicketsDetail';
import Stats from './pages/Stats'; // 👈 Importamos la nueva página de estadísticas

import Navbar from './components/layout/Navbar';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-gold mb-3" role="status"></div>
          <p className="text-muted small fw-bold">Sincronizando con TokenTick...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid" style={{ marginTop: '85px', minHeight: 'calc(100vh - 85px)' }}>
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 1. RUTAS COMUNES: Accesibles por cualquier usuario autenticado */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'helpdesk', 'tic', 'admin']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
        </Route>

        {/* 2. RUTAS TÉCNICAS EXCLUSIVAS: Solo personal de soporte y administración */}
        <Route element={<ProtectedRoute allowedRoles={['helpdesk', 'tic', 'admin']} />}>
          <Route path="/stats" element={<Stats />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;