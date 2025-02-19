import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { increaseStock } from "../../redux/stockSlice";
import { addExpense } from "../../redux/financeSlice";

const AddExpenseModal = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const stocks = useSelector((state) => state.stock.stocks);

    const [expense, setExpense] = useState({ 
        date: new Date().toISOString().split("T")[0], // Default tanggal hari ini
        category: "",
        itemName: "",
        quantity: 0,
        totalPrice: "",
        buyPrice: 0
    });

    // Convert stocks ke format react-select
    const stockOptions = stocks.map(stock => ({
        value: stock.name,
        label: stock.name,
        buyPrice: stock.buyPrice
    }));

    // Handle perubahan input biasa
    const handleChange = (e) => {
        const { name, value } = e.target;

        setExpense(prevState => ({
            ...prevState,
            [name]: value,
            totalPrice: prevState.category === "Stok" && name === "quantity" ? value * prevState.buyPrice : prevState.totalPrice
        }));
    };

    // Handle perubahan kategori (stok atau operasional)
    const handleCategoryChange = (e) => {
        setExpense({
            ...expense,
            category: e.target.value,
            itemName: "", // Reset nama barang/biaya saat kategori berubah
            buyPrice: 0,
            totalPrice: "" // Biarkan kosong agar bisa diedit untuk operasional
        });
    };

    // Handle perubahan untuk dropdown stok (hanya jika kategori "Stok")
    const handleSelectChange = (selectedOption) => {
        setExpense(prevState => ({
            ...prevState,
            itemName: selectedOption.value,
            buyPrice: selectedOption.buyPrice,
            totalPrice: prevState.quantity * selectedOption.buyPrice
        }));
    };

    // Simpan pengeluaran (tambahkan stok jika kategori "Stok")
    const handleSave = () => {
        if (expense.date && expense.category && expense.itemName && expense.totalPrice > 0) {
            if (expense.category === "Stok") {
                dispatch(increaseStock({
                    itemName: expense.itemName,
                    quantity: Number(expense.quantity),
                    buyPrice: expense.buyPrice,
                    category: expense.category
                }));
            }

            dispatch(addExpense(expense));
            console.log(expense);
            
            handleClose();
        } else {
            alert("Harap isi semua kolom!");
        }
    };

    return (
        <div className={`modal fade ${show ? "show d-block" : "d-none"}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Tambah Pengeluaran</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {/* 🔹 Input Tanggal */}
                            <div className="mb-3">
                                <label className="form-label">Tanggal</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="date" 
                                    value={expense.date} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                            {/* 🔹 Pilihan Kategori Pengeluaran */}
                            <div className="mb-3">
                                <label className="form-label">Kategori Pengeluaran</label>
                                <select 
                                    className="form-control" 
                                    name="category" 
                                    value={expense.category} 
                                    onChange={handleCategoryChange} 
                                    required
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    <option value="Stok">📦 Pengeluaran Stok</option>
                                    <option value="Operasional">💰 Biaya Operasional</option>
                                </select>
                            </div>

                            {/* 🔹 Input Nama Barang / Biaya */}
                            <div className="mb-3">
                                <label className="form-label">Nama Barang / Biaya</label>
                                {expense.category === "Stok" ? (
                                    <Select 
                                        options={stockOptions} 
                                        onChange={handleSelectChange} 
                                        placeholder="Pilih atau cari barang..." 
                                        isSearchable 
                                        required 
                                    />
                                ) : (
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="itemName" 
                                        placeholder="Masukkan nama biaya operasional..." 
                                        value={expense.itemName} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                )}
                            </div>

                            {/* 🔹 Input Jumlah (Hanya muncul untuk Stok) */}
                            {expense.category === "Stok" && (
                                <div className="mb-3">
                                    <label className="form-label">Jumlah</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="quantity" 
                                        value={expense.quantity} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                            )}

                            {/* 🔹 Input Total Harga (Bisa Diedit jika Operasional) */}
                            <div className="mb-3">
                                <label className="form-label">Total Harga (Rp)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="totalPrice" 
                                    value={expense.totalPrice} 
                                    onChange={(e) => setExpense({ ...expense, totalPrice: e.target.value })} 
                                    required 
                                    placeholder="Masukkan total harga"
                                    readOnly={expense.category === "Stok"} // Hanya tidak bisa diedit jika stok
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={handleClose}>Batal</button>
                        <button className="btn btn-primary" onClick={handleSave}>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpenseModal;
