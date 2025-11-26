import React, { useState, useEffect } from "react";
import { logAccess, AUDIT_ACTIONS } from "../utils/audit";

export default function ConsentManager({ records, onConsentChange }) {
  const [consents, setConsents] = useState({});
  const [showManager, setShowManager] = useState(false);

  // Load consents from localStorage on mount
  useEffect(() => {
    const savedConsents = localStorage.getItem('healthdash_consents');
    if (savedConsents) {
      setConsents(JSON.parse(savedConsents));
    }
  }, []);

  // Save consents to localStorage when they change
  useEffect(() => {
    localStorage.setItem('healthdash_consents', JSON.stringify(consents));
  }, [consents]);

  const handleGlobalConsentChange = (consented) => {
    const newConsents = {};
    records.forEach(record => {
      newConsents[record.id] = consented;
      if (onConsentChange) {
        onConsentChange(record.id, consented);
      }
    });
    setConsents(newConsents);
    
    // Log consent change
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.CONSENT_TOGGLE,
      targetId: `global_consent_${consented ? 'enabled' : 'disabled'}`,
      source: "Consent Manager"
    });
  };

  const handleIndividualConsentChange = (recordId, consented) => {
    const newConsents = {
      ...consents,
      [recordId]: consented
    };
    setConsents(newConsents);
    if (onConsentChange) {
      onConsentChange(recordId, consented);
    }
    
    // Log consent change
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.CONSENT_TOGGLE,
      targetId: recordId,
      source: "Consent Manager"
    });
  };

  const getConsentStatus = (recordId) => {
    return consents[recordId] !== undefined ? consents[recordId] : false;
  };

  const getAllConsentsStatus = () => {
    if (records.length === 0) return false;
    return records.every(record => getConsentStatus(record.id));
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Data Sharing Preferences</h3>
        <button
          onClick={() => setShowManager(!showManager)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {showManager ? "Hide Details" : "Manage Individual Records"}
        </button>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Share all records with external providers</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={getAllConsentsStatus()}
              onChange={(e) => handleGlobalConsentChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p className="text-xs text-gray-400">
          When enabled, your health records can be shared with trusted external healthcare providers for coordinated care.
        </p>
      </div>
      
      {showManager && (
        <div className="border-t border-gray-700 pt-4 mt-4">
          <h4 className="font-medium mb-3">Individual Record Consents</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {records.map(record => (
              <div key={record.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{record.title}</div>
                  <div className="text-xs text-gray-400 truncate">{record.source}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={getConsentStatus(record.id)}
                    onChange={(e) => handleIndividualConsentChange(record.id, e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-blue-900/20 rounded-lg">
        <p className="text-xs text-blue-200">
          <strong>Privacy Notice:</strong> Your consent controls whether your health information can be shared. 
          You can change these preferences at any time. No data is shared without your explicit consent.
        </p>
      </div>
    </div>
  );
}