import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { quickInsights } from "@/data/mock";

const QuickInsights = () => {
  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <Typography variant="h6" className="text-white mb-4">
        Quick Insights
      </Typography>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-700/50">
          <Typography className="text-white/80">
            Best Day
          </Typography>
          <Typography className="text-white font-medium">
            {quickInsights.bestDay}
          </Typography>
        </div>
        
        <div className="flex justify-between items-center pb-3 border-b border-gray-700/50">
          <Typography className="text-white/80">
            Avg. Sleep
          </Typography>
          <Typography className="text-white font-medium">
            {quickInsights.avgSleep} hrs
          </Typography>
        </div>
        
        <div className="flex justify-between items-center">
          <Typography className="text-white/80">
            Avg. Heart Rate
          </Typography>
          <Typography className="text-white font-medium">
            {quickInsights.avgHR} bpm
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default QuickInsights;