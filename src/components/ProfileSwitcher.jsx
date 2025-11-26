import React from "react";
import { Menu, MenuHandler, MenuList, MenuItem, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { profiles } from "@/data/mock";
import { loadState, saveState } from "@/utils/persistence";

const ProfileSwitcher = ({ currentProfile, onProfileChange }) => {
  const [selectedProfile, setSelectedProfile] = React.useState(currentProfile || profiles[0]);

  React.useEffect(() => {
    // Load saved profile from localStorage
    const savedProfile = loadState('selectedProfile');
    if (savedProfile) {
      const profile = profiles.find(p => p.id === savedProfile.id);
      if (profile) {
        setSelectedProfile(profile);
        onProfileChange(profile);
      }
    }
  }, [onProfileChange]);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    onProfileChange(profile);
    saveState('selectedProfile', profile);
  };

  return (
    <div className="flex items-center gap-2">
      <Typography className="text-white hidden md:block">Profile:</Typography>
      <Menu>
        <MenuHandler>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg py-2 px-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium">{selectedProfile.name.charAt(0)}</span>
              </div>
              <span className="normal-case hidden md:inline">{selectedProfile.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </motion.div>
        </MenuHandler>
        <MenuList className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
          {profiles.map((profile) => (
            <MenuItem 
              key={profile.id}
              onClick={() => handleProfileSelect(profile)}
              className="flex items-center gap-2 text-white hover:bg-gray-700/50"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium">{profile.name.charAt(0)}</span>
              </div>
              <div>
                <Typography className="font-medium">{profile.name}</Typography>
                <Typography className="text-xs text-white/70">{profile.age} years</Typography>
              </div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default ProfileSwitcher;