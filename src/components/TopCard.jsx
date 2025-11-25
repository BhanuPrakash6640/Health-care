import React from "react";
import { motion } from "framer-motion";
import { Card, Typography } from "@material-tailwind/react";

const TopCard = ({ id, title, value, subtitle, onClick, expandedContent }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
    if (onClick) onClick(id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <Card
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
        onClick={handleCardClick}
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
        {isExpanded && expandedContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/20"
          >
            {expandedContent}
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default TopCard;