import React from "react";
import Layout from "../../layout/layout";
import DashboardCard from "../../components/DashboardCard";
import ChartSection from "../../components/ChartSection";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Dashboard = () => {
  const dummyData = [
    {
      label: "Total Pemasukan",
      value: 12000000,
      color: "#38BDF8",
      icon: <FaArrowRight />
    },
    {
      label: "Total Pengeluaran",
      value: 7500000,
      color: "#FACC15",
      icon: <FaArrowLeft />
    }
  ];

  const pengeluaranData = {
    labels: ["Pembelian Obat", "Biaya Operasional"],
    datasets: [
      {
        data: [6000000, 1500000],
        backgroundColor: ["#FB923C", "#34D399"],
        hoverOffset: 6
      }
    ]
  };

  return (
    <Layout titlePage="Dashboard">
      <div className="container my-3">
        <div className="row g-3 justify-content-start">
          {dummyData.map((item, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <DashboardCard {...item} />
            </div>
          ))}
        </div>

        <ChartSection pengeluaranData={pengeluaranData} />
      </div>
    </Layout>
  );
};

export default Dashboard;
