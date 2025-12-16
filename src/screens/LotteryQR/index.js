import { RefreshCw, Copy, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Raxios from "../../services/axiosHelper";
import { checkAccess } from "../../utils/auth";
import { Button, Card, message } from "antd";
import QRCode from "qrcode"

export default function LotteryQR() {
    const canvasRef = useRef(null)
    const [oid, setOid] = useState("")
    const [copied, setCopied] = useState(false)

    checkAccess('admin');

    const getOID = async () => {
        try {
            const response = await Raxios.get('/coupon')
            if (response.status === 200) {
                setOid(response.data.coupon_id)
                setCopied(false)
            } else {
                message.error(response.msg || "Failed to fetch coupon ID")
            }
        } catch (error) {
            message.error("An error occurred while fetching coupon ID")
        }
    }

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(oid)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    useEffect(() => { getOID() }, [])

    useEffect(() => {
        if (oid && canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, JSON.stringify({ coupon: oid }), {
                width: 300, margin: 2,
                color: { dark: "#000", light: "#fff", },
            })
        }
    }, [oid])

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <div className="w-full max-w-2xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold">Scan to enter lottery</h1>
                </div>

                <Card className="p-4 md:p-12 space-y-8 bg-lightBlack">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-black blur-3xl rounded-full" />
                            <div className="relative bg-[#0f172a] p-2 rounded-lg border-2 shadow-lg shadow-black border-[#4d4d4d]">
                                <canvas ref={canvasRef} className="w-full h-auto rounded-md" />
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-muted-foreground">Unique Identifier</label>
                                <div
                                    onClick={copyToClipboard}
                                    className="h-8 w-auto flex items-center justify-center gap-2 bg-darkBlack p-2 rounded-lg border border-border cursor-pointer hover:bg-lightBlack transition"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4" /><span>Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" /><span>Copy</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                <code className="block w-full p-4 bg-lightBlack rounded-lg border border-border text-sm font-mono text-foreground break-all">
                                    {oid}
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <Button
                            size="large"
                            onClick={getOID}
                            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <RefreshCw className="h-5 w-5" />
                            Generate New QR Code
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
