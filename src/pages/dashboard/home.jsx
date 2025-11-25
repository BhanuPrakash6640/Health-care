import React from "react";
import { Typography } from "@material-tailwind/react";
import { 
  HeartIcon, 
  ChartBarIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/solid";

export function Home() {
  return (
    <div className="mt-12 mb-8 px-4">
      <div className="mb-12 text-center">
        <Typography variant="h1" className="text-white mb-4">
          Welcome to HealthDash
        </Typography>
        <Typography className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
          Your personal health analytics dashboard. Track vitals, monitor symptoms, and improve your wellness journey.
        </Typography>
        
        <div className="flex justify-center gap-4 mb-12">
          <a href="/dashboard/analytics" className="bg-primary hover:bg-primary/80 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
            View Analytics
          </a>
          <a href="/dashboard/vitals" className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/30">
            Track Vitals
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartIcon className="h-8 w-8 text-primary" />
          </div>
          <Typography variant="h6" className="text-white mb-2">
            Real-time Monitoring
          </Typography>
          <Typography className="text-white/70">
            Track heart rate, steps, sleep, and more with live updates
          </Typography>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChartBarIcon className="h-8 w-8 text-secondary" />
          </div>
          <Typography variant="h6" className="text-white mb-2">
            Data Insights
          </Typography>
          <Typography className="text-white/70">
            Visualize your health trends with beautiful charts and analytics
          </Typography>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCircleIcon className="h-8 w-8 text-accent" />
          </div>
          <Typography variant="h6" className="text-white mb-2">
            Personalized Care
          </Typography>
          <Typography className="text-white/70">
            Get tailored health recommendations based on your metrics
          </Typography>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 border border-white/20 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto text-center">
          <Typography variant="h3" className="text-white mb-4">
            Start Your Health Journey Today
          </Typography>
          <Typography className="text-white/80 mb-6">
            HealthDash helps you take control of your wellness with intuitive tracking and actionable insights.
          </Typography>
          <a href="/dashboard/analytics" className="inline-block bg-primary hover:bg-primary/80 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
