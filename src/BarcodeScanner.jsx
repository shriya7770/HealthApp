import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        onScan(result.getText()); // Send scanned code to parent
      }
    });

    return () => {
      codeReader.reset(); // Stop scanning when component unmounts
    };
  }, [onScan]);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", maxWidth: "400px" }} />
    </div>
  );
};

export default BarcodeScanner;
