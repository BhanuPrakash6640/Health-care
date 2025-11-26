import React from "react";
import { resourceData } from "../data/resources";
import { appointments } from "../data/appointments";

export default function ResourceHeatmap() {
  // Calculate utilization percentage
  const calculateUtilization = (occupied, total) => {
    return total > 0 ? Math.round((occupied / total) * 100) : 0;
  };

  // Get color based on utilization percentage
  const getUtilizationColor = (percentage) => {
    if (percentage < 30) return "bg-green-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Predict pressure based on appointments
  const predictPressure = (department) => {
    // Count appointments for the next 7 days
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const upcomingAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= new Date() && aptDate <= nextWeek;
    });
    
    // Simple prediction based on appointment count
    const appointmentCount = upcomingAppointments.length;
    if (appointmentCount > 30) return "High";
    if (appointmentCount > 15) return "Medium";
    return "Low";
  };

  return (
    <div className="space-y-6">
      {/* Beds Utilization */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Bed Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Overall</h4>
              <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                {resourceData.beds.occupied}/{resourceData.beds.total}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getUtilizationColor(calculateUtilization(resourceData.beds.occupied, resourceData.beds.total))}`}
                style={{ width: `${calculateUtilization(resourceData.beds.occupied, resourceData.beds.total)}%` }}
              ></div>
            </div>
            <div className="text-right text-sm mt-1">
              {calculateUtilization(resourceData.beds.occupied, resourceData.beds.total)}%
            </div>
          </div>
          
          {Object.entries(resourceData.beds.departments).map(([dept, data]) => (
            <div key={dept} className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{dept}</h4>
                <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                  {data.occupied}/{data.total}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getUtilizationColor(calculateUtilization(data.occupied, data.total))}`}
                  style={{ width: `${calculateUtilization(data.occupied, data.total)}%` }}
                ></div>
              </div>
              <div className="text-right text-sm mt-1">
                {calculateUtilization(data.occupied, data.total)}%
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Predicted pressure: {predictPressure(dept)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Availability */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Staff Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Overall</h4>
              <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                {resourceData.staff.onShift}/{resourceData.staff.total}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getUtilizationColor(calculateUtilization(resourceData.staff.onShift, resourceData.staff.total))}`}
                style={{ width: `${calculateUtilization(resourceData.staff.onShift, resourceData.staff.total)}%` }}
              ></div>
            </div>
            <div className="text-right text-sm mt-1">
              {calculateUtilization(resourceData.staff.onShift, resourceData.staff.total)}%
            </div>
          </div>
          
          {Object.entries(resourceData.staff.roles).map(([role, data]) => (
            <div key={role} className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{role}</h4>
                <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                  {data.onShift}/{data.total}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getUtilizationColor(calculateUtilization(data.onShift, data.total))}`}
                  style={{ width: `${calculateUtilization(data.onShift, data.total)}%` }}
                ></div>
              </div>
              <div className="text-right text-sm mt-1">
                {calculateUtilization(data.onShift, data.total)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Availability */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Equipment Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Overall</h4>
              <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                {resourceData.equipment.available}/{resourceData.equipment.total}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getUtilizationColor(calculateUtilization(resourceData.equipment.total - resourceData.equipment.available, resourceData.equipment.total))}`}
                style={{ width: `${calculateUtilization(resourceData.equipment.total - resourceData.equipment.available, resourceData.equipment.total)}%` }}
              ></div>
            </div>
            <div className="text-right text-sm mt-1">
              {calculateUtilization(resourceData.equipment.available, resourceData.equipment.total)}% available
            </div>
          </div>
          
          {Object.entries(resourceData.equipment.types).slice(0, 5).map(([type, data]) => (
            <div key={type} className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{type}</h4>
                <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                  {data.available}/{data.total}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getUtilizationColor(calculateUtilization(data.total - data.available, data.total))}`}
                  style={{ width: `${calculateUtilization(data.total - data.available, data.total)}%` }}
                ></div>
              </div>
              <div className="text-right text-sm mt-1">
                {calculateUtilization(data.available, data.total)}% available
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}