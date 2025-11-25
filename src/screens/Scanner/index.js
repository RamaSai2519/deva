import { useState } from "react";
import { QRScanner } from "./scanner";
import { FailureModal } from "./failure_modal";
import { SuccessModal } from "./success_modal";
import Raxios from '../../services/axiosHelper';
import { message } from "antd";

export default function PaymentScannerPage() {
    const [scanState, setScanState] = useState("idle");
    const [transactionData, setTransactionData] = useState(null);
    const [errorData, setErrorData] = useState(null);

    const handleStartScan = () => {
        setScanState("scanning");
    };

    const handleScanResult = async (result) => {
        if (!result) return;
        setScanState("idle");

        result = JSON.parse(result);
        const payload = {
            action: "deduct",
            coins: result.charge,
            admin_id: result.stall_id,
            user_id: localStorage.getItem("user_id")
        };

        try {
            const response = await Raxios.post("/wallet", payload);
            if (response.status !== 200) {
                message.error("Transaction failed. Please try again.");
                setErrorData({
                    message: response.msg || "Transaction failed due to server error.",
                    code: "ERR_SERVER_001",
                });
                setScanState("failure");
                return;
            } else {
                setTransactionData(response.data);
                setScanState("success");
                return;
            }
        } catch (error) {
            message.error("Transaction failed. Please try again.");
            setErrorData({
                message: "Transaction failed due to a network error.",
                code: "ERR_NETWORK_002",
            });
            setScanState("failure");
            return;
        }
    };

    const handleReset = () => {
        setScanState("idle");
        setTransactionData(null);
        setErrorData(null);
    };

    const onSuccessClose = () => {
        handleReset();
        window.location.href = '/account';
    };

    const handleRetry = () => {
        setErrorData(null);
        handleStartScan();
    };

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <header className="px-6 py-4 flex items-center justify-between">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-card">
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-foreground text-lg font-medium">Scan to Pay</h1>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-card">
                    <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <QRScanner
                    isScanning={scanState === "scanning"}
                    onStartScan={handleStartScan}
                    onScanResult={handleScanResult}
                />

                <p className="mt-8 text-muted-foreground text-sm text-center max-w-xs">
                    {scanState === "scanning" ? "Scanning QR code..." : "Position the QR code within the frame to scan"}
                </p>
            </div>

            <SuccessModal isOpen={scanState === "success"} onClose={onSuccessClose} transactionData={transactionData} />

            <FailureModal
                isOpen={scanState === "failure"}
                onClose={handleReset}
                onRetry={handleRetry}
                errorData={errorData}
            />
        </main>
    )
}