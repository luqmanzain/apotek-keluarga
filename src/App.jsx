import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Loginpage';
import StockTable from './pages/Stock/Stocktable';
import Dashboard from './pages/Dashboard/dashboard';
import FinanceTable from './pages/Finance/FinanceTable';
import EditProfile from './pages/Editprofile/EditProfile';
import ProtectedRoute from './auth/ProtectedRoute';

// Import halaman baru
import SalesTransactionPage from './pages/SalesTransactionPage';
import PurchaseTransactionPage from './pages/PurcaseTransactionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Halaman yang dilindungi oleh ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <StockTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <FinanceTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Tambahkan route untuk transaksi penjualan dan pembelian */}
        <Route
          path="/transaksi-penjualan"
          element={
            <ProtectedRoute>
              <SalesTransactionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaksi-pembelian"
          element={
            <ProtectedRoute>
              <PurchaseTransactionPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
