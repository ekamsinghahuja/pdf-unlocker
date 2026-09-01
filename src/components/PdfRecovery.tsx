import { useEffect, useRef, useState } from "react";
import { generateCandidates } from "../hacker/candidateGenerator";
import type {QpdfModule } from "../types/qpdf";
import createModule from "@neslinesli93/qpdf-wasm";

function PdfRecovery() {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [number, setNumber] = useState("");
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



    const generate = () => {
        const qpdf = qpdfRef.current;
        if (!qpdf) {
            setStatus("PDF engine is still loading...");
            return;
        }

        // const fs = qpdf.FS as QpdfFS;

        if (!file) {
            setStatus("Please select a PDF.");
            return;
        }

        if (!name && !dob && !number) {
            setStatus("Please enter at least one recovery detail.");
            return;
        }

        setStatus("Generating candidates...");

        const generator = generateCandidates({
            name,
            dob,
            number,
        });

        let count = 0;
        const generatedSamples: string[] = [];

        const startTime = performance.now();

        for (const candidate of generator) {
            count++;

            if (generatedSamples.length < 10) {
                generatedSamples.push(candidate);
            }

        }

        const elapsed = performance.now() - startTime;
        const candidatesPerSecond = elapsed > 0 ? Math.round((count / elapsed) * 1000) : count;

        setStatus(
            `Generated ${count.toLocaleString()} candidates in ${elapsed.toFixed(0)} ms ` +
            `(${candidatesPerSecond.toLocaleString()} candidates/sec).`
        );

    };

    return (
        <div className="card">
            <h1 className="title">PDF Recovery</h1>

            <p className="subtitle">
                Generate password candidates from information you remember.
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
                <label className="label" htmlFor="name">
                    Full Name
                </label>

                <input
                    id="name"
                    className="password-input"
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="label" htmlFor="dob">
                    Date of Birth
                </label>

                <input
                    id="dob"
                    className="password-input"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="label" htmlFor="number">
                    Known Number
                </label>

                <input
                    id="number"
                    className="password-input"
                    type="text"
                    inputMode="numeric"
                    placeholder="Phone, account number, etc."
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>

            <button className="unlock-button" onClick={generate}>
                Generate Candidates
            </button>

            {status && <p className="status">{status}</p>}

            <p className="privacy-note">
                All information is processed locally in your browser and is never
                uploaded to a server.
            </p>
        </div>
    );
}

export default PdfRecovery;
