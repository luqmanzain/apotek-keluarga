import React from "react";

const DashboardCard = ({ label, value, color, icon }) => {
  return (
    <div className="card shadow-sm border-0" style={{ backgroundColor: "#fff" }}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div>
          <h6 className="mb-1 text-muted">{label}</h6>
          <h5 className="fw-bold">Rp {value.toLocaleString("id-ID")}</h5>
        </div>
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: color,
            width: 40,
            height: 40,
            color: "#fff",
            fontSize: "1.1rem"
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
