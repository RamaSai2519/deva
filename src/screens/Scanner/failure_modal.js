import { useEffect, useState } from "react"

export function FailureModal({ isOpen, onClose, onRetry, errorData, transactionType = "payment" }) {
  const [shake, setShake] = useState(false)
  const isCoupon = transactionType === "coupon";

  const shakeModal = () => {
    setTimeout(() => setShake(true), 1000)
    setTimeout(() => setShake(false), 500)
  }

  useEffect(() => {
    if (isOpen) {
      shakeModal()
    }
  }, [isOpen])

  if (!isOpen || !errorData) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-lightBlack/80 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative w-full max-w-md mx-4 mb-4 sm:mb-0 bg-lightBlack rounded-3xl p-8 animate-slide-up ${shake ? "animate-shake" : ""}`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-darkBlack flex items-center justify-center">
            <svg className="w-10 h-10 text-error" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h2 className="text-foreground text-xl font-semibold text-center mb-2">
          {isCoupon ? "Coupon Redemption Failed" : "Payment Failed"}
        </h2>
        <p className="text-mutedWhite text-xl text-center mb-8">{errorData.message}</p>

        <div className="bg-darkBlack rounded-2xl p-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-mutedWhite text-sm">Error Code</span>
            <span className="text-mutedWhite text-xs font-mono bg-lightBlack px-2 py-1 rounded">{errorData.code}</span>
          </div>
        </div>

        <div className="mb-8 space-y-3">
          <p className="text-mutedWhite text-xs uppercase tracking-wider">Suggestions</p>
          <ul className="space-y-2">
            {isCoupon ? (
              <>
                <li className="flex items-start gap-2 text-mutedWhite text-sm">
                  <span className="mt-0.5">•</span>
                  Verify the coupon code is valid and not expired
                </li>
                <li className="flex items-start gap-2 text-mutedWhite text-sm">
                  <span className="mt-0.5">•</span>
                  Check if the coupon has already been redeemed
                </li>
                <li className="flex items-start gap-2 text-mutedWhite text-sm">
                  <span className="mt-0.5">•</span>
                  Ensure you have an active account
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2 text-mutedWhite text-sm">
                  <span className="mt-0.5">•</span>
                  Check if you sufficient balance is available
                </li>
                <li className="flex items-start gap-2 text-mutedWhite text-sm">
                  <span className="mt-0.5">•</span>
                  Check if the QR code is valid and not expired
                </li>
                <li className="flex items-start gap-2 text-mutedWhite text-sm">
                  <span className="mt-0.5">•</span>
                  Ensure good lighting and steady camera
                </li>
                <li className="flex items-start gap-2 text-mutedWhite text-sm">
                  <span className="mt-0.5">•</span>
                  Try scanning from a different angle
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-darkBlack text-foreground font-semibold rounded-2xl transition-opacity hover:opacity-80 active:opacity-70"
          >
            Cancel
          </button>
          <button
            onClick={onRetry}
            className="flex-1 py-4 bg-white/65 text-black font-semibold rounded-2xl transition-opacity hover:opacity-90 active:opacity-80"
          >
            Try Again
          </button>
        </div>

        <style jsx>{`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(100px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.4s ease-out;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-8px); }
            80% { transform: translateX(8px); }
          }
          .animate-shake {
            animation: shake 0.5s ease-out;
          }
        `}</style>
      </div>
    </div>
  )
}
