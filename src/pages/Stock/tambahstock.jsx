import React, { useState } from "react";
import axios from "axios";

const AddStockModal = ({ show, handleClose, addStock }) => {
    const [newStock, setNewStock] = useState({
        namaBarang: "",
        stock: "",
        hargaBeli: "",
        hargaJual: ""
    });

    const [loading, setLoading] = useState(false);

    // Handle perubahan input
    const handleChange = (e) => {
        setNewStock({ ...newStock, [e.target.name]: e.target.value });
    };

    // Simpan data baru ke API
    const handleSave = async () => {
        if (!newStock.namaBarang || !newStock.stock || !newStock.hargaBeli || !newStock.hargaJual) {
            alert("Harap isi semua kolom!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/apotek/stok/create", newStock);
            console.log("Response dari API:", response.data);

            // Tambahkan data baru ke state utama (StockTable)
            addStock(response.data.data);

            alert("Barang berhasil ditambahkan!");

            // Reset form setelah sukses
            setNewStock({ namaBarang: "", stock: "", hargaBeli: "", hargaJual: "" });

            // Tutup modal
            handleClose();
        } catch (error) {
            console.error("Gagal menambahkan stok:", error);
            alert("Gagal menambahkan barang!");
        }
        setLoading(false);
    };

    return (
        <div id="addStockModal" className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Tambah Barang</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nama Barang</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="namaBarang"
                                    value={newStock.namaBarang}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Jumlah Stok</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="stock"
                                    value={newStock.stock}
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
                                    value={newStock.hargaBeli}
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
                                    value={newStock.hargaJual}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Batal
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStockModal;
