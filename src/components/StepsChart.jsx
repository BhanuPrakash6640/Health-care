import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography } from "@material-tailwind/react";

const StepsChart = ({ weeklyData, onBarClick }) => {
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
          Weekly Steps
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
        Weekly Steps
      </Typography>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
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
            <Bar 
              dataKey="steps" 
              fill="#7C3AED" 
              radius={[4, 4, 0, 0]}
              onClick={onBarClick}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StepsChart;