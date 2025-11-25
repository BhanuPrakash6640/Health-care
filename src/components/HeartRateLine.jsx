import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography } from "@material-tailwind/react";
import { initialHistory } from "@/data/mock";

const HeartRateLine = ({ history: externalHistory, setHistory: setExternalHistory }) => {
  const [internalHistory, setInternalHistory] = React.useState(initialHistory);
  const [loading, setLoading] = React.useState(true);
  const intervalRef = React.useRef(null);
  const isControlled = externalHistory !== undefined && setExternalHistory !== undefined;
  const history = isControlled ? externalHistory : internalHistory;
  const setHistory = isControlled ? setExternalHistory : setInternalHistory;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const startSimulation = React.useCallback(() => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setHistory(prev => {
        // Generate a new heart rate value (60-80 bpm with some variation)
        const lastValue = prev[prev.length - 1].hr;
        const variation = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newValue = Math.max(55, Math.min(85, lastValue + variation));
        
        // Create new data point with current time
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Add new point and remove oldest if we have more than 24 points
        const newData = [...prev.slice(1), { time: timeString, hr: newValue }];
        return newData;
      });
    }, 1800); // Update every 1.8 seconds
  }, [setHistory]);

  const stopSimulation = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start simulation by default
  React.useEffect(() => {
    startSimulation();
    return () => stopSimulation();
  }, [startSimulation, stopSimulation]);

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <Typography variant="h6" className="text-white mb-4">
          Heart Rate
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
        Heart Rate
      </Typography>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <XAxis 
              dataKey="time" 
              stroke="#ffffff80" 
              tick={{ fill: "#ffffff80" }}
              interval={3}
            />
            <YAxis 
              stroke="#ffffff80" 
              tick={{ fill: "#ffffff80" }} 
              domain={[55, 85]}
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
            <Line 
              type="monotone" 
              dataKey="hr" 
              stroke="#FF4D6D" 
              strokeWidth={2}
              dot={{ stroke: "#FF4D6D", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 6, stroke: "#FF4D6D", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default HeartRateLine;