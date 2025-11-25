import React from "react";
import { Typography } from "@material-tailwind/react";
import { weeklyData } from "@/data/mock";
import TopCard from "@/components/TopCard";
import StepsChart from "@/components/StepsChart";
import SleepArea from "@/components/SleepArea";
import HeartRateLine from "@/components/HeartRateLine";
import WaterSlider from "@/components/WaterSlider";
import SymptomChecker from "@/components/SymptomChecker";
import QuickInsights from "@/components/QuickInsights";

export function Analytics() {
  // Calculate totals from weekly data
  const totalSteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const avgSleep = (weeklyData.reduce((sum, day) => sum + day.sleep, 0) / weeklyData.length).toFixed(1);
  const avgHR = Math.round(weeklyData.reduce((sum, day) => sum + day.hr, 0) / weeklyData.length);

  return (
    <div className="mt-4 mb-8 px-4">
      <div className="mb-12">
        <Typography variant="h3" className="text-white mb-2">
          Health Analytics
        </Typography>
        <Typography className="text-white/70">
          Track your health metrics and wellness journey
        </Typography>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TopCard 
          id="heartRate"
          title="Heart Rate"
          value={`${avgHR} bpm`}
          subtitle="Average this week"
          expandedContent={
            <div className="text-white/80 text-sm">
              <p className="mb-2">Current: {weeklyData[weeklyData.length - 1].hr} bpm</p>
              <p>Resting: ~60 bpm</p>
            </div>
          }
        />
        
        <TopCard 
          id="steps"
          title="Steps"
          value={totalSteps.toLocaleString()}
          subtitle="This week"
          expandedContent={
            <div className="text-white/80 text-sm">
              <p className="mb-2">Today: {weeklyData[weeklyData.length - 1].steps.toLocaleString()}</p>
              <p>Goal: 10,000 steps</p>
            </div>
          }
        />
        
        <TopCard 
          id="sleep"
          title="Sleep"
          value={`${avgSleep} hrs`}
          subtitle="Average per night"
          expandedContent={
            <div className="text-white/80 text-sm">
              <p className="mb-2">Last night: {weeklyData[weeklyData.length - 1].sleep} hrs</p>
              <p>Goal: 8 hrs</p>
            </div>
          }
        />
        
        <TopCard 
          id="calories"
          title="Calories"
          value={weeklyData.reduce((sum, day) => sum + day.calories, 0).toLocaleString()}
          subtitle="Burned this week"
          expandedContent={
            <div className="text-white/80 text-sm">
              <p className="mb-2">Today: {weeklyData[weeklyData.length - 1].calories} cal</p>
              <p>Daily goal: 2,000 cal</p>
            </div>
          }
        />
      </div>

      {/* Charts and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          <HeartRateLine />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StepsChart weeklyData={weeklyData} />
            <SleepArea weeklyData={weeklyData} />
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="space-y-6">
          <WaterSlider />
          <SymptomChecker />
          <QuickInsights />
        </div>
      </div>
    </div>
  );
}

export default Analytics;