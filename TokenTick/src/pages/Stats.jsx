import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get('/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error al cargar estadísticas:', err);
        setError('No se han podido obtener las métricas desde el servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-gold mb-3" role="status"></div>
          <p className="text-muted small fw-bold">Sincronizando paneles de control...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger text-center shadow-sm" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const porEstado = stats?.por_estado || [];
  const porNivel = stats?.por_nivel || [];
  const tiempoMedio = stats?.tiempo_medio_horas ?? 0;

  // 1. Configuración dinámica del gráfico de Estados
  const estadosLabels = porEstado.map(item => 
    item?.status ? String(item.status).toUpperCase().replace('_', ' ') : 'DESCONOCIDO'
  );
  const estadosData = porEstado.map(item => Number(item?.count || 0));

  const pieData = {
    labels: estadosLabels,
    datasets: [
      {
        data: estadosData,
        backgroundColor: ['#6c757d', '#0d6efd', '#28a745', '#dc3545', '#ffc107'],
        borderWidth: 1,
      },
    ],
  };

  // 2. Configuración dinámica del gráfico de Niveles de Soporte
  const nivelesLabels = porNivel.map(item => item?.support_level ? String(item.support_level) : 'Nivel');
  const nivelesData = porNivel.map(item => Number(item?.count || 0));

  const barData = {
    labels: nivelesLabels,
    datasets: [
      {
        label: 'Cantidad de Incidencias',
        data: nivelesData,
        backgroundColor: '#c9a84c', // Color oro corporativo
        borderRadius: 5,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  // Sumatorio de tickets activos en tiempo real
  let totalActivas = 0;
  for (let i = 0; i < porEstado.length; i++) {
    if (porEstado[i]?.status !== 'resolved') {
      totalActivas += Number(porEstado[i]?.count || 0);
    }
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h2 className="fw-bold">Panel de Estadísticas</h2>
        <p className="text-muted">Métricas de rendimiento asignadas a tu nivel de soporte.</p>
      </div>

      {/* METRICAS KPI CLAVE */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-4 bg-white border-start border-warning border-4 border-0">
            <h6 className="text-muted small text-uppercase fw-bold mb-2">Tiempo Medio de Resolución</h6>
            <div className="d-flex align-items-baseline">
              <span className="h1 fw-bold text-dark mb-0">{tiempoMedio}</span>
              <span className="ms-2 text-muted fw-semibold">horas</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm p-4 bg-white border-start border-primary border-4 border-0">
            <h6 className="text-muted small text-uppercase fw-bold mb-2">Tus Incidencias Activas</h6>
            <div className="d-flex align-items-baseline">
              <span className="h1 fw-bold text-dark mb-0">{totalActivas}</span>
              <span className="ms-2 text-muted fw-semibold">tickets</span>
            </div>
          </div>
        </div>
      </div>

      {/* RENDERIZADO DE TABLAS Y GRÁFICOS */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 bg-white h-100 border-0">
            <h5 className="fw-bold text-secondary mb-4 border-bottom pb-2">Distribución por Estados</h5>
            <div className="mx-auto" style={{ maxWidth: '280px' }}>
              {estadosData.length === 0 ? (
                <p className="text-center text-muted my-5">No tienes tickets asignados en este estado.</p>
              ) : (
                <Pie data={pieData} />
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4 bg-white h-100 border-0">
            <h5 className="fw-bold text-secondary mb-4 border-bottom pb-2">Carga de Soporte Actual</h5>
            <div className="mt-2">
              {nivelesData.length === 0 ? (
                <p className="text-center text-muted my-5">No se registran actividades en tu nivel.</p>
              ) : (
                <Bar data={barData} options={barOptions} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;