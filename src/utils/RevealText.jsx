import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const RevealText = () => {
  const { t } = useTranslation();

  const phrases = [
    t('revealText.recruitment'),
    t('revealText.coaching'),
    t('revealText.training'),
    t('revealText.assessment'),
    t('revealText.analisys'),
    t('revealText.mentoring'),
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='App text-[antiquewhite] text-xl sm:text-3xl'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentPhraseIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {phrases[currentPhraseIndex].split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
