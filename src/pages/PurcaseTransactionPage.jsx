import React from "react";

const PurchaseTransactionPage = () => {
  const purchases = [
    { id: 1, date: "2025-04-18", productName: "Ibuprofen", quantity: 20, totalPrice: 150000 },
    { id: 2, date: "2025-04-19", productName: "Paracetamol", quantity: 15, totalPrice: 112500 },
    { id: 3, date: "2025-04-20", productName: "Cough Syrup", quantity: 10, totalPrice: 90000 },
  ];

  return (
    <div className="container mt-4">
      <h2>Transaksi Pembelian</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Nama Produk</th>
            <th>Jumlah</th>
            <th>Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.date}</td>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>Rp {item.totalPrice.toLocaleString("id-ID")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseTransactionPage;
