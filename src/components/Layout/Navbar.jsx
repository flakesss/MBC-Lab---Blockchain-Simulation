  import { useLanguage } from '../../hooks/useLanguage';
  import { LanguageSelector } from '../LanguageSelector';
  import logo from '../../assets/logo.png';


  const Navbar = ({ activeTab, setActiveTab }) => {
    const { t } = useLanguage();

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="MBC Lab Logo" className="navbar-logo" />
        </div>
        <div className="navbar-tabs">
          <button
            className={`nav-tab ${activeTab === 'single-block' ? 'active' : ''}`}
            onClick={() => setActiveTab('single-block')}
          >
            {t('nav.singleBlock')}
          </button>
          <button
            className={`nav-tab ${activeTab === 'blockchain' ? 'active' : ''}`}
            onClick={() => setActiveTab('blockchain')}
          >
            {t('nav.blockchain')}
          </button>
          <button
            className={`nav-tab ${activeTab === 'digital-signature' ? 'active' : ''}`}
            onClick={() => setActiveTab('digital-signature')}
          >
            {t('nav.digitalSignature')}
          </button>
          <button
            className={`nav-tab ${activeTab === 'transaction' ? 'active' : ''}`}
            onClick={() => setActiveTab('transaction')}
          >
            {t('nav.transaction')}
          </button>
        </div>
        <LanguageSelector />
      </nav>
    );
  };

  export default Navbar;
