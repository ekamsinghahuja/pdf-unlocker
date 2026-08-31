import { useState, useRef, useEffect } from "react";
import createModule from "@neslinesli93/qpdf-wasm";
import type { QpdfModule, QpdfFS } from "../types/qpdf";



function PdfUnlocker() {
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

    const unlockPdf = async () => {
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

            setStatus("Loading PDF engine...");

            const data = new Uint8Array(await file.arrayBuffer());
            fs.writeFile("/input.pdf", data);

            setStatus("Unlocking PDF...");
            qpdf.callMain(["--password=" + password, "--decrypt", "/input.pdf", "/output.pdf"]);


            const output = fs.readFile("/output.pdf");

            const blob = new Blob([new Uint8Array(output)], {
                type: "application/pdf",
            });

            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = file.name.replace(".pdf", "_unlocked.pdf");
            a.click();

            URL.revokeObjectURL(url);
            fs.unlink("/input.pdf");
            fs.unlink("/output.pdf");

            setStatus("PDF unlocked successfully!");
        } catch (error) {
            console.error(error);
            setStatus("Failed to unlock PDF. Check the password.");
        }
    };

    return (
        <div className="card">
            <h1 className="title">PDF Unlocker</h1>

            <p className="subtitle">
                Remove PDF restrictions directly in your browser.
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
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
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
                    placeholder="Enter PDF password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="unlock-button" onClick={unlockPdf}>
                Unlock PDF
            </button>

            {status && <p className="status">{status}</p>}

            <p className="privacy-note">
                Your PDF is processed locally in your browser and is never uploaded to
                a server.
            </p>
        </div>
    );
}

export default PdfUnlocker;

