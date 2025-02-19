import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStock } from "../../redux/stockSlice";

const EditStockModal = ({ show, handleClose, editStock }) => {
    const dispatch = useDispatch(); // 🔥 Gunakan Redux dispatch
    const [stockData, setStockData] = useState({ id: null, name: "", quantity: "", buyPrice: "", sellPrice: "" });

    // Isi form dengan data yang akan diedit saat modal terbuka
    useEffect(() => {
        if (editStock) {
            setStockData(editStock);
        }
    }, [editStock]);

    // Handle perubahan input
    const handleChange = (e) => {
        setStockData({ ...stockData, [e.target.name]: e.target.value });
    };

    // Simpan perubahan ke Redux Store
    const handleSave = () => {
        if (stockData.name && stockData.quantity && stockData.buyPrice && stockData.sellPrice) {
            dispatch(updateStock(stockData)); // 🔥 Simpan ke Redux Store
            handleClose(); // Tutup modal setelah menyimpan
        } else {
            alert("Harap isi semua kolom!");
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
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nama Barang</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={stockData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Jumlah Stok</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    value={stockData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Harga Beli</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="buyPrice"
                                    value={stockData.buyPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Harga Jual</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="sellPrice"
                                    value={stockData.sellPrice}
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
                        <button type="button" className="btn btn-primary" onClick={handleSave}>
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditStockModal;
