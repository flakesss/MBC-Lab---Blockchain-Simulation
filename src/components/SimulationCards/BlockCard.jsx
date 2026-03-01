import { useState, useEffect } from 'react';
import SHA256 from 'crypto-js/sha256';
import { Trash2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const BlockCard = ({ 
  blockNumber = 1, 
  initialNonce = 0, 
  initialData = '', 
  prevHash = '0000000000000000000000000000000000000000000000000000000000000000',
  onChange = () => {},
  onDelete = null
}) => {
  const { t } = useLanguage();
  const [nonce, setNonce] = useState(initialNonce);
  const [data, setData] = useState(initialData);
  const [hash, setHash] = useState('');
  const [isMining, setIsMining] = useState(false);

  const calculateHash = (n, d, p) => {
    return SHA256(blockNumber + n + d + p).toString();
  };

  useEffect(() => {
    const newHash = calculateHash(nonce, data, prevHash);
    setHash(newHash);
    onChange({
      blockNumber,
      nonce,
      data,
      hash: newHash,
      prevHash,
      isValid: newHash.startsWith('0000')
    });
  }, [nonce, data, prevHash, blockNumber]);

  const mine = () => {
    setIsMining(true);
    // Use setTimeout to allow UI to render "mining" state briefly (optional)
    setTimeout(() => {
      let currentNonce = 0;
      let computedHash = calculateHash(currentNonce, data, prevHash);
      
      while (!computedHash.startsWith('0000')) {
        currentNonce++;
        computedHash = calculateHash(currentNonce, data, prevHash);
        
        // Safety bail-out in extreme cases
        if (currentNonce > 500000) {
          console.warn("Mining taking too long, aborting...");
          break;
        }
      }
      
      setNonce(currentNonce);
      setIsMining(false);
    }, 10);
  };

  const isValid = hash.startsWith('0000');

  return (
    <div className={`block-card ${isValid ? 'valid' : 'invalid'}`}>
      <div className="block-card-header">
        <span className="block-card-title">{t('blockCard.block')} #{blockNumber}</span>
        {onDelete && (
          <button 
            className="btn-delete-block" 
            onClick={() => onDelete(blockNumber)}
            title="Delete Block"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
      
      <div className="block-card-body">
        <div className="form-group">
          <label>{t('blockCard.nonce')}</label>
          <input 
            type="number" 
            value={nonce} 
            onChange={(e) => setNonce(Number(e.target.value))} 
          />
        </div>
        
        <div className="form-group">
          <label>{t('blockCard.data')}</label>
          <textarea 
            rows="3"
            value={data} 
            onChange={(e) => setData(e.target.value)}
            placeholder={t('blockCard.dataPlaceholder')}
          />
        </div>

        <div className="form-group">
          <label>{t('blockCard.prevHash')}</label>
          <div className="hash-box mono">
            {prevHash}
          </div>
        </div>

        <div className="form-group">
          <label>{t('blockCard.hash')}</label>
          <div className="hash-box mono">
            <span className="highlight-zeros">{hash.substring(0, 4)}</span>
            {hash.substring(4)}
          </div>
        </div>
      </div>

      <div className="block-card-footer">
        <button 
          className="btn-mine" 
          onClick={mine} 
          disabled={isMining}
        >
          {isMining ? `${t('blockCard.mine')}...` : t('blockCard.mine')}
        </button>
      </div>
    </div>
  );
};

export default BlockCard;
