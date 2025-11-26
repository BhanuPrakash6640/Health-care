import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { symptomMap } from "@/data/mock";
import { loadState, saveState } from "@/utils/persistence";

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);

  const symptoms = [
    { id: "headache", name: "Headache" },
    { id: "fever", name: "Fever" },
    { id: "cough", name: "Cough" },
    { id: "nausea", name: "Nausea" },
    { id: "fatigue", name: "Fatigue" },
    { id: "dizziness", name: "Dizziness" },
  ];

  // Load saved symptoms from localStorage
  React.useEffect(() => {
    const savedSymptoms = loadState('selectedSymptoms', []);
    setSelectedSymptoms(savedSymptoms);
  }, []);

  const toggleSymptom = (symptomId) => {
    const newSelectedSymptoms = selectedSymptoms.includes(symptomId)
      ? selectedSymptoms.filter(id => id !== symptomId)
      : [...selectedSymptoms, symptomId];
    
    setSelectedSymptoms(newSelectedSymptoms);
    saveState('selectedSymptoms', newSelectedSymptoms);
  };

  React.useEffect(() => {
    // Update suggestions when selected symptoms change
    const newSuggestions = selectedSymptoms.map(symptomId => ({
      symptom: symptoms.find(s => s.id === symptomId)?.name || symptomId,
      suggestion: symptomMap[symptomId] || "No specific advice available"
    }));
    setSuggestions(newSuggestions);
  }, [selectedSymptoms]);

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
      <Typography variant="h6" className="text-white mb-4">
        Symptom Checker
      </Typography>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {symptoms.map((symptom) => (
          <motion.div
            key={symptom.id}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
          >
            <Button
              onClick={() => toggleSymptom(symptom.id)}
              className={`rounded-lg w-full py-3 px-2 min-w-0 ${
                selectedSymptoms.includes(symptom.id)
                  ? "bg-accent hover:bg-accent/80 text-white"
                  : "bg-gray-700/50 hover:bg-gray-600/50 text-white"
              }`}
            >
              <Typography className="text-sm font-medium normal-case">
                {symptom.name}
              </Typography>
            </Button>
          </motion.div>
        ))}
      </div>
      
      {suggestions.length > 0 && (
        <div className="border-t border-gray-700/50 pt-4">
          <Typography variant="h6" className="text-white mb-3">
            Suggestions
          </Typography>
          <div className="space-y-3">
            {suggestions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/50 rounded-lg p-3"
              >
                <Typography className="text-white font-medium text-sm">
                  {item.symptom}
                </Typography>
                <Typography className="text-white/80 text-xs mt-1">
                  {item.suggestion}
                </Typography>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SymptomChecker;