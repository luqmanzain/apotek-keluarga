import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import "./table.css";
import Layout from "../../layout/layout";
import AddStockModal from "./tambahstock";
import EditStockModal from "./EditModal";
import { addStock, removeStock, updateStock } from "../../redux/stockSlice";

const StockTable = () => {
    const dispatch = useDispatch();
    const stocks = useSelector((state) => state.stock.stocks);

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentStock, setCurrentStock] = useState(null);
    // 🔹 Tambah barang baru ke dalam Redux Store
    const addNewStock = (newStock) => {
        dispatch(addStock({ ...newStock, id: stocks.length + 1 }));
    };

    // 🔹 Edit barang
    const handleEdit = (stock) => {
        setCurrentStock(stock);
        setShowEditModal(true);
    };

    // 🔹 Simpan perubahan barang yang diedit ke Redux Store
    const saveEditedStock = (editedStock) => {
        dispatch(updateStock(editedStock));
        setShowEditModal(false);
        setCurrentStock(null);
    };

    // 🔹 Hapus barang dari Redux Store
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            dispatch(removeStock(id));
        }
    };

    // 🔹 Handle pencarian
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // 🔹 Filter stok berdasarkan pencarian
    const filteredStocks = stocks.filter((stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout titlePage="Stock Table">
            <div className="container mt-4">
                <h2>Manajemen Stok</h2>

                {/* 🔍 Input Pencarian */}
                <div className="search-bar mb-3">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Cari barang..."
                        className="form-control"
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
                    addStock={addNewStock} // 🔥 Kirim fungsi tambah stok Redux
                />

                {/* ✏️ Modal Edit Barang */}
                <EditStockModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    editStock={currentStock}
                    saveEdit={saveEditedStock} // 🔥 Kirim fungsi edit stok Redux
                />

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
                                    <td>{stock.name}</td>
                                    <td>{stock.quantity}</td>
                                    <td>Rp {stock.buyPrice}</td>
                                    <td>Rp {stock.sellPrice}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(stock)}>
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
