import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Loginpage';
import StockTable from './pages/Stock/Stocktable';
import Dashboard from './pages/Dashboard/dashboard';
import FinanceTable from './pages/Finance/FinanceTable';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<StockTable />} />
        <Route path="/finance" element={<FinanceTable />} />
      </Routes>
    </Router>
  );
}


export default App;
