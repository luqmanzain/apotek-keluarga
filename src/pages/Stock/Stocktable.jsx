import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import "./table.css";
import Layout from "../../layout/layout";
import AddStockModal from "./tambahstock";
import EditStockModal from "./EditModal";


const StockTable = () => {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentStockId, setCurrentStockId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔥 Ambil data stok dari API saat komponen dimuat
    useEffect(() => {
        fetchStockData();
    }, []);

    const fetchStockData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/apotek/stok/get");
            setStocks(response.data.data); // Gunakan data dari response
            setError(null);
        } catch (err) {
            console.error("Gagal mengambil data stok:", err);
            setError("Gagal mengambil data stok");
        }
        setLoading(false);
    };

    // 🔹 Tambah barang baru ke dalam state
    const addNewStock = (newStock) => {
        setStocks([...stocks, newStock]);
    };

    // 🔹 Handle edit barang
    const handleEdit = (id) => {
        setCurrentStockId(id);
        setShowEditModal(true);
    };

    // 🔹 Simpan perubahan barang yang diedit
    const updateStockInList = (updatedStock) => {
        setStocks(stocks.map(stock => (stock.id === updatedStock.id ? updatedStock : stock)));
    };

    // 🔹 Hapus barang dari API
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            try {
                await axios.delete(`http://localhost:3000/apotek/stok/delete/${id}`);
                setStocks(stocks.filter(stock => stock.id !== id));
                alert("Barang berhasil dihapus!");
            } catch (error) {
                console.error("Gagal menghapus stok:", error);
                alert("Gagal menghapus barang!");
            }
        }
    };

    // 🔹 Handle pencarian
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // 🔹 Filter stok berdasarkan pencarian
    const filteredStocks = stocks.filter((stock) =>
        stock.namaBarang && stock.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout titlePage="Stock Table">
            <div className="container mt-4">
                <h2>Manajemen Stok</h2>

                {/* 🔍 Input Pencarian */}
                <div className="search-bar position-relative mb-3">
    <FaSearch className="search-icon" />
    <input
        type="text"
        placeholder="Cari barang..."
        className="form-control ps-5"
        value={searchTerm}
        onChange={handleSearch}
    />
</div>


                {/* 🟢 Tombol Tambah Barang */}
                <button className="btn btn-success mb-3" onClick={() => setShowAddModal(true)}>
                    <FaPlus /> Tambah Barang
                </button>

                {/* 🟡 Modal Tambah Barang */}
                <AddStockModal
                    show={showAddModal}
                    handleClose={() => setShowAddModal(false)}
                    addStock={addNewStock}
                />

                {/* ✏️ Modal Edit Barang */}
                <EditStockModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    editStockId={currentStockId}
                    onStockUpdated={updateStockInList}
                />

                {/* 📋 Status Loading & Error */}
                {loading && <p className="text-center">Memuat data stok...</p>}
                {error && <p className="text-danger text-center">{error}</p>}

                {/* 📋 Tabel Stok */}
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Stok</th>
                            <th>Harga Beli</th>
                            <th>Harga Jual</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStocks.length > 0 ? (
                            filteredStocks.map((stock, index) => (
                                <tr key={stock.id}>
                                    <td>{index + 1}</td>
                                    <td>{stock.namaBarang}</td>
                                    <td>{stock.stock}</td>
                                    <td>Rp {stock.hargaBeli}</td>
                                    <td>Rp {stock.hargaJual}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(stock.id)}>
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(stock.id)}>
                                            <FaTrash /> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Barang tidak ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default StockTable;
