# PDF Unlocker

A privacy-focused, browser-based PDF utility for managing password-protected PDF files.

The application processes PDFs **entirely in your browser**. Once a PDF is loaded, its binary data stays on your device and is processed locally — **no PDF data is uploaded to a server or sent over the network**.

## ✨ Features

### 🔓 Unlock PDF

Remove password protection from a PDF when you know the existing password and create an accessible copy of the document.

### 🔐 Change Password

Change the password protecting an existing PDF by decrypting it with the current password and applying a new one.

### 📄 Add Password

Protect an unencrypted PDF by adding a password to restrict access to its contents.

## 🔒 Privacy First

Your PDF never needs to leave your browser.

The application follows a **client-side processing model**:

1. You select a PDF from your device.
2. The PDF binary is loaded directly into the browser.
3. All PDF processing happens locally.
4. The resulting PDF is generated locally.
5. You download the processed file directly to your device.

**No PDF is uploaded to a backend server.**

This means there is no server-side storage of your documents and no network transfer of the PDF contents during processing.

> **Note:** No software can honestly guarantee absolute security in every environment. This project is designed so that the PDF itself is processed locally and is not transmitted to a server.

## 🛠️ How It Works

The application uses WebAssembly-based PDF processing to perform operations directly inside the browser.

Instead of following the traditional flow:

```text
PDF → Upload Server → Process → Download
```

the application uses:

```text
PDF
 ↓
Browser
 ↓
Local PDF Processing
 ↓
New PDF
 ↓
Download
```

Once the PDF is loaded, its binary data remains within the browser during processing.

## 🚀 Features at a Glance

| Feature             | Description                                            |
| ------------------- | ------------------------------------------------------ |
| 🔓 Unlock           | Remove password protection using the existing password |
| 🔐 Change Password  | Replace an existing PDF password                       |
| 🛡️ Add Password    | Add password protection to a PDF                       |
| 🔒 Local Processing | PDF processing happens entirely in the browser         |
| 🌐 No PDF Upload    | PDF contents are not sent to a backend server          |

## 🎯 Why This Project?

PDF tools often require users to upload sensitive documents to a remote server.

This project takes a different approach: **process the document locally whenever possible**.

That makes it particularly useful for documents containing sensitive or private information where uploading the PDF to a third-party service is undesirable.

## 📦 Tech Stack

* React
* JavaScript / TypeScript
* WebAssembly
* Client-side PDF processing
* CSS

## ⚠️ Security Note

This application is designed for **privacy-preserving local PDF processing**. While the application does not upload the PDF for processing, users should still follow normal security practices:

* Use trusted devices.
* Keep your browser updated.
* Avoid entering passwords on compromised systems.
* Verify the generated PDF before deleting the original.

## 📄 License

See the `LICENSE` file for details.
