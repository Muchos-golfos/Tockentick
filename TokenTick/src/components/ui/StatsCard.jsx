const StatsCard = ({ title, value, color }) => {
  return (
    <div className="tt-card shadow-sm h-100 border-start border-4" style={{ borderColor: `var(--${color})` }}>
      <h6 className="text-muted small text-uppercase mb-2">{title}</h6>
      <h2 className="fw-bold m-0">{value}</h2>
    </div>
  );
};
export default StatsCard;