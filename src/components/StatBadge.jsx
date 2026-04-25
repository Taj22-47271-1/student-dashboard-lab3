import PropTypes from "prop-types";

function StatBadge({ label, value }) {
  return (
    <div className="stat-badge">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default StatBadge;