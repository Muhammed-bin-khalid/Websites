"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PayCancelPage() {
  return (
    <>
      <Navbar />
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-heading font-bold text-primary mb-4">
            Payment Cancelled
          </h1>
          <p className="text-gray-500 mb-8">
            No worries. You can try again whenever you&apos;re ready.
          </p>
          <Link
            href="/pay"
            className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-all"
          >
            Try Again
          </Link>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
