import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import FlagIndonesia from './FlagIndonesia';
import FlagEnglish from './FlagEnglish';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <button
      type="button"
      className="language-selector"
      onClick={toggleLanguage}
      title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      {language === 'id' ? (
        <FlagIndonesia className="flag-icon" />
      ) : (
        <FlagEnglish className="flag-icon" />
      )}
    </button>
  );
};

export default LanguageSelector;
