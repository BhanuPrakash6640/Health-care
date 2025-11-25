import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { exportPDF, exportPNG, downloadCSV } from "@/utils/exportHelpers";
import { motion } from "framer-motion";

const ExportControls = ({ weeklyData }) => {
  const handleExportPDF = async () => {
    try {
      await exportPDF('.app-container', 'healthdash-dashboard.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  };

  const handleExportPNG = async () => {
    try {
      await exportPNG('.app-container', 'healthdash-dashboard.png');
    } catch (error) {
      console.error('Error exporting PNG:', error);
    }
  };

  const handleExportCSV = () => {
    try {
      // Prepare data for CSV export
      const csvData = weeklyData.map(day => ({
        Day: day.day,
        Steps: day.steps,
        Calories: day.calories,
        'Sleep (hrs)': day.sleep,
        'Heart Rate (bpm)': day.hr
      }));
      
      downloadCSV(csvData, 'healthdash-weekly-data.csv');
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleExportPDF}
          className="bg-primary hover:bg-primary/80 text-white rounded-lg py-2 px-4 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <Typography className="normal-case">Export PDF</Typography>
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleExportPNG}
          className="bg-secondary hover:bg-secondary/80 text-white rounded-lg py-2 px-4 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <Typography className="normal-case">Export PNG</Typography>
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleExportCSV}
          className="bg-accent hover:bg-accent/80 text-white rounded-lg py-2 px-4 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <Typography className="normal-case">Export CSV</Typography>
        </Button>
      </motion.div>
    </div>
  );
};

export default ExportControls;