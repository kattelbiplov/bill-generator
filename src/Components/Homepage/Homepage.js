import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
    const [fields, setFields] = useState([{ id: 1, key: "", datatype: "" }]);
    const [logo, setLogo] = useState(null);
    const [orgName, setOrgName] = useState("");
    const [amount, setAmount] = useState("");
    const [vatRate, setVatRate] = useState(13); 
    const [issueDate, setIssueDate] = useState("");
    const navigate = useNavigate(); 

    const addField = () => {
        setFields([...fields, { id: fields.length + 1, key: "", datatype: "" }]);
    };

    const removeField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    const calculateTotal = () => {
        return (parseFloat(amount) || 0) + (parseFloat(amount) || 0) * (vatRate / 100);
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setLogo(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    return (
        <div className="home-page">
            <header className="header">
                <div className="logo-upload">
                    <label htmlFor="logoInput">
                        {logo ? (
                            <img src={logo} alt="Logo" className="logo" />
                        ) : (
                            <div className="logo-placeholder">Upload Logo</div>
                        )}
                    </label>
                    <input
                        type="file"
                        id="logoInput"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="org-name-container">
                    <input
                        type="text"
                        className="org-name-input"
                        placeholder="Enter Organization Name"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                    />
                </div>
            </header>

            <div className="form">
                <div className="row">
                    <label>Date: </label>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="row">
                    <label>Nationality: </label>
                    <select>
                        <option>Nepali</option>
                        <option>Indian</option>
                        <option>American</option>
                    </select>
                </div>
                <div className="fields">
                    {fields.map((field, index) => (
                        <div key={field.id} className="field-row">
                            <div className="key-container">
                                <input
                                    type="text"
                                    className="field-input"
                                    placeholder={`Key ${index + 1}`}
                                    value={field.key}
                                    onChange={(e) =>
                                        setFields(
                                            fields.map((f) =>
                                                f.id === field.id ? { ...f, key: e.target.value } : f
                                            )
                                        )
                                    }
                                />
                            </div>
                            <div className="value-container">
                                <select
                                    className="datatype-dropdown"
                                    value={field.datatype}
                                    onChange={(e) =>
                                        setFields(
                                            fields.map((f) =>
                                                f.id === field.id ? { ...f, datatype: e.target.value } : f
                                            )
                                        )
                                    }
                                >
                                    <option value="">Select Type</option>
                                    <option value="Number">Number</option>
                                    <option value="String">String</option>
                                    <option value="Alphanumeric">Alphanumeric</option>
                                    <option value="Boolean">Boolean</option>
                                </select>
                            </div>
                            <button className="delete-btn" onClick={() => removeField(field.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                    <button className="add-more-btn" onClick={addField}>
                        Add More
                    </button>
                </div>

                <div className="row">
                    <label>Amount: </label>
                    <input
                        type="number"
                        className="amount-input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>VAT Rate (%): </label>
                    <input
                        type="number"
                        className="vat-rate-input"
                        value={vatRate}
                        onChange={(e) => setVatRate(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Total: </label>
                    <span className="total-display">{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="row">
                    <label>Date of Issue: </label>
                    <input
                        type="date"
                        className="date-input"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label>Email: </label>
                    <input type="email" className="email-input" />
                </div>
                <div className="row">
                    <label>Phone: </label>
                    <input type="tel" className="phone-input" />
                </div>
                <button
                    className="proceed-button"
                    onClick={() => {
                        navigate("/payment", {
                            state: {
                                totalAmount: calculateTotal(),
                                orgName,
                                logo,
                                vatRate,
                                issueDate,
                                amount,
                                fields,
                            },
                        });
                    }}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default HomePage;
