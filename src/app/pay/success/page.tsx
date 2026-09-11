"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PaySuccessPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-4">
            Payment Noted!
          </h1>
          <p className="text-gray-500 mb-2">
            We&apos;ve received your payment confirmation. We&apos;ll verify the
            transaction on the blockchain shortly.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-all mt-8"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
