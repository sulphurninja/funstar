import React from 'react';
import { motion } from 'framer-motion';

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
  return (
    <motion.div 
      className={`cursor-pointer transition-colors duration-300 ${
        active ? 'text-white' : 'text-white/60 hover:text-white'
      }`}
      whileHover={{ y: -1 }}
    >
      <span className="font-medium">{label}</span>
      {active && (
        <motion.div
          className="h-0.5 bg-white mt-1 rounded-full"
          layoutId="activeTab"
        />
      )}
    </motion.div>
  );
};

export default NavbarItem;