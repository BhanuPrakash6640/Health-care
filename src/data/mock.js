// Mock data for HealthDash

export const profiles = [
  { id: 1, name: "Sneha", age: 28, weight: 65, height: 165 },
  { id: 2, name: "Rohit", age: 35, weight: 78, height: 178 },
  { id: 3, name: "Meera", age: 24, weight: 58, height: 160 }
];

export const weeklyData = [
  { day: "Mon", steps: 8432, calories: 420, sleep: 7.2, hr: 72 },
  { day: "Tue", steps: 10231, calories: 510, sleep: 6.8, hr: 68 },
  { day: "Wed", steps: 7654, calories: 380, sleep: 7.5, hr: 70 },
  { day: "Thu", steps: 12453, calories: 620, sleep: 6.5, hr: 74 },
  { day: "Fri", steps: 9876, calories: 490, sleep: 7.0, hr: 71 },
  { day: "Sat", steps: 15678, calories: 780, sleep: 8.2, hr: 66 },
  { day: "Sun", steps: 6543, calories: 330, sleep: 7.8, hr: 69 },
];

export const initialHistory = [
  { time: "00:00", hr: 65 },
  { time: "01:00", hr: 63 },
  { time: "02:00", hr: 62 },
  { time: "03:00", hr: 64 },
  { time: "04:00", hr: 66 },
  { time: "05:00", hr: 68 },
  { time: "06:00", hr: 70 },
  { time: "07:00", hr: 72 },
  { time: "08:00", hr: 75 },
  { time: "09:00", hr: 78 },
  { time: "10:00", hr: 80 },
  { time: "11:00", hr: 79 },
  { time: "12:00", hr: 77 },
  { time: "13:00", hr: 76 },
  { time: "14:00", hr: 74 },
  { time: "15:00", hr: 73 },
  { time: "16:00", hr: 71 },
  { time: "17:00", hr: 70 },
  { time: "18:00", hr: 69 },
  { time: "19:00", hr: 68 },
  { time: "20:00", hr: 67 },
  { time: "21:00", hr: 66 },
  { time: "22:00", hr: 65 },
  { time: "23:00", hr: 64 },
];

export const symptomMap = {
  headache: "Stay hydrated and rest in a quiet, dark room",
  fever: "Rest and drink plenty of fluids",
  cough: "Drink warm liquids and use a humidifier",
  nausea: "Eat bland foods and stay hydrated",
  fatigue: "Ensure adequate sleep and manage stress",
  dizziness: "Sit or lie down and stay hydrated",
};

export const quickInsights = {
  bestDay: "Saturday",
  avgSleep: 7.2,
  avgHR: 70,
};