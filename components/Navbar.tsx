import React, { useCallback, useEffect, useState } from 'react';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import { AiFillCaretDown, AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';
import { HiSparkles } from 'react-icons/hi';
import { RiMovieLine } from 'react-icons/ri';
import Image from 'next/image';
import AccountMenu from './AccountMenu';
import { motion, AnimatePresence } from 'framer-motion';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <motion.nav
      className='w-full fixed z-50'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={`px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 flex flex-row items-center justify-center transition-all duration-700 ${showBackground
            ? 'bg-slate-950/80  border-b border-slate-800/50 shadow-2xl'
            : 'bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent backdrop-blur-sm'
          }`}
      >
        {/* Premium Logo */}
        <motion.div
          className="flex items-center animate-bounce justify-center gap-2 sm:gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center w-full">
            <motion.div

              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img src='/ocean.png' className='h-14 rounded-lg' />

            </motion.div>
            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>

        {/* Desktop Menu - Hidden on mobile due to bottom nav */}
        {/* <div className='flex-row ml-8 sm:ml-12 gap-6 sm:gap-8 hidden lg:flex'>
          <NavbarItem label='Discover' active />
          <NavbarItem label='Movies' />
          <NavbarItem label='Series' />
          <NavbarItem label='Exclusives' />
          <NavbarItem label='Watchlist' />
        </div> */}

        {/* Mobile Menu - Only show menu button on tablet */}
        {/* <div
          onClick={toggleMobileMenu}
          className='md:hidden lg:hidden flex flex-row items-center gap-2 ml-6 sm:ml-8 cursor-pointer relative'
        >
          <p className='font-medium text-slate-200 text-sm sm:text-base'>Menu</p>
          <motion.div
            animate={{ rotate: showMobileMenu ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <AiFillCaretDown className='text-slate-300 w-3 sm:w-4' />
          </motion.div>
          <AnimatePresence>
            {showMobileMenu && <MobileMenu visible={showMobileMenu} />}
          </AnimatePresence>
        </div> */}

        {/* Right Side - Responsive */}

      </div>
    </motion.nav>
  );
};

export default Navbar;