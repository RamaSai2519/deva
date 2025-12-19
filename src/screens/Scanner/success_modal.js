import { useEffect, useState } from "react"
import GitCoin from "../../Icons/gitcoin";


export function SuccessModal({ isOpen, onClose, transactionData, transactionType = "payment" }) {
  const [showCheck, setShowCheck] = useState(false)
  const isCoupon = transactionType === "coupon";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowCheck(true), 200)
      return () => clearTimeout(timer)
    } else {
      setShowCheck(false)
    }
  }, [isOpen])

  if (!isOpen || !transactionData) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-lightBlack/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 mb-4 sm:mb-0 bg-lightBlack rounded-3xl p-8 animate-slide-up">
        <div className="flex justify-center mb-6">
          <div
            className={`w-20 h-20 rounded-full bg-darkBlack flex items-center justify-center transition-transform duration-500 ${showCheck ? "scale-100" : "scale-0"}`}
          >
            <svg className="w-10 h-10 text-success" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
                className={showCheck ? "animate-draw-check" : ""}
                style={{ strokeDasharray: 24, strokeDashoffset: showCheck ? 0 : 24 }}
              />
            </svg>
          </div>
        </div>

        <h2 className="text-foreground text-xl font-semibold text-center mb-2">
          {isCoupon ? "Lottery Entry Successful" : "Payment Successful"}
        </h2>
        <p className="text-mutedWhite text-sm text-center mb-8">
          {isCoupon ? "You have successfully entered the lottery contest!" : "Your transaction has been completed"}
        </p>

        {!isCoupon && (
          <div className="text-center mb-8 flex items-center justify-center space-x-2">
            <span className="text-foreground text-4xl font-bold">
              {transactionData.amount}</span>
            <GitCoin />
          </div>
        )}

        <div className="bg-darkBlack rounded-2xl p-4 space-y-4 mb-8">
          {!isCoupon && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-mutedWhite text-sm">Recipient</span>
                <span className="text-foreground text-sm font-medium">{transactionData.admin_name}</span>
              </div>
              <div className="h-px bg-lightBlack  " />
            </>
          )}
          <div className="flex justify-between items-center">
            <span className="text-mutedWhite text-sm">Transaction ID</span>
            <span className="text-foreground text-sm font-mono">{transactionData._id}</span>
          </div>
          <div className="h-px bg-lightBlack  " />
          {!isCoupon && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-mutedWhite text-sm">Curent Balance</span>
                <span className="text-foreground text-sm">{transactionData.new_balance}</span>
              </div>
              <div className="h-px bg-lightBlack  " />
            </>
          )}
          <div className="flex justify-between items-center">
            <span className="text-mutedWhite text-sm">Date</span>
            <span className="text-foreground text-sm">
              {new Date(transactionData?.timestamp || transactionData?.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-white/65 text-black font-semibold rounded-2xl transition-opacity hover:opacity-90 active:opacity-80"
        >
          Done
        </button>

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
          @keyframes draw-check {
            to {
              stroke-dashoffset: 0;
            }
          }
          .animate-draw-check {
            animation: draw-check 0.4s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  )
}
