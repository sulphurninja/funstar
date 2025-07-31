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
        className={`px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 flex flex-row items-center transition-all duration-700 ${
          showBackground
            ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl'
            : 'bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent backdrop-blur-sm'
        }`}
      >
        {/* Premium Logo */}
        <motion.div 
          className="flex items-center gap-2 sm:gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <RiMovieLine className="text-white text-base sm:text-xl" />
            </motion.div>
            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Funstar
          </span>
        </motion.div>

        {/* Desktop Menu - Hidden on mobile due to bottom nav */}
        <div className='flex-row ml-8 sm:ml-12 gap-6 sm:gap-8 hidden lg:flex'>
          <NavbarItem label='Discover' active />
          <NavbarItem label='Movies' />
          <NavbarItem label='Series' />
          <NavbarItem label='Exclusives' />
          <NavbarItem label='Watchlist' />
        </div>

        {/* Mobile Menu - Only show menu button on tablet */}
        <div
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
        </div>

        {/* Right Side - Responsive */}
        <div className='flex flex-row ml-auto gap-1 sm:gap-2 items-center'>
          {/* Search - Hidden on small mobile, visible on tablet+ */}
          <motion.button 
            className='text-slate-300 hover:text-white cursor-pointer p-2 sm:p-3 rounded-full hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 hidden xs:block'
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlineSearch className="text-lg sm:text-xl" />
          </motion.button>
          
          {/* Notifications - Hidden on mobile, visible on tablet+ */}
          <motion.button 
            className='text-slate-300 hover:text-white cursor-pointer p-2 sm:p-3 rounded-full hover:bg-white/5 transition-all duration-300 relative border border-transparent hover:border-white/10 hidden sm:block'
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AiOutlineBell className="text-lg sm:text-xl" />
            <motion.span 
              className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              2
            </motion.span>
          </motion.button>

          {/* Profile - Always visible but responsive */}
          <div
            onClick={toggleAccountMenu}
            className='flex flex-row items-center gap-2 sm:gap-3 cursor-pointer relative ml-1 sm:ml-2'
          >
            <motion.div 
              className='w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-slate-700 hover:ring-slate-500 transition-all duration-300 shadow-lg'
              whileHover={{ scale: 1.08, y: -1 }}
            >
              <Image
                src='/images/default-red.png'
                width={36}
                height={36}
                alt='Profile'
                className="object-cover"
              />
            </motion.div>
            <motion.div
              animate={{ rotate: showAccountMenu ? 180 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="hidden sm:block"
            >
              <AiFillCaretDown className='text-slate-400 w-3' />
            </motion.div>
            <AnimatePresence>
              {showAccountMenu && <AccountMenu visible={showAccountMenu} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;