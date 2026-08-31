import { useState, useRef, useEffect } from "react";
import createModule from "@neslinesli93/qpdf-wasm";

import type { QpdfModule, QpdfFS } from "../types/qpdf";

function PdfPasswordChanger() {
  const [file, setFile] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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

  const changePassword = async () => {
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

    try {
      setStatus("Loading PDF...");

      const data = new Uint8Array(await file.arrayBuffer());

      fs.writeFile("/input.pdf", data);

      setStatus("Changing PDF password...");

      qpdf.callMain([
        "--password=" + currentPassword,
        "--encrypt",
        newPassword,
        newPassword,
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
      a.download = file.name.replace(".pdf", "_password-changed.pdf");
      a.click();

      URL.revokeObjectURL(url);

      fs.unlink("/input.pdf");
      fs.unlink("/output.pdf");

      setStatus("PDF password changed successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Failed to change PDF password. Check the current password.");
    }
  };

  return (
    <div className="card">
      <h1 className="title">Change PDF Password</h1>

      <p className="subtitle">
        Change the password of your PDF directly in your browser.
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
        <label className="label" htmlFor="current-password">
          Current PDF Password
        </label>

        <input
          id="current-password"
          className="password-input"
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="new-password">
          New PDF Password
        </label>

        <input
          id="new-password"
          className="password-input"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button className="unlock-button" onClick={changePassword}>
        Change Password
      </button>

      {status && <p className="status">{status}</p>}

      <p className="privacy-note">
        Your PDF is processed locally in your browser and is never uploaded
        to a server.
      </p>
    </div>
  );
}

export default PdfPasswordChanger;