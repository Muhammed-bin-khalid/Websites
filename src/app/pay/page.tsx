"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import config from "../../../business-config";

const cryptoWallets = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    color: "#F7931A",
    address: process.env.NEXT_PUBLIC_BTC_WALLET || "bc1q32sh7fjmtk92mtwlxzgs8nu64g2mnslk7cfp50",
    uri: "bitcoin:",
    network: "Bitcoin Network",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ",
    color: "#627EEA",
    address: process.env.NEXT_PUBLIC_ETH_WALLET || "0x8CeB09A5Df23758D8A884ab6a9C109B4E8793c56",
    uri: "ethereum:",
    network: "ERC-20",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "₮",
    color: "#26A17B",
    address: process.env.NEXT_PUBLIC_USDT_WALLET || "0x8CeB09A5Df23758D8A884ab6a9C109B4E8793c56",
    uri: "ethereum:",
    network: "ETH Network (ERC-20)",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-500">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default function PayPage() {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const selected = cryptoWallets.find((c) => c.id === selectedCrypto);
  const parsedAmount = parseFloat(amount) || 0;
  const isValidAmount = parsedAmount > 0;

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
  };

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-24 min-h-screen bg-[var(--background)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              Make a Payment
            </h1>
            <p className="text-gray-500 text-sm">
              Pay with cryptocurrency. Choose your preferred coin below.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 1: Choose crypto */}
            {!selectedCrypto && !paymentConfirmed && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {/* Amount Input */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">
                  <label className="block text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-3">
                    Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-heading text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-4 text-3xl font-heading font-bold text-primary bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                {/* Crypto Selection */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">
                    Select Cryptocurrency
                  </p>
                  <div className="space-y-3">
                    {cryptoWallets.map((crypto) => (
                      <button
                        key={crypto.id}
                        onClick={() => setSelectedCrypto(crypto.id)}
                        disabled={!isValidAmount}
                        className="w-full flex items-center justify-between px-5 py-4 border border-gray-200 rounded-xl hover:border-primary/30 hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                            style={{ backgroundColor: crypto.color }}
                          >
                            {crypto.icon}
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-primary">{crypto.name}</p>
                            <p className="text-xs text-gray-400">{crypto.network}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Show wallet + QR */}
            {selected && !paymentConfirmed && (
              <motion.div
                key="pay"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Back button */}
                <button
                  onClick={() => setSelectedCrypto(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Choose different crypto</span>
                </button>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  {/* Selected crypto header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: selected.color }}
                    >
                      {selected.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-primary">
                        Pay with {selected.name}
                      </h2>
                      <p className="text-xs text-gray-400">{selected.network}</p>
                    </div>
                  </div>

                  {/* Amount display */}
                  {parsedAmount > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
                      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-1">
                        Amount to Pay
                      </p>
                      <p className="text-3xl font-heading font-bold text-primary">
                        ${parsedAmount.toFixed(2)} USD
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Convert to {selected.symbol} at current rate
                      </p>
                    </div>
                  )}

                  {/* QR Code */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <QRCodeSVG
                        value={`${selected.uri}${selected.address}`}
                        size={200}
                        level="H"
                        includeMargin={false}
                        fgColor="#0A0A0A"
                        bgColor="#FFFFFF"
                      />
                    </div>
                  </div>

                  {/* Wallet address */}
                  <div className="mb-6">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-2">
                      Send exactly {selected.symbol} to this address
                    </p>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                      <code className="flex-1 text-xs text-primary break-all font-mono leading-relaxed">
                        {selected.address}
                      </code>
                      <CopyButton text={selected.address} />
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <p className="text-xs text-amber-700 leading-relaxed">
                      <strong>Important:</strong> Only send {selected.symbol} to this
                      address. Sending any other cryptocurrency may result in permanent
                      loss. Make sure to include the correct network fee.
                    </p>
                  </div>

                  {/* Customer info (optional) */}
                  <div className="space-y-4 mb-6">
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500">
                      Your Info (optional — for receipt)
                    </p>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Name"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>

                  {/* Confirm button */}
                  <button
                    onClick={handleConfirmPayment}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent transition-all"
                  >
                    I&apos;ve Sent the Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {paymentConfirmed && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-3">
                  Payment Noted!
                </h2>
                <p className="text-gray-500 mb-2">
                  We&apos;ve received your payment confirmation.
                </p>
                <p className="text-sm text-gray-400 mb-8">
                  We&apos;ll verify the transaction on the blockchain and get back to you
                  within 24 hours at{" "}
                  <strong>{customerEmail || "your provided email"}</strong>.
                </p>
                <button
                  onClick={() => {
                    setPaymentConfirmed(false);
                    setSelectedCrypto(null);
                    setAmount("");
                    setCustomerName("");
                    setCustomerEmail("");
                  }}
                  className="text-sm text-gray-500 hover:text-primary transition-colors underline"
                >
                  Make another payment
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>Secure & Encrypted</span>
            <span>•</span>
            <span>Zero Third-Party Fees</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
