import React from "react";

const SalesTransactionPage = () => {
  const sales = [
    { id: 1, date: "2025-04-20", productName: "Paracetamol", quantity: 10, totalPrice: 50000 },
    { id: 2, date: "2025-04-21", productName: "Vitamin C", quantity: 5, totalPrice: 75000 },
    { id: 3, date: "2025-04-22", productName: "Amoxicillin", quantity: 7, totalPrice: 105000 },
  ];

  return (
    <div className="container mt-4">
      <h2>Transaksi Penjualan</h2>
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
          {sales.map((item, index) => (
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

export default SalesTransactionPage;
