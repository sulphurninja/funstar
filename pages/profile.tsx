import type { NextPage } from 'next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import BottomNavigation from '../components/BottomNavigation';
import { 
  HiUser, 
  HiCog, 
  HiLogout, 
  HiStar, 
  HiClock, 
  HiHeart,
  HiDownload,
  HiCreditCard,
  HiBell,
  HiGlobe,
  HiMoon,
  HiSun,
  HiChevronRight,
  HiPencil,
  HiShieldCheck
} from 'react-icons/hi';
import { RiVipCrownFill, RiMovieLine } from 'react-icons/ri';

const Profile: NextPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const profileStats = [
    { label: 'Hours Watched', value: '284', icon: HiClock, color: 'text-blue-400' },
    { label: 'Movies Watched', value: '156', icon: RiMovieLine, color: 'text-green-400' },
    { label: 'Favorites', value: '23', icon: HiHeart, color: 'text-red-400' },
    { label: 'Rating Average', value: '4.8', icon: HiStar, color: 'text-yellow-400' },
  ];

  const menuItems = [
    {
      category: 'Account',
      items: [
        { label: 'Edit Profile', icon: HiPencil, action: () => console.log('Edit Profile') },
        { label: 'Subscription', icon: RiVipCrownFill, action: () => console.log('Subscription'), badge: 'Premium' },
        { label: 'Payment Methods', icon: HiCreditCard, action: () => console.log('Payment') },
        { label: 'Privacy & Security', icon: HiShieldCheck, action: () => console.log('Privacy') },
      ]
    },
    {
      category: 'Preferences',
      items: [
        { label: 'Notifications', icon: HiBell, toggle: true, value: notifications, action: () => setNotifications(!notifications) },
        { label: 'Language', icon: HiGlobe, action: () => console.log('Language'), value: 'English' },
        { label: 'Theme', icon: isDarkMode ? HiMoon : HiSun, toggle: true, value: isDarkMode, action: () => setIsDarkMode(!isDarkMode) },
        { label: 'Downloads', icon: HiDownload, action: () => console.log('Downloads'), badge: '5 items' },
      ]
    },
    {
      category: 'Support',
      items: [
        { label: 'Help Center', icon: HiCog, action: () => console.log('Help') },
        { label: 'Contact Support', icon: HiUser, action: () => console.log('Support') },
        { label: 'Sign Out', icon: HiLogout, action: () => console.log('Sign Out'), danger: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <BottomNavigation />

      {/* Profile Header */}
      <div className="pt-20 sm:pt-24 lg:pt-28 pb-8">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center sm:text-left"
          >
            {/* Profile Image and Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-indigo-500/30 shadow-2xl">
                  <Image
                    src="/images/default-red.png"
                    width={128}
                    height={128}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center border-2 border-slate-950">
                  <RiVipCrownFill className="text-white text-sm" />
                </div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  John Doe
                </h1>
                <p className="text-slate-400 text-sm sm:text-base mb-3">
                  Premium Member since 2023
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium rounded-full">
                    Funstar Premium
                  </span>
                  <span className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs font-medium rounded-full">
                    Level 12
                  </span>
                </div>
                
                <motion.button
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 mx-auto sm:mx-0 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HiPencil className="text-lg" />
                  <span>Edit Profile</span>
                </motion.button>
              </div>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {profileStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center mb-3 ${stat.color}`}>
                    <stat.icon className="text-xl" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 pb-24 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {menuItems.map((section, sectionIndex) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-white mb-4">{section.category}</h2>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <motion.button
                    key={item.label}
                    onClick={item.action}
                    className={`w-full p-4 flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300 ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-slate-700/30' : ''
                    } ${item.danger ? 'hover:bg-red-500/10' : ''}`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center ${
                        item.danger ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        <item.icon className="text-lg" />
                      </div>
                      <div className="text-left">
                        <span className={`font-medium ${item.danger ? 'text-red-400' : 'text-white'}`}>
                          {item.label}
                        </span>
                        {item.value && typeof item.value === 'string' && (
                          <p className="text-slate-400 text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.badge && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.badge === 'Premium' 
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      
                      {item.toggle ? (
                        <motion.div
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                            item.value ? 'bg-indigo-600' : 'bg-slate-600'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            item.action?.();
                          }}
                        >
                          <motion.div
                            className="w-4 h-4 bg-white rounded-full shadow-lg"
                            animate={{ x: item.value ? 24 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        </motion.div>
                      ) : (
                        <HiChevronRight className={`text-lg ${item.danger ? 'text-red-400' : 'text-slate-400'}`} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          {/* Funstar Branding Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center py-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
                <RiMovieLine className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                Funstar
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Version 2.1.0 • Made with ❤️ for entertainment lovers
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;