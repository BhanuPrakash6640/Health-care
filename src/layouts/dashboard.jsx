import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useState, useEffect } from "react";
import { computeAnomaly } from "@/utils/anomaly";
import RoleSwitcher from "@/components/RoleSwitcher";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  
  // State for anomaly detection
  const [anomaly, setAnomaly] = useState({ score: 0, z: 0 });
  
  // State for role-based access control
  const [userRole, setUserRole] = useState("patient");
  // State for role switcher modal
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  
  // Filter routes based on user role
  const filteredRoutes = routes.map(routeGroup => {
    if (routeGroup.layout === "dashboard") {
      const filteredPages = routeGroup.pages.filter(page => {
        // Patient can only access basic health pages
        if (userRole === "patient") {
          return ["home", "analytics", "vitals", "symptoms", "profile", "medications", "records", "appointments"].includes(page.name);
        }
        // Clinician can access all except admin pages
        if (userRole === "clinician") {
          return page.name !== "audit-log";
        }
        // Admin can access everything
        return true;
      });
      return { ...routeGroup, pages: filteredPages };
    }
    return routeGroup;
  });
  
  // Simulate heart rate updates for navbar badge
  useEffect(() => {
    // Initialize with some mock data
    const initialHistory = Array.from({ length: 12 }, (_, i) => ({
      time: `${i}:00`,
      hr: 70 + Math.floor(Math.random() * 10)
    }));
    
    let history = [...initialHistory];
    
    // Simulate periodic updates
    const interval = setInterval(() => {
      const lastValue = history[history.length - 1]?.hr || 70;
      const variation = Math.floor(Math.random() * 7) - 3;
      const newValue = Math.max(55, Math.min(85, lastValue + variation));
      
      history = [...history.slice(1), { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), hr: newValue }];
      
      // Compute anomaly
      const { score, z } = computeAnomaly(history, newValue);
      setAnomaly({ score, z });
    }, 5000); // Update every 5 seconds for navbar display
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidenav
        routes={filteredRoutes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      {/* Role Switcher Modal */}
      <RoleSwitcher 
        isOpen={isRoleSwitcherOpen}
        onClose={() => setIsRoleSwitcherOpen(false)}
        onRoleChange={setUserRole}
      />
      
      {/* Role Switcher Trigger Button */}
      <div className="fixed bottom-4 left-4 z-50 hidden xl:block">
        <IconButton
          size="lg"
          color="white"
          className="rounded-full shadow-gray-900/50 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
          ripple={false}
          onClick={() => setIsRoleSwitcherOpen(true)}
        >
          <UserCircleIcon className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="p-4 xl:ml-80">
        <DashboardNavbar anomaly={anomaly} />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-gray-900/50"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-white/60">
          <Footer />
          <p className="text-xs opacity-60 mt-4">
            Demo-only health indicators. This is NOT a medical device or diagnostic tool.
          </p>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;