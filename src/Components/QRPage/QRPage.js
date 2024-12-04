import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { QRCodeCanvas } from "qrcode.react";
import "../QRPage/QR.css";

const QRPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const {
    totalAmount,
    orgName,
    logo,
    vatRate,
    issueDate,
    amount,
    fields,
    username,
    pin,
  } = location.state || {}; 

  const handleGenerateReport = () => {
    navigate("/bill-report", {
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
  };

  return (
    <div className="qr-page">
      <div className="qr-container">
        <QRCodeCanvas value="fake-data-for-qr" size={256} />
      </div>
      <button className="generate-report-btn" onClick={handleGenerateReport}>
        Generate Report
      </button>
    </div>
  );
};

export default QRPage;
