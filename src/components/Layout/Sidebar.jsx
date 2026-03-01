import { Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const Sidebar = ({ activeTab }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'single-block':
        return (
          <div className="sidebar-content">
            <h3>{t('sidebar.singleBlock.title')}</h3>
            <p>{t('sidebar.singleBlock.p1')}</p>
            <p>{t('sidebar.singleBlock.p2')}</p>
            <ul>
              <li>{t('sidebar.singleBlock.li1')}</li>
              <li>{t('sidebar.singleBlock.li2')}</li>
            </ul>
            <p>{t('sidebar.singleBlock.p3')}</p>
          </div>
        );
      case 'blockchain':
        return (
          <div className="sidebar-content">
            <h3>{t('sidebar.blockchain.title')}</h3>
            <p>{t('sidebar.blockchain.p1')}</p>
            <p>{t('sidebar.blockchain.p2')}</p>
            <ul>
              <li>{t('sidebar.blockchain.li1')}</li>
              <li>{t('sidebar.blockchain.li2')}</li>
            </ul>
            <p>{t('sidebar.blockchain.p3')}</p>
            <p>{t('sidebar.blockchain.p4')}</p>
          </div>
        );
      case 'digital-signature':
        return (
          <div className="sidebar-content">
            <h3>{t('sidebar.digitalSignature.titleKeyPair')}</h3>
            <p>{t('sidebar.digitalSignature.p1')}</p>
            <ul>
              <li>{t('sidebar.digitalSignature.li1')}</li>
              <li>{t('sidebar.digitalSignature.li2')}</li>
            </ul>
            <h3>{t('sidebar.digitalSignature.titleSignature')}</h3>
            <p>{t('sidebar.digitalSignature.p2')}</p>
            <p>{t('sidebar.digitalSignature.p3')}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'collapsed'}`}>
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
      
      <div className="sidebar-scroll-area">
        <aside className="sidebar-inner">
          <div className="sidebar-title">
            <Info size={20} color="var(--color-primary)" />
            {t('sidebar.title')}
          </div>
          {renderContent()}
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
