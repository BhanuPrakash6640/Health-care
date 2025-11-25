// Helper functions for LocalStorage persistence
export const saveState = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

export const loadState = (key, defaultValue = null) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultValue;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return defaultValue;
  }
};

export const clearState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error clearing state from localStorage:", err);
  }
};