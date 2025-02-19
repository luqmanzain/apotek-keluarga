import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaTrash, FaPrint } from "react-icons/fa"; // 🔥 Ikon Print
import "./finance.css"; // 🔥 Import CSS
import FinanceSummary from "./FinanceSummary";
import Layout from "../../layout/layout";
import AddIncomeModal from "./AddIncomeModal";
import AddExpenseModal from "./AddExpenseModal";
import { addIncome, addExpense } from "../../redux/financeSlice";

const FinanceTable = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.finance.incomes);
  const expenses = useSelector((state) => state.finance.expenses);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false); // 🔥 State untuk modal cetak
  const reportRef = useRef(); // 🔥 Gunakan useRef untuk mencetak hanya elemen tertentu

  // 🔥 Rentang Tanggal
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddIncome = (income) => {
    dispatch(addIncome(income));
  };

  const handleAddExpense = (expense) => {
    dispatch(addExpense(expense));
  };

  const handleDeleteIncome = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pemasukan ini?")) {
      dispatch({
        type: "finance/removeIncome",
        payload: id,
      });
    }
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengeluaran ini?")) {
      dispatch({
        type: "finance/removeExpense",
        payload: id,
      });
    }
  };

  // 🔥 Fungsi untuk mencetak laporan hanya dalam rentang tanggal
  const handlePrint = () => {
    if (!startDate || !endDate) {
      alert("Harap pilih rentang tanggal terlebih dahulu!");
      return;
    }

    const printContents = reportRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // 🔄 Refresh halaman setelah print untuk menghindari tampilan rusak
  };

  // 🔹 Filter data berdasarkan rentang tanggal
  const filterByDate = (data) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return (!startDate || itemDate >= new Date(startDate)) && (!endDate || itemDate <= new Date(endDate));
    });
  };

  return (
    <Layout titlePage="Manajemen Keuangan">
      <div className="container mt-4 finance-container">
        {/* 🔹 Tombol Tambah Transaksi */}
        <button className="btn btn-success me-2" onClick={() => setShowIncomeModal(true)}>
          <FaPlus /> Tambah Pemasukan
        </button>
        <button className="btn btn-danger me-2" onClick={() => setShowExpenseModal(true)}>
          <FaPlus /> Tambah Pengeluaran
        </button>

        {/* 🔹 Tombol Cetak Laporan */}
        <button className="btn btn-primary" onClick={() => setShowPrintModal(true)}>
          <FaPrint /> Cetak Laporan
        </button>

        {/* 🔹 Modal Pilih Rentang Tanggal untuk Cetak */}
        {showPrintModal && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Pilih Rentang Tanggal</h5>
                  <button type="button" className="btn-close" onClick={() => setShowPrintModal(false)}></button>
                </div>
                <div className="modal-body">
                  <label className="form-label">Dari Tanggal:</label>
                  <input type="date" className="form-control mb-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                  <label className="form-label">Sampai Tanggal:</label>
                  <input type="date" className="form-control mb-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowPrintModal(false)}>Batal</button>
                  <button className="btn btn-primary" onClick={handlePrint}>Cetak</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🔹 Modal Tambah Pemasukan */}
        <AddIncomeModal show={showIncomeModal} handleClose={() => setShowIncomeModal(false)} addIncome={handleAddIncome} />

        {/* 🔹 Modal Tambah Pengeluaran */}
        <AddExpenseModal show={showExpenseModal} handleClose={() => setShowExpenseModal(false)} addExpense={handleAddExpense} />

        {/* 🔹 Bagian yang akan dicetak */}
        <div ref={reportRef} className="finance-report">
          <h3 className="mt-4 text-center">Laporan Keuangan</h3>
         

          {/* 🔹 Tabel Pemasukan */}
          <h4 className="mt-4">Pemasukan</h4>
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Obat</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {filterByDate(incomes).length > 0 ? (
                filterByDate(incomes).map((income, index) => (
                  <tr key={income.id}>
                    <td>{index + 1}</td>
                    <td>{income.date}</td>
                    <td>{income.medicineName}</td>
                    <td>{income.quantity}</td>
                    <td>Rp {income.totalPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Tidak ada pemasukan dalam rentang tanggal ini</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 🔹 Tabel Pengeluaran */}
          <h4 className="mt-4">Pengeluaran</h4>
          <table className="table table-striped">
            <thead className="table-danger">
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Nama Barang/Biaya</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {filterByDate(expenses).length > 0 ? (
                filterByDate(expenses).map((expense, index) => (
                  <tr key={expense.id}>
                    <td>{index + 1}</td>
                    <td>{expense.date}</td>
                    <td>{expense.category === "Stok" ? "📦 Stok" : "💰 Operasional"}</td>
                    <td>{expense.itemName}</td>
                    <td>{expense.category === "Stok" ? expense.quantity : "-"}</td>
                    <td>Rp {expense.totalPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Tidak ada pengeluaran dalam rentang tanggal ini</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default FinanceTable;
