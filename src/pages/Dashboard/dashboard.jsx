import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Card from "../../components/Card/Card";
import { FaArrowRight, FaArrowLeft, FaWallet } from "react-icons/fa";
import Layout from "../../layout/layout";

// 🔥 Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // 🔥 Data untuk Card
    const dashboardData = [
        { label: "Total Pemasukan", value: 10000000, color: "#38BDF8", icon: <FaArrowRight /> },
        { label: "Total Pengeluaran", value: 8000000, color: "#FACC15", icon: <FaArrowLeft /> },
        { label: "Total Saldo", value: 2000000, color: "#EC4899", icon: <FaWallet /> }
    ];

    // 🔥 Data untuk Chart
    const chartData = {
        labels: dashboardData.map((item) => item.label), // Label dari Card
        datasets: [
            {
                label: "Amount (Rp)",
                data: dashboardData.map((item) => item.value), // Ambil value dari Card
                backgroundColor: dashboardData.map((item) => item.color), // Warna sesuai Card
                borderColor: "#ffffff",
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false }, // 🔥 Sembunyikan legend agar lebih clean
            title: {
                display: true,
                text: "Financial Overview", // 🔥 Judul Chart
            },
        },
    };

    return (
        <Layout titlePage="Dashboard">
            <div className="dashboard-container">
                <div className="row">
                    {dashboardData.map((item, index) => (
                        <Card key={index} color={item.color} icon={item.icon} amount={`Rp ${item.value.toLocaleString()}`} label={item.label} />
                    ))}
                </div>

                {/* 🔹 Chart Visualization */}
                <div className="chart-container mt-4">
                    <h4 className="text-center">Visualisasi Data</h4>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
