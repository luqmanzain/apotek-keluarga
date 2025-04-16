import React, { useState, useEffect } from "react";
import axios from "axios";

const EditStockModal = ({ show, handleClose, editStockId, onStockUpdated }) => {
    const [stockData, setStockData] = useState({
        id: null,
        namaBarang: "",
        stock: "",
        hargaBeli: "",
        hargaJual: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 🔥 Ambil data stok berdasarkan ID saat modal terbuka
    useEffect(() => {
        if (editStockId) {
            setLoading(true);
            axios
                .get(`http://localhost:3000/apotek/stok/get/${editStockId}`)
                .then((response) => {
                    setStockData(response.data.data);
                    setError(null);
                })
                .catch((err) => {
                    console.error("Gagal mengambil data stok:", err);
                    setError("Gagal mengambil data stok.");
                })
                .finally(() => setLoading(false));
        }
    }, [editStockId]);

    // 🔹 Handle perubahan input
    const handleChange = (e) => {
        setStockData({ ...stockData, [e.target.name]: e.target.value });
    };

    // 🔹 Simpan perubahan ke API
    const handleSave = async () => {
        if (!stockData.namaBarang || !stockData.stock || !stockData.hargaBeli || !stockData.hargaJual) {
            alert("Harap isi semua kolom!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/apotek/stok/update/${stockData.id}`, stockData);
            onStockUpdated(response.data.data); // Update state di StockTable
            alert("Barang berhasil diperbarui!");
            handleClose();
        } catch (error) {
            console.error("Gagal memperbarui stok:", error);
            alert("Gagal memperbarui barang!");
        }
    };

    return (
        <div id="editStockModal" className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Barang</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {loading ? (
                            <p>Memuat data...</p>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : (
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Nama Barang</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="namaBarang"
                                        value={stockData.namaBarang}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Stok</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock"
                                        value={stockData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Harga Beli</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="hargaBeli"
                                        value={stockData.hargaBeli}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Harga Jual</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="hargaJual"
                                        value={stockData.hargaJual}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Batal
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStockModal;
