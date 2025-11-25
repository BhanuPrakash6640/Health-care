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
import ExportControls from "@/components/ExportControls";
import DrilldownModal from "@/components/DrilldownModal";

export function Analytics() {
  // Calculate totals from weekly data
  const totalSteps = weeklyData.reduce((sum, day) => sum + day.steps, 0);
  const avgSleep = (weeklyData.reduce((sum, day) => sum + day.sleep, 0) / weeklyData.length).toFixed(1);
  const avgHR = Math.round(weeklyData.reduce((sum, day) => sum + day.hr, 0) / weeklyData.length);
  
  // State for drilldown modal
  const [drilldownOpen, setDrilldownOpen] = React.useState(false);
  const [selectedDayData, setSelectedDayData] = React.useState(null);
  
  // State for card expansion
  const [expandedCard, setExpandedCard] = React.useState(null);
  
  const handleBarClick = (data) => {
    setSelectedDayData(data);
    setDrilldownOpen(true);
  };
  
  const handleToggleExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="mt-4 mb-8 px-4 app-container">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <Typography variant="h3" className="text-white mb-2">
              Health Analytics
            </Typography>
            <Typography className="text-white/70">
              Track your health metrics and wellness journey
            </Typography>
          </div>
          <ExportControls weeklyData={weeklyData} />
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TopCard 
          id="heartRate"
          title="Heart Rate"
          value={`${avgHR} bpm`}
          subtitle="Average this week"
          expanded={expandedCard === "heartRate"}
          onToggleExpand={handleToggleExpand}
        />
        
        <TopCard 
          id="steps"
          title="Steps"
          value={totalSteps.toLocaleString()}
          subtitle="This week"
          expanded={expandedCard === "steps"}
          onToggleExpand={handleToggleExpand}
        />
        
        <TopCard 
          id="sleep"
          title="Sleep"
          value={`${avgSleep} hrs`}
          subtitle="Average per night"
          expanded={expandedCard === "sleep"}
          onToggleExpand={handleToggleExpand}
        />
        
        <TopCard 
          id="calories"
          title="Calories"
          value={weeklyData.reduce((sum, day) => sum + day.calories, 0).toLocaleString()}
          subtitle="Burned this week"
          expanded={expandedCard === "calories"}
          onToggleExpand={handleToggleExpand}
        />
      </div>

      {/* Charts and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          <HeartRateLine />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StepsChart weeklyData={weeklyData} onBarClick={handleBarClick} />
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
      
      <DrilldownModal 
        open={drilldownOpen} 
        onClose={() => setDrilldownOpen(false)} 
        dayData={selectedDayData} 
      />
    </div>
  );
}

export default Analytics;