// Simulated wearable stream service
class WearableStream {
  constructor() {
    this.intervalId = null;
    this.listeners = [];
    this.isConnected = false;
  }

  // Connect to the simulated wearable stream
  connect() {
    if (this.intervalId) return; // Already connected
    
    this.isConnected = true;
    
    this.intervalId = setInterval(() => {
      // Generate simulated wearable data
      const data = {
        timestamp: new Date().toISOString(),
        heartRate: this.generateHeartRate(),
        steps: this.generateSteps(),
        calories: this.generateCalories(),
        sleepQuality: this.generateSleepQuality()
      };
      
      // Notify all listeners
      this.listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in wearable stream listener:', error);
        }
      });
    }, 2000); // Emit data every 2 seconds
  }

  // Disconnect from the simulated wearable stream
  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isConnected = false;
    }
  }

  // Add a listener for wearable data
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove a listener
  removeListener(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // Generate realistic heart rate data
  generateHeartRate() {
    // Base heart rate between 60-100 bpm
    const baseHR = Math.floor(Math.random() * 41) + 60;
    
    // Add some variation based on time of day
    const hour = new Date().getHours();
    let variation = 0;
    
    // Higher heart rate during active hours (9AM-9PM)
    if (hour >= 9 && hour <= 21) {
      variation = Math.floor(Math.random() * 21) - 10; // -10 to +10
    } else {
      // Lower variation during rest hours
      variation = Math.floor(Math.random() * 11) - 5; // -5 to +5
    }
    
    return Math.max(50, Math.min(120, baseHR + variation));
  }

  // Generate step count
  generateSteps() {
    // Random steps per interval (2 seconds)
    return Math.floor(Math.random() * 5);
  }

  // Generate calories burned
  generateCalories() {
    // Random calories per interval (2 seconds)
    return Math.random() * 0.5;
  }

  // Generate sleep quality metric
  generateSleepQuality() {
    // Sleep quality percentage
    return Math.floor(Math.random() * 31) + 70; // 70-100%
  }
}

// Export a singleton instance
export default new WearableStream();