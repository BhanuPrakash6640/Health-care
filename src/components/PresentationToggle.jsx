import React from "react";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const PresentationToggle = ({ presentationMode, onToggle }) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'p') {
        onToggle(!presentationMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [presentationMode, onToggle]);

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={() => onToggle(!presentationMode)}
        className={`flex items-center gap-2 rounded-lg py-2 px-4 ${
          presentationMode 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-white/20 hover:bg-white/30 text-white'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
        <span className="normal-case">
          {presentationMode ? 'Exit Presentation' : 'Presentation Mode (P)'}
        </span>
      </Button>
    </motion.div>
  );
};

export default PresentationToggle;