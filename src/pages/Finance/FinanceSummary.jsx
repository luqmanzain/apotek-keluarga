import React from "react";
import "./finance.css";

const FinanceSummary = ({ incomes, expenses }) => {
    // Hitung total pemasukan dan pengeluaran
    const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
    const netProfit = totalIncome - totalExpense;

    return (
        <div className="finance-summary mb-4">
            <div className="summary-card bg-success text-white">
                <h4>Total Pemasukan</h4>
                <h3>Rp {totalIncome.toLocaleString()}</h3>
            </div>
            <div className="summary-card bg-danger text-white">
                <h4>Total Pengeluaran</h4>
                <h3>Rp {totalExpense.toLocaleString()}</h3>
            </div>
            <div className={`summary-card ${netProfit >= 0 ? "bg-primary" : "bg-warning"} text-white`}>
                <h4>Keuntungan Bersih</h4>
                <h3>Rp {netProfit.toLocaleString()}</h3>
            </div>
        </div>
    );
};

export default FinanceSummary;
