import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { 
  HiHome, 
  HiSearch, 
  HiCollection, 
  HiHeart, 
  HiUser 
} from 'react-icons/hi';
import { 
  RiMovieLine, 
  RiTvLine, 
  RiLiveLine 
} from 'react-icons/ri';

interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

const BottomNavigation = () => {
  const router = useRouter();

  const navItems: BottomNavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: HiHome,
      path: '/browse'
    },
    {
      id: 'search',
      label: 'Search',
      icon: HiSearch,
      path: '/search'
    },
    {
      id: 'library',
      label: 'Library',
      icon: HiCollection,
      path: '/library'
    },
    {
      id: 'watchlist',
      label: 'Watchlist',
      icon: HiHeart,
      path: '/watchlist',
      badge: 3
    },
  
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Background with blur */}
        <div className="bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/50">
          <div className="px-2 py-2">
            <div className="flex items-center justify-around">
              {navItems.map((item, index) => {
                const isItemActive = isActive(item.path);
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className="relative flex flex-col items-center justify-center p-2 min-w-0 flex-1"
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Active indicator */}
                    {isItemActive && (
                      <motion.div
                        className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Icon container */}
                    <div className="relative mb-1">
                      <motion.div
                        className={`p-1.5 rounded-xl transition-all duration-300 ${
                          isItemActive 
                            ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30' 
                            : 'bg-transparent'
                        }`}
                        animate={{ 
                          scale: isItemActive ? 1.1 : 1,
                          backgroundColor: isItemActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <item.icon 
                          className={`text-xl transition-colors duration-300 ${
                            isItemActive 
                              ? 'text-indigo-400' 
                              : 'text-slate-400'
                          }`} 
                        />
                      </motion.div>

                      {/* Badge */}
                      {item.badge && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          <span className="text-white text-xs font-bold">
                            {item.badge > 9 ? '9+' : item.badge}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Label */}
                    <motion.span
                      className={`text-xs font-medium transition-all duration-300 ${
                        isItemActive 
                          ? 'text-white' 
                          : 'text-slate-500'
                      }`}
                      animate={{ 
                        opacity: isItemActive ? 1 : 0.7,
                        scale: isItemActive ? 1.05 : 1
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Safe area padding for phones with home indicator */}
        <div className="bg-slate-950/95 h-safe-area-inset-bottom" />
      </motion.nav>

      {/* Content padding to prevent overlap */}
      <div className="h-20 md:hidden" />
    </>
  );
};

export default BottomNavigation;