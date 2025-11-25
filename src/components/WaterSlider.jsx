import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const WaterSlider = () => {
  const [waterIntake, setWaterIntake] = React.useState(2.5); // Starting with 2.5L

  const incrementWater = () => {
    setWaterIntake(prev => Math.min(8, prev + 0.25));
  };

  const decrementWater = () => {
    setWaterIntake(prev => Math.max(0, prev - 0.25));
  };

  // Calculate percentage for the progress bar
  const percentage = (waterIntake / 8) * 100;

  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
      <Typography variant="h6" className="text-white mb-4">
        Water Intake
      </Typography>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Typography className="text-white/80">
            {waterIntake.toFixed(2)}L of 8L
          </Typography>
          <Typography className="text-white/60 text-sm">
            {Math.round(percentage)}%
          </Typography>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button 
            onClick={decrementWater}
            className="bg-accent hover:bg-accent/80 text-white rounded-full w-10 h-10 min-w-0 p-0"
          >
            -
          </Button>
        </motion.div>
        
        <div className="text-center">
          <Typography variant="h4" className="text-white font-bold">
            {waterIntake.toFixed(2)}L
          </Typography>
          <Typography className="text-white/60 text-sm">
            Today
          </Typography>
        </div>
        
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button 
            onClick={incrementWater}
            className="bg-primary hover:bg-primary/80 text-white rounded-full w-10 h-10 min-w-0 p-0"
          >
            +
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};

export default WaterSlider;