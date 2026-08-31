import createModule from "@neslinesli93/qpdf-wasm";

type QpdfModule = Awaited<ReturnType<typeof createModule>>;
type QpdfFS = QpdfModule["FS"] & {
    writeFile: (path: string, data: Uint8Array) => void;
    unlink: (path: string) => void;
};

export type { QpdfModule, QpdfFS };