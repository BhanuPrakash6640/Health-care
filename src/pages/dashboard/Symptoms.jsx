import React from "react";
import { Typography } from "@material-tailwind/react";
import SymptomChecker from "@/components/SymptomChecker";
import ExportControls from "@/components/ExportControls";
import { weeklyData } from "@/data/mock";

export function Symptoms() {
  return (
    <div className="mt-4 mb-8 px-4 app-container">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <Typography variant="h3" className="text-white mb-2">
              Symptom Tracker
            </Typography>
            <Typography className="text-white/70">
              Monitor and log your symptoms over time
            </Typography>
          </div>
          <ExportControls weeklyData={weeklyData} />
        </div>
      </div>

      <div className="mb-8">
        <SymptomChecker />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <Typography variant="h6" className="text-white mb-4">
            Symptom History
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-white/20 py-3 px-4 text-white">Date</th>
                  <th className="border-b border-white/20 py-3 px-4 text-white">Symptoms</th>
                  <th className="border-b border-white/20 py-3 px-4 text-white">Severity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-white/5">
                  <td className="py-3 px-4 text-white/80">Today</td>
                  <td className="py-3 px-4 text-white">Headache, Fatigue</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-300">
                      Moderate
                    </span>
                  </td>
                </tr>
                <tr className="even:bg-white/5">
                  <td className="py-3 px-4 text-white/80">Yesterday</td>
                  <td className="py-3 px-4 text-white">Cough</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-300">
                      Mild
                    </span>
                  </td>
                </tr>
                <tr className="even:bg-white/5">
                  <td className="py-3 px-4 text-white/80">2 days ago</td>
                  <td className="py-3 px-4 text-white">None</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300">
                      None
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <Typography variant="h6" className="text-white mb-4">
            Health Insights
          </Typography>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <Typography className="text-white font-medium mb-1">
                Pattern Detection
              </Typography>
              <Typography className="text-white/80 text-sm">
                You tend to experience headaches on weekends. Consider stress management techniques.
              </Typography>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <Typography className="text-white font-medium mb-1">
                Symptom Correlation
              </Typography>
              <Typography className="text-white/80 text-sm">
                Fatigue often follows poor sleep nights. Aim for consistent sleep schedule.
              </Typography>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <Typography className="text-white font-medium mb-1">
                Recommendations
              </Typography>
              <Typography className="text-white/80 text-sm">
                Based on your symptoms, staying hydrated and getting adequate rest is recommended.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Symptoms;