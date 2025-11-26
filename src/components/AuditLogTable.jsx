import React from "react";
import { getAuditLogs, clearAuditLogs } from "../utils/audit";

export default function AuditLogTable({ logs, onClearLogs }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getActionLabel = (action) => {
    const actionLabels = {
      record_view: "Record Viewed",
      record_export: "Record Exported",
      record_import: "Record Imported",
      appointment_create: "Appointment Created",
      appointment_cancel: "Appointment Cancelled",
      consent_toggle: "Consent Updated",
      resource_view: "Resource Viewed",
      audit_view: "Audit Log Viewed"
    };
    return actionLabels[action] || action;
  };

  const getActionColor = (action) => {
    const actionColors = {
      record_view: "bg-blue-500/20 text-blue-400",
      record_export: "bg-purple-500/20 text-purple-400",
      record_import: "bg-green-500/20 text-green-400",
      appointment_create: "bg-indigo-500/20 text-indigo-400",
      appointment_cancel: "bg-orange-500/20 text-orange-400",
      consent_toggle: "bg-yellow-500/20 text-yellow-400",
      resource_view: "bg-teal-500/20 text-teal-400",
      audit_view: "bg-gray-500/20 text-gray-400"
    };
    return actionColors[action] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/30">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Timestamp
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Action
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Target
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Source
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/30 divide-y divide-gray-700">
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-700/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getActionColor(log.action)}`}>
                      {getActionLabel(log.action)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="max-w-xs truncate" title={log.targetId}>
                      {log.targetId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {log.source}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-gray-700/30 rounded-full p-3 mb-3">
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p>No audit logs found</p>
                    <p className="text-sm mt-1">Actions will be recorded here when they occur</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {logs.length > 0 && (
        <div className="px-6 py-4 bg-gray-700/30 border-t border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Showing {logs.length} of {logs.length} logs
          </p>
          <button
            onClick={onClearLogs}
            className="px-3 py-1.5 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
          >
            Clear Logs
          </button>
        </div>
      )}
    </div>
  );
}