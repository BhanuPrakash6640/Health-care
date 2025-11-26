import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import HeartRateLine from "@/components/HeartRateLine";
import { weeklyData } from "@/data/mock";
import ExportControls from "@/components/ExportControls";

export function Vitals() {
  // Calculate averages
  const avgHR = Math.round(weeklyData.reduce((sum, day) => sum + day.hr, 0) / weeklyData.length);
  const avgSleep = (weeklyData.reduce((sum, day) => sum + day.sleep, 0) / weeklyData.length).toFixed(1);

  return (
    <div className="mt-4 mb-8 px-4 app-container">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <Typography variant="h3" className="text-white mb-2">
              Vitals Overview
            </Typography>
            <Typography className="text-white/70">
              Detailed view of your vital health metrics
            </Typography>
          </div>
          <ExportControls weeklyData={weeklyData} />
        </div>
      </div>

      {/* Heart Rate Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h6" className="text-white mb-2">
              Heart Rate
            </Typography>
            <Typography variant="h3" className="text-white font-bold mb-1">
              {avgHR} <span className="text-xl">bpm</span>
            </Typography>
            <Typography className="text-white/70 text-sm">
              Average this week
            </Typography>
          </div>
        </div>
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h6" className="text-white mb-2">
              Sleep
            </Typography>
            <Typography variant="h3" className="text-white font-bold mb-1">
              {avgSleep} <span className="text-xl">hrs</span>
            </Typography>
            <Typography className="text-white/70 text-sm">
              Average per night
            </Typography>
          </div>
        </div>
      </div>

      {/* Activity & Sleep Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h6" className="text-white mb-4">
              Heart Rate History
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-gray-700/50 py-3 px-4 text-white">Time</th>
                    <th className="border-b border-gray-700/50 py-3 px-4 text-white">Heart Rate</th>
                    <th className="border-b border-gray-700/50 py-3 px-4 text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyData.map((day, index) => (
                    <tr key={index} className="even:bg-gray-700/50">
                      <td className="py-3 px-4 text-white/80">{day.day}</td>
                      <td className="py-3 px-4 text-white">{day.hr} bpm</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          day.hr < 70 ? "bg-green-500/20 text-green-300" : 
                          day.hr > 80 ? "bg-red-500/20 text-red-300" : 
                          "bg-blue-500/20 text-blue-300"
                        }`}>
                          {day.hr < 70 ? "Low" : day.hr > 80 ? "High" : "Normal"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h6" className="text-white mb-4">
              Sleep Patterns
            </Typography>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-gray-700/50 py-3 px-4 text-white">Day</th>
                    <th className="border-b border-gray-700/50 py-3 px-4 text-white">Hours</th>
                    <th className="border-b border-gray-700/50 py-3 px-4 text-white">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyData.map((day, index) => (
                    <tr key={index} className="even:bg-gray-700/50">
                      <td className="py-3 px-4 text-white/80">{day.day}</td>
                      <td className="py-3 px-4 text-white">{day.sleep} hrs</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          day.sleep < 6 ? "bg-red-500/20 text-red-300" : 
                          day.sleep > 8 ? "bg-green-500/20 text-green-300" : 
                          "bg-blue-500/20 text-blue-300"
                        }`}>
                          {day.sleep < 6 ? "Poor" : day.sleep > 8 ? "Excellent" : "Good"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Pressure Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6">
        <Typography variant="h6" className="text-white mb-2">
          Blood Pressure
        </Typography>
        <Typography variant="h3" className="text-white font-bold mb-1">
          120/80
        </Typography>
        <Typography className="text-white/70 text-sm">
          Normal
        </Typography>
      </div>

      <div className="mb-8">
        <HeartRateLine />
      </div>

      {/* Weight & Hydration Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h6" className="text-white mb-2">
              Weight
            </Typography>
            <Typography variant="h3" className="text-white font-bold mb-1">
              70 <span className="text-xl">kg</span>
            </Typography>
            <Typography className="text-white/70 text-sm">
              Average this week
            </Typography>
          </div>
        </div>
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h6" className="text-white mb-2">
              Hydration
            </Typography>
            <Typography variant="h3" className="text-white font-bold mb-1">
              2.5 <span className="text-xl">L</span>
            </Typography>
            <Typography className="text-white/70 text-sm">
              Average this week
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vitals;