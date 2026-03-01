import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import BlockCard from '../components/SimulationCards/BlockCard';
import { useLanguage } from '../hooks/useLanguage';

const BlockchainPage = () => {
  const { t } = useLanguage();
  const [blocks, setBlocks] = useState([
    { id: 1, nonce: 11316, data: '' },
    { id: 2, nonce: 35230, data: '' },
    { id: 3, nonce: 12937, data: '' },
  ]);

  const [hashes, setHashes] = useState({});

  const handleBlockChange = (index, blockData) => {
    // Only update if the hash actually changed to prevent infinite loops
    if (hashes[index] !== blockData.hash) {
      setHashes(prev => ({
        ...prev,
        [index]: blockData.hash
      }));
    }
  };

  const addBlock = () => {
    setBlocks(prev => [...prev, { id: prev.length > 0 ? Math.max(...prev.map(b => b.id)) + 1 : 1, nonce: 0, data: '' }]);
  };

  const deleteBlock = (blockId) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h1 style={{ marginBottom: '1rem', flexShrink: 0 }}>{t('blockchainPage.title')}</h1>
      <p style={{ color: 'var(--color-text-light)', marginBottom: '1rem', flexShrink: 0 }}>
        {t('blockchainPage.description')}
      </p>
      
      <div className="blockchain-wrapper">
        {blocks.map((block, index) => {
          const prevHash = index === 0 
            ? '0000000000000000000000000000000000000000000000000000000000000000' 
            : (hashes[index - 1] || '');

          return (
            <div key={block.id} className="blockchain-node">
              <div className="block-container-3d">
                <BlockCard
                  blockNumber={index + 1}
                  initialNonce={block.nonce}
                  initialData={block.data}
                  prevHash={prevHash}
                  onChange={(data) => handleBlockChange(index, data)}
                  onDelete={() => deleteBlock(block.id)}
                />
              </div>
              
              {index < blocks.length - 1 && (
                <div className="chain-connector"></div>
              )}
            </div>
          );
        })}
        
        {blocks.length > 0 && (
          <div className="chain-connector" style={{ opacity: 0.5 }}></div>
        )}
        
        <div className="blockchain-node">
          <button className="btn-add-block" onClick={addBlock}>
            <Plus size={48} />
            <span>{t('blockchainPage.addBlock')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainPage;


