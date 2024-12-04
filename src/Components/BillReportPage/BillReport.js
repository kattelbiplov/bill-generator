import React from "react";
import { useLocation } from "react-router-dom";
import "./BillReport.css";

const BillReport = () => {
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

  return (
    <div className="bill-report-page">
      <div className="bill-header">
        {logo && <img src={logo} alt="Logo" className="logo-img" />}
        <h2>Bill Report</h2>
        <div className="organization-info">
          <h3>{orgName}</h3>
          <p>VAT Rate: {vatRate}%</p>
        </div>
      </div>

      <div className="bill-report-details">
        <div className="row">
          <label>Issue Date: </label>
          <span>{issueDate}</span>
        </div>

        <div className="row">
          <label>Total Amount: </label>
          <span>{totalAmount ? totalAmount.toFixed(2) : "N/A"}</span>
        </div>

        <div className="row">
          <label>Amount: </label>
          <span>{amount}</span>
        </div>

        {fields && (
          <div className="fields">
            <label>Additional Fields:</label>
            <ul>
              {fields.map((field, index) => (
                <li key={index}>
                  <strong>{field.key}:</strong> {field.datatype}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="row">
          <label>Username: </label>
          <span>{username}</span>
        </div>

        <div className="row">
          <label>Pin: </label>
          <span>{pin}</span>
        </div>
      </div>
      
      <div className="footer">
        <p>Thank you for doing business with us!</p>
      </div>
    </div>
  );
};

export default BillReport;
