import React, { useState, useEffect } from 'react';
import { ec as EC } from 'elliptic';
import SHA256 from 'crypto-js/sha256';

const ec = new EC('secp256k1');

const TransactionPage = () => {

  // ================= CREATE STATE =================
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [signature, setSignature] = useState('');
  const [txHash, setTxHash] = useState('');

  // ================= VERIFY STATE =================
  const [verifyFrom, setVerifyFrom] = useState('');
  const [verifyTo, setVerifyTo] = useState('');
  const [verifyAmount, setVerifyAmount] = useState('');
  const [verifySignature, setVerifySignature] = useState('');
  const [isVerified, setIsVerified] = useState(null);

  // ================= AUTO DEFAULT KEYS =================
  useEffect(() => {
    const senderKey = ec.genKeyPair();
    const senderPrivate = senderKey.getPrivate('hex');
    const senderPublic = senderKey.getPublic('hex');

    const receiverKey = ec.genKeyPair();
    const receiverPublic = receiverKey.getPublic('hex');

    setPrivateKey(senderPrivate);
    setFromAddress(senderPublic);
    setToAddress(receiverPublic);
    setAmount('20.00');
  }, []);

  // ================= SIGN FUNCTION =================
  const handleSign = () => {
    try {
      const message = JSON.stringify({
        from: fromAddress,
        to: toAddress,
        amount: amount
      });

      const hash = SHA256(message).toString();
      setTxHash(hash);

      const key = ec.keyFromPrivate(privateKey);
      const sig = key.sign(hash, 'hex');
      const sigHex = sig.toDER('hex');

      setSignature(sigHex);

      // autofill verify fields
      setVerifyFrom(fromAddress);
      setVerifyTo(toAddress);
      setVerifyAmount(amount);
      setVerifySignature(sigHex);

      setIsVerified(null);

    } catch {
      setSignature('Invalid Private Key');
    }
  };

  // ================= VERIFY FUNCTION =================
  const handleVerify = () => {
    try {
      const message = JSON.stringify({
        from: verifyFrom,
        to: verifyTo,
        amount: verifyAmount
      });

      const hash = SHA256(message).toString();
      const key = ec.keyFromPublic(verifyFrom, 'hex');
      const valid = key.verify(hash, verifySignature);

      setIsVerified(valid);
    } catch {
      setIsVerified(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Transaction Simulation</h1>

      <div className="split-view">

        {/* ================= CREATE & SIGN ================= */}
        <div className="block-card">
          <div className="block-card-header">
            <span className="block-card-title">
              Create & Sign Transaction
            </span>
          </div>

          <div className="block-card-body">

            <div className="form-group">
              <label>From (Public Key)</label>
              <input className="mono" value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)} />
            </div>

            <div className="form-group">
              <label>To (Public Key)</label>
              <input className="mono" value={toAddress}
                onChange={(e) => setToAddress(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input type="number" value={amount}
                onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Private Key</label>
              <input className="mono" value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)} />
            </div>

            {/* SIGN BUTTON */}
            <button className="btn-mine" onClick={handleSign}>
              Sign Transaction
            </button>

            <div className="form-group">
              <label>Transaction Hash</label>
              <div className="hash-box mono">{txHash}</div>
            </div>

            <div className="form-group">
              <label>Signature</label>
              <div className="hash-box mono">{signature}</div>
            </div>

          </div>
        </div>

        {/* ================= VERIFY ================= */}
        <div className={`block-card ${isVerified === true ? 'valid' : isVerified === false ? 'invalid' : ''}`}>
          <div className="block-card-header">
            <span className="block-card-title">
              Verify Transaction
              {isVerified === true && <span style={{color: 'green', marginLeft: '1rem'}}>VALID</span>}
              {isVerified === false && <span style={{color: 'red', marginLeft: '1rem'}}>INVALID</span>}
            </span>
          </div>

          <div className="block-card-body">

            <div className="form-group">
              <label>From</label>
              <input className="mono" value={verifyFrom}
                onChange={(e) => setVerifyFrom(e.target.value)} />
            </div>

            <div className="form-group">
              <label>To</label>
              <input className="mono" value={verifyTo}
                onChange={(e) => setVerifyTo(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input type="number" value={verifyAmount}
                onChange={(e) => setVerifyAmount(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Signature</label>
              <input className="mono" value={verifySignature}
                onChange={(e) => setVerifySignature(e.target.value)} />
            </div>

            {/* VERIFY BUTTON */}
            <button className="btn-mine" onClick={handleVerify}>
              Verify Transaction
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionPage;