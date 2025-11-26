import React, { useEffect } from "react";
import ResourceHeatmap from "../components/ResourceHeatmap";
import { logAccess, AUDIT_ACTIONS } from "../utils/audit";

export default function Resources() {
  // Log page view
  useEffect(() => {
    logAccess({
      user: "demo_user",
      action: AUDIT_ACTIONS.RESOURCE_VIEW,
      targetId: "resources_page",
      source: "Resources Page"
    });
  }, []);

  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Resource Allocation</h1>
        <p className="opacity-70 mt-1">
          Monitor hospital resource utilization and availability
        </p>
      </div>

      {/* Demo Disclaimer */}
      <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 mb-6">
        <p className="text-yellow-200 text-sm">
          ⚠️ <strong>Demo Only:</strong> This is a simulated resource dashboard for demonstration purposes only. 
          No real hospital resources are being monitored. All data is mock data for UI/UX evaluation.
        </p>
      </div>

      {/* Resource Heatmap */}
      <ResourceHeatmap />

      {/* Legend */}
      <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
        <h3 className="font-medium mb-3">Utilization Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Low (0-30%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm">Medium (30-70%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm">High (70-100%)</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Resource utilization is calculated based on current occupancy and predicts future demand based on scheduled appointments.
        </p>
      </div>
    </div>
  );
}