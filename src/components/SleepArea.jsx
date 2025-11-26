import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography } from "@material-tailwind/react";

const SleepArea = ({ weeklyData }) => {
  // Add loading state simulation
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <Typography variant="h6" className="text-white mb-4">
          Sleep Hours
        </Typography>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse bg-gray-700/50 rounded-lg h-48 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <Typography variant="h6" className="text-white mb-4">
        Sleep Hours
      </Typography>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              stroke="#ffffff80" 
              tick={{ fill: "#ffffff80" }} 
            />
            <YAxis 
              stroke="#ffffff80" 
              tick={{ fill: "#ffffff80" }} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                borderColor: "rgba(55, 65, 81, 0.5)",
                borderRadius: "0.5rem",
                backdropFilter: "blur(10px)",
              }}
              itemStyle={{ color: "white" }}
              labelStyle={{ color: "white", fontWeight: "bold" }}
            />
            <Area 
              type="monotone" 
              dataKey="sleep" 
              stroke="#60A5FA" 
              fillOpacity={1} 
              fill="url(#colorSleep)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SleepArea;