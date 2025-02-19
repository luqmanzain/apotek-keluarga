import React from "react";
import "./Card.css";

const Card = ({ color, icon, amount, label }) => {
    return (
        <div className="col-4">
            <div className="card-dashboard" style={{ backgroundColor: color }}>
                <div className="card-icon">{icon}</div>
                <div className="card-content">
                    <h3>{amount}</h3>
                    <p>{label}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
