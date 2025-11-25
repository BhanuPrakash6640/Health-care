import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DrilldownModal = ({ open, onClose, dayData, hourlyData }) => {
  // Generate mock hourly data for the selected day
  const generateHourlyData = () => {
    if (!dayData) return [];
    
    const data = [];
    for (let i = 0; i < 24; i++) {
      // Simulate heart rate variations throughout the day
      const baseHR = dayData.hr || 70;
      const variation = Math.sin(i / 4) * 10 + (Math.random() * 6 - 3);
      const hr = Math.max(55, Math.min(90, Math.round(baseHR + variation)));
      
      data.push({
        hour: `${i.toString().padStart(2, '0')}:00`,
        hr: hr,
        steps: Math.max(0, Math.round((dayData.steps || 0) / 24 + (Math.random() * 200 - 100)))
      });
    }
    return data;
  };

  const hourlyChartData = generateHourlyData();

  return (
    <Dialog 
      open={open} 
      handler={onClose}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
      size="xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <DialogHeader className="text-white border-b border-white/20">
          <Typography variant="h4">
            {dayData ? `${dayData.day} Details` : "Day Details"}
          </Typography>
        </DialogHeader>
        
        <DialogBody className="max-h-[70vh] overflow-y-auto">
          {dayData && (
            <div className="space-y-6">
              {/* Key metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <Typography className="text-white/70 text-sm">Steps</Typography>
                  <Typography variant="h4" className="text-white">{dayData.steps?.toLocaleString()}</Typography>
                </Card>
                
                <Card className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <Typography className="text-white/70 text-sm">Calories</Typography>
                  <Typography variant="h4" className="text-white">{dayData.calories}</Typography>
                </Card>
                
                <Card className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <Typography className="text-white/70 text-sm">Sleep</Typography>
                  <Typography variant="h4" className="text-white">{dayData.sleep} hrs</Typography>
                </Card>
                
                <Card className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <Typography className="text-white/70 text-sm">Heart Rate</Typography>
                  <Typography variant="h4" className="text-white">{dayData.hr} bpm</Typography>
                </Card>
              </div>
              
              {/* Hourly heart rate chart */}
              <Card className="bg-white/10 border border-white/20 rounded-xl p-6">
                <Typography variant="h6" className="text-white mb-4">
                  Hourly Heart Rate
                </Typography>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyChartData}>
                      <XAxis 
                        dataKey="hour" 
                        stroke="#ffffff80" 
                        tick={{ fill: "#ffffff80" }}
                        interval={3}
                      />
                      <YAxis 
                        stroke="#ffffff80" 
                        tick={{ fill: "#ffffff80" }} 
                        domain={[50, 95]}
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
              
              {/* Hourly steps chart */}
              <Card className="bg-white/10 border border-white/20 rounded-xl p-6">
                <Typography variant="h6" className="text-white mb-4">
                  Hourly Steps
                </Typography>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyChartData}>
                      <XAxis 
                        dataKey="hour" 
                        stroke="#ffffff80" 
                        tick={{ fill: "#ffffff80" }}
                        interval={3}
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
                      <Line 
                        type="monotone" 
                        dataKey="steps" 
                        stroke="#7C3AED" 
                        strokeWidth={2}
                        dot={{ stroke: "#7C3AED", strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 6, stroke: "#7C3AED", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          )}
        </DialogBody>
        
        <DialogFooter>
          <Button 
            variant="text" 
            color="white" 
            onClick={onClose}
            className="mr-2"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </motion.div>
    </Dialog>
  );
};

export default DrilldownModal;