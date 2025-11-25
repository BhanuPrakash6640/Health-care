import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="mt-12 mb-8 px-4">
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" className="text-white mb-4">
            Welcome to HealthDash
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
            Your personal health analytics dashboard. Track vitals, monitor symptoms, and improve your wellness journey.
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-4 mb-12"
        >
          <Link to="/dashboard/analytics">
            <Button className="bg-primary hover:bg-primary/80 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
              View Analytics
            </Button>
          </Link>
          <Link to="/dashboard/vitals">
            <Button className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30">
              Track Vitals
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
        >
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
          <Typography variant="h6" className="text-white mb-2">
            Real-time Monitoring
          </Typography>
          <Typography className="text-white/70">
            Track heart rate, steps, sleep, and more with live updates
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
        >
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <Typography variant="h6" className="text-white mb-2">
            Data Insights
          </Typography>
          <Typography className="text-white/70">
            Visualize your health trends with beautiful charts and analytics
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
        >
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <Typography variant="h6" className="text-white mb-2">
            Personalized Care
          </Typography>
          <Typography className="text-white/70">
            Get tailored health recommendations based on your metrics
          </Typography>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 border border-white/20 backdrop-blur-sm"
      >
        <div className="max-w-3xl mx-auto text-center">
          <Typography variant="h3" className="text-white mb-4">
            Start Your Health Journey Today
          </Typography>
          <Typography className="text-white/80 mb-6">
            HealthDash helps you take control of your wellness with intuitive tracking and actionable insights.
          </Typography>
          <Link to="/dashboard/analytics">
            <Button className="bg-primary hover:bg-primary/80 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;