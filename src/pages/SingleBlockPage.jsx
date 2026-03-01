import React from 'react';
import BlockCard from '../components/SimulationCards/BlockCard';
import { useLanguage } from '../hooks/useLanguage';

const SingleBlockPage = () => {
  const { t } = useLanguage();

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem' }}>{t('singleBlockPage.title')}</h1>
      <BlockCard />
    </div>
  );
};

export default SingleBlockPage;
