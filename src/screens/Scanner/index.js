import { message } from "antd";
import { useState } from "react";
import { QRScanner } from "./scanner";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../../utils/auth";
import { FailureModal } from "./failure_modal";
import { SuccessModal } from "./success_modal";
import Raxios from '../../services/axiosHelper';

export default function PaymentScannerPage() {
    const navigate = useNavigate();
    const [scanState, setScanState] = useState("idle");
    const [transactionData, setTransactionData] = useState(null);
    const [errorData, setErrorData] = useState(null);
    const [transactionType, setTransactionType] = useState("payment");

    checkAccess('user');

    const handleStartScan = () => {
        setScanState("scanning");
    };

    const handleScanResult = async (result) => {
        if (!result) return;
        setScanState("loading");

        try {
            result = JSON.parse(result);
        } catch (parseError) {
            message.info(result);
            message.error("Invalid QR code format. Please scan a valid payment QR code.");
            setErrorData({
                message: "The scanned QR code is not in the correct format.",
                code: "ERR_INVALID_QR",
            });
            setScanState("failure");
            return;
        }

        if (result.coupon) {
            setTransactionType("coupon");
            const payload = {
                coupon_id: result.coupon,
                user_id: localStorage.getItem("user_id")
            };

            try {
                const response = await Raxios.post("/coupon", payload);
                if (response.status !== 200) {
                    message.error("Coupon redemption failed. Please try again.");
                    setErrorData({
                        message: response.msg || "Coupon redemption failed due to server error.",
                        code: "ERR_COUPON_001",
                    });
                    setScanState("failure");
                    return;
                } else {
                    setTransactionData(response.data);
                    setScanState("success");
                    return;
                }
            } catch (error) {
                message.error("Coupon redemption failed. Please try again.");
                setErrorData({
                    message: error.response?.data?.msg || "Coupon redemption failed due to a network error.",
                    code: "ERR_NETWORK_003",
                });
                setScanState("failure");
                return;
            }
        } else {
            // Handle as payment QR code
            setTransactionType("payment");

            if (!result.charge || !result.stall_id) {
                message.error("Invalid payment QR code. Missing required information.");
                setErrorData({
                    message: "The payment QR code is missing required information.",
                    code: "ERR_INVALID_PAYMENT_DATA",
                });
                setScanState("failure");
                return;
            }

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
        }
    };

    const handleReset = () => {
        setScanState("idle");
        setTransactionData(null);
        setErrorData(null);
    };

    const onSuccessClose = () => {
        handleReset();
        navigate('/account');
    };

    const handleRetry = () => {
        setErrorData(null);
        handleStartScan();
    };

    return (
        <main className="min-h-screen flex flex-col">

            <div className="flex-1 flex flex-col items-center justify-center px-6">
                <QRScanner
                    isScanning={scanState === "scanning"}
                    isLoading={scanState === "loading"}
                    onStartScan={handleStartScan}
                    onScanResult={handleScanResult}
                />

                <p className="mt-8 text-muted-foreground text-sm text-center max-w-xs">
                    {scanState === "scanning" ? "Scanning QR code..." : "Position the QR code within the frame to scan"}
                </p>
            </div>

            <SuccessModal isOpen={scanState === "success"} onClose={onSuccessClose} transactionData={transactionData} transactionType={transactionType} />

            <FailureModal
                isOpen={scanState === "failure"}
                onClose={handleReset}
                onRetry={handleRetry}
                errorData={errorData}
                transactionType={transactionType}
            />
        </main>
    )
}