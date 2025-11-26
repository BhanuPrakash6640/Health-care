import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const getTypeColor = (type) => {
  const colors = {
    demographics: "bg-blue-500",
    medication: "bg-green-500",
    diagnosis: "bg-purple-500",
    lab: "bg-yellow-500",
    visit: "bg-indigo-500",
    immunization: "bg-pink-500",
    allergy: "bg-red-500",
    procedure: "bg-teal-500",
  };
  return colors[type] || "bg-gray-500";
};

const getTypeLabel = (type) => {
  const labels = {
    demographics: "Demographics",
    medication: "Medication",
    diagnosis: "Diagnosis",
    lab: "Lab Report",
    visit: "Visit Note",
    immunization: "Immunization",
    allergy: "Allergy",
    procedure: "Procedure",
  };
  return labels[type] || type;
};

// Helper function to highlight search terms
const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? 
      <span key={index} className="bg-yellow-500/30 text-yellow-200">{part}</span> : 
      part
  );
};

export default function RecordCard({ record, onConsentChange, searchTerm }) {
  const [expanded, setExpanded] = useState(false);
  const [consented, setConsented] = useState(record.consented);

  const handleConsentChange = (e) => {
    e.stopPropagation(); // Prevent expanding the card when toggling consent
    const newConsent = !consented;
    setConsented(newConsent);
    if (onConsentChange) {
      onConsentChange(record.id, newConsent);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="p-4 cursor-pointer flex justify-between items-start"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className={`inline-block w-3 h-3 rounded-full ${getTypeColor(record.type)} mr-2`}></span>
            <span className="text-sm font-medium text-gray-300">{getTypeLabel(record.type)}</span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-xs text-gray-400">{formatDate(record.date)}</span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-xs text-gray-400">{record.source}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{highlightText(record.title, searchTerm)}</h3>
          {!expanded && (
            <p className="text-gray-300 mt-2 text-sm line-clamp-2">
              {highlightText(record.content.substring(0, 100), searchTerm)}...
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={consented}
                onChange={handleConsentChange}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-2 text-xs text-gray-300">Consent</span>
            </label>
          </div>
          {expanded ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {expanded && (
        <motion.div
          className="px-4 pb-4 border-t border-gray-700"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-3">
            <p className="text-gray-200 whitespace-pre-line">{record.content}</p>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              <span>ID: {record.id}</span>
              <span className="mx-2">•</span>
              <span>Source: {record.source}</span>
            </div>
            <div className="flex space-x-2">
              <div className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded">
                {record.source}
              </div>
              <div className="text-xs px-2 py-1 bg-gray-700 rounded">
                {consented ? (
                  <span className="text-green-400">Consented</span>
                ) : (
                  <span className="text-red-400">Not consented</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-500">
              <div className="font-medium mb-1">Provenance Details:</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-700/50 px-2 py-1 rounded">ID: {record.id}</span>
                <span className="bg-gray-700/50 px-2 py-1 rounded">Source: {record.source}</span>
                <span className="bg-gray-700/50 px-2 py-1 rounded">Date: {formatDate(record.date)}</span>
                <span className="bg-gray-700/50 px-2 py-1 rounded">Type: {getTypeLabel(record.type)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}