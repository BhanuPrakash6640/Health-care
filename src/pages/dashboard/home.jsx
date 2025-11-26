import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { 
  HeartIcon, 
  ChartBarIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/solid";

export function Home() {
  return (
    <div className="mt-12 mb-8 px-4">
      {/* Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h1" className="text-white mb-4">
              Welcome to HealthDash
            </Typography>
            <Typography className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
              Your personal health analytics dashboard. Track vitals, monitor symptoms, and improve your wellness journey.
            </Typography>
            
            <div className="flex justify-center gap-4 mb-12">
              <Link to="/dashboard/analytics">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
                  View Analytics
                </Button>
              </Link>
              <Link to="/dashboard/vitals">
                <Button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
                  Track Vitals
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
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
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
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
        </div>
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
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
        </div>
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center">
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
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h3" className="text-white mb-4">
              Start Your Health Journey Today
            </Typography>
            <Typography className="text-white/80 mb-6">
              HealthDash helps you take control of your wellness with intuitive tracking and actionable insights.
            </Typography>
            <Link to="/dashboard/analytics">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <Typography variant="h3" className="text-white mb-4">
              Start Your Health Journey Today
            </Typography>
            <Typography className="text-white/80 mb-6">
              HealthDash helps you take control of your wellness with intuitive tracking and actionable insights.
            </Typography>
            <Link to="/dashboard/analytics">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;