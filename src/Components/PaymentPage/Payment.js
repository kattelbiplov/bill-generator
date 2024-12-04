import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "./Payment.css";
import esewaLogo from '../../Images/esewa_og.webp';
import khaltiLogo from '../../Images/khalti.png';
import bankLogo from '../../Images/kumari.jpg';

const PaymentPage = () => {
  const location = useLocation(); 
  
  const { totalAmount, orgName, logo, vatRate, issueDate, amount, fields } = location.state || {};
  const [selectedGateway, setSelectedGateway] = useState("");
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const handlePaymentGatewaySelect = (gateway) => {
    setSelectedGateway(gateway);
    setUsername("");
    setPin("");
  };

  const handleConfirmPayment = () => {
    if (username && pin) {
        navigate("/qr", {
          state: {
            totalAmount,
            orgName,
            logo,
            vatRate,
            issueDate,
            amount,
            fields, 
            username,
            pin,
          },
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="payment-page">
      <h2>Proceed to Payment</h2>
      <div className="payment-options">
        <div
          className={`gateway ${selectedGateway === "esewa" ? "selected" : ""}`}
          onClick={() => handlePaymentGatewaySelect("esewa")}
        >
          <img src={esewaLogo} alt="eSewa" />
          <p>eSewa</p>
        </div>
        <div
          className={`gateway ${selectedGateway === "khalti" ? "selected" : ""}`}
          onClick={() => handlePaymentGatewaySelect("khalti")}
        >
          <img src={khaltiLogo} alt="Khalti" />
          <p>Khalti</p>
        </div>
        <div
          className={`gateway ${selectedGateway === "kumari" ? "selected" : ""}`}
          onClick={() => handlePaymentGatewaySelect("kumari")}
        >
          <img src={bankLogo} alt="Kumari Bank" />
          <p>Kumari Bank</p>
        </div>
      </div>

      {selectedGateway && (
        <div className="payment-form">
          <div className="row">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="row">
            <label>Pin</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter your pin"
            />
          </div>
          <div className="row">
            <label>Total Amount</label>
            <span>{totalAmount ? totalAmount.toFixed(2) : "N/A"}</span>
          </div>
          <button className="confirm-btn" onClick={handleConfirmPayment}>
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
