import QRCode from "qrcode"
import { Download } from "lucide-react"
import GitCoin from "../../Icons/gitcoin"
import { useEffect, useState } from "react"
import Raxios from "../../services/axiosHelper"
import CreateStallModal from "./create_stall_modal"
import { Button, Card, Input, message, Select } from "antd"

export default function QRGeneratorPage() {
    const [stalls, setStalls] = useState([])
    const [charge, setCharge] = useState("")
    const [qrData, setQRData] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedStallId, setSelectedStallId] = useState("")

    const fetchStalls = async () => {
        try {
            const response = await Raxios.get('/user', {
                params: {
                    filter_field: 'user_type',
                    filter_value: 'stall'
                }
            })
            if (response.status === 200) {
                setStalls(response.data.users);
            } else {
                message.error(response.msg || 'Failed to fetch stalls.');
            }
        } catch (error) {
            message.error('An error occurred while fetching stalls.');
        }
    };

    useEffect(() => { fetchStalls() }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedStallId || !charge) return
        setIsGenerating(true)

        const payload = {
            stall_id: selectedStallId,
            charge: Number.parseInt(charge, 10),
        }

        try {
            const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(payload), {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            })

            const selectedStall = stalls.find((s) => s._id === selectedStallId)

            setQRData({
                qrCodeUrl: qrCodeDataUrl,
                stallName: selectedStall?.name || "Unknown Stall",
                charge: Number.parseInt(charge, 10),
            })
        } catch (error) {
            console.error("Error generating QR code:", error)
        } finally {
            setIsGenerating(false)
        }
    }

    const handleDownload = () => {
        if (!qrData) return

        const link = document.createElement("a")
        link.download = `QR_${qrData.stallName.replace(/\s+/g, '_')}_${qrData.charge}.png`
        link.href = qrData.qrCodeUrl
        link.click()
    }

    const handleReset = () => {
        setSelectedStallId("")
        setCharge("")
        setQRData(null)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mt-8">
                <div className="text-center mb-4 md:mb-8 flex items-center justify-between">
                    <h1 className="text-white text-lg">Generate payment QR codes for stalls</h1>
                    <Button onClick={() => setIsOpen(true)} className="bg-lightBlack">Create Stall</Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Form Section */}
                    <Card className="bg-card border-border p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="stall" className="text-mutedWhite">
                                    Select Stall
                                </label>
                                <Select
                                    id="stall"
                                    value={selectedStallId}
                                    onChange={setSelectedStallId}
                                    placeholder="Choose a stall"
                                    className="w-full"
                                >
                                    {stalls.map((stall) => (
                                        <Select.Option key={stall._id} value={stall._id}>
                                            {stall.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="charge" className="text-mutedWhite">
                                    Charge Amount
                                </label>
                                <Input
                                    id="charge"
                                    type="number"
                                    min={0}
                                    step={10}
                                    value={charge}
                                    placeholder="Enter charge amount"
                                    onChange={(e) => setCharge(e.target.value)}
                                />
                            </div>

                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                disabled={!selectedStallId || !charge || isGenerating}
                            >
                                {isGenerating ? "Generating..." : "Generate QR Code"}
                            </Button>
                        </form>
                    </Card>

                    {/* QR Code Display Section */}
                    <Card className="bg-card border-border p-6 flex flex-col items-center justify-center">
                        {qrData ? (
                            <div className="space-y-6 text-center w-full">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold text-card-foreground">{qrData.stallName}</h3>
                                    <p className="text-3xl font-bold flex items-center justify-center gap-2 text-card-foreground">
                                        {qrData.charge}
                                        <GitCoin />
                                    </p>
                                </div>

                                <div className="bg-white p-4 rounded-lg inline-block">
                                    <img src={qrData.qrCodeUrl || "/placeholder.svg"} alt="Generated QR Code" className="w-64 h-64" />
                                </div>

                                <div className="flex gap-3 w-full">
                                    <Button
                                        type="primary"
                                        onClick={handleDownload}
                                        className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                                        icon={<Download className="h-4 w-4" />}
                                    >
                                        Download QR
                                    </Button>
                                    <Button
                                        onClick={handleReset}
                                        className="flex-1 border-border text-card-foreground hover:bg-secondary bg-transparent"
                                    >
                                        Generate New
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-3">
                                <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center mx-auto">
                                    <svg
                                        className="w-16 h-16 text-muted-foreground"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <p className="text-muted-foreground">Fill the form to generate a QR code</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
            <CreateStallModal isOpen={isOpen} onClose={() => { setIsOpen(false); fetchStalls(); }} />
        </div>
    )
}
