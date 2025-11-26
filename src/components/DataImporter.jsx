import React, { useState } from "react";
import { importFHIRBundle } from "../utils/fhir";
import { logAccess, AUDIT_ACTIONS } from "../utils/audit";

export default function DataImporter({ onImportSuccess }) {
  const [jsonData, setJsonData] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        setJsonData(content);
        parseJsonData(content);
      } catch (err) {
        setError("Error reading file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleJsonChange = (event) => {
    const content = event.target.value;
    setJsonData(content);
    parseJsonData(content);
  };

  const parseJsonData = (content) => {
    if (!content.trim()) {
      setPreviewData(null);
      return;
    }

    try {
      setIsParsing(true);
      const parsed = JSON.parse(content);
      setPreviewData(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON format: " + err.message);
      setPreviewData(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleImport = () => {
    if (!sourceName.trim()) {
      setError("Please enter a source name");
      return;
    }

    if (!previewData) {
      setError("Please provide valid JSON data");
      return;
    }

    if (!consentGiven) {
      setError("You must consent to import the data");
      return;
    }

    try {
      const importedRecords = importFHIRBundle(previewData, sourceName);
      
      // Imported records default to consented: false as per requirements
      const consentedRecords = importedRecords.map(record => ({
        ...record,
        consented: false
      }));
      
      onImportSuccess(consentedRecords);
      
      // Reset form
      setJsonData("");
      setSourceName("");
      setConsentGiven(false);
      setPreviewData(null);
      setError("");
      
      // Log import event
      logAccess({
        user: "demo_user",
        action: AUDIT_ACTIONS.RECORD_IMPORT,
        targetId: `imported_records_${new Date().getTime()}`,
        source: "Data Importer"
      });
    } catch (err) {
      setError("Error importing data: " + err.message);
    }
  };

  return (
    <div className="text-white">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Import Patient Data</h3>
        <p className="text-gray-400 text-sm mb-4">
          Paste or upload FHIR-compatible JSON data to merge into the patient records.
        </p>
        
        {/* Demo Disclaimer */}
        <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-3 mb-4">
          <p className="text-yellow-200 text-xs">
            ⚠️ <strong>Demo Only:</strong> This is a simulated import feature for demonstration purposes. 
            No real patient data is being stored or transmitted.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Source Name
          </label>
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="e.g., External Hospital System"
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload JSON File
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-center cursor-pointer transition-colors">
              <span>Choose File</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <span className="text-sm text-gray-400">
              {jsonData ? "File loaded" : "No file chosen"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Or Paste JSON Data
          </label>
          <textarea
            className="w-full h-40 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white font-mono text-sm"
            placeholder='{ "resourceType": "Bundle", "entry": [...] }'
            value={jsonData}
            onChange={handleJsonChange}
          />
        </div>

        {previewData && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="font-medium mb-2">Data Preview</h4>
            <div className="text-xs text-gray-300 overflow-x-auto">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(previewData, null, 2).substring(0, 500)}
                {JSON.stringify(previewData, null, 2).length > 500 ? "..." : ""}
              </pre>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {previewData.entry ? `Found ${previewData.entry.length} entries` : "No entries found"}
            </p>
          </div>
        )}

        <div className="flex items-start">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
            />
            <div className="w-5 h-5 bg-gray-700 peer-focus:outline-none rounded peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 mr-2"></div>
            <span className="text-sm text-gray-300">
              I consent to import this data. Note: Imported records will default to not consented for sharing.
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            onClick={() => {
              setJsonData("");
              setSourceName("");
              setConsentGiven(false);
              setPreviewData(null);
              setError("");
            }}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
            onClick={handleImport}
            disabled={!previewData || !sourceName.trim() || !consentGiven || isParsing}
          >
            Import Data
          </button>
        </div>
      </div>
    </div>
  );
}