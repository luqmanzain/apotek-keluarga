import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStock } from "../../redux/stockSlice";

const AddStockModal = ({ show, handleClose }) => {
    const dispatch = useDispatch(); // 🔥 Gunakan Redux dispatch

    const [newStock, setNewStock] = useState({
        name: "",
        quantity: "",
        buyPrice: "",
        sellPrice: ""
    });

    // Handle perubahan input
    const handleChange = (e) => {
        setNewStock({ ...newStock, [e.target.name]: e.target.value });
    };

    // Simpan data baru ke Redux Store
    const handleSave = () => {
        if (newStock.name && newStock.quantity && newStock.buyPrice && newStock.sellPrice) {
            dispatch(addStock({
                ...newStock,
                id: Date.now() // Gunakan timestamp untuk ID unik
            }));

            // Reset form setelah menambahkan stok
            setNewStock({ name: "", quantity: "", buyPrice: "", sellPrice: "" });

            // Tutup modal
            handleClose();
        } else {
            alert("Harap isi semua kolom!");
        }
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
                                    name="name"
                                    value={newStock.name}
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
                                    value={newStock.quantity}
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
                                    value={newStock.buyPrice}
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
                                    value={newStock.sellPrice}
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
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStockModal;
