import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ChartSection = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei"],
    datasets: [
      {
        label: "Pemasukan",
        data: [3000000, 2500000, 3500000, 4000000, 2000000],
        backgroundColor: "#38BDF8"
      },
      {
        label: "Pengeluaran",
        data: [2000000, 1500000, 1800000, 2200000, 1900000],
        backgroundColor: "#FACC15"
      }
    ]
  };

  const donutData = {
    labels: ["Pembelian Obat", "Biaya Operasional"],
    datasets: [
      {
        data: [5000000, 2500000], // ← sesuaikan dummy datanya sesuai kebutuhanmu
        backgroundColor: ["#FB923C", "#34D399"]
      }
    ]
  };

  return (
    <div className="row mt-4">
      <div className="col-lg-8 mb-4">
        <div className="card p-3 shadow-sm">
          <h6 className="mb-3 fw-bold">Tren Keuangan Bulanan</h6>
          <Bar data={barData} />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card p-3 shadow-sm">
          <h6 className="mb-3 fw-bold">Kategori Pengeluaran</h6>
          <Doughnut data={donutData} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
