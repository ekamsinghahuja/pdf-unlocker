import { useState, useRef, useEffect } from "react";

import createModule from "@neslinesli93/qpdf-wasm";

import type { QpdfModule, QpdfFS } from "../types/qpdf";

function PdfPasswordAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const qpdfRef = useRef<QpdfModule | null>(null);

  useEffect(() => {
    const loadQpdf = async () => {
      const qpdf = await createModule({
        locateFile: () => "/qpdf.wasm",
      });

      qpdfRef.current = qpdf;
    };

    loadQpdf();
  }, []);

  const addPassword = async () => {
    const qpdf = qpdfRef.current;

    if (!qpdf) {
      setStatus("PDF engine is still loading...");
      return;
    }

    const fs = qpdf.FS as QpdfFS;

    if (!file) {
      setStatus("Please select a PDF.");
      return;
    }

    if (!password) {
      setStatus("Please enter a password.");
      return;
    }

    try {
      setStatus("Loading PDF...");

      const data = new Uint8Array(await file.arrayBuffer());

      fs.writeFile("/input.pdf", data);

      setStatus("Adding password to PDF...");

      qpdf.callMain([
        "--encrypt",
        password,
        password,
        "256",
        "--",
        "/input.pdf",
        "/output.pdf",
      ]);

      const output = fs.readFile("/output.pdf");

      const blob = new Blob([new Uint8Array(output)], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", "_protected.pdf");
      a.click();

      URL.revokeObjectURL(url);

      fs.unlink("/input.pdf");
      fs.unlink("/output.pdf");

      setStatus("Password added successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Failed to add password to PDF.");
    }
  };

  return (
    <div className="card">
      <h1 className="title">Add PDF Password</h1>

      <p className="subtitle">
        Protect your PDF with a password directly in your browser.
      </p>

      <label className="upload-area">
        <span className="upload-icon">📄</span>

        <p className="upload-text">
          {file ? file.name : "Choose a PDF file"}
        </p>

        <input
          className="file-input"
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] ?? null)
          }
        />
      </label>

      <div className="form-group">
        <label className="label" htmlFor="password">
          PDF Password
        </label>

        <input
          id="password"
          className="password-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="unlock-button" onClick={addPassword}>
        Add Password
      </button>

      {status && <p className="status">{status}</p>}

      <p className="privacy-note">
        Your PDF is processed locally in your browser and is never uploaded
        to a server.
      </p>
    </div>
  );
}

export default PdfPasswordAdder;