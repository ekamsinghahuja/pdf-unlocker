import React, { useState } from 'react'
import './App.css'

function App() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setFileName(f?.name ?? null)
    setUnlocked(false)
  }

  const onUnlock = () => {
    if (!fileName) {
      alert('Please select a PDF first')
      return
    }
    // This is a UI mock — actual unlocking logic is not implemented here.
    setUnlocked(true)
    // simulate download or further action
  }

  return (
    <div id="center">
      <header className="hero">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img src="/favicon.svg" alt="logo" style={{width: 96, height: 96, marginBottom: 12}} />
          <h1>PDF Unlocker</h1>
          <h2>Remove password protection from your PDFs quickly and securely</h2>
          <div className="counter" aria-hidden>
            Beta
          </div>
        </div>
      </header>

      <main style={{width: '100%', maxWidth: 720}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch', marginTop: 20}}>
          <label style={{textAlign: 'left', color: 'var(--text)'}}>Select a password-protected PDF</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />

          <input
            type="password"
            placeholder="Enter password (if known)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{padding: 10, borderRadius: 8, border: '1px solid var(--border)'}}
          />

          <div style={{display: 'flex', gap: 12}}>
            <button onClick={onUnlock} style={{flex: 1, background: 'var(--accent)', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 8, boxShadow: 'var(--shadow)'}}>Unlock PDF</button>
            <button onClick={() => { setFileName(null); setPassword(''); setUnlocked(false) }} style={{flex: 1, background: 'transparent', border: '1px solid var(--border)', padding: 12, borderRadius: 8}}>Reset</button>
          </div>

          <div style={{marginTop: 8, textAlign: 'left', color: 'var(--text)'}}>
            {fileName ? <div>Selected: <code>{fileName}</code></div> : <div>No file selected</div>}
            {unlocked && <div style={{marginTop: 8, color: 'var(--accent)'}}>Success — file unlocked. (Simulation)</div>}
          </div>
        </div>
      </main>

      <section id="next-steps" style={{width: '100%', marginTop: 40}}>
        <div id="docs">
          <div className="icon" aria-hidden>📄</div>
          <h2>How it works</h2>
          <p>Upload a protected PDF and provide the password if known. The app will try to remove the restriction in-browser where possible.</p>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>

        <div>
          <div className="icon" aria-hidden>🔒</div>
          <h2>Privacy</h2>
          <p>Files are processed locally when possible. No files are stored on the server by default.</p>
          <ul>
            <li><a href="#">License</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </section>

      <div id="spacer" />
    </div>
  )
}

export default App
