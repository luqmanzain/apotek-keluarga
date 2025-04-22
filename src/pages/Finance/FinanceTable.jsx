import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPrint } from "react-icons/fa";
import "./finance.css";
import Layout from "../../layout/layout";
import { addExpense } from "../../redux/financeSlice";
import axios from "axios";

const FinanceTable = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.finance.incomes);
  const expenses = useSelector((state) => state.finance.expenses);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const reportRef = useRef();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch expenses from API
  const fetchExpensesFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3000/apotek/tapeng/get");
      const formattedExpenses = response.data.data
        .filter(item => item.tanggal && item.totalHarga)
        .map(item => ({
          id: item.id,
          date: new Date(item.tanggal).toISOString().split("T")[0],
          type: "Pengeluaran",
          category: item.id_kategori === 1 ? "Stok" : "Operasional",
          itemName: `Barang ID ${item.id_stock || "-"}`,
          quantity: item.jumlah || 0,
          totalPrice: item.totalHarga || 0,
        }));
      formattedExpenses.forEach(expense => {
        dispatch(addExpense(expense));
      });
    } catch (error) {
      console.error("Failed to fetch expenses:", error.message);
    }
  };

  useEffect(() => {
    fetchExpensesFromAPI();
  }, []);

  const handlePrint = () => {
    if (!startDate || !endDate) {
      alert("Please select a date range first!");
      return;
    }

    const printContents = reportRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const filterByDate = (data) => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return (!startDate || itemDate >= new Date(startDate)) &&
             (!endDate || itemDate <= new Date(endDate));
    });
  };

  const combinedData = filterByDate([
    ...incomes.map(item => ({ ...item, type: "Pemasukan" })),
    ...expenses.map(item => ({ ...item, type: "Pengeluaran" }))
  ]).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Layout titlePage="Manajemen Keuangan">
      <div className="container mt-4 finance-container">
        <button className="btn btn-primary" onClick={() => setShowPrintModal(true)}>
          <FaPrint /> Cetak Laporan
        </button>

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

        {/* Finance Report Table */}
        <div ref={reportRef} className="finance-report">
          <h3 className="mt-4 text-center">Laporan Keuangan (Gabungan)</h3>
          <table className="table table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Jenis</th>
                <th>Nama Barang / Obat</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {combinedData.length > 0 ? (
                combinedData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.type === "Pemasukan" ? "🟢 Pemasukan" : "🔴 Pengeluaran"}</td>
                    <td>{item.medicineName || item.itemName}</td>
                    <td>{item.quantity || "-"}</td>
                    <td>Rp {item.totalPrice.toLocaleString("id-ID")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Tidak ada data dalam rentang tanggal ini</td>
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
