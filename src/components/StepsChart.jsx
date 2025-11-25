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
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <Typography variant="h6" className="text-white mb-4">
          Weekly Steps
        </Typography>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse bg-white/20 rounded-lg h-48 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
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
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
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