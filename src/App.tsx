import "./App.css";
import { useState } from "react";

import { Unlock, KeyRound, LockKeyhole, FileText } from "lucide-react";

import PdfPasswordChanger from "./components/PdfPasswordChanger";
import PdfUnlocker from "./components/PdfUnlocker";
import PdfPasswordAdder from "./components/PdfPasswordAdder";

type Feature = "unlock" | "change-password" | "add-password";

function App() {
  const [feature, setFeature] = useState<Feature>("unlock");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <span className = "sidebar-header">
            <span className="nav-icon">
              <FileText size={19} strokeWidth={1.8} />
            </span>
            <span className="nav-label">PDF Tools</span>
          </span> 
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? "«" : "»"}
        </button>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${feature === "unlock" ? "active" : ""}`}
            onClick={() => setFeature("unlock")}
          >
            <span className="nav-icon">
              <Unlock size={19} strokeWidth={1.8} />
            </span>
            <span className="nav-label">Unlock PDF</span>
          </button>

          <button
            className={`nav-item ${feature === "change-password" ? "active" : ""}`}
            onClick={() => setFeature("change-password")}
          >
            <span className="nav-icon">
              <KeyRound size={19} strokeWidth={1.8} />
            </span>
            <span className="nav-label">Change Password</span>
          </button>

          <button
            className={`nav-item ${feature === "add-password" ? "active" : ""}`}
            onClick={() => setFeature("add-password")}
          >
            <span className="nav-icon">
              <LockKeyhole size={19} strokeWidth={1.8} />
            </span>
            <span className="nav-label">Add Password</span>
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {feature === "unlock" && <PdfUnlocker />}

        {feature === "change-password" && <PdfPasswordChanger/>}

        {feature === "add-password" && <PdfPasswordAdder />}
      </main>
    </div>
  );
}

export default App;
