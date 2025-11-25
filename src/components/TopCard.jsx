import React from "react";
import { motion } from "framer-motion";
import { Card, Typography } from "@material-tailwind/react";
import { useSwipeable } from "react-swipeable";

const TopCard = ({ id, title, value, subtitle, expanded, onToggleExpand }) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => console.log(`Swiped left on card ${id}`),
    onSwipedRight: () => console.log(`Swiped right on card ${id}`),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <motion.div
      {...handlers}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <Card
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
        onClick={() => onToggleExpand && onToggleExpand(id)}
      >
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="h6" className="text-white font-medium">
              {title}
            </Typography>
            <Typography variant="h3" className="text-white font-bold mt-1">
              {value}
            </Typography>
            <Typography className="text-white/70 text-sm mt-1">
              {subtitle}
            </Typography>
          </div>
        </div>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/20"
          >
            <div className="text-white/80 text-sm">
              <p className="mb-2">Detailed view for {title}</p>
              <p>Additional information and controls would appear here.</p>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default TopCard;