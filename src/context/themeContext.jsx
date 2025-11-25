import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { loadState, saveState } from "@/utils/persistence";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("neon");
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false
  });

  // Load saved theme and accessibility settings from localStorage
  useEffect(() => {
    const savedTheme = loadState("healthdashTheme", "neon");
    const savedAccessibility = loadState("healthdashAccessibility", {
      highContrast: false,
      largeText: false
    });
    
    setTheme(savedTheme);
    setAccessibility(savedAccessibility);
    
    // Apply theme classes to body
    document.body.className = `theme-${savedTheme} ${savedAccessibility.highContrast ? 'high-contrast' : ''} ${savedAccessibility.largeText ? 'large-text' : ''}`;
  }, []);

  // Apply theme and accessibility settings
  useEffect(() => {
    // Save to localStorage
    saveState("healthdashTheme", theme);
    saveState("healthdashAccessibility", accessibility);
    
    // Apply classes to body
    document.body.className = `theme-${theme} ${accessibility.highContrast ? 'high-contrast' : ''} ${accessibility.largeText ? 'large-text' : ''}`;
  }, [theme, accessibility]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const toggleHighContrast = () => {
    setAccessibility(prev => ({
      ...prev,
      highContrast: !prev.highContrast
    }));
  };

  const toggleLargeText = () => {
    setAccessibility(prev => ({
      ...prev,
      largeText: !prev.largeText
    }));
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      changeTheme,
      accessibility,
      toggleHighContrast,
      toggleLargeText
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};