import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { reduceStock } from "../../redux/stockSlice";

const AddIncomeModal = ({ show, handleClose, addIncome }) => {
    const dispatch = useDispatch(); // 🔥 Gunakan Redux Dispatch
    const stocks = useSelector((state) => state.stock.stocks); // 🔥 Ambil stok dari Redux

    const [income, setIncome] = useState({ date: "", medicineName: "", quantity: "", totalPrice: 0, sellPrice: 0 });

    // Convert stocks ke format react-select
    const stockOptions = stocks.map(stock => ({
        value: stock.name,
        label: stock.name,
        sellPrice: stock.sellPrice // 🔥 Simpan harga jual untuk perhitungan otomatis
    }));

    // Handle perubahan input biasa
    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncome(prevState => ({
            ...prevState,
            [name]: value,
            totalPrice: name === "quantity" ? value * prevState.sellPrice : prevState.totalPrice
        }));
    };

    // Handle perubahan untuk React Select
    const handleSelectChange = (selectedOption) => {
        setIncome(prevState => ({
            ...prevState,
            medicineName: selectedOption.value,
            sellPrice: selectedOption.sellPrice, // 🔥 Simpan harga jual
            totalPrice: prevState.quantity * selectedOption.sellPrice // 🔥 Hitung total harga langsung
        }));
    };

    // Simpan pemasukan dan kurangi stok
    const handleSave = () => {
        if (income.date && income.medicineName && income.quantity && income.totalPrice > 0) {
            const selectedStock = stocks.find(stock => stock.name === income.medicineName);

            if (!selectedStock) {
                alert("Obat tidak ditemukan dalam stok!");
                return;
            }

            if (parseInt(income.quantity) > selectedStock.quantity) {
                alert("Jumlah pembelian melebihi stok yang tersedia!");
                return;
            }

            // 🔥 Kurangi stok di Redux
            dispatch(reduceStock({ medicineName: income.medicineName, quantity: parseInt(income.quantity) }));

            // 🔥 Tambahkan pemasukan
            addIncome(income);

            // Tutup modal
            handleClose();
        } else {
            alert("Harap isi semua kolom dan pastikan jumlah lebih dari 0!");
        }
    };

    return (
        <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Tambah Pemasukan</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Tanggal</label>
                                <input type="date" className="form-control" name="date" value={income.date} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nama Obat</label>
                                <Select
                                    options={stockOptions}
                                    onChange={handleSelectChange}
                                    placeholder="Pilih atau cari obat..."
                                    isSearchable
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Jumlah</label>
                                <input type="number" className="form-control" name="quantity" value={income.quantity} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Total Harga (Rp)</label>
                                <input type="number" className="form-control" name="totalPrice" value={income.totalPrice} readOnly />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Batal</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddIncomeModal;
