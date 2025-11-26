import { motion } from "framer-motion";

export default function AnomalyModal({ open, onClose, anomaly, latest }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-3">Heart Rate Anomaly Detected</h2>

        <p className="text-sm opacity-80">
          Latest Heart Rate: <b>{latest} bpm</b><br />
          Z-score: {anomaly.z.toFixed(2)}<br />
          Anomaly Score: {(anomaly.score * 100).toFixed(0)}%
        </p>

        <p className="text-xs mt-4 text-yellow-600 font-medium">
          ⚠️ This is a demo-only indicator. Not medical advice.
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 rounded-xl bg-blue-600 text-white"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}