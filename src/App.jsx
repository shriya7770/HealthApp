import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

function App() {
  const [code, setCode] = useState("");
  const [item, setItem] = useState(null);

  const fakeDatabase = {
    "012345678912": { name: "Chocolate Bar", calories: 250 },
    "123456789012": { name: "Apple Juice", calories: 120 },
    "789456123012": { name: "Chips", calories: 300 },
  };

  const handleScan = (scannedCode) => {
    setCode(scannedCode);
    setItem(fakeDatabase[scannedCode] || { name: "Unknown Item", calories: "?" });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🍎 Food Barcode Scanner</h1>
      <BarcodeScanner onScan={handleScan} />
      {code && (
        <div style={{ marginTop: "20px" }}>
          <h2>Scanned Code: {code}</h2>
          <p><strong>Item:</strong> {item.name}</p>
          <p><strong>Calories:</strong> {item.calories}</p>
        </div>
      )}
    </div>
  );
}

export default App;
