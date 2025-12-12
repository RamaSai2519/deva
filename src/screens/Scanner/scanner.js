import { QrReader } from 'react-qr-reader';

export function QRScanner({ isScanning, isLoading, onStartScan, onScanResult }) {
    return (
        <div className="relative">
            <div className="w-72 h-72 relative bg-black rounded-2xl">
                {isScanning ? (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <QrReader
                            constraints={{ facingMode: 'environment' }}
                            onResult={(result, error) => {
                                if (result) {
                                    onScanResult(result?.text);
                                }
                                if (error) {
                                    console.info(error);
                                }
                            }}
                            videoStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            containerStyle={{ width: '100%', height: '100%' }}
                        />
                    </div>
                ) : isLoading ? (
                    <div className="w-72 h-72 relative cursor-pointer flex items-center justify-center bg-card/50 rounded-2xl" >
                        <div className="ease-linear rounded-full border-4 border-transparent border-t-4 h-16 w-16 border-t-white animate-spin" />
                        <style jsx>{`
                            .loader {
                                border-top-color: #white;
                                animation: spin 1s linear infinite;
                            }

                            @keyframes spin {
                                0% {
                                    transform: rotate(0deg);
                                }
                                100% {
                                    transform: rotate(360deg);
                                }
                            }
                        `}</style>
                    </div>
                ) : (
                    <div className="w-72 h-72 relative cursor-pointer" onClick={onStartScan}>
                        <div className="absolute inset-4 bg-card/50 rounded-2xl flex items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center">
                                    <svg className="w-8 h-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-muted-foreground text-sm">Tap to scan</span>
                            </div>
                        </div>
                    </div>
                )}

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 288">
                    <path
                        d="M8 48 L8 8 L48 8"
                        fill="none"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className={isScanning ? "animate-pulse" : ""}
                    />
                    <path
                        d="M240 8 L280 8 L280 48"
                        fill="none"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className={isScanning ? "animate-pulse" : ""}
                    />
                    <path
                        d="M8 240 L8 280 L48 280"
                        fill="none"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className={isScanning ? "animate-pulse" : ""}
                    />
                    <path
                        d="M240 280 L280 280 L280 240"
                        fill="none"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className={isScanning ? "animate-pulse" : ""}
                    />
                </svg>

                {isScanning && (
                    <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-foreground to-transparent animate-scan pointer-events-none" />
                )}
            </div>

            <style jsx>{`
        @keyframes scan {
          0%, 100% {
            top: 16px;
          }
          50% {
            top: calc(100% - 20px);
          }
        }
        .animate-scan {
          animation: scan 1.5s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}
