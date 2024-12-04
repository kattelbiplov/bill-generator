import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Homepage/Homepage";
import Payment from "./Components/PaymentPage/Payment";
import QR from "./Components/QRPage/QRPage";
import BillReport from "./Components/BillReportPage/BillReport";
import './App.css'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/qr" element={<QR />} />
        <Route path="/bill-report" element={<BillReport />} />
      </Routes>
    </Router>
  );
};

export default App;
