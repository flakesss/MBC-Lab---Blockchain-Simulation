import React, { useState, useEffect } from 'react';
import { ec as EC } from 'elliptic';
import SHA256 from 'crypto-js/sha256';
import { useLanguage } from '../hooks/useLanguage';

const ec = new EC('secp256k1');

const DigitalSignaturePage = () => {
  const { t } = useLanguage();
  // Key Pair State
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  // Sign State
  const [signMessage, setSignMessage] = useState('');
  const [signPrivKey, setSignPrivKey] = useState('');
  const [generatedSignature, setGeneratedSignature] = useState('');

  // Verify State
  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifyPubKey, setVerifyPubKey] = useState('');
  const [verifySignature, setVerifySignature] = useState('');
  const [isVerified, setIsVerified] = useState(null);

  const generateKeys = () => {
    const key = ec.genKeyPair();
    const privHex = key.getPrivate('hex');
    const pubHex = key.getPublic('hex');
    
    setPrivateKey(privHex);
    setPublicKey(pubHex);
    
    // Auto-fill forms for convenience
    setSignPrivKey(privHex);
    setVerifyPubKey(pubHex);
  };

  useEffect(() => {
    // Auto sign when inputs change
    if (signMessage && signPrivKey) {
      try {
        const key = ec.keyFromPrivate(signPrivKey);
        const msgHash = SHA256(signMessage).toString();
        const sig = key.sign(msgHash, 'hex');
        const sigHex = sig.toDER('hex');
        setGeneratedSignature(sigHex);
        
        // Auto-fill verify form for convenience
        setVerifySignature(sigHex);
        setVerifyMessage(signMessage);
      } catch (e) {
        setGeneratedSignature('Invalid Data / Key');
      }
    } else {
      setGeneratedSignature('');
    }
  }, [signMessage, signPrivKey]);

  useEffect(() => {
    // Auto verify when inputs change
    if (verifyMessage && verifyPubKey && verifySignature) {
      try {
        const key = ec.keyFromPublic(verifyPubKey, 'hex');
        const msgHash = SHA256(verifyMessage).toString();
        const valid = key.verify(msgHash, verifySignature);
        setIsVerified(valid);
      } catch (e) {
        setIsVerified(false);
      }
    } else {
      setIsVerified(null);
    }
  }, [verifyMessage, verifyPubKey, verifySignature]);

  return (
    <div style={{ width: '100%', maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>{t('digitalSignaturePage.title')}</h1>
        <button className="btn-mine" style={{ width: 'auto' }} onClick={generateKeys}>
          {t('digitalSignaturePage.generateKeyPair')}
        </button>
      </div>

      {(privateKey || publicKey) && (
        <div className="block-card" style={{ marginBottom: '2rem' }}>
          <div className="block-card-header">
            <span className="block-card-title">{t('digitalSignaturePage.generatedKeys')}</span>
          </div>
          <div className="block-card-body">
            <div className="form-group">
              <label>{t('digitalSignaturePage.privateKey')}</label>
              <div className="hash-box mono">{privateKey}</div>
            </div>
            <div className="form-group">
              <label>{t('digitalSignaturePage.publicKey')}</label>
              <div className="hash-box mono">{publicKey}</div>
            </div>
          </div>
        </div>
      )}

      <div className="split-view">
        {/* Sign Section */}
        <div className="block-card">
          <div className="block-card-header">
            <span className="block-card-title">{t('digitalSignaturePage.signMessage')}</span>
          </div>
          <div className="block-card-body">
            <div className="form-group">
              <label>{t('digitalSignaturePage.message')}</label>
              <textarea 
                rows="4" 
                value={signMessage} 
                onChange={(e) => setSignMessage(e.target.value)}
                placeholder={t('digitalSignaturePage.messagePlaceholder')}
              />
            </div>
            <div className="form-group">
              <label>{t('digitalSignaturePage.privateKey').split('(')[0].trim()}</label>
              <input 
                type="text" 
                className="mono"
                value={signPrivKey} 
                onChange={(e) => setSignPrivKey(e.target.value)}
                placeholder={t('digitalSignaturePage.pastePrivateKey')}
              />
            </div>
            <div className="form-group">
              <label>{t('digitalSignaturePage.signatureOutput')}</label>
              <div className="hash-box mono" style={{ minHeight: '80px' }}>
                {generatedSignature}
              </div>
            </div>
          </div>
        </div>

        {/* Verify Section */}
        <div className={`block-card ${isVerified === true ? 'valid' : isVerified === false ? 'invalid' : ''}`}>
          <div className="block-card-header">
            <span className="block-card-title">
              {t('digitalSignaturePage.verifySignature')}
              {isVerified === true && <span style={{color: 'var(--color-success-text)', marginLeft: '1rem', fontSize: '1rem'}}>{t('digitalSignaturePage.valid')}</span>}
              {isVerified === false && <span style={{color: 'var(--color-error-text)', marginLeft: '1rem', fontSize: '1rem'}}>{t('digitalSignaturePage.invalid')}</span>}
            </span>
          </div>
          <div className="block-card-body">
            <div className="form-group">
              <label>{t('digitalSignaturePage.message')}</label>
              <textarea 
                rows="4" 
                value={verifyMessage} 
                onChange={(e) => setVerifyMessage(e.target.value)}
                placeholder={t('digitalSignaturePage.messagePlaceholderVerify')}
              />
            </div>
            <div className="form-group">
              <label>{t('digitalSignaturePage.publicKey').split('(')[0].trim()}</label>
              <input 
                type="text" 
                className="mono"
                value={verifyPubKey} 
                onChange={(e) => setVerifyPubKey(e.target.value)}
                placeholder={t('digitalSignaturePage.pastePublicKey')}
              />
            </div>
            <div className="form-group">
              <label>{t('digitalSignaturePage.signature')}</label>
              <input 
                type="text" 
                className="mono"
                value={verifySignature} 
                onChange={(e) => setVerifySignature(e.target.value)}
                placeholder={t('digitalSignaturePage.pasteSignature')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignaturePage;
