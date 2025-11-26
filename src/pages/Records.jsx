import React, { useState, useMemo, useRef, useEffect } from "react";
import { patientRecords } from "../data/patientRecords";
import RecordCard from "../components/RecordCard";
import ConsentManager from "../components/ConsentManager";
import { DocumentTextIcon, ArrowDownTrayIcon, FunnelIcon } from "@heroicons/react/24/solid";
import DataImporter from "../components/DataImporter";
import { exportFHIRBundle, redactPHI } from "../utils/fhir";
import { logAccess, AUDIT_ACTIONS } from "../utils/audit";

export default function Records() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [showImporter, setShowImporter] = useState(false);
  const [records, setRecords] = useState(patientRecords);
  const searchTimeoutRef = useRef(null);

  // Log page view
  useEffect(() => {
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.RECORD_VIEW,
      targetId: "records_page",
      source: "Records Page"
    });
  }, []);

  // Get unique sources for filter dropdown
  const sources = useMemo(() => {
    const uniqueSources = [...new Set(records.map(record => record.source))];
    return uniqueSources;
  }, [records]);

  // Get unique types for filter dropdown
  const types = useMemo(() => {
    const uniqueTypes = [...new Set(records.map(record => record.type))];
    return uniqueTypes;
  }, [records]);

  // Filter records based on search and filters
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = searchTerm === "" || 
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.source.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === "all" || record.type === filterType;
      const matchesSource = filterSource === "all" || record.source === filterSource;
      
      return matchesSearch && matchesType && matchesSource;
    });
  }, [records, searchTerm, filterType, filterSource]);

  const handleConsentChange = (recordId, consented) => {
    setRecords(prevRecords => 
      prevRecords.map(record => 
        record.id === recordId ? { ...record, consented } : record
      )
    );
  };

  const handleImportSuccess = (newRecords) => {
    setRecords(prevRecords => [...prevRecords, ...newRecords]);
    setShowImporter(false);
  };

  const handleExportFHIR = () => {
    const bundle = exportFHIRBundle(records);
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patient-records-fhir-bundle.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Log export event
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.RECORD_EXPORT,
      targetId: "fhir_bundle",
      source: "Records Page"
    });
  };

  const handleExportRedacted = () => {
    const redactedRecords = records.map(record => redactPHI(record));
    const bundle = exportFHIRBundle(redactedRecords);
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patient-records-redacted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Log export event
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.RECORD_EXPORT,
      targetId: "redacted_bundle",
      source: "Records Page"
    });
  };

  return (
    <div className="p-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Unified Patient Records</h1>
          <p className="opacity-70 mt-1">
            Consolidated view of patient health information from multiple sources
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setShowImporter(true)}
            className="flex items-center bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Import Data
          </button>
          <button
            onClick={handleExportFHIR}
            className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export FHIR
          </button>
          <button
            onClick={handleExportRedacted}
            className="flex items-center bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Redacted Export
          </button>
        </div>
      </div>

      {/* Demo Disclaimer */}
      <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 mb-6">
        <p className="text-yellow-200 text-sm">
          ⚠️ <strong>Demo Only:</strong> This is a simulated patient record system for demonstration purposes only. 
          No real patient data is being stored or transmitted. All data is mock data for UI/UX evaluation.
        </p>
      </div>

      {/* Consent Manager */}
      <ConsentManager records={records} onConsentChange={handleConsentChange} />

      {/* Search and Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search records..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={searchTerm}
              onChange={(e) => {
                // Debounce search input
                if (searchTimeoutRef.current) {
                  clearTimeout(searchTimeoutRef.current);
                }
                searchTimeoutRef.current = setTimeout(() => {
                  setSearchTerm(e.target.value);
                }, 300);
              }}
            />
          </div>
          <div>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">
          Showing {filteredRecords.length} of {records.length} records
        </p>
      </div>

      <div>
        {filteredRecords.length > 0 ? (
          filteredRecords.map(record => (
            <RecordCard 
              key={record.id} 
              record={record} 
              onConsentChange={handleConsentChange}
              searchTerm={searchTerm}
            />
          ))
        ) : (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No records found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Data Importer Modal */}
      {showImporter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Import Patient Data</h2>
                <button 
                  onClick={() => setShowImporter(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <DataImporter onImportSuccess={handleImportSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}