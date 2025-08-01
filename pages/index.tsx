import type { NextPage } from 'next';
import Link from 'next/link';
import { SlGlobe } from 'react-icons/sl';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { RiMovieLine } from 'react-icons/ri';
import { HiSparkles, HiPlay } from 'react-icons/hi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import DisclaimerModal from '../components/DisclaimerModal';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <main className='w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'>
        {/* Hero Section */}
        <div className='relative min-h-screen'>
          {/* Hero Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10"></div>
            {/* You can add a hero video or image here */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
          </div>

          {/* Navigation */}
          <motion.nav
            className='relative z-20 flex justify-between items-center py-6 px-6 sm:px-10 lg:px-12'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href='/'>
              <motion.div
                className="flex items-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="p-2 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src='/logo.png' className='h-12' />

                  </motion.div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            </Link>
            <div className='inline-flex items-center gap-4'>
              <div className='inline-flex items-center justify-between bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 py-2 px-4 text-white rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer'>
                <div className='flex items-center'>
                  <SlGlobe className="text-slate-300" />
                  <p className='hidden sm:block text-sm pl-3 pr-8 text-slate-200'>
                    English
                  </p>
                </div>
                <AiFillCaretDown className='ml-2 sm:ml-0 text-xs text-slate-400' />
              </div>
              <motion.button
                onClick={() => router.push('/browse')}
                className='text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/25'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </div>
          </motion.nav>

          {/* Hero Content */}
          <div className='relative z-20 flex items-center min-h-[80vh] px-6 sm:px-10 lg:px-12'>
            <div className='max-w-4xl'>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <h1 className='text-white text-5xl font-bold lg:text-7xl lg:font-black xl:text-8xl xl:leading-tight leading-tight mb-6'>
                  Premium Entertainment
                  <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Redefined
                  </span>
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className='text-slate-300 text-xl xl:text-2xl font-medium leading-relaxed mb-8 max-w-2xl'>
                  Stream unlimited movies, exclusive originals, and premium content. Cancel anytime.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className='max-w-2xl'>
                  <h3 className='text-white text-xl leading-relaxed mb-6'>
                    Ready to watch? Enter your email to create or restart your membership.
                  </h3>
                  <div className='flex flex-col sm:flex-row gap-4 max-w-2xl'>
                    <div className='relative flex-1'>
                      <input
                        id='email'
                        type='email'
                        className='block rounded-xl px-4 pt-6 pb-2 w-full text-base text-white bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 appearance-none focus:ring-0 focus-visible:outline-none focus:border-indigo-500/50 peer transition-colors'
                        placeholder=' '
                      />
                      <label
                        className='absolute text-base text-slate-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                        htmlFor='email'
                      >
                        Email address
                      </label>
                    </div>
                    <motion.button
                      onClick={() => router.push('/browse')}
                      className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/30 text-lg whitespace-nowrap'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiPlay className="text-xl" />
                      Get Started
                      <FiChevronRight className='text-xl' />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className='w-full relative px-6 sm:px-8 xl:px-12 text-white py-20'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className='grid md:grid-cols-2 2xl:grid-cols-4 gap-6'>
              {[
                {
                  icon: '/images/tv.svg',
                  title: 'Stream on Any Device',
                  description: 'Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, mobile devices, and more with stunning 4K quality.'
                },
                {
                  icon: '/images/popcorn.svg',
                  title: 'Watch Everywhere',
                  description: 'Stream unlimited premium content on your phone, tablet, laptop, and TV. Your entertainment, everywhere.'
                },
                {
                  icon: '/images/crystalball.svg',
                  title: 'Create Profiles for Family',
                  description: 'Send family members on adventures with personalized profiles and age-appropriate content controls.'
                },
                {
                  icon: '/images/download.svg',
                  title: 'Download to Watch Offline',
                  description: 'Save your favorites easily and always have something to watch, even without internet connection.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group'
                  whileHover={{ y: -8 }}
                >
                  <div className='flex flex-col pt-6 px-6 pb-16'>
                    <div className="w-16 h-16 mb-6">
                      <Image
                        src={feature.icon}
                        width={64}
                        height={64}
                        alt={feature.title}
                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <h3 className='text-white text-2xl font-bold mb-4'>
                      {feature.title}
                    </h3>
                    <p className='text-slate-300 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className='w-full px-6 sm:px-8 xl:px-12 py-20'>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='max-w-5xl mx-auto'
          >
            <h2 className='text-white text-4xl sm:text-5xl font-bold mb-8 text-center'>
              Frequently Asked Questions
            </h2>

            <div className='mt-8 space-y-3'>
              {[
                {
                  question: 'What is Funstar?',
                  answer: 'Funstar is a premium streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial - all for one low monthly price.'
                },
                {
                  question: 'How much does Funstar cost?',
                  answer: 'Watch Funstar on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $9.99 to $19.99 a month. No extra costs, no contracts.'
                },
                {
                  question: 'Where can I watch?',
                  answer: 'Watch anywhere, anytime. Sign in with your Funstar account to watch instantly on the web at funstar.com from your personal computer or on any internet-connected device that offers the Funstar app, including smart TVs, smartphones, tablets, streaming media players and game consoles.'
                },
                {
                  question: 'How do I cancel?',
                  answer: 'Funstar is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees - start or stop your account anytime.'
                },
                {
                  question: 'What can I watch on Funstar?',
                  answer: 'Funstar has an extensive library of feature films, documentaries, TV shows, anime, award-winning Funstar originals, and more. Watch as much as you want, anytime you want.'
                },
                {
                  question: 'Is Funstar good for kids?',
                  answer: 'The Funstar Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls.'
                }
              ].map((faq, index) => (
                <motion.details
                  key={faq.question}
                  className='w-full bg-slate-800/40 backdrop-blur-sm border-b border-slate-700/30 text-white cursor-pointer transition-all duration-300 hover:bg-slate-700/30'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <summary className="w-full flex justify-between items-center p-6 text-xl sm:text-2xl font-semibold after:content-['+'] after:text-2xl hover:after:rotate-45 after:transition-transform after:duration-300">
                    {faq.question}
                  </summary>
                  <div className='px-6 pb-6'>
                    <p className='text-slate-300 leading-relaxed text-lg'>
                      {faq.answer}
                    </p>
                  </div>
                </motion.details>
              ))}
            </div>

            {/* Final CTA */}
            <motion.div
              className='mt-16 text-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className='text-white text-xl leading-relaxed mb-6'>
                Ready to watch? Enter your email to create or restart your membership.
              </h3>
              <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto'>
                <div className='relative flex-1'>
                  <input
                    id='email2'
                    type='email'
                    className='block rounded-xl px-4 pt-6 pb-2 w-full text-base text-white bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 appearance-none focus:ring-0 focus-visible:outline-none focus:border-indigo-500/50 peer transition-colors'
                    placeholder=' '
                  />
                  <label
                    className='absolute text-base text-slate-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
                    htmlFor='email2'
                  >
                    Email address
                  </label>
                </div>
                <motion.button
                  onClick={() => router.push('/browse')}
                  className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/30 text-lg whitespace-nowrap'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                  <FiChevronRight className='text-xl' />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className='w-full px-6 sm:px-8 xl:px-12 py-20 border-t border-slate-800/50'>
          <motion.div
            className='max-w-6xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <RiMovieLine className="text-white text-2xl" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                  Funstar
                </span>
              </div>
              <p className="text-slate-400">
                Questions? Email us at{' '}
                <a
                  href='mailto:support@funstar.com'
                  className='hover:underline cursor-pointer text-indigo-400 hover:text-indigo-300 transition-colors'
                >
                  support@funstar.com
                </a>
              </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-slate-400 text-sm mb-12'>
              {[
                'FAQ', 'Help Center', 'Account', 'Media Center',
                'Investor Relations', 'Jobs', 'Redeem Gift Cards', 'Buy Gift Cards',
                'Ways to Watch', 'Terms of Use', 'Privacy', 'Cookie Preferences',
                'Corporate Information', 'Contact Us', 'Speed Test', 'Legal Notices'
              ].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className='hover:text-white transition-colors duration-300 hover:underline cursor-pointer'
                  whileHover={{ x: 4 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <div className='flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-slate-800'>
              <div className='inline-flex items-center gap-3 mb-4 sm:mb-0'>
                <div className='inline-flex items-center justify-between bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 py-2 px-4 text-white rounded-lg'>
                  <div className='flex items-center'>
                    <SlGlobe className="text-slate-300" />
                    <p className='text-sm pl-3 pr-8 text-slate-200'>English</p>
                  </div>
                  <AiFillCaretDown className='text-xs text-slate-400' />
                </div>
              </div>
              <p className='text-slate-500 text-sm'>
                Funstar. © 2024 All rights reserved.
              </p>
            </div>
          </motion.div>
        </footer>
      </main>
      {/* <DisclaimerModal /> */}
    </>
  );
};

export default Home;