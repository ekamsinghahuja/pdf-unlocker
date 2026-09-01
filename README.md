# PDF Unlocker

A simple browser-based tool to remove password protection from PDF files.

## Features

* Unlock password-protected PDFs using the known password
* 100% client-side PDF processing
* No file uploads or backend required
* Download the unlocked PDF instantly

## Tech Stack

* React
* TypeScript
* Vite
* qpdf WebAssembly

## Getting Started

```bash
git clone https://github.com/<username>/pdf-unlocker.git
cd pdf-unlocker
npm install
npm run dev
```

Open the local development URL in your browser.

## Privacy

All PDF processing happens locally in the browser. Your PDF and password are never sent to a server.

## Note

This tool is intended for PDFs you own or are authorized to modify. It requires the correct password and does not attempt to recover lost passwords.
