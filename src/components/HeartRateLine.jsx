import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, Typography } from "@material-tailwind/react";
import { initialHistory } from "@/data/mock";
import { computeAnomaly } from "@/utils/anomaly";
import { runModelStub } from "@/utils/modelStub";

const HeartRateLine = ({ 
  history: externalHistory, 
  setHistory: setExternalHistory,
  onAnomalyDetected,
  wearableOn
}) => {
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
        
        // Run anomaly detection if wearable is on
        if (wearableOn && onAnomalyDetected) {
          const { score, z } = computeAnomaly(prev, newValue);
          
          // Combine with AI model stub for enhanced detection
          runModelStub(prev).then(modelScore => {
            const finalScore = (modelScore + score) / 2;
            if (finalScore > 0.7) {
              onAnomalyDetected({ score: finalScore, z }, newValue);
            }
          }).catch(error => {
            // Fallback to just the statistical method if model fails
            if (score > 0.7) {
              onAnomalyDetected({ score, z }, newValue);
            }
          });
        }
        
        return newData;
      });
    }, 1800); // Update every 1.8 seconds
  }, [setHistory, wearableOn, onAnomalyDetected]);

  const stopSimulation = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle wearable state changes
  React.useEffect(() => {
    if (wearableOn) {
      startSimulation();
    } else {
      stopSimulation();
    }
    
    return () => stopSimulation();
  }, [wearableOn, startSimulation, stopSimulation]);

  if (loading) {
    return (
      <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <Typography variant="h6" className="text-white mb-4">
          Heart Rate
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
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                borderColor: "rgba(55, 65, 81, 0.5)",
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