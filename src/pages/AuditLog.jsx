import React, { useState, useEffect } from "react";
import AuditLogTable from "../components/AuditLogTable";
import { getAuditLogs, clearAuditLogs, filterLogsByAction, filterLogsByDateRange, logAccess, AUDIT_ACTIONS } from "../utils/audit";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

export default function AuditLog() {
  const [logs, setLogs] = useState([]);
  const [filterAction, setFilterAction] = useState("all");
  const [filterDate, setFilterDate] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Load logs on component mount
  useEffect(() => {
    loadLogs();
    
    // Log page view
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.AUDIT_VIEW,
      targetId: "audit_log_page",
      source: "Audit Log Page"
    });
  }, []);

  const loadLogs = () => {
    const allLogs = getAuditLogs();
    setLogs(allLogs);
  };

  const handleClearLogs = () => {
    clearAuditLogs();
    setLogs([]);
  };

  const handleFilter = () => {
    let filteredLogs = getAuditLogs();
    
    // Filter by action
    if (filterAction !== "all") {
      filteredLogs = filteredLogs.filter(log => log.action === filterAction);
    }
    
    // Filter by date range
    if (filterDate === "custom" && dateRange.start && dateRange.end) {
      filteredLogs = filterLogsByDateRange(dateRange.start, dateRange.end);
    } else if (filterDate !== "all") {
      // For simplicity, we'll implement basic date filters
      const now = new Date();
      let startDate;
      
      switch (filterDate) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          startDate = new Date(0);
      }
      
      const endDate = new Date();
      filteredLogs = filteredLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate && logDate <= endDate;
      });
    }
    
    setLogs(filteredLogs);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilterAction("all");
    setFilterDate("all");
    setDateRange({ start: "", end: "" });
    loadLogs();
  };

  useEffect(() => {
    handleFilter();
  }, [filterAction, filterDate]);

  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Audit Log</h1>
        <p className="opacity-70 mt-1">
          View system access history and user activities
        </p>
      </div>

      {/* Demo Disclaimer */}
      <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 mb-6">
        <p className="text-yellow-200 text-sm">
          ⚠️ <strong>Demo Only:</strong> This is a simulated audit log for demonstration purposes only. 
          No real system activities are being logged. All data is mock data for UI/UX evaluation.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Action Type
            </label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
            >
              <option value="all">All Actions</option>
              <option value="record_view">Record Viewed</option>
              <option value="record_export">Record Exported</option>
              <option value="record_import">Record Imported</option>
              <option value="appointment_create">Appointment Created</option>
              <option value="appointment_cancel">Appointment Cancelled</option>
              <option value="consent_toggle">Consent Updated</option>
              <option value="resource_view">Resource Viewed</option>
              <option value="audit_view">Audit Log Viewed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date Range
            </label>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          {filterDate === "custom" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </>
          )}
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <AuditLogTable logs={logs} onClearLogs={handleClearLogs} />
      
      {/* Info Box */}
      <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <div className="flex">
          <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-400">Audit Trail Information</h3>
            <p className="text-sm text-gray-400 mt-1">
              This audit log tracks all user activities within the system for security and compliance purposes. 
              Logs are stored locally and are automatically cleared when they exceed 1000 entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}