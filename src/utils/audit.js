// Utility functions for audit logging

const AUDIT_LOG_KEY = 'healthdash_audit_logs';

/**
 * Log an access event to localStorage
 * @param {Object} eventData - The event data to log
 * @param {string} eventData.user - The user performing the action
 * @param {string} eventData.action - The action performed
 * @param {string} eventData.targetId - The ID of the target resource
 * @param {string} eventData.timestamp - ISO timestamp of the event
 * @param {string} eventData.source - The source of the action
 */
export function logAccess(eventData) {
  // Create audit log entry
  const logEntry = {
    id: generateId(),
    ...eventData,
    timestamp: eventData.timestamp || new Date().toISOString()
  };

  // Get existing logs from localStorage
  const existingLogs = getAuditLogs();
  
  // Add new log entry to the beginning of the array
  const updatedLogs = [logEntry, ...existingLogs];
  
  // Keep only the last 1000 logs to prevent localStorage from growing too large
  const trimmedLogs = updatedLogs.slice(0, 1000);
  
  // Save updated logs to localStorage
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(trimmedLogs));
  
  return logEntry;
}

/**
 * Get all audit logs from localStorage
 * @returns {Array} Array of audit log entries
 */
export function getAuditLogs() {
  try {
    const logs = localStorage.getItem(AUDIT_LOG_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Error retrieving audit logs:', error);
    return [];
  }
}

/**
 * Clear all audit logs from localStorage
 */
export function clearAuditLogs() {
  localStorage.removeItem(AUDIT_LOG_KEY);
}

/**
 * Filter audit logs by action type
 * @param {string} action - The action type to filter by
 * @returns {Array} Filtered array of audit log entries
 */
export function filterLogsByAction(action) {
  const logs = getAuditLogs();
  return logs.filter(log => log.action === action);
}

/**
 * Filter audit logs by date range
 * @param {string} startDate - Start date in ISO format
 * @param {string} endDate - End date in ISO format
 * @returns {Array} Filtered array of audit log entries
 */
export function filterLogsByDateRange(startDate, endDate) {
  const logs = getAuditLogs();
  return logs.filter(log => {
    const logDate = new Date(log.timestamp);
    return logDate >= new Date(startDate) && logDate <= new Date(endDate);
  });
}

/**
 * Get recent audit logs
 * @param {number} count - Number of recent logs to retrieve
 * @returns {Array} Array of recent audit log entries
 */
export function getRecentLogs(count = 10) {
  const logs = getAuditLogs();
  return logs.slice(0, count);
}

// Helper function to generate unique IDs
function generateId() {
  return 'audit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Predefined actions for consistency
export const AUDIT_ACTIONS = {
  RECORD_VIEW: 'record_view',
  RECORD_EXPORT: 'record_export',
  RECORD_IMPORT: 'record_import',
  APPOINTMENT_CREATE: 'appointment_create',
  APPOINTMENT_CANCEL: 'appointment_cancel',
  CONSENT_TOGGLE: 'consent_toggle',
  RESOURCE_VIEW: 'resource_view',
  AUDIT_VIEW: 'audit_view'
};