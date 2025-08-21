"use client";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      {/* Spinning Circle */}
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Text below spinner */}
      <motion.p
        className="absolute mt-24 text-lg font-medium text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;
