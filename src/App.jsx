import { useState } from 'react';
import Layout from './components/Layout/Layout';
import SingleBlockPage from './pages/SingleBlockPage';
import BlockchainPage from './pages/BlockchainPage';
import DigitalSignaturePage from './pages/DigitalSignaturePage';
import TransactionPage from './pages/TransactionPage';
import { Agentation } from 'agentation';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('single-block');

  const renderContent = () => {
    switch (activeTab) {
      case 'single-block':
        return <SingleBlockPage />;
      case 'blockchain':
        return <BlockchainPage />;
      case 'digital-signature':
        return <DigitalSignaturePage />;
      case 'transaction':
        return <TransactionPage />;
      default:
        return <SingleBlockPage />;
    }
  };

  return (
    <LanguageProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
      <Agentation />
    </LanguageProvider>
  );
}

export default App;
