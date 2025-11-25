import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ThemeProvider } from "@/context/themeContext";
import "@/styles/animations.css";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;